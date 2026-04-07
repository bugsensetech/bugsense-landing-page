import { Section } from "@/components/ui/section";
import { Droplets, Thermometer, Smartphone, FileText } from "lucide-react";

const steps = [
  {
    num: "01",
    icon: Droplets,
    time: "0 min",
    title: "Apply urine sample",
    desc: "Direct application to paper cassette. No sample prep. No centrifuge. No lab equipment.",
  },
  {
    num: "02",
    icon: Thermometer,
    time: "2 min",
    title: "Insert into incubator",
    desc: "Compact mini-incubator maintains 37\u00B0C automatically. Fully hands-free. Fits on any desk.",
  },
  {
    num: "03",
    icon: Smartphone,
    time: "4\u201312 h",
    title: "Wait, then scan",
    desc: "After 4\u201312 hours of incubation, scan the cassette with the BugSense app. AI-supported kinetics read colorimetric growth signals and generate the result.",
  },
  {
    num: "04",
    icon: FileText,
    time: "Done",
    title: "Receive clinical report",
    desc: "Infection status, pathogen ID, bacterial load, resistance profile (EUCAST S/I/R). Exportable.",
  },
];

export function HowItWorks() {
  return (
    <Section id="how-it-works" className="py-24 lg:py-32 bg-off border-t border-p-100/40">
      <div className="max-w-2xl mb-16">
        <span className="text-xs font-bold tracking-[0.12em] uppercase text-p-600 mb-4 block">
          How it works
        </span>
        <h2 className="text-4xl sm:text-5xl font-extrabold text-p-900 tracking-tight leading-tight mb-5">
          Point. Shoot. Diagnose.
        </h2>
        <p className="text-base text-muted-custom leading-relaxed">
          No lab, no sample preparation, no specialist required. A clinic nurse
          can run BugSense. A smartphone reads it. Results arrive while the
          patient is still reachable.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-p-100/60">
        {steps.map((step) => {
          const Icon = step.icon;
          return (
            <div key={step.num} className="bg-off p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-p-600 text-white flex items-center justify-center">
                  <Icon className="size-4.5" strokeWidth={2} />
                </div>
                <div>
                  <span className="text-[11px] font-bold text-p-600 tracking-wider uppercase block">
                    Step {step.num}
                  </span>
                  <span className="text-xs font-bold text-muted-custom/50 tracking-wider uppercase">
                    {step.time}
                  </span>
                </div>
              </div>
              <h3 className="text-base font-bold text-p-900 mb-2">
                {step.title}
              </h3>
              <p className="text-sm text-muted-custom leading-relaxed">
                {step.desc}
              </p>
            </div>
          );
        })}
      </div>
    </Section>
  );
}
