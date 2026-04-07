import { useTranslations } from "next-intl";
import { Section } from "@/components/ui/section";
import { ArrowRight } from "lucide-react";

export function CTA() {
  const t = useTranslations("cta");

  const cards = [
    {
      label: t("forClinicians"),
      title: t("runPilot"),
      desc: t("runPilotDesc"),
      href: `mailto:contact@bugsensedx.com?subject=${t("pilotSubject")}`,
    },
    {
      label: t("forInvestors"),
      title: t("requestMaterials"),
      desc: t("requestMaterialsDesc"),
      href: `mailto:contact@bugsensedx.com?subject=${t("investorSubject")}`,
    },
    {
      label: t("forPartners"),
      title: t("explorePartnership"),
      desc: t("explorePartnershipDesc"),
      href: `mailto:contact@bugsensedx.com?subject=${t("partnerSubject")}`,
    },
  ];

  return (
    <Section id="contact" className="bg-p-900 py-24 lg:py-32">
      <div className="text-center mb-16">
        <h2 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight mb-4">
          {t("title")}
        </h2>
        <p className="text-base text-white/40 max-w-md mx-auto leading-relaxed">
          {t("description")}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {cards.map((card) => (
          <a
            key={card.label}
            href={card.href}
            className="group relative border border-white/[0.08] rounded-lg p-7 hover:border-white/20 transition-all duration-300 hover:bg-white/[0.03]"
          >
            <span className="text-[11px] font-bold uppercase tracking-[0.1em] text-p-400/70 block mb-4">
              {card.label}
            </span>
            <h3 className="text-lg font-bold text-white mb-2">{card.title}</h3>
            <p className="text-sm text-white/30 leading-relaxed mb-6">
              {card.desc}
            </p>
            <div className="flex items-center gap-2 text-sm font-semibold text-p-400/80 group-hover:text-p-200 transition-colors">
              <span>{t("getInTouch")}</span>
              <ArrowRight className="size-3.5 group-hover:translate-x-1 transition-transform duration-200" />
            </div>
          </a>
        ))}
      </div>
    </Section>
  );
}
