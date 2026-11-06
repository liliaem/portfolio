import { PolaroidPhoto } from "@/components/Landing/PolaroidPhoto";
import { Section } from "@/components/Landing/Section";
import { HomeLabSteps } from "@/components/Landing/HomeLabSteps";
import { Certifications } from "@/components/Landing/Certifications";
import { IpChecker } from "@/components/Landing/IpChecker";
import { Marquee } from "@/components/Landing/Marquee";
import { IntroCurtain } from "@/components/Landing/IntroCurtain";
import { ContactSection } from "@/components/Landing/ContactSection";

const LAB_URL = "https://github.com/liliaem/soc-home-lab";

const HeroText = {
  name: "Lilia Martínez",
  title: "Technical support, security operations, and biomedical engineering",
  whoAmI: `Engineer driven by curiosity, with a habit of tracing every problem back to its root cause. I investigate issues, isolate the cause, and document the fix so it doesn't happen again. I practice that in my own home lab with Wazuh and Splunk, and years of customer-facing work have made me a patient, clear communicator. Bilingual English/Spanish.`,
};

const homeLab = [
  "Simulated an SSH brute-force attack with Hydra",
  "Triaged the resulting alerts in Wazuh SIEM",
  "Investigated the same logs in Splunk Cloud and Enterprise using SPL",
  "Network reconnaissance with Nmap and network segmentation design",
];

const tools = [
  "Wazuh SIEM",
  "Splunk Cloud",
  "SPL",
  "Hydra",
  "Nmap",
  "Network segmentation",
  "Fortinet NSE 1",
  "AbuseIPDB API",
  "REST APIs",
  "PostgreSQL",
];

const approach = `Identify, confirm, fix, test. I document each step so it can be replicated and analyzed.`;
const values = `Clear communication in English and Spanish, honest reporting, and staying calm under pressure.`;

export default function Home() {
  return (
    <>
      <IntroCurtain />

      {/* Hero */}
      <section className="mx-auto max-w-5xl px-4 sm:px-6 pt-12 pb-16 md:pt-20 md:pb-24 grid gap-12 md:grid-cols-[1fr_auto] md:items-center">
        <div className="flex flex-col gap-6 max-w-[38rem]">
          <div className="flex flex-col gap-3">
            <h1 className="text-5xl sm:text-6xl md:text-7xl font-semibold tracking-[-0.035em] leading-[0.95]">
              {HeroText.name}
            </h1>
            <p className="text-lg sm:text-xl text-brand font-medium">
              {HeroText.title}
            </p>
          </div>
          <p className="text-lg leading-relaxed text-subtle">
            {HeroText.whoAmI}
          </p>
          <div className="flex flex-wrap items-center gap-x-6 gap-y-3 pt-2">
            <a
              href="/files/cv.pdf"
              download="Lilia-Martinez-Resume.pdf"
              className="rounded-md bg-brand-fill text-brand-contrast px-5 py-2.5 font-medium hover:opacity-90 transition-opacity"
            >
              Download resume
            </a>
            <a
              href={LAB_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium underline underline-offset-4 decoration-1 hover:text-brand transition-colors"
            >
              Lab reports on GitHub
            </a>
          </div>
        </div>
        <PolaroidPhoto />
      </section>

      {/* Tools ticker */}
      <div className="bg-surface py-5">
        <Marquee label="Tools I use" seconds={35}>
          {tools.map((tool) => (
            <span
              key={tool}
              className="flex items-center gap-8 pr-8 text-2xl sm:text-3xl font-medium tracking-tight whitespace-nowrap"
            >
              {tool}
              <span
                className="size-2 rounded-full bg-brand"
                aria-hidden="true"
              />
            </span>
          ))}
        </Marquee>
      </div>

      <Section title="Home lab">
        <HomeLabSteps steps={homeLab} />
        <a
          href={LAB_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block mt-6 text-subtle underline underline-offset-4 decoration-1 hover:text-brand"
        >
          Read the full lab reports on GitHub
        </a>
      </Section>

      <Section title="How I work">
        <p className="text-2xl sm:text-3xl font-medium tracking-tight leading-snug max-w-[34rem]">
          {approach}
        </p>
        <p className="mt-4 text-lg text-subtle max-w-[38rem]">{values}</p>
      </Section>

      <Section title="Certifications">
        <Certifications />
      </Section>

      <Section title="IP reputation checker" id="ip-checker">
        <IpChecker />
      </Section>

      <ContactSection />
    </>
  );
}
