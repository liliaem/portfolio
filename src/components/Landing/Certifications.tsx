import React from "react";
import Image from "next/image";
import { ExternalLink } from "lucide-react";

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
    <ul className="flex flex-col gap-8">
      {certifications.map((cert) => (
        <li key={cert.name} className="flex flex-col sm:flex-row gap-5 sm:gap-6">
          <a
            href={cert.verifyUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Verify ${cert.name} on Credly`}
            className="shrink-0 w-fit"
          >
            <Image
              alt={`${cert.issuer} ${cert.name} badge`}
              src={cert.badge}
              width="112"
              height="112"
              className="w-24 h-24 sm:w-28 sm:h-28"
            />
          </a>
          <div className="flex flex-col gap-2 max-w-[38rem]">
            <h3 className="text-lg font-semibold">
              {cert.name} <span className="font-normal text-subtle">by {cert.issuer}</span>
            </h3>
            <p className="text-subtle">{cert.description}</p>
            <a
              href={cert.verifyUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 w-fit font-medium underline underline-offset-4 decoration-1 hover:text-brand"
            >
              Verify on Credly
              <ExternalLink className="w-4 h-4" aria-hidden="true" />
            </a>
          </div>
        </li>
      ))}
    </ul>
  );
};
