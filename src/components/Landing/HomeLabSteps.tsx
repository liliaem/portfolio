"use client";

import React, { useEffect, useRef, useState } from "react";

// Scroll effect: each step lights up once it scrolls into the middle of the screen,
// so the lab reads as a sequence. With "Reduce motion" on, all steps start lit.
export const HomeLabSteps = ({ steps }: { steps: string[] }) => {
  const listRef = useRef<HTMLOListElement>(null);
  const [lit, setLit] = useState(0); // how many steps are lit

  useEffect(() => {
    const list = listRef.current;
    if (!list) return;
    const items = Array.from(list.querySelectorAll("li"));

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      requestAnimationFrame(() => setLit(items.length));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            const index = items.indexOf(entry.target as HTMLLIElement);
            setLit((current) => Math.max(current, index + 1));
            observer.unobserve(entry.target);
          }
        }
      },
      { rootMargin: "0px 0px -30% 0px" } // counts as "reached" in the top 70% of the screen
    );
    items.forEach((item) => observer.observe(item));
    return () => observer.disconnect();
  }, []);

  return (
    <ol ref={listRef} className="flex flex-col gap-3 text-lg">
      {steps.map((step, i) => {
        const on = i < lit;
        return (
          <li
            key={step}
            className={`border-l-2 pl-4 motion-safe:transition-all motion-safe:duration-700 ${
              on ? "border-brand text-ink opacity-100 translate-x-0" : "border-line text-subtle opacity-30 -translate-x-3"
            }`}
          >
            {step}
          </li>
        );
      })}
    </ol>
  );
};
