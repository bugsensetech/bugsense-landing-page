import Image from "next/image";
import { Section } from "@/components/ui/section";
import { ExternalLink } from "lucide-react";

const primaryMetrics = [
  {
    value: "100",
    unit: "%",
    label: "Sensitivity for infection detection",
    sublabel: "Primary endpoint",
    highlight: true,
  },
  {
    value: "94",
    unit: "%",
    label: "Specificity for infection detection",
    sublabel: "Primary endpoint",
  },
  {
    value: "142",
    unit: "",
    label: "Clinical samples across validation study",
    sublabel: "Sample size",
  },
];

const secondaryMetrics = [
  {
    value: "85.6",
    unit: "%",
    label: "Sensitivity for pathogen species ID",
    sublabel: "Secondary endpoint",
  },
  {
    value: "95",
    unit: "%",
    label: "Specificity for pathogen species ID",
    sublabel: "Secondary endpoint",
  },
  {
    value: "Int'l",
    unit: "",
    label: "Patent granted for core technology",
    sublabel: "IP protected",
  },
];

export function Validation() {
  return (
    <Section id="evidence" className="bg-p-900 py-24 lg:py-32">
      <div className="max-w-2xl mb-14">
        <span className="text-xs font-bold tracking-[0.12em] uppercase text-t-400 mb-4 block">
          Peer-reviewed evidence
        </span>
        <h2 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight">
          Clinically validated.
          <br />
          Independently published.
        </h2>
      </div>

      {/* Primary metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-px bg-white/[0.06] mb-px">
        {primaryMetrics.map((m) => (
          <div
            key={m.label}
            className={`p-7 text-center ${
              m.highlight ? "bg-t-400/8" : "bg-p-900"
            }`}
          >
            <div
              className={`text-5xl sm:text-6xl font-extrabold tracking-tighter leading-none ${
                m.highlight ? "text-t-300" : "text-white"
              }`}
            >
              {m.value}
              {m.unit && (
                <span className="text-2xl font-bold">{m.unit}</span>
              )}
            </div>
            <p className="text-sm text-white/45 mt-3 leading-relaxed">
              {m.label}
            </p>
            <span className="text-[11px] text-white/20 mt-1 uppercase tracking-wider font-bold block">
              {m.sublabel}
            </span>
          </div>
        ))}
      </div>

      {/* Secondary metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-px bg-white/[0.06] mb-8">
        {secondaryMetrics.map((m) => (
          <div key={m.label} className="bg-p-900 p-7 text-center">
            <div className="text-4xl font-extrabold text-white tracking-tighter leading-none">
              {m.value}
              {m.unit && (
                <span className="text-lg font-bold">{m.unit}</span>
              )}
            </div>
            <p className="text-sm text-white/45 mt-3 leading-relaxed">
              {m.label}
            </p>
            <span className="text-[11px] text-white/20 mt-1 uppercase tracking-wider font-bold block">
              {m.sublabel}
            </span>
          </div>
        ))}
      </div>

      {/* Citation */}
      <div className="border border-white/[0.06] p-6 flex flex-col sm:flex-row gap-6">
        <Image
          src="/logos/microbiology-spectrum-white.svg"
          alt="American Society for Microbiology"
          width={180}
          height={85}
          className="shrink-0 opacity-70"
          style={{ width: 180, height: "auto" }}
        />
        <div className="hidden sm:block w-px bg-white/[0.06] shrink-0" />
        <div>
          <p className="text-sm text-white/45 leading-relaxed">
            Rapid direct disk diffusion testing for antibiotic resistance in
            urinary tract infections: a bacterial concentration-adjusted approach.
            <br />
            <strong className="text-white/70">
              American Society for Microbiology (ASM), 2025.
            </strong>
          </p>
          <a
            href="mailto:contact@bugsensedx.com?subject=Paper Request"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-t-400 mt-2.5 hover:text-t-300 transition-colors uppercase tracking-wider"
          >
            Request the paper
            <ExternalLink className="size-3.5" />
          </a>
        </div>
      </div>
    </Section>
  );
}
