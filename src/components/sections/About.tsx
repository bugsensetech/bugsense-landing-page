import { Section } from "@/components/ui/section";

const milestones = [
  { year: "2021", text: "Technology developed at TUM" },
  { year: "2022", text: "First clinical samples tested" },
  { year: "2023", text: "GO-Bio funded · m⁴ Award · Patent filed" },
  { year: "2024", text: "n=142 clinical validation completed" },
  { year: "2025", text: "Published in ASM · Pilots launching" },
];

export function About() {
  return (
    <Section
      id="about"
      className="py-24 lg:py-32 bg-white border-t border-p-100/40"
    >
      <div className="max-w-2xl mb-14">
        <span className="text-xs font-bold tracking-[0.12em] uppercase text-p-600 mb-4 block">
          About BugSense
        </span>
        <h2 className="text-4xl sm:text-5xl font-extrabold text-p-900 tracking-tight leading-tight mb-6">
          The technology works.
          <br />
          Now we build the company.
        </h2>
        <div className="space-y-4 text-base text-muted-custom leading-relaxed">
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
      </div>

      {/* Timeline — vertical on mobile, horizontal on sm+ */}

      {/* Mobile: vertical */}
      <div className="relative sm:hidden">
        <div className="absolute left-[8px] top-1 bottom-1 w-px bg-p-100" />
        <div className="space-y-5">
          {milestones.map((m, i) => (
            <div key={m.year} className="flex gap-4 relative pl-1">
              <div className="relative shrink-0 flex items-start pt-1.5">
                <div
                  className={`size-[9px] rounded-full z-10 ${
                    i === milestones.length - 1 ? "bg-p-600" : "bg-p-200"
                  }`}
                />
              </div>
              <div>
                <span
                  className={`text-base font-bold tabular-nums block mb-0.5 ${
                    i === milestones.length - 1 ? "text-p-600" : "text-p-800"
                  }`}
                >
                  {m.year}
                </span>
                <p className="text-[15px] text-muted-custom leading-relaxed">
                  {m.text}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Desktop: horizontal */}
      <div className="relative hidden sm:block">
        <div className="absolute top-[5px] left-0 right-0 h-px bg-p-100" />
        <div className="grid grid-cols-5">
          {milestones.map((m, i) => (
            <div key={m.year} className="relative pt-5 pr-6">
              <div
                className={`absolute top-0 left-0 size-[11px] rounded-full ${
                  i === milestones.length - 1 ? "bg-p-600" : "bg-p-200"
                }`}
              />
              <span
                className={`text-sm font-bold tabular-nums block mb-1 ${
                  i === milestones.length - 1 ? "text-p-600" : "text-p-800"
                }`}
              >
                {m.year}
              </span>
              <p className="text-[13px] text-muted-custom leading-relaxed">
                {m.text}
              </p>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}
