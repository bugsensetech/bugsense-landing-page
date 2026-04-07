import { useTranslations } from "next-intl";
import { Section } from "@/components/ui/section";
import { Check, X, Minus } from "lucide-react";

type Status = "yes" | "no" | "partial";

const rows: {
  capKey: string;
  bugsense: string | Status;
  dipstick: string | Status;
  lab: string | Status;
  pcr: string | Status;
  unverified?: boolean;
}[] = [
  { capKey: "timeToResult", bugsense: "4\u201312 h", dipstick: "5 min*", lab: "48\u201396 h", pcr: "1\u20132 h" },
  { capKey: "sampleLogistics", bugsense: "0 h", dipstick: "0 h", lab: "~23 h", pcr: "partial", unverified: true },
  { capKey: "infectionConfirmation", bugsense: "yes", dipstick: "partial", lab: "yes", pcr: "yes" },
  { capKey: "pathogenId", bugsense: "yes", dipstick: "no", lab: "yes", pcr: "yes" },
  { capKey: "resistanceProfile", bugsense: "yes", dipstick: "no", lab: "yes", pcr: "no" },
  { capKey: "bacterialLoad", bugsense: "yes", dipstick: "no", lab: "yes", pcr: "no" },
  { capKey: "noCentralLab", bugsense: "yes", dipstick: "yes", lab: "no", pcr: "partial" },
  { capKey: "eucastReporting", bugsense: "yes", dipstick: "no", lab: "yes", pcr: "no" },
  { capKey: "peerReviewed", bugsense: "yes", dipstick: "yes", lab: "yes", pcr: "yes" },
];

function Cell({ value, featured }: { value: string | Status; featured?: boolean }) {
  if (value === "yes")
    return featured
      ? <Check className="size-5 ml-auto md:mx-auto text-white" strokeWidth={3} />
      : <Check className="size-5 ml-auto md:mx-auto text-green-500" strokeWidth={2.5} />;
  if (value === "no")
    return featured
      ? <X className="size-5 ml-auto md:mx-auto text-white/25" strokeWidth={2} />
      : <X className="size-5 ml-auto md:mx-auto text-p-200/50" strokeWidth={2} />;
  if (value === "partial")
    return (
      <Minus className={`size-5 ml-auto md:mx-auto ${featured ? "text-amber-300" : "text-amber-500"}`} strokeWidth={2.5} />
    );
  return (
    <span className={`text-sm font-bold ml-auto md:mx-auto ${featured ? "text-white" : "text-p-800/50"}`}>
      {value}
    </span>
  );
}

export function Comparison() {
  const t = useTranslations("comparison");

  const methods = [
    { key: "bugsense" as const, label: t("bugsense"), featured: true },
    { key: "dipstick" as const, label: t("dipstick"), featured: false },
    { key: "lab" as const, label: t("labCulture"), featured: false },
    { key: "pcr" as const, label: t("pocPcr"), featured: false },
  ];

  return (
    <Section
      id="comparison"
      className="py-24 lg:py-32 bg-white border-t border-p-100/40"
    >
      <div className="max-w-2xl mb-14">
        <span className="text-xs font-bold tracking-[0.12em] uppercase text-p-600 mb-4 block">
          {t("label")}
        </span>
        <h2 className="text-4xl sm:text-5xl font-extrabold text-p-900 tracking-tight leading-tight">
          {t("title1")}
          <br />
          {t("title2")}
        </h2>
      </div>

      {/* Mobile: cards per method */}
      <div className="md:hidden space-y-4">
        {methods.map((method) => (
          <div
            key={method.key}
            className={`border p-5 ${
              method.featured
                ? "border-p-600 bg-p-600 text-white"
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
                  <div key={row.capKey} className={`flex items-center justify-between gap-3 ${row.unverified ? "ring-1 ring-red-500 p-1.5 -mx-1.5" : ""}`}>
                    <span className={`text-sm ${row.unverified ? "text-red-500" : method.featured ? "text-white/80" : "text-p-800/70"}`}>{t(row.capKey)}</span>
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
                {t("capability")}
              </th>
              <th className="text-center text-xs font-bold text-white uppercase tracking-[0.1em] px-5 py-4 bg-p-600 rounded-t-sm">
                {t("bugsense")}
              </th>
              <th className="text-center text-xs font-bold text-p-800/40 uppercase tracking-[0.1em] px-5 py-4 border-b-2 border-p-900">
                {t("dipstick")}
              </th>
              <th className="text-center text-xs font-bold text-p-800/40 uppercase tracking-[0.1em] px-5 py-4 border-b-2 border-p-900">
                {t("labCulture")}
              </th>
              <th className="text-center text-xs font-bold text-p-800/40 uppercase tracking-[0.1em] px-5 py-4 border-b-2 border-p-900">
                {t("pocPcr")}
              </th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row, i) => (
              <tr key={row.capKey} className={row.unverified ? "ring-2 ring-red-500 ring-inset" : ""}>
                <td className={`text-left text-[15px] font-medium px-5 py-4 ${i < rows.length - 1 ? "border-b border-p-100/50" : ""} ${row.unverified ? "text-red-500" : "text-p-800"}`}>
                  {t(row.capKey)}
                  {row.unverified && <span className="ml-2 text-[10px] font-bold text-red-400 bg-red-500/10 px-1.5 py-0.5 uppercase tracking-wider">{t("verify")}</span>}
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
        {t("footnote")}
      </p>
    </Section>
  );
}
