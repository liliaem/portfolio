"use client";

import { useEffect } from "react";

// Easter egg for people who open DevTools 👀
// 1. A styled message in the Console
// 2. A lili() command they can run there
// (The third one is a response header, set in next.config.ts)

declare global {
  interface Window {
    lili?: () => string;
  }
}

let shown = false; // print once, even if React renders twice in development

export const EasterEgg = () => {
  useEffect(() => {
    if (shown) return;
    shown = true;

    const title =
      "font: 700 20px monospace; color: #f4e2ce; background: #221821; padding: 8px 12px; border-radius: 4px;";
    const text = "font: 13px monospace; color: #c98f87;";
    const hint = "font: 700 13px monospace; color: #8fc1ae;";

    console.log("%clili@soc-lab:~$ whoami", title);
    console.log(
      "%cYou opened DevTools, so you're my kind of person. 🕵️‍♀️\n" +
        "Nothing secret lives in this browser (I checked: the API key stays on the server).\n" +
        "But there is one more thing hidden here...",
      text,
    );
    console.log("%c→ type lili() and press Enter", hint);

    window.lili = () => {
      console.log("%cYou found it! 🎉", title);
      console.log(
        "%cBuilt by Lilia Martínez\n\n" +
          "Stack:    Next.js, TypeScript, Tailwind, PostgreSQL (Neon), Vercel\n" +
          "API:      AbuseIPDB REST API, called server-side\n" +
          "Security: input validation, SSRF-safe DNS lookups, parameterized SQL,\n" +
          "          rate limiting, no visitor IPs stored\n\n" +
          "One more egg: check the response headers in the Network tab.\n" +
          "If you're reading this, let's talk: liliaelba123@gmail.com",
        text,
      );
      return "🫶";
    };
  }, []);

  return null;
};
