import { Section } from "@/components/ui/section";
import { CheckCircle2 } from "lucide-react";

const credentials = [
  "Peer-reviewed publication — Microbiology Spectrum (ASM, 2025)",
  "International patent granted for core diagnostic technology",
  "Clinical partner: MRI Munich · Klinikum rechts der Isar",
  "GO-Bio funded · m\u2074 Award winner 2023 · Bavarian Ministry grant",
  "IVD regulatory pathway (CE-IVD) in progress",
];

const milestones = [
  {
    year: "2021",
    text: "Core technology developed at TUM. First paper-based prototype validated under laboratory conditions.",
  },
  {
    year: "2022",
    text: "Clinical partnership with MRI Munich. First patient samples tested in clinical setting.",
  },
  {
    year: "2023",
    text: "m\u2074 Award. GO-Bio grant (BMBF). International patent filed. Bavarian Ministry sponsorship.",
  },
  {
    year: "2024",
    text: "n=142 clinical validation completed. TUM Venture Labs cohort. Company formation initiated.",
  },
  {
    year: "2025",
    text: "Published in Microbiology Spectrum (ASM). IVD regulatory pathway started. Pilot programmes launching.",
  },
];

export function About() {
  return (
    <Section
      id="about"
      className="py-24 lg:py-32 bg-white border-t border-p-100/40"
      innerClassName="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start"
    >
      <div>
        <span className="text-xs font-bold tracking-[0.12em] uppercase text-p-600 mb-4 block">
          About BugSense
        </span>
        <h2 className="text-4xl sm:text-5xl font-extrabold text-p-900 tracking-tight leading-tight mb-6">
          The technology works.
          <br />
          Now we build the company.
        </h2>

        <div className="space-y-4 text-[15px] text-muted-custom leading-relaxed mb-8">
          <p>
            BugSense was founded to solve a problem that has persisted for
            decades: doctors treating UTIs cannot access microbiological culture
            data at the point where the prescribing decision is made.
          </p>
          <p>
            We built a paper-based platform that replicates the essential steps
            of clinical microbiology — filtration, incubation, colorimetric
            detection, and antibiotic susceptibility testing — without a
            laboratory. Born from research at{" "}
            <strong className="text-p-900 font-semibold">
              Technical University Munich
            </strong>
            , validated with clinical partners at{" "}
            <strong className="text-p-900 font-semibold">
              MRI Munich (Klinikum rechts der Isar)
            </strong>
            .
          </p>
        </div>

        <div className="space-y-2.5">
          {credentials.map((cred) => (
            <div key={cred} className="flex items-start gap-2.5">
              <CheckCircle2 className="size-4 text-p-600 shrink-0 mt-0.5" />
              <span className="text-[15px] text-p-800 font-medium leading-relaxed">
                {cred}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-p-50 border border-p-100/50 p-7">
        <h3 className="text-xs font-bold uppercase tracking-[0.1em] text-p-600 mb-8">
          Company milestones
        </h3>
        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-[19px] top-1 bottom-1 w-px bg-p-200/60" />

          <div className="space-y-7">
            {milestones.map((m, i) => (
              <div key={m.year} className="flex gap-5 relative">
                {/* Dot */}
                <div className="relative shrink-0 w-[39px] flex justify-center pt-1.5">
                  <div
                    className={`size-3 rounded-full z-10 ${
                      i === milestones.length - 1
                        ? "bg-p-600"
                        : "bg-p-300"
                    }`}
                  />
                </div>
                <div>
                  <span
                    className={`text-[15px] font-extrabold tabular-nums block mb-1.5 ${
                      i === milestones.length - 1
                        ? "text-p-600"
                        : "text-p-800"
                    }`}
                  >
                    {m.year}
                  </span>
                  <p className="text-[15px] text-p-800/60 leading-relaxed">
                    {m.text}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
}
