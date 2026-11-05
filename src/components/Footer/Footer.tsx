import React from "react";
import { ThemeToggle } from "@/components/Theme/ThemeToggle";

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-line text-subtle">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 py-8 flex flex-col sm:flex-row gap-6 sm:items-center justify-between text-sm">
        <div className="flex flex-col gap-1">
          <span>&copy; {year} Lilia E. Martínez Rosas</span>
          <a
            href="mailto:liliaelba123@gmail.com"
            className="text-ink underline underline-offset-4 decoration-1 hover:text-brand w-fit"
          >
            liliaelba123@gmail.com
          </a>
          <a href="https://maps.app.goo.gl/XBZXYD3tpukcz5yd7" className="hover:text-brand w-fit">
            Orizaba, Veracruz, Mexico
          </a>
        </div>
        <ThemeToggle />
      </div>
    </footer>
  );
};
export default Footer;
