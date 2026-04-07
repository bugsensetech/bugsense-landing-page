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

export function TrustBar() {
  const t = useTranslations("trustBar");

  return (
    <Section as="div" className="bg-white border-y border-p-100/40 py-12">
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
    </Section>
  );
}
