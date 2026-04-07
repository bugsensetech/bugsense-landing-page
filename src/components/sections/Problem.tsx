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
  ];

  const additionalStats = [
    {
      prefix: t("additional1Prefix"),
      value: t("additional1Value"),
      unverified: true,
      desc: t("additional1Desc"),
      source: t("additional1Source"),
    },
    {
      prefix: t("additional2Prefix"),
      value: t("additional2Value"),
      unverified: true,
      desc: t("additional2Desc"),
      source: t("additional2Source"),
    },
  ];

  return (
    <Section id="problem" className="py-24 lg:py-32">
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

      <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-p-800/50">
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

      <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-p-800/50 mt-px">
        {additionalStats.map((stat) => (
          <div key={stat.value} className={`bg-p-900 p-8 ${stat.unverified ? "ring-2 ring-red-500 ring-inset relative" : ""}`}>
            {stat.unverified && (
              <span className="absolute top-2 right-2 text-[10px] font-bold text-red-400 bg-red-500/20 px-2 py-0.5 uppercase tracking-wider">
                {t("needsVerification")}
              </span>
            )}
            <div className={`text-4xl sm:text-5xl font-extrabold tracking-tighter leading-none mb-3 ${stat.unverified ? "text-red-400" : "text-white"}`}>
              {stat.prefix}{stat.value}
            </div>
            <p className="text-[15px] text-white/60 leading-relaxed mb-4">
              {stat.desc}
            </p>
            <span className={`text-[11px] font-bold tracking-wider uppercase ${stat.unverified ? "text-red-400/60" : "text-white/30"}`}>
              {stat.source}
            </span>
          </div>
        ))}
      </div>

      <div className="border-l-2 border-l-p-600 bg-p-50/40 px-6 py-5 max-w-2xl mt-10">
        <p className="text-[15px] text-p-800 leading-relaxed font-medium">
          {t("callout")}
        </p>
      </div>
    </Section>
  );
}
