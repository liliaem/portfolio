"use client";

import React, { useEffect, useState } from "react";
import {
  LayoutList,
  Search,
  ShieldAlert,
  ShieldCheck,
  ShieldX,
  SquareTerminal,
} from "lucide-react";
import { callCheckApi, type CheckResult } from "@/lib/checkApi";
import { IpCheckerTerminal } from "@/components/Landing/IpCheckerTerminal";

type Mode = "friendly" | "terminal";
const MODE_KEY = "ip-checker-mode";

const exampleIps = [
  { ip: "8.8.8.8", label: "Google DNS" },
  { ip: "185.220.101.10", label: "Tor exit node" },
  { ip: "wikipedia.org", label: "a website" },
];

const verdictStyles = {
  clean: { Icon: ShieldCheck, label: "Clean", color: "text-ok" },
  suspicious: { Icon: ShieldAlert, label: "Suspicious", color: "text-warn" },
  malicious: { Icon: ShieldX, label: "Malicious", color: "text-bad" },
};

export const IpChecker = () => {
  const [ip, setIp] = useState("");
  const [result, setResult] = useState<CheckResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [mode, setMode] = useState<Mode>("friendly");

  // Remember each visitor's preferred view (only in their own browser)
  useEffect(() => {
    try {
      if (localStorage.getItem(MODE_KEY) === "terminal") {
        requestAnimationFrame(() => setMode("terminal"));
      }
    } catch {
      // storage blocked (private mode): just use the default view
    }
  }, []);

  function changeMode(next: Mode) {
    setMode(next);
    try {
      localStorage.setItem(MODE_KEY, next);
    } catch {
      // ignore
    }
  }

  // Calls OUR API route (never AbuseIPDB directly: the key stays on the server)
  async function checkIp(target: string) {
    setLoading(true);
    setError(null);
    setResult(null);
    const call = await callCheckApi(target);
    const data = call.data as CheckResult & { error?: string };
    if (call.status < 200 || call.status >= 300) {
      setError(data.error ?? "Something went wrong. Please try again.");
    } else {
      setResult(data);
    }
    setLoading(false);
  }

  const style = result ? verdictStyles[result.verdict] : null;

  return (
    <div className="flex flex-col gap-5">
      <p className="text-lg text-subtle max-w-[38rem]">
        I built this checker integrating the AbuseIPDB REST API server-side. It
        also resolves websites through DNS and caches results in PostgreSQL,
        with input validation and rate limiting so it doesn&apos;t break. Try it
        :)
      </p>

      <div className="bg-surface border border-line p-5 sm:p-6 rounded-lg flex flex-col gap-4">
        {/* View toggle: friendly for everyone, terminal for the technical crowd */}
        <div
          role="group"
          aria-label="Checker view"
          className="flex w-fit gap-1 rounded-md border border-line p-1 text-sm"
        >
          {(
            [
              { id: "friendly", label: "Friendly", Icon: LayoutList },
              { id: "terminal", label: "Terminal", Icon: SquareTerminal },
            ] as const
          ).map(({ id, label, Icon }) => (
            <button
              key={id}
              type="button"
              onClick={() => changeMode(id)}
              aria-pressed={mode === id}
              className={`inline-flex items-center gap-1.5 rounded px-3 py-1.5 cursor-pointer transition-colors ${
                mode === id
                  ? "bg-brand-fill text-brand-contrast"
                  : "text-subtle hover:text-ink"
              }`}
            >
              <Icon className="w-4 h-4" aria-hidden="true" />
              {label}
            </button>
          ))}
        </div>

        {mode === "terminal" ? (
          <IpCheckerTerminal />
        ) : (
          <>
            {/* Input + button */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                checkIp(ip);
              }}
              className="flex flex-col sm:flex-row gap-3"
            >
              <label htmlFor="ip-input" className="sr-only">
                IP address or website
              </label>
              <input
                id="ip-input"
                type="text"
                value={ip}
                onChange={(e) => setIp(e.target.value)}
                placeholder="e.g. 8.8.8.8 or example.com"
                maxLength={253}
                autoComplete="off"
                spellCheck={false}
                className="flex-1 min-w-0 rounded-md border border-line bg-background px-3 py-2 font-mono text-base placeholder:text-subtle"
              />
              <button
                type="submit"
                disabled={loading || ip.trim() === ""}
                className="inline-flex items-center justify-center gap-2 rounded-md bg-brand-fill text-brand-contrast px-4 py-2 font-medium disabled:opacity-50 transition-opacity cursor-pointer disabled:cursor-not-allowed"
              >
                <Search className="w-4 h-4" aria-hidden="true" />
                {loading ? "Checking…" : "Check"}
              </button>
            </form>

            {/* Example IPs */}
            <div className="flex flex-wrap items-center gap-2 text-sm">
              <span className="text-subtle">Try:</span>
              {exampleIps.map((example) => (
                <button
                  key={example.ip}
                  type="button"
                  disabled={loading}
                  onClick={() => {
                    setIp(example.ip);
                    checkIp(example.ip);
                  }}
                  className="rounded-full border border-line px-3 py-1 font-mono hover:border-brand hover:text-brand transition-colors cursor-pointer"
                >
                  {example.ip}{" "}
                  <span className="font-sans opacity-70">
                    ({example.label})
                  </span>
                </button>
              ))}
            </div>

            {/* Error */}
            {error && (
              <p role="alert" className="text-bad font-medium">
                {error}
              </p>
            )}

            {/* Result card */}
            {result && style && (
              <div
                aria-live="polite"
                className="flex flex-col gap-3 border-t border-line pt-4"
              >
                <div
                  className={`flex flex-wrap items-center gap-2 text-xl md:text-2xl font-semibold ${style.color}`}
                >
                  <style.Icon className="w-7 h-7" aria-hidden="true" />
                  {style.label}
                  <span className="text-base font-normal text-subtle">
                    (abuse score {result.score}/100)
                  </span>
                </div>
                <dl className="grid grid-cols-[auto_1fr] gap-x-4 gap-y-1 text-base">
                  {result.resolvedFrom && (
                    <>
                      <dt className="text-subtle">Website</dt>
                      <dd className="font-mono break-all">
                        {result.resolvedFrom.host}
                        {result.resolvedFrom.addressCount > 1 && (
                          <span className="font-sans text-subtle">
                            {" "}
                            (has {result.resolvedFrom.addressCount} IPs, checked
                            the first one)
                          </span>
                        )}
                      </dd>
                    </>
                  )}
                  <dt className="text-subtle">IP</dt>
                  <dd className="font-mono break-all">{result.ip}</dd>
                  <dt className="text-subtle">Country</dt>
                  <dd>{result.country ?? "Unknown"}</dd>
                  <dt className="text-subtle">ISP</dt>
                  <dd>{result.isp ?? "Unknown"}</dd>
                  <dt className="text-subtle">Usage type</dt>
                  <dd>{result.usageType ?? "Unknown"}</dd>
                  <dt className="text-subtle">Tor exit node</dt>
                  <dd>{result.isTor ? "Yes" : "No"}</dd>
                  <dt className="text-subtle">Reports (90 days)</dt>
                  <dd>{result.totalReports}</dd>
                  <dt className="text-subtle">Last reported</dt>
                  <dd>
                    {result.lastReportedAt
                      ? new Date(result.lastReportedAt)
                          .toISOString()
                          .slice(0, 10)
                      : "Never"}
                  </dd>
                </dl>
                {result.resolvedFrom &&
                  result.usageType?.includes("Content Delivery Network") && (
                    <p className="text-sm text-subtle">
                      This website sits behind a CDN, so this is the reputation
                      of the CDN&apos;s IP, shared by many sites, not of the
                      website itself.
                    </p>
                  )}
                {result.cachedAt && (
                  <p className="text-sm text-subtle">
                    Saved result from{" "}
                    {new Date(result.cachedAt).toLocaleString()}. Lookups are
                    cached for 24 hours to stay within AbuseIPDB&apos;s free
                    limits.
                  </p>
                )}
              </div>
            )}
          </>
        )}

        {/* Credit + privacy note */}
        <p className="text-sm text-subtle">
          Powered by{" "}
          <a
            href="https://www.abuseipdb.com"
            target="_blank"
            rel="noopener noreferrer"
            className="underline underline-offset-2"
          >
            AbuseIPDB
          </a>
          . The IP you enter is sent to AbuseIPDB and kept in my logs for up to
          30 days. Your own IP is never stored.
        </p>
      </div>
    </div>
  );
};
