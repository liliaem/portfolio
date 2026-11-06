"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";

// Scroll effect: the photo drifts down a little slower than the page and
// straightens from its tilt as you scroll. Skipped when "Reduce motion" is on.
// Hover (computers) or tap (phones) flips it to show a note on the back.
const MAX_DRIFT = 40; // px
const START_TILT = 6; // degrees

export const PolaroidPhoto = () => {
  const frameRef = useRef<HTMLDivElement>(null);
  const [flipped, setFlipped] = useState(false);

  useEffect(() => {
    const frame = frameRef.current;
    if (!frame) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let ticking = false;
    const update = () => {
      ticking = false;
      const progress = Math.min(window.scrollY / 400, 1); // 0 at the top, 1 after 400px
      frame.style.transform = `translateY(${progress * MAX_DRIFT}px) rotate(${START_TILT * (1 - progress)}deg)`;
    };
    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(update);
      }
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // On touch screens there is no hover, so a tap flips the photo instead
  const onTap = () => {
    if (!window.matchMedia("(hover: hover)").matches) setFlipped((f) => !f);
  };

  return (
    <figure className="relative w-full max-w-72 mx-auto md:mx-0">
      <div
        ref={frameRef}
        className="will-change-transform"
        style={{ transform: `rotate(${START_TILT}deg)` }}
      >
        <button
          type="button"
          onClick={onTap}
          aria-label="Flip the photo"
          data-flipped={flipped}
          className="polaroid block w-full text-left [perspective:1200px] cursor-pointer"
        >
          <div className="polaroid-inner relative">
            {/* Front */}
            <div className="polaroid-face relative bg-white p-3 pb-2 shadow-[0_12px_30px_-12px_rgba(27,19,43,0.45)]">
              <Image
                alt=""
                src="/pressets/kraftTape.png"
                width="22"
                height="65"
                className="w-[22px] h-[65px] object-cover rounded-sm absolute -right-1 -top-5 -rotate-40 z-2"
              />
              <div className="aspect-2/3 relative overflow-hidden">
                <Image
                  alt="Lilia Martínez with her arms raised on a mountain trail"
                  src="/pressets/me.jpg"
                  fill
                  priority
                  sizes="(max-width: 768px) 80vw, 288px"
                  className="object-cover"
                />
              </div>
              <span className="block font-photoText text-night text-lg pt-2 px-1">
                Lilia Elba Martínez Rosas
              </span>
            </div>

            {/* Back */}
            <div
              aria-hidden="true"
              className="polaroid-face polaroid-back absolute inset-0 bg-[#fbf7f1] p-6 flex flex-col justify-center gap-4 font-photoText text-night shadow-[0_12px_30px_-12px_rgba(27,19,43,0.45)]"
            >
              <p className="text-2xl leading-snug">
                One of my hobbies is taking things apart to see how they work.
              </p>
              <p className="signature w-fit text-2xl text-[#7c5051]">— Lili</p>
            </div>
          </div>
        </button>
      </div>
    </figure>
  );
};
