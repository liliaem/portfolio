import React from "react";
import Image from "next/image";
import { BadgeCheck, ExternalLink } from "lucide-react";

const certifications = [
  {
    name: "NSE 1 Certified in Cybersecurity",
    issuer: "Fortinet",
    description: `Validates the skills and knowledge required for an entry-level role in cybersecurity, covering today’s threat landscape and the fundamentals of cybersecurity.`,
    badge: "/badges/fortinet-nse1.png",
    verifyUrl:
      "https://www.credly.com/badges/a973b8c5-67dd-4f4c-ba7e-6d4f5334fad8/public_url",
  },
];

export const Certifications = () => {
  return (
    <div className="flex flex-col gap-6 px-2 sm:px-4">
      <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold">
        Certifications
      </h2>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {certifications.map((cert) => (
          <div
            key={cert.name}
            className="flex flex-col sm:flex-row items-center gap-6 bg-white/60 dark:bg-black/25 p-5 sm:p-6 rounded-lg shadow-xl/20"
          >
            {/* Badge */}
            <a
              href={cert.verifyUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Verify ${cert.name} on Credly`}
              className="relative shrink-0 -rotate-3 hover:rotate-0 hover:scale-105 transition-transform duration-300"
            >
              <Image
                alt="Photo Tape"
                src="/pressets/kraftTape.png"
                width="22"
                height="65"
                className="object-cover rounded-sm absolute -left-1 -top-5 rotate-40 z-2"
              />
              <Image
                alt={`${cert.issuer} ${cert.name} badge`}
                src={cert.badge}
                width="160"
                height="160"
                className="w-36 h-36 sm:w-40 sm:h-40 rounded-lg shadow-md"
              />
            </a>

            {/* Details */}
            <div className="flex flex-col gap-2 text-center sm:text-left">
              <span className="inline-flex items-center justify-center sm:justify-start gap-1 text-sm font-bold uppercase tracking-wide text-amber-900 dark:text-amber-200">
                <BadgeCheck className="w-4 h-4" aria-hidden="true" />
                {cert.issuer}
              </span>
              <h3 className="text-xl md:text-2xl font-bold">{cert.name}</h3>
              <p className="text-base md:text-lg">{cert.description}</p>
              <a
                href={cert.verifyUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center sm:justify-start gap-1 font-bold underline underline-offset-4 hover:text-red-600 dark:hover:text-white transition-colors duration-300"
              >
                Verify on Credly
                <ExternalLink className="w-4 h-4" aria-hidden="true" />
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
