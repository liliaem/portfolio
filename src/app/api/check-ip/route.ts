import { isReservedIp, parseTarget, resolveHost } from "@/lib/target";
import { after } from "next/server";
import { sql } from "@/lib/db";

const CACHE_HOURS = 24;
const LIMIT_PER_MINUTE = 15; // AbuseIPDB calls per minute, for the whole site
const LIMIT_PER_DAY = 900; // stay under AbuseIPDB's free 1,000 checks per day
const LOG_RETENTION_DAYS = 30;

type LogEntry = {
  input: string;
  resolvedIp?: string;
  isValid: boolean;
  status: number;
  verdict?: string;
  cacheHit?: boolean;
};

export async function GET(request: Request) {
  const started = Date.now();

  // 1. Read what the visitor typed: an IP or a website, e.g. /api/check-ip?ip=example.com
  const { searchParams } = new URL(request.url);
  const rawInput = (searchParams.get("ip") ?? "").slice(0, 300); // cap what we store

  // Visitor context for the log. No visitor IP is ever stored.
  const country = request.headers.get("x-vercel-ip-country"); // set by Vercel, empty locally
  const language = (request.headers.get("accept-language") ?? "").split(",")[0].slice(0, 35) || null;
  const referrer = (searchParams.get("src") ?? "").slice(0, 100) || null;

  // Writes one row to lookup_log AFTER the response is sent, so the visitor never waits for it.
  // If logging fails, the lookup still works.
  const log = (entry: LogEntry) =>
    after(async () => {
      try {
        await sql`
          INSERT INTO lookup_log
            (input, resolved_ip, is_valid, status, verdict, cache_hit, response_ms, country, language, referrer)
          VALUES
            (${entry.input}, ${entry.resolvedIp ?? null}, ${entry.isValid}, ${entry.status}, ${entry.verdict ?? null},
             ${entry.cacheHit ?? false}, ${Date.now() - started}, ${country}, ${language}, ${referrer})`;

        // Housekeeping on roughly 1 in 20 requests: delete old logs and expired cache rows
        if (Math.random() < 0.05) {
          await sql`DELETE FROM lookup_log WHERE created_at < now() - make_interval(days => ${LOG_RETENTION_DAYS})`;
          await sql`DELETE FROM ip_cache WHERE checked_at < now() - make_interval(hours => ${CACHE_HOURS})`;
        }
      } catch (err) {
        console.error("[check-ip] Could not write to lookup_log:", err);
      }
    });

  // 1b. Validate BEFORE doing anything else: is it an IP address or a website?
  const target = parseTarget(rawInput);
  if (!target) {
    log({ input: rawInput, isValid: false, status: 400 });
    return Response.json(
      { error: "Enter an IP address or a website, like 8.8.8.8 or example.com." },
      { status: 400 }
    );
  }

  // 1c. For a website, look up its IP address with DNS (first address only, to save checks)
  let ip: string;
  let resolvedFrom: { host: string; addressCount: number } | null = null;
  if (target.kind === "domain") {
    const addresses = await resolveHost(target.host);
    if (addresses.length === 0) {
      log({ input: rawInput, isValid: true, status: 422 });
      return Response.json(
        { error: `Couldn't find an IP address for ${target.host}. Check the spelling.` },
        { status: 422 }
      );
    }
    ip = addresses[0];
    resolvedFrom = { host: target.host, addressCount: addresses.length };
  } else {
    ip = target.ip;
  }

  // 1d. Private and reserved addresses (127.0.0.1, 192.168.x.x...) have no public reputation
  if (isReservedIp(ip)) {
    log({ input: rawInput, resolvedIp: ip, isValid: false, status: 400 });
    return Response.json(
      {
        error: `${ip} is a private or reserved address, so there's no public reputation to check.`,
      },
      { status: 400 }
    );
  }

  // 2. Cache: was this IP checked in the last 24 hours?
  try {
    const cached = await sql`
      SELECT result, checked_at
      FROM ip_cache
      WHERE ip = ${ip}
        AND checked_at > now() - make_interval(hours => ${CACHE_HOURS})`;

    if (cached.length > 0) {
      const result = cached[0].result;
      log({ input: rawInput, resolvedIp: ip, isValid: true, status: 200, verdict: result.verdict, cacheHit: true });
      return Response.json({ ...result, resolvedFrom, cachedAt: cached[0].checked_at });
    }
  } catch (err) {
    // If the database is down, keep working without the cache
    console.error("[check-ip] Cache lookup failed:", err);
  }

  // 3. Rate limit: count real AbuseIPDB calls site-wide (privacy-friendly: no per-visitor tracking)
  try {
    const [usage] = await sql`
      SELECT
        COUNT(*) FILTER (WHERE created_at > now() - interval '1 minute') AS last_minute,
        COUNT(*) AS last_day
      FROM lookup_log
      WHERE is_valid
        AND NOT cache_hit
        AND status NOT IN (422, 429) -- only count lookups that reached AbuseIPDB
        AND created_at > now() - interval '24 hours'`;

    if (Number(usage.last_minute) >= LIMIT_PER_MINUTE || Number(usage.last_day) >= LIMIT_PER_DAY) {
      log({ input: rawInput, resolvedIp: ip, isValid: true, status: 429 });
      const tooManyToday = Number(usage.last_day) >= LIMIT_PER_DAY;
      return Response.json(
        {
          error: tooManyToday
            ? "The checker reached its daily limit. Please try again tomorrow."
            : "The checker is busy right now. Please try again in a minute.",
        },
        { status: 429 }
      );
    }
  } catch (err) {
    console.error("[check-ip] Rate limit check failed:", err);
  }

  // 4. Build the AbuseIPDB URL (same as curl -G --data-urlencode)
  const url = new URL("https://api.abuseipdb.com/api/v2/check");
  url.searchParams.set("ipAddress", ip);
  url.searchParams.set("maxAgeInDays", "90");

  // 5. Call AbuseIPDB from the SERVER, with the secret key (same as curl -H)
  let response: Response;
  try {
    response = await fetch(url, {
      headers: {
        Key: process.env.ABUSEIPDB_API_KEY!,
        Accept: "application/json",
      },
      signal: AbortSignal.timeout(5000), // give up after 5 seconds
    });
  } catch (err) {
    console.error("[check-ip] Network error or timeout:", err);
    log({ input: rawInput, resolvedIp: ip, isValid: true, status: 504 });
    return Response.json(
      { error: "The IP lookup service is not responding. Please try again later." },
      { status: 504 }
    );
  }

  // 5b. If AbuseIPDB failed, log the real reason and return a friendly error
  if (!response.ok) {
    const details = await response.text();
    console.error(`[check-ip] AbuseIPDB returned ${response.status}: ${details}`);

    if (response.status === 429) {
      log({ input: rawInput, resolvedIp: ip, isValid: true, status: 429 });
      return Response.json(
        { error: "Daily lookup limit reached. Please try again tomorrow." },
        { status: 429 }
      );
    }
    log({ input: rawInput, resolvedIp: ip, isValid: true, status: 502 });
    return Response.json(
      { error: "The IP lookup service failed. Please try again later." },
      { status: 502 }
    );
  }

  // 6. Keep only the fields we need, plus our own verdict
  const { data } = await response.json();
  const score: number = data.abuseConfidenceScore;
  const verdict = score >= 75 ? "malicious" : score >= 25 ? "suspicious" : "clean";

  const result = {
    ip: data.ipAddress,
    score,
    verdict,
    country: data.countryCode,
    isp: data.isp,
    usageType: data.usageType,
    isTor: data.isTor,
    totalReports: data.totalReports,
    lastReportedAt: data.lastReportedAt,
  };

  // 7. Save to the cache (insert, or update if the IP is already there)
  try {
    await sql`
      INSERT INTO ip_cache (ip, result, checked_at)
      VALUES (${ip}, ${JSON.stringify(result)}::jsonb, now())
      ON CONFLICT (ip) DO UPDATE
        SET result = EXCLUDED.result, checked_at = EXCLUDED.checked_at`;
  } catch (err) {
    console.error("[check-ip] Could not save to cache:", err);
  }

  log({ input: rawInput, resolvedIp: ip, isValid: true, status: 200, verdict, cacheHit: false });
  return Response.json({ ...result, resolvedFrom });
}
