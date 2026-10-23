import { PolaroidPhoto } from "@/components/Landing/PolaroidPhoto";
import { SectionWrapper } from "@/components/Landing/SectionWrapper";

const HeroText = {
  title: `NOC/SOC 1 | Cybersecurity | Biomedical Engineer`,
  whoAmI: `Biomedical engineer moving into IT and cybersecurity operations. I troubleshot surgical equipment during live spine and neurosurgical procedures, spent two years repairing electronics down to the component level, formatting computers and installing firewalls, and almost three years running my own rental business, where I turned recurring guest issues into clear written procedures. Now I bring that same calm, methodical, pattern-focused approach to security monitoring and IT operations.`,
  whatIDo: `I run a hands-on home lab: I simulated an SSH brute-force attack with Hydra, triaged the alerts in Wazuh SIEM, and investigated the same logs in Splunk Cloud using SPL. I’ve also done network reconnaissance with Nmap and network segmentation design. Currently completing Fortinet NSE 1.`,
  myApproach: `Identify, confirm, fix, test. I document each step so it can be replicated and analyzed.`,
  myValues: `Clear communication in English and Spanish, honest reporting, and staying calm under pressure.`,
  callToAction: `See my lab reports on GitHub: `,
  labUrl: `https://github.com/liliaem/soc-home-lab`,
};
export default function Home() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <SectionWrapper className="relative bg-amber-100 dark:bg-amber-900 -mt-26 pt-30 text-gray-900 dark:text-gray-100 min-h-dvh">
        <div className="flex flex-col px-2 sm:px-4 pb-4">
          <div className="relative grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-0">
            <div className="grid grid-cols-1 gap-2">
              <h1 className="text-2xl sm:text-3xl md:text-6xl font-bold mb-4 text-balance">
                {HeroText.title}
              </h1>
              <div className="md:hidden pb-2">
                <PolaroidPhoto />
              </div>
              <p className="text-lg sm:text-xl md:text-2xl">
                {HeroText.whoAmI}
              </p>
              <p className="text-lg sm:text-xl md:text-2xl">
                {HeroText.whatIDo}
              </p>
              <p className="text-lg sm:text-xl md:text-2xl mb-2">
                {HeroText.myValues}
              </p>
              <p className="text-base sm:text-lg md:text-xl font-bold border-l-4 pl-3 sm:pl-4 border-red-600 dark:border-gray-200 pb-2 text-amber-900 dark:text-amber-200">
                {HeroText.callToAction}
                <a
                  href={HeroText.labUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block underline underline-offset-4 break-all hover:text-red-600 dark:hover:text-white transition-colors duration-300"
                >
                  github.com/liliaem/soc-home-lab
                </a>
              </p>
            </div>
            <div className="relative md:justify-end mt-8 hidden md:flex md:scale-100">
              <PolaroidPhoto />
            </div>
          </div>
        </div>
      </SectionWrapper>
      <SectionWrapper className="p-2 pb-8 bg-amber-100 dark:bg-amber-900">
        {/* My Approach section */}
        <div className="max-w-184 text-wrap mx-auto hover:-skew-y-1 from-amber-300 to-amber-500 bg-linear-to-br text-shadow-lg p-5 sm:p-8 rounded-lg flex-justify-center shadow-xl/30 inset-shadow-amber-800/50">
          <p className="text-lg md:text-xl font-bold">{HeroText.myApproach}</p>
        </div>
      </SectionWrapper>
    </div>
  );
}
