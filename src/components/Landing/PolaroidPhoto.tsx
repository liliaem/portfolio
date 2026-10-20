import React from "react";
import Image from "next/image";

export const PolaroidPhoto = () => {
  return (
    <div className="relative w-full max-w-86 mx-auto md:mx-0">
      <div className="relative w-full bg-white shadow-sm shadow-primary-dark-foreground pt-2 gap-2">
        <Image
          alt="Photo Tape"
          src="/pressets/kraftTape.png"
          width="22"
          height="65"
          className="object-cover rounded-sm absolute -right-1 -top-5 -rotate-40 z-2"
        />
        <div className="w-[calc(100%-1.5rem)] aspect-2/3 rounded-sm mx-auto relative overflow-hidden">
          {" "}
          {/* Profile pic*/}
          <Image
            alt="Lilia E. Martínez Rosas"
            src="/pressets/me.jpg"
            fill
            sizes="(max-width: 768px) 90vw, 320px"
            className="object-cover rounded-sm -hue-rotate-15"
          />
        </div>
        <div className="px-4">
          <span className="font-photoText text-black font-bold">
            Lilia Elba Martínez Rosas
          </span>
          <span className="text-sm font-light text-gray-700 block pb-2"> </span>
        </div>
      </div>
    </div>
  );
};
