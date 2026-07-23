import Image from "next/image";
import { useTranslations } from "next-intl";
import { Section } from "@/components/ui/section";

// Order, sizing, and white background are required by the EXIST
// Informations- und Publizitätsvorschriften (ESF funding period 2014-2020):
// BMWi logo (in its "Gefördert durch" lockup), program logo, ESF logo,
// EU emblem, ESF claim — same size, in this order, on white.
// Heights are tuned per logo so the marks read as optically equal
// despite very different aspect ratios.
const fundingLogos = [
  { name: "EXIST — Existenzgründungen aus der Wissenschaft", logo: "/logos/exist.png", width: 257, height: 171, display: 50 },
  { name: "Europäischer Sozialfonds für Deutschland", logo: "/logos/esf.png", width: 295, height: 151, display: 46 },
  { name: "Europäische Union", logo: "/logos/eu-emblem.png", width: 115, height: 127, display: 54 },
  { name: "Zusammen. Zukunft. Gestalten.", logo: "/logos/esf-claim.png", width: 576, height: 168, display: 42 },
];

export function FundingNotice() {
  const t = useTranslations("fundingNotice");

  return (
    <Section as="div" aria-label={t("text")} className="bg-white border-t border-p-100/40 py-12 sm:py-16">
      <p className="text-center text-xs text-muted-custom leading-relaxed max-w-2xl mx-auto mb-10">
        {t("text")}
      </p>
      <div className="flex flex-wrap items-center justify-center gap-x-8 sm:gap-x-12 gap-y-8">
        <div lang="de" className="flex flex-col gap-1">
          <span className="text-[10px] leading-tight text-neutral-800">
            Gefördert durch:
          </span>
          <Image
            src="/logos/bmwi-funding.svg"
            alt="Bundesministerium für Wirtschaft und Energie"
            width={124}
            height={63}
            className="w-auto self-start"
            style={{ height: 46, width: "auto" }}
          />
          <span className="text-[10px] leading-tight text-neutral-800">
            aufgrund eines Beschlusses
            <br />
            des Deutschen Bundestages
          </span>
        </div>
        {fundingLogos.map((l) => (
          <Image
            key={l.name}
            src={l.logo}
            alt={l.name}
            width={l.width}
            height={l.height}
            className="w-auto"
            style={{ height: l.display, width: "auto" }}
          />
        ))}
      </div>
    </Section>
  );
}
