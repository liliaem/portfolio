import React from "react";
import { Marquee } from "@/components/Landing/Marquee";

const EMAIL = "liliaelba123@gmail.com";
const LAB_URL = "https://github.com/liliaem/soc-home-lab";

const COMMAND_ROWS = [
  {
    seconds: 55,
    commands: [
      'grep "Failed password" /var/log/auth.log | wc -l',
      "sudo systemctl status wazuh-manager",
      "nmap -sV 192.168.64.0/24",
      "whoami",
    ],
  },
  {
    seconds: 65,
    commands: [
      'index=linux "Failed password" | stats count by src_ip',
      'curl -s "https://lili-martinez.vercel.app/api/check-ip?ip=8.8.8.8"',
      "git push origin main",
    ],
  },
  {
    seconds: 50,
    commands: [
      "SELECT verdict, COUNT(*) FROM lookup_log GROUP BY verdict;",
      "npm audit fix",
      "git check-ignore -v .env.local",
    ],
  },
];

export const ContactSection = () => {
  return (
    <section aria-labelledby="contact-title" className="overflow-hidden">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 pt-16 md:pt-24 pb-10 flex flex-col gap-6">
        <h2
          id="contact-title"
          className="text-6xl sm:text-8xl md:text-9xl font-semibold tracking-[-0.045em] leading-[0.9]"
        >
          Let&apos;s talk
        </h2>
        <p className="text-lg text-subtle max-w-[32rem]">
          Got a problem to solve or something to build? I&apos;m down for it.
        </p>
        <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
          <a
            href={`mailto:${EMAIL}`}
            className="rounded-md bg-brand-fill text-brand-contrast px-5 py-2.5 font-medium hover:opacity-90 transition-opacity"
          >
            Email me
          </a>
          <a
            href={LAB_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium underline underline-offset-4 decoration-1 hover:text-brand transition-colors"
          >
            GitHub
          </a>
        </div>
      </div>
      {/* Terminal history: real commands from my lab and this site, scrolling in opposite directions */}
      <div className="flex flex-col gap-3 py-8 font-mono text-lg sm:text-2xl">
        {COMMAND_ROWS.map((row, i) => (
          <Marquee
            key={i}
            label="Commands from my lab"
            reverse={i % 2 === 1}
            seconds={row.seconds}
          >
            {row.commands.map((cmd) => (
              <span
                key={cmd}
                aria-hidden="true"
                className="pr-14 whitespace-nowrap text-subtle"
              >
                <span className="text-brand">$</span> {cmd}
              </span>
            ))}
          </Marquee>
        ))}
        <a
          href={`mailto:${EMAIL}`}
          aria-label={`Email ${EMAIL}`}
          className="block text-ink hover:text-brand transition-colors"
        >
          <Marquee label="Email address" seconds={28}>
            {Array.from({ length: 3 }, (_, i) => (
              <span key={i} className="pr-14 whitespace-nowrap">
                <span className="text-brand">$</span> mail -s &quot;Hi
                Lili&quot; {EMAIL}
              </span>
            ))}
          </Marquee>
        </a>
      </div>
    </section>
  );
};
