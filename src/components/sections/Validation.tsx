import Image from "next/image";
import { useTranslations } from "next-intl";
import { Section } from "@/components/ui/section";

const partners = [
  { name: "TUM", logo: "/logos/tum.svg", height: 44 },
  { name: "TUM Venture Labs", logo: "/logos/tum-venture-labs.png", height: 38 },
  { name: "BMBF", logo: "/logos/bmbf.svg", height: 50 },
  { name: "GO-Bio", logo: "/logos/go-bio.svg", height: 38 },
  { name: "BioM", logo: "/logos/biom.svg", height: 42 },
  { name: "Bavarian Ministry", logo: "/logos/bavarian-ministry.png", height: 38 },
  { name: "Zeidler Forschungsstiftung", logo: "/logos/zeidler.png", height: 50 },
];

export function Validation() {
  const t = useTranslations("traction");

  const metrics = [
    { value: t("metric1Value"), label: t("metric1Label") },
    { value: t("metric2Value"), label: t("metric2Label") },
    { value: t("metric3Value"), label: t("metric3Label") },
    { value: t("metric4Value"), label: t("metric4Label") },
  ];

  return (
    <Section id="evidence" className="bg-white py-24 lg:py-32">
      <div className="max-w-2xl mb-14">
        <span className="text-xs font-bold tracking-[0.12em] uppercase text-t-600 mb-4 block">
          {t("label")}
        </span>
        <h2 className="text-4xl sm:text-5xl font-extrabold text-p-900 tracking-tight leading-tight">
          {t("title")}
        </h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-px bg-p-100/60 mb-4">
        {metrics.map((m) => (
          <div key={m.label} className="bg-white p-8">
            <div className="text-3xl sm:text-4xl font-extrabold text-p-900 tracking-tighter leading-none mb-3">
              {m.value}
            </div>
            <p className="text-sm text-muted-custom leading-relaxed">
              {m.label}
            </p>
          </div>
        ))}
      </div>

      <p className="text-xs text-muted-custom/50 mb-16">
        {t("footnote")}
      </p>

      {/* Backed by */}
      <div className="border-t border-p-100/40 pt-14">
        <div className="text-center mb-8">
          <span className="text-xs font-bold text-muted-custom/50 tracking-[0.12em] uppercase">
            {t("backedBy")}
          </span>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-x-12 gap-y-8">
          {partners.map((p) => (
            <Image
              key={p.name}
              src={p.logo}
              alt={p.name}
              width={0}
              height={p.height}
              sizes="200px"
              className="h-auto w-auto opacity-50 hover:opacity-100 transition-opacity duration-300"
              style={{ height: p.height, width: "auto" }}
            />
          ))}
        </div>
      </div>
    </Section>
  );
}
