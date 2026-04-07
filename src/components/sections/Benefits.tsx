import { useTranslations } from "next-intl";
import { Section } from "@/components/ui/section";

export function Benefits() {
  const t = useTranslations("benefits");

  const benefits = [
    {
      audience: t("clinics"),
      accentBorder: "border-l-p-600",
      accentColor: "text-p-600",
      title: t("clinicsTitle"),
      body: (
        <>
          {t("clinicsBodyPrefix")}
          <strong className="text-p-900 font-semibold">
            {t("clinicsBodyHighlight")}
          </strong>
          {t("clinicsBodySuffix")}
        </>
      ),
    },
    {
      audience: t("doctors"),
      accentBorder: "border-l-t-600",
      accentColor: "text-t-600",
      title: t("doctorsTitle"),
      body: t("doctorsBody"),
    },
    {
      audience: t("pharmacies"),
      accentBorder: "border-l-p-400",
      accentColor: "text-p-400",
      title: t("pharmaciesTitle"),
      body: t("pharmaciesBody"),
    },
    {
      audience: t("patients"),
      accentBorder: "border-l-t-400",
      accentColor: "text-t-400",
      title: t("patientsTitle"),
      body: (
        <>
          {t("patientsBodyPrefix")}
          <strong className="text-p-900 font-semibold">
            {t("patientsBodyHighlight")}
          </strong>
          {t("patientsBodySuffix")}
        </>
      ),
    },
  ];

  return (
    <Section id="benefits" className="py-24 lg:py-32 bg-off border-t border-p-100/40">
      <div className="max-w-2xl mb-14">
        <span className="text-xs font-bold tracking-[0.12em] uppercase text-t-600 mb-4 block">
          {t("label")}
        </span>
        <h2 className="text-4xl sm:text-5xl font-extrabold text-p-900 tracking-tight leading-tight">
          {t("title1")}
          <br />
          {t("title2")}
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-p-100/50">
        {benefits.map((b) => (
          <div
            key={b.audience}
            className={`bg-white px-8 py-9 border-l-3 ${b.accentBorder} hover:-translate-y-0.5 transition-transform duration-200`}
          >
            <span
              className={`text-xs font-bold uppercase tracking-[0.1em] ${b.accentColor} block mb-4`}
            >
              {b.audience}
            </span>
            <h3 className="text-lg font-bold text-p-900 mb-4 leading-snug">
              {b.title}
            </h3>
            <p className="text-[15px] text-muted-custom leading-relaxed">
              {b.body}
            </p>
          </div>
        ))}
      </div>
    </Section>
  );
}
