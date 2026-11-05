"use client";

import React, { useEffect, useState } from "react";

// Intro: a terminal types a few commands, then slides up to reveal the page.
// About 2.5 seconds. Any click or key press skips it. Hidden when "Reduce motion" is on.
const LINES = [
  { cmd: "whoami", out: "lilia martínez" },
  {
    cmd: "cat role.txt",
    out: "technical support, security operations, biomedical engineering",
  },
  { cmd: "./open-portfolio.sh", out: "" },
];
const TYPE_MS = 40; // per character

type Shown = { cmd: string; out?: string };

export const IntroCurtain = () => {
  const [shown, setShown] = useState<Shown[]>([]);
  const [done, setDone] = useState(false);
  const [gone, setGone] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      requestAnimationFrame(() => setGone(true));
      return;
    }

    let cancelled = false;
    const sleep = (ms: number) =>
      new Promise((resolve) => setTimeout(resolve, ms));

    const play = async () => {
      await sleep(250);
      for (const [i, line] of LINES.entries()) {
        for (let c = 1; c <= line.cmd.length; c++) {
          if (cancelled) return;
          setShown((prev) => {
            const next = [...prev];
            next[i] = { cmd: line.cmd.slice(0, c) };
            return next;
          });
          await sleep(TYPE_MS);
        }
        await sleep(150);
        if (cancelled) return;
        setShown((prev) => {
          const next = [...prev];
          next[i] = { cmd: line.cmd, out: line.out };
          return next;
        });
        await sleep(280);
      }
      if (!cancelled) setDone(true);
    };
    play();

    const skip = () => setDone(true);
    window.addEventListener("keydown", skip, { once: true });
    return () => {
      cancelled = true;
      window.removeEventListener("keydown", skip);
    };
  }, []);

  if (gone) return null;

  return (
    <div
      data-done={done}
      onAnimationEnd={() => setGone(true)}
      onClick={() => setDone(true)}
      className="intro-curtain fixed inset-0 z-50 flex items-center justify-center bg-umbra text-scroll px-6"
    >
      <div
        aria-hidden="true"
        className="w-full max-w-xl font-mono text-base sm:text-lg leading-relaxed"
      >
        {shown.map((line, i) => (
          <div key={i}>
            <p>
              <span className="text-[#c98f87]">lili@soc-lab:~$</span> {line.cmd}
              {i === shown.length - 1 && line.out === undefined && (
                <span className="terminal-cursor inline-block w-2.5 h-5 align-middle ml-0.5 bg-scroll" />
              )}
            </p>
            {line.out && <p className="text-[#ab9cac]">{line.out}</p>}
          </div>
        ))}
        {(shown.length === 0 || shown[shown.length - 1]?.out !== undefined) && (
          <p>
            <span className="text-[#c98f87]">lili@soc-lab:~$</span>{" "}
            <span className="terminal-cursor inline-block w-2.5 h-5 align-middle bg-scroll" />
          </p>
        )}
      </div>
      <button
        type="button"
        onClick={() => setDone(true)}
        className="absolute bottom-6 right-6 text-sm text-[#ab9cac] underline underline-offset-4 hover:text-scroll cursor-pointer"
      >
        Skip intro
      </button>
    </div>
  );
};
