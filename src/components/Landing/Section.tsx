import React from "react";

interface SectionProps {
  title: string;
  id?: string;
  children: React.ReactNode;
}

// A row with the heading on the left and the content on the right (stacked on mobile)
export const Section = ({ title, id, children }: SectionProps) => {
  return (
    <section id={id} className="border-t border-line">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 py-12 md:py-16 grid gap-4 md:gap-10 md:grid-cols-[11rem_1fr]">
        <h2 className="text-xl font-semibold tracking-tight">{title}</h2>
        <div className="min-w-0">{children}</div>
      </div>
    </section>
  );
};
