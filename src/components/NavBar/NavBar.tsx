"use client";
import React from "react";
import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { ArrowDownToLine, House, Briefcase } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const LAB_URL = "https://github.com/liliaem/soc-home-lab";

//TODO: Update NavBar component
const NavBar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: Event) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    };

    if (isMenuOpen) {
      document.addEventListener("click", handleClickOutside);
      document.addEventListener("touchstart", handleClickOutside);
    }

    return () => {
      document.removeEventListener("click", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
    };
  }, [isMenuOpen]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };
  return (
    <div className="fixed flex justify-center mx-auto w-full inset-x-0 z-20 px-2.5 md:px-2">
      <nav
        id="navbar"
        className="w-full max-w-340 p-4 flex flex-wrap shadow-sm shadow-primary-dark-foreground backdrop-blur-xs z-50 bg-accent dark:bg-secondary-dark text-primary-dark dark:text-primary-dark-foreground rounded-full mt-4 min-h-16"
      >
        {/* Large Screen*/}
        <div className="hidden grow lg:flex lg:items-center lg:w-auto space-x-4">
          <div>
            <a
              href="/files/cv.pdf"
              download="resumee.pdf"
              className="inline-block text-md px-4 py-2 leading-none border dark:border-black hover:dark:bg-black rounded hover:border-transparent hover:bg-white hover:text-black hover:dark:text-secondary-dark mt-4 lg:mt-0 transition-colors duration-300"
              aria-label="Download My Resumee"
            >
              <ArrowDownToLine
                className="inline-block mr-1"
                aria-hidden="true"
              />
              My Resume
            </a>
          </div>
          <div className="text-md space-x-3">
            <Tooltip>
              <TooltipTrigger>
                <a
                  href={LAB_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="See My Lab Reports on GitHub"
                >
                  <Briefcase className="inline-block hover:bg-gray-100/75 hover:dark:bg-black hover:text-black hover:dark:text-secondary-dark rounded-full py-0 p-1 w-10 h-10 transition-colors duration-300" />
                </a>
              </TooltipTrigger>
              <TooltipContent className="dark:text-white">
                <p>My Work</p>
              </TooltipContent>
            </Tooltip>
          </div>
        </div>

        {/* Small screens */}
        <div className="block lg:hidden" ref={menuRef}>
          <button
            onClick={toggleMenu}
            className="flex items-center px-3 py-2 mt-2 border dark:border-black hover:dark:bg-black rounded hover:border-transparent hover:bg-white hover:text-black hover:dark:text-secondary-dark lg:mt-0 transition-colors duration-300"
            aria-label="Toggle menu"
          >
            <svg
              className="fill-current h-3 w-3"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <title>Menu</title>
              <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
            </svg>
          </button>
          {/* Dropdown menu */}
          <div
            className={`bg-accent dark:bg-secondary-dark absolute left-0 top-full mt-0.5 shadow-xl rounded-lg py-2 px-4 w-44 ml-0.5 z-50 border border-secondary dark:shadow-xl dark:border-0 transition-all duration-300 ${
              isMenuOpen
                ? "block opacity-100 translate-y-0"
                : "hidden opacity-0 -translate-y-2"
            }`}
          >
            <a
              href={LAB_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="block px-1 text-sm py-2 text-primary-foreground dark:text-primary-dark-foreground hover:bg-gray-100/95 hover:text-black hover:dark:text-secondary-dark hover:dark:bg-black rounded transition-colors duration-300"
              onClick={closeMenu}
              aria-label="See My Lab Reports on GitHub"
            >
              My Work
            </a>
            <div className="border-t border-primary my-2"></div>
            <a
              href="/files/cv.pdf"
              download="resumee.pdf"
              className="inline-block text-sm px-2 py-2 leading-none border dark:border-black hover:dark:bg-black rounded hover:border-transparent hover:bg-white hover:text-black hover:dark:text-secondary-dark transition-colors duration-300"
              onClick={closeMenu}
              aria-label="Download My Resumee"
            >
              My Resume{" "}
              <ArrowDownToLine
                className="inline-block mr-1"
                aria-hidden="true"
              />
            </a>
          </div>
        </div>
        {/* Home link */}
        <div className="flex items-center grow justify-end mr-1">
          {/* <Tooltip>
            <TooltipTrigger>
              <Link href="/contact" className="block lg:inline-block lg:mt-0 font-bold text-primary-foreground dark:text-primary-dark-foreground">
                <CircleUser className="inline-block hover:bg-gray-100/75 hover:text-black hover:dark:text-secondary-dark hover:dark:bg-black rounded-full py-0 p-1 w-10 h-10 transition-colors duration-300" aria-label="Go to Contact"/>
              </Link>
            </TooltipTrigger>
            <TooltipContent className='dark:text-white'>
              <p>Let&apos;s Connect</p>
            </TooltipContent>
          </Tooltip> */}
          <Tooltip>
            <TooltipTrigger>
              <Link href="/" aria-label="Go to Home">
                <House className="inline-block hover:bg-gray-100/75 hover:text-black hover:dark:text-secondary-dark hover:dark:bg-black rounded-full py-0 p-1 w-10 h-10 transition-colors duration-300" />
              </Link>
            </TooltipTrigger>
            <TooltipContent className="dark:text-white">
              <p>Home</p>
            </TooltipContent>
          </Tooltip>
        </div>
      </nav>
    </div>
  );
};

export default NavBar;
