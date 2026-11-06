import React from "react";
import { Marquee } from "@/components/Landing/Marquee";

const EMAIL = "liliaelba123@gmail.com";
const LAB_URL = "https://github.com/liliaem/soc-home-lab";

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
      <a
        href={`mailto:${EMAIL}`}
        className="block py-6 text-brand hover:text-ink transition-colors"
      >
        <Marquee label="Email address" reverse seconds={30}>
          {Array.from({ length: 4 }, (_, i) => (
            <span
              key={i}
              className="px-8 text-3xl sm:text-5xl font-medium tracking-tight whitespace-nowrap"
            >
              {EMAIL}
            </span>
          ))}
        </Marquee>
      </a>
    </section>
  );
};
