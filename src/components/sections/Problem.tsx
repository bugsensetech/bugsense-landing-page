import { useTranslations } from "next-intl";
import { Section } from "@/components/ui/section";

export function Problem() {
  const t = useTranslations("problem");

  const stats = [
    {
      value: t("stat1Value"),
      suffix: t("stat1Suffix"),
      desc: t("stat1Desc"),
      source: t("stat1Source"),
    },
    {
      prefix: t("stat2Prefix"),
      value: t("stat2Value"),
      desc: t("stat2Desc"),
      source: t("stat2Source"),
    },
    {
      value: t("stat3Value"),
      desc: t("stat3Desc"),
      source: t("stat3Source"),
    },
    {
      prefix: t("stat4Prefix"),
      value: t("stat4Value"),
      desc: t("stat4Desc"),
      source: t("stat4Source"),
    },
  ];

  return (
    <Section id="problem" className="py-24 lg:py-32 bg-white">
      <div className="max-w-2xl mb-14">
        <span className="text-xs font-bold tracking-[0.12em] uppercase text-c-600 mb-4 block">
          {t("label")}
        </span>
        <h2 className="text-4xl sm:text-5xl font-extrabold text-p-900 tracking-tight leading-tight mb-5">
          {t("title1")}
          <br />
          {t("title2")}
        </h2>
        <p className="text-base text-muted-custom leading-relaxed">
          {t("description")}
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-px bg-p-800/50">
        {stats.map((stat) => (
          <div key={stat.value} className="bg-p-900 p-8">
            <div className="text-4xl sm:text-5xl font-extrabold text-white tracking-tighter leading-none mb-3">
              {stat.prefix}{stat.value}{stat.suffix}
            </div>
            <p className="text-[15px] text-white/60 leading-relaxed mb-4">
              {stat.desc}
            </p>
            <span className="text-[11px] text-white/30 font-bold tracking-wider uppercase">
              {stat.source}
            </span>
          </div>
        ))}
      </div>
    </Section>
  );
}
