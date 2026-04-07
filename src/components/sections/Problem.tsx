import { Section } from "@/components/ui/section";

const stats = [
  {
    value: "4",
    suffix: " days",
    desc: "Average wait for a laboratory culture result — if the sample even arrives on time",
    source: "Robert Koch Institut · ECDC",
  },
  {
    prefix: "~",
    value: "50%",
    desc: "Of UTI prescriptions use the wrong antibiotic due to empirical treatment without culture data",
    source: "ESCMID Guidelines, 2022",
  },
  {
    value: "€3,500",
    desc: "Extra cost per complicated hospital UTI case caused by treatment failure and extended stay",
    source: "InEK DRG cost analysis",
  },
];

export function Problem() {
  return (
    <Section id="problem" className="py-24 lg:py-32">
      <div className="max-w-2xl mb-14">
        <span className="text-xs font-bold tracking-[0.12em] uppercase text-c-600 mb-4 block">
          The problem
        </span>
        <h2 className="text-4xl sm:text-5xl font-extrabold text-p-900 tracking-tight leading-tight mb-5">
          Doctors are guessing.
          <br />
          Patients pay the price.
        </h2>
        <p className="text-base text-muted-custom leading-relaxed">
          Culture-based diagnostics take 2–4 days. By then, the prescription is
          already written — and up to half the time, it&apos;s wrong. The result:
          failed treatments, more resistant bacteria, and avoidable healthcare costs.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-p-800/50">
        {stats.map((stat) => (
          <div key={stat.value} className="bg-p-900 p-8">
            <div className="text-4xl sm:text-5xl font-extrabold text-white tracking-tighter leading-none mb-3">
              {stat.prefix}{stat.value}{stat.suffix}
            </div>
            <p className="text-[15px] text-white/60 leading-relaxed mb-4">
              {stat.desc}
            </p>
            <span className="text-[11px] text-white/30 font-bold tracking-wider uppercase">
              {stat.source}
            </span>
          </div>
        ))}
      </div>

      <div className="border-l-2 border-l-p-600 bg-p-50/40 px-6 py-5 max-w-2xl mt-10">
        <p className="text-[15px] text-p-800 leading-relaxed font-medium">
          The technology to do better has always existed — it was just locked
          inside a central laboratory. BugSense moves it to the point of care.
        </p>
      </div>
    </Section>
  );
}
