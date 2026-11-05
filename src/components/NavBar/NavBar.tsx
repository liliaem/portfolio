import React from "react";
import Link from "next/link";

const LAB_URL = "https://github.com/liliaem/soc-home-lab";

const linkClass =
  "underline-offset-4 decoration-1 hover:underline hover:text-brand transition-colors";

const NavBar = () => {
  return (
    <header className="border-b border-line">
      <nav
        aria-label="Main"
        className="mx-auto max-w-5xl px-4 sm:px-6 h-16 flex items-center justify-between gap-4 text-ink"
      >
        <Link href="/" className="font-semibold tracking-tight text-lg hover:text-brand transition-colors">
          Lilia Martínez
        </Link>
        <div className="flex items-center gap-5 sm:gap-7 text-[0.95rem]">
          <a href={LAB_URL} target="_blank" rel="noopener noreferrer" className={linkClass}>
            Lab reports
          </a>
          <a href="/files/cv.pdf" download="Lilia-Martinez-Resume.pdf" className={linkClass}>
            Resume
          </a>
        </div>
      </nav>
    </header>
  );
};

export default NavBar;
