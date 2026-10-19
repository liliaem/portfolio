import { PolaroidPhoto } from "@/components/Landing/PolaroidPhoto";
import { SectionWrapper } from "@/components/Landing/SectionWrapper";

const HeroText = {
  title: `Junior SOC Analyst | Cybersecurity | Biomedical Engineer`,
  whoAmI: `Biomedical engineer moving into cybersecurity. I spent years troubleshooting critical equipment in real time, including during live neurosurgical procedures. Now I bring that same calm, methodical approach to security monitoring and network defense.`,
  whatIDo: `I run a hands-on home lab: alert triage with Wazuh SIEM, network reconnaissance with Nmap, and network segmentation design. Currently completing Fortinet NSE 1.`,
  myApproach: `Find, fix, verify. I document every step so the next analyst can follow it.`,
  myValues: `Clear communication in English and Spanish, honest reporting, and staying calm under pressure.`,
  callToAction: `See my lab reports on GitHub: `,
  labUrl: `https://github.com/liliaem/soc-home-lab`,
};
export default function Home() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <SectionWrapper className="relative bg-amber-100 dark:bg-amber-900 -mt-26 pt-30 text-gray-900 dark:text-gray-100 h-dvh">
        <div className="flex flex-col px-4 pb-4">
          <div className="relative grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-0">
            <div className="grid grid-cols-1 gap-2">
              <h1 className="text-3xl md:text-6xl font-bold mb-4">
                {HeroText.title}
              </h1>
              <div className="md:hidden pb-2">
                <PolaroidPhoto />
              </div>
              <p className="text-xl md:text-2xl">{HeroText.whoAmI}</p>
              <p className="text-xl md:text-2xl">{HeroText.whatIDo}</p>
              <p className="text-xl md:text-2xl mb-2">{HeroText.myValues}</p>
              <p className="text-lg md:text-xl font-bold border-l-4 pl-4 border-red-600 dark:border-gray-200 pb-2 text-amber-900 dark:text-amber-200">
                {HeroText.callToAction}
                <a
                  href={HeroText.labUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline underline-offset-4 hover:text-red-600 dark:hover:text-white transition-colors duration-300"
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
        <div className="max-w-184 text-wrap mx-auto hover:-skew-y-1 from-amber-300 to-amber-500 bg-linear-to-br text-shadow-lg p-8 rounded-lg flex-justify-center shadow-xl/30 inset-shadow-amber-800/50">
          <p className="text-lg md:text-xl font-bold">{HeroText.myApproach}</p>
        </div>
      </SectionWrapper>
    </div>
  );
}
