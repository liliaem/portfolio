// Shared by both checker views (friendly and terminal). Runs in the browser.

// The shape of the JSON our own API (/api/check-ip) returns
export type CheckResult = {
  ip: string;
  score: number;
  verdict: "clean" | "suspicious" | "malicious";
  country: string | null;
  isp: string | null;
  usageType: string | null;
  isTor: boolean;
  totalReports: number;
  lastReportedAt: string | null;
  cachedAt?: string; // present when the result came from our 24-hour cache
  resolvedFrom?: { host: string; addressCount: number } | null; // present when a website was entered
};

// Where the visitor came from: ?utm_source=linkedin in the page URL, or the referring site.
// Only the source name is sent, never the full address.
export function visitSource(): string {
  const utm = new URLSearchParams(window.location.search).get("utm_source");
  if (utm) return utm;
  try {
    const host = document.referrer ? new URL(document.referrer).hostname : "";
    return host === window.location.hostname ? "" : host;
  } catch {
    return "";
  }
}

export type ApiCall = {
  path: string; // what the terminal view prints as the request
  status: number; // HTTP status code, 0 if the server could not be reached
  ms: number; // how long the request took
  data: unknown; // the JSON body
};

// Calls OUR API route (never AbuseIPDB directly: the key stays on the server)
export async function callCheckApi(target: string): Promise<ApiCall> {
  const path = `/api/check-ip?${new URLSearchParams({ ip: target.trim() })}`;
  const params = new URLSearchParams({ ip: target.trim(), src: visitSource() });
  const started = performance.now();
  try {
    const res = await fetch(`/api/check-ip?${params}`);
    const data = await res.json();
    return {
      path,
      status: res.status,
      ms: Math.round(performance.now() - started),
      data,
    };
  } catch {
    return {
      path,
      status: 0,
      ms: Math.round(performance.now() - started),
      data: { error: "Could not reach the server. Check your connection." },
    };
  }
}
