import React from "react";
import { ThemeToggle } from "@/components/Theme/ThemeToggle";
import Link from "next/link";
//TODO: Update Footer component
const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="relative border-t bg-gray-900 dark:bg-gray-800 border-zinc-100 dark:border-zinc-800 px-4 py-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 items-start justify-between w-full max-w-440 mx-auto">
        {/* Columna izquierda */}
        <div className="text-sm text-secondary-dark dark:text-secondary">
          &copy; {year}{" "}
          <span className="font-medium">Lilia E. Martinez Rosas</span>
          <p>
            <Link
              href="mailto:liliaelba123@gmail.com"
              className="hover:text-white transition-colors"
              aria-label="Send Email to liliaelba123@gmail.com"
            >
              liliaelba123@gmail.com
            </Link>
          </p>
          <p>
            <Link
              href="https://maps.app.goo.gl/XBZXYD3tpukcz5yd7"
              aria-label="Location"
            >
              Orizaba Veracruz, Mexico
            </Link>
          </p>
        </div>

        {/* Columna derecha */}
        <div className="flex flex-col items-end space-y-2">
          <ThemeToggle />
        </div>
      </div>
    </footer>
  );
};
export default Footer;
