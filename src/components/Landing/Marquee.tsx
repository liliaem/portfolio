import React from "react";

interface MarqueeProps {
  children: React.ReactNode;
  reverse?: boolean;
  seconds?: number;
  className?: string;
  label: string;
}

// Endless horizontal ticker. The content is rendered twice so the loop is seamless;
// the copy is hidden from screen readers so it is only announced once.
export const Marquee = ({ children, reverse, seconds = 40, className = "", label }: MarqueeProps) => {
  return (
    <div className={`marquee overflow-hidden ${className}`} aria-label={label} role="region">
      <div
        className="marquee-track flex w-max"
        data-reverse={reverse ? "" : undefined}
        style={{ "--marquee-duration": `${seconds}s` } as React.CSSProperties}
      >
        <div className="flex shrink-0 items-center">{children}</div>
        <div className="flex shrink-0 items-center" aria-hidden="true">
          {children}
        </div>
      </div>
    </div>
  );
};
