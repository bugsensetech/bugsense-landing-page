import { useTranslations } from "next-intl";
import { Section } from "@/components/ui/section";

const years = ["2023", "2024", "2025", "2027"];

export function About() {
  const t = useTranslations("about");

  const milestones = [
    { year: "2023", text: t("milestone2023"), future: false },
    { year: "2024", text: t("milestone2024"), future: false },
    { year: "2025", text: t("milestone2025"), future: false },
    { year: "2027", text: t("milestone2027"), future: true },
  ];

  return (
    <Section
      id="about"
      className="py-24 lg:py-32 bg-off border-t border-p-100/40"
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
        {/* Solid line spanning past milestones */}
        <div className="absolute left-[8px] top-1 bottom-[calc(100%-var(--past-end))] w-px bg-p-100" style={{ "--past-end": "100%" } as React.CSSProperties} />
        <div className="space-y-5">
          {milestones.filter((m) => !m.future && m.text).map((m) => (
            <div key={m.year} className="flex gap-4 relative pl-1">
              <div className="absolute left-[8px] top-4 bottom-0 w-px bg-p-100" />
              <div className="relative shrink-0 flex items-start pt-1.5">
                <div className="size-[9px] rounded-full z-10 bg-p-200" />
              </div>
              <div>
                <span className="text-base font-bold tabular-nums block mb-0.5 text-p-800">
                  {m.year}
                </span>
                <p className="text-[15px] text-muted-custom leading-relaxed">
                  {m.text}
                </p>
              </div>
            </div>
          ))}
          {/* Dashed gap */}
          <div className="flex pl-1">
            <div className="w-[9px] shrink-0 flex justify-center">
              <div className="h-6 border-l border-dashed border-p-300" />
            </div>
          </div>
          {/* Future milestone */}
          {milestones.filter((m) => m.future).map((m) => (
            <div key={m.year} className="flex gap-4 relative pl-1">
              <div className="relative shrink-0 flex items-start pt-1.5">
                <div className="size-[9px] rounded-full z-10 bg-p-600 ring-4 ring-p-100" />
              </div>
              <div>
                <span className="text-base font-bold tabular-nums block mb-0.5 text-p-600">
                  {m.year}
                </span>
                <p className="text-[15px] leading-relaxed text-p-600 font-medium">
                  {m.text}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Desktop: horizontal */}
      <div className="relative hidden sm:block">
        <div className="grid grid-cols-4">
          {milestones.map((m) => (
            <div key={m.year} className="relative pt-5 pr-6">
              {/* Timeline line */}
              {m.future ? (
                <div className="absolute top-[5px] -left-4 right-0 border-t border-dashed border-p-300" />
              ) : (
                <div className="absolute top-[5px] left-0 right-0 h-px bg-p-100" />
              )}
              {/* Dot */}
              {!!m.year &&
                <div
                  className={`absolute top-0 left-0 rounded-full ${
                    m.future
                      ? "size-[11px] bg-p-600 ring-4 ring-p-100"
                      : "size-[11px] bg-p-200"
                  }`}
                />
              }
              <span
                className={`text-sm font-bold tabular-nums block mb-1 ${
                  m.future ? "text-p-600" : "text-p-800"
                }`}
              >
                {m.year}
              </span>
              <p className={`text-[13px] leading-relaxed ${m.future ? "text-p-600 font-medium" : "text-muted-custom"}`}>
                {m.text}
              </p>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}
