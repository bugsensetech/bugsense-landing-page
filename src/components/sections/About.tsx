import { useTranslations } from "next-intl";
import { Section } from "@/components/ui/section";

const years = ["2021", "2022", "2023", "2024", "2025"];

export function About() {
  const t = useTranslations("about");

  const milestones = [
    { year: "2021", text: t("milestone2021") },
    { year: "2022", text: t("milestone2022") },
    { year: "2023", text: t("milestone2023") },
    { year: "2024", text: t("milestone2024") },
    { year: "2025", text: t("milestone2025") },
  ];

  return (
    <Section
      id="about"
      className="py-24 lg:py-32 bg-white border-t border-p-100/40"
    >
      <div className="max-w-2xl mb-14">
        <span className="text-xs font-bold tracking-[0.12em] uppercase text-p-600 mb-4 block">
          {t("label")}
        </span>
        <h2 className="text-4xl sm:text-5xl font-extrabold text-p-900 tracking-tight leading-tight mb-6">
          {t("title1")}
          <br />
          {t("title2")}
        </h2>
        <div className="space-y-4 text-base text-muted-custom leading-relaxed">
          <p>{t("paragraph1")}</p>
          <p>
            {t("paragraph2Prefix")}
            <strong className="text-p-900 font-semibold">
              {t("tum")}
            </strong>
            {t("paragraph2Middle")}
            <strong className="text-p-900 font-semibold">
              {t("mri")}
            </strong>
            {t("paragraph2Suffix")}
          </p>
        </div>
      </div>

      {/* Mobile: vertical */}
      <div className="relative sm:hidden">
        <div className="absolute left-[8px] top-1 bottom-1 w-px bg-p-100" />
        <div className="space-y-5">
          {milestones.map((m, i) => (
            <div key={m.year} className="flex gap-4 relative pl-1">
              <div className="relative shrink-0 flex items-start pt-1.5">
                <div
                  className={`size-[9px] rounded-full z-10 ${
                    i === milestones.length - 1 ? "bg-p-600" : "bg-p-200"
                  }`}
                />
              </div>
              <div>
                <span
                  className={`text-base font-bold tabular-nums block mb-0.5 ${
                    i === milestones.length - 1 ? "text-p-600" : "text-p-800"
                  }`}
                >
                  {m.year}
                </span>
                <p className="text-[15px] text-muted-custom leading-relaxed">
                  {m.text}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Desktop: horizontal */}
      <div className="relative hidden sm:block">
        <div className="absolute top-[5px] left-0 right-0 h-px bg-p-100" />
        <div className="grid grid-cols-5">
          {milestones.map((m, i) => (
            <div key={m.year} className="relative pt-5 pr-6">
              <div
                className={`absolute top-0 left-0 size-[11px] rounded-full ${
                  i === milestones.length - 1 ? "bg-p-600" : "bg-p-200"
                }`}
              />
              <span
                className={`text-sm font-bold tabular-nums block mb-1 ${
                  i === milestones.length - 1 ? "text-p-600" : "text-p-800"
                }`}
              >
                {m.year}
              </span>
              <p className="text-[13px] text-muted-custom leading-relaxed">
                {m.text}
              </p>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}
