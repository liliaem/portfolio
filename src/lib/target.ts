import { BlockList, isIP } from "node:net";
import { Resolver } from "node:dns/promises";

// What the visitor typed, after cleaning it up: an IP address, or a domain to look up.
export type Target = { kind: "ip"; ip: string } | { kind: "domain"; host: string };

// Domain names: labels of letters, digits and hyphens, separated by dots (max 253 chars)
const HOSTNAME = /^(?=.{1,253}$)([a-z0-9]([a-z0-9-]{0,61}[a-z0-9])?\.)+[a-z0-9-]{2,63}$/;

// Accepts "8.8.8.8", "example.com", "www.example.com" or a full link like
// "https://example.com/page?x=1". Returns null when it is neither an IP nor a domain.
export function parseTarget(input: string): Target | null {
  const text = input.trim();
  if (text === "") return null;
  if (isIP(text) !== 0) return { kind: "ip", ip: text };

  let url: URL;
  try {
    url = new URL(text.includes("://") ? text : `http://${text}`);
  } catch {
    return null;
  }
  if (url.protocol !== "http:" && url.protocol !== "https:") return null;

  const host = url.hostname.replace(/^\[|\]$/g, "").replace(/\.$/, ""); // [::1] -> ::1, "example.com." -> "example.com"
  if (isIP(host) !== 0) return { kind: "ip", ip: host };
  if (!HOSTNAME.test(host)) return null;
  return { kind: "domain", host };
}

// Private, local and reserved ranges: nothing public to check there.
const reserved = new BlockList();
for (const [net, prefix] of [
  ["0.0.0.0", 8], ["10.0.0.0", 8], ["100.64.0.0", 10], ["127.0.0.0", 8],
  ["169.254.0.0", 16], ["172.16.0.0", 12], ["192.0.0.0", 24], ["192.0.2.0", 24],
  ["192.168.0.0", 16], ["198.18.0.0", 15], ["198.51.100.0", 24], ["203.0.113.0", 24],
  ["224.0.0.0", 4], ["240.0.0.0", 4],
] as const) reserved.addSubnet(net, prefix, "ipv4");
for (const [net, prefix] of [
  ["::", 128], ["::1", 128], ["64:ff9b::", 96], ["fc00::", 7],
  ["fe80::", 10], ["ff00::", 8], ["2001:db8::", 32],
] as const) reserved.addSubnet(net, prefix, "ipv6");

export function isReservedIp(ip: string): boolean {
  // "::ffff:10.0.0.1" is an IPv4 address written as IPv6: check the IPv4 part
  const mapped = ip.toLowerCase().match(/^::ffff:(\d+\.\d+\.\d+\.\d+)$/);
  if (mapped) return reserved.check(mapped[1], "ipv4");
  return reserved.check(ip, isIP(ip) === 6 ? "ipv6" : "ipv4");
}

// DNS lookup: the domain's IPv4 addresses, or IPv6 if it has none. Gives up after ~2.5 s.
export async function resolveHost(host: string): Promise<string[]> {
  const resolver = new Resolver({ timeout: 2500, tries: 1 });
  try {
    const v4 = await resolver.resolve4(host);
    if (v4.length > 0) return v4;
  } catch {
    // no IPv4 records, try IPv6
  }
  try {
    return await resolver.resolve6(host);
  } catch {
    return [];
  }
}
