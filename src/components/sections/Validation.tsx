import Image from "next/image";
import { Section } from "@/components/ui/section";
import { ExternalLink } from "lucide-react";

const supportingMetrics = [
  {
    value: "94",
    unit: "%",
    label: "Specificity (infection detection)",
  },
  {
    value: "85.6",
    unit: "%",
    label: "Sensitivity (pathogen species ID)",
  },
  {
    value: "95",
    unit: "%",
    label: "Specificity (pathogen species ID)",
  },
  {
    value: "142",
    unit: "",
    label: "Clinical samples validated",
  },
  {
    value: "Int'l",
    unit: "",
    label: "Patent granted",
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

      {/* Leading KPI */}
      <div className="bg-t-400/8 border border-t-400/20 p-10 sm:p-14 text-center mb-6">
        <div className="text-7xl sm:text-8xl lg:text-9xl font-extrabold text-t-300 tracking-tighter leading-none">
          100<span className="text-4xl sm:text-5xl font-bold">%</span>
        </div>
        <p className="text-lg sm:text-xl text-white/70 mt-4 font-medium">
          Sensitivity for infection detection
        </p>
        <span className="text-xs text-white/30 mt-2 uppercase tracking-wider font-bold block">
          Primary endpoint · n=142 clinical samples
        </span>
      </div>

      {/* Supporting metrics */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-px bg-white/[0.06] mb-8">
        {supportingMetrics.map((m) => (
          <div key={m.label} className="bg-p-900 p-5 text-center">
            <div className="text-2xl sm:text-3xl font-extrabold text-white/70 tracking-tighter leading-none">
              {m.value}
              {m.unit && (
                <span className="text-sm font-bold">{m.unit}</span>
              )}
            </div>
            <p className="text-xs text-white/35 mt-2 leading-relaxed">
              {m.label}
            </p>
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
