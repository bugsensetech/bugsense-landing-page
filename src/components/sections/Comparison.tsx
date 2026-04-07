import { Section } from "@/components/ui/section";
import { Check, X, Minus } from "lucide-react";

const methods = [
  { key: "bugsense", label: "BugSense", featured: true },
  { key: "dipstick", label: "Dipstick", featured: false },
  { key: "lab", label: "Lab Culture", featured: false },
  { key: "pcr", label: "POC PCR", featured: false },
] as const;

type Status = "yes" | "no" | "partial";

const rows: {
  capability: string;
  bugsense: string | Status;
  dipstick: string | Status;
  lab: string | Status;
  pcr: string | Status;
}[] = [
  {
    capability: "Time to full result",
    bugsense: "4\u201312 h",
    dipstick: "5 min*",
    lab: "48\u201396 h",
    pcr: "1\u20132 h",
  },
  {
    capability: "Infection confirmation",
    bugsense: "yes",
    dipstick: "partial",
    lab: "yes",
    pcr: "yes",
  },
  {
    capability: "Pathogen identification",
    bugsense: "yes",
    dipstick: "no",
    lab: "yes",
    pcr: "yes",
  },
  {
    capability: "Antibiotic resistance profile",
    bugsense: "yes",
    dipstick: "no",
    lab: "yes",
    pcr: "no",
  },
  {
    capability: "Bacterial load (CFU/mL)",
    bugsense: "yes",
    dipstick: "no",
    lab: "yes",
    pcr: "no",
  },
  {
    capability: "No central lab required",
    bugsense: "yes",
    dipstick: "yes",
    lab: "no",
    pcr: "partial",
  },
  {
    capability: "EUCAST-aligned reporting",
    bugsense: "yes",
    dipstick: "no",
    lab: "yes",
    pcr: "no",
  },
  {
    capability: "Peer-reviewed validation",
    bugsense: "yes",
    dipstick: "yes",
    lab: "yes",
    pcr: "yes",
  },
];

function Cell({ value, featured }: { value: string | Status; featured?: boolean }) {
  if (value === "yes")
    return featured
      ? <Check className="size-5 mx-auto text-white" strokeWidth={3} />
      : <Check className="size-5 mx-auto text-green-500" strokeWidth={2.5} />;
  if (value === "no")
    return featured
      ? <X className="size-5 mx-auto text-white/25" strokeWidth={2} />
      : <X className="size-5 mx-auto text-p-200/50" strokeWidth={2} />;
  if (value === "partial")
    return (
      <span className={`text-lg font-bold mx-auto ${featured ? "text-amber-300" : "text-amber-500"}`}>~</span>
    );
  return (
    <span className={`text-sm font-bold ${featured ? "text-white" : "text-p-800/50"}`}>
      {value}
    </span>
  );
}

export function Comparison() {
  return (
    <Section
      id="comparison"
      className="py-24 lg:py-32 bg-white border-t border-p-100/40"
    >
      <div className="max-w-2xl mb-14">
        <span className="text-xs font-bold tracking-[0.12em] uppercase text-p-600 mb-4 block">
          Technology comparison
        </span>
        <h2 className="text-4xl sm:text-5xl font-extrabold text-p-900 tracking-tight leading-tight">
          No other point-of-care test
          <br />
          delivers all of this.
        </h2>
      </div>

      {/* Mobile: cards per method */}
      <div className="md:hidden space-y-4">
        {methods.map((method) => (
          <div
            key={method.key}
            className={`border p-5 ${
              method.featured
                ? "border-p-600 bg-p-50/30"
                : "border-p-100"
            }`}
          >
            <h3
              className={`text-sm font-bold uppercase tracking-wider mb-4 ${
                method.featured ? "text-p-600" : "text-p-800/50"
              }`}
            >
              {method.label}
            </h3>
            <div className="space-y-3">
              {rows.map((row) => {
                const val = row[method.key];
                return (
                  <div key={row.capability} className="flex items-center justify-between gap-3">
                    <span className="text-sm text-p-800/70">{row.capability}</span>
                    <Cell value={val} featured={method.featured} />
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* Desktop table */}
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full border-collapse min-w-[640px]">
          <thead>
            <tr>
              <th className="text-left text-xs font-bold text-p-800/40 uppercase tracking-[0.1em] px-5 py-4 border-b-2 border-p-900 w-[30%]">
                Capability
              </th>
              <th className="text-center text-xs font-bold text-white uppercase tracking-[0.1em] px-5 py-4 bg-p-600 rounded-t-sm">
                BugSense
              </th>
              <th className="text-center text-xs font-bold text-p-800/40 uppercase tracking-[0.1em] px-5 py-4 border-b-2 border-p-900">
                Dipstick
              </th>
              <th className="text-center text-xs font-bold text-p-800/40 uppercase tracking-[0.1em] px-5 py-4 border-b-2 border-p-900">
                Lab Culture
              </th>
              <th className="text-center text-xs font-bold text-p-800/40 uppercase tracking-[0.1em] px-5 py-4 border-b-2 border-p-900">
                POC PCR
              </th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row, i) => (
              <tr key={row.capability}>
                <td className={`text-left text-[15px] text-p-800 font-medium px-5 py-4 ${i < rows.length - 1 ? "border-b border-p-100/50" : ""}`}>
                  {row.capability}
                </td>
                <td className={`text-center px-5 py-4 bg-p-600 ${i < rows.length - 1 ? "border-b border-white/10" : ""}`}>
                  <Cell value={row.bugsense} featured />
                </td>
                <td className={`text-center px-5 py-4 ${i < rows.length - 1 ? "border-b border-p-100/50" : ""}`}>
                  <Cell value={row.dipstick} />
                </td>
                <td className={`text-center px-5 py-4 ${i < rows.length - 1 ? "border-b border-p-100/50" : ""}`}>
                  <Cell value={row.lab} />
                </td>
                <td className={`text-center px-5 py-4 ${i < rows.length - 1 ? "border-b border-p-100/50" : ""}`}>
                  <Cell value={row.pcr} />
                </td>
              </tr>
            ))}
            {/* Bottom cap */}
            <tr>
              <td />
              <td className="bg-p-600 h-3 rounded-b-sm" />
              <td />
              <td />
              <td />
            </tr>
          </tbody>
        </table>
      </div>

      <p className="text-xs text-p-800/50 mt-6">
        * Dipstick confirms leukocytes — not pathogen or resistance.
        ~ = partial capability depending on device/configuration.
      </p>
    </Section>
  );
}
