import Image from "next/image";
import { useTranslations } from "next-intl";
import { Section } from "@/components/ui/section";
import {ExternalLink} from "lucide-react";
import {CONTACT_EMAIL} from "@/lib/constants";

const partners = [
  { name: "TUM", logo: "/logos/tum.svg", height: 44 },
  { name: "TUM Venture Labs", logo: "/logos/tum-venture-labs.png", height: 38 },
  { name: "MRI", logo: "/logos/mri.png", height: 44 },
  { name: "BMBF", logo: "/logos/bmbf.svg", height: 50 },
  { name: "BMWi", logo: "/logos/bmwi.svg", height: 50 },
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
    <Section id="traction" className="bg-white py-24 lg:py-32">
      <div className="max-w-2xl mb-14">
        <span className="text-xs font-bold tracking-[0.12em] uppercase text-t-600 mb-4 block">
          {t("label")}
        </span>
        <h2 className="text-4xl sm:text-5xl font-extrabold text-p-900 tracking-tight leading-tight">
          {t("title")}
        </h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-[1fr_1fr_1.4fr_1fr] gap-px bg-p-100/60 mb-4">
        {metrics.map((m) => (
          <div key={m.label} className="bg-white p-8 min-w-0">
            <div className="text-3xl sm:text-4xl font-extrabold text-p-900 tracking-tighter leading-none mb-3 whitespace-nowrap">
              {m.value}
            </div>
            <p className="text-sm text-muted-custom leading-relaxed">
              {m.label}
            </p>
          </div>
        ))}
      </div>

      {/* Publication */}
      <div className="bg-slate-50 border border-slate-200 p-8 sm:p-10 flex flex-col sm:flex-row items-center gap-8 mb-16 mt-12">
        <Image
          src="/logos/microbiology-spectrum.svg"
          alt="American Society for Microbiology"
          width={180}
          height={85}
          className="shrink-0"
          style={{ width: 180, height: "auto" }}
        />
        <div className="hidden sm:block w-px bg-slate-200 self-stretch shrink-0" />
        <div>
          <p className="text-sm text-slate-600 leading-relaxed">
            {t("citationText")}
            <br />
            <strong className="text-slate-900">
              {t("citationSource")}
            </strong>
          </p>
          <a
            href={`mailto:${CONTACT_EMAIL}?subject=Paper Request`}
            className="inline-flex items-center gap-1.5 text-xs font-bold text-t-600 mt-3 hover:text-t-500 transition-colors uppercase tracking-wider"
          >
            {t("requestPaper")}
            <ExternalLink className="size-3.5" />
          </a>
        </div>
      </div>

      {/* Backed by */}
      <div className="border-p-100/40">
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
              className="h-auto w-auto"
              style={{ height: p.height, width: "auto" }}
            />
          ))}
        </div>
      </div>
    </Section>
  );
}
