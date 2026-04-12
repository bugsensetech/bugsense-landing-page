import { useTranslations } from "next-intl";
import { Section } from "@/components/ui/section";
import { Droplets, Thermometer, Smartphone, FileText } from "lucide-react";

const icons = [Droplets, Thermometer, Smartphone, FileText];
const nums = ["01", "02", "03", "04"];

const iconColors = [
  "bg-p-600",
  "bg-[color-mix(in_srgb,var(--color-p-600)_66%,var(--color-t-400)_34%)]",
  "bg-[color-mix(in_srgb,var(--color-p-600)_33%,var(--color-t-400)_67%)]",
  "bg-t-400",
];

export function HowItWorks() {
  const t = useTranslations("howItWorks");

  const steps = [
    { time: t("step1Time"), title: t("step1Title"), desc: t("step1Desc") },
    { time: t("step2Time"), title: t("step2Title"), desc: t("step2Desc") },
    { time: t("step3Time"), title: t("step3Title"), desc: t("step3Desc") },
    { time: t("step4Time"), title: t("step4Title"), desc: t("step4Desc") },
  ];

  return (
    <Section id="how-it-works" className="py-24 lg:py-32 bg-white border-t border-p-100/40">
      <div className="max-w-2xl mb-16">
        <span className="text-xs font-bold tracking-[0.12em] uppercase text-p-600 mb-4 block">
          {t("label")}
        </span>
        <h2 className="text-4xl sm:text-5xl font-extrabold text-p-900 tracking-tight leading-tight mb-5">
          {t("title")}
        </h2>
        <p className="text-base text-muted-custom leading-relaxed">
          {t("description")}
        </p>
      </div>

      {/* Desktop */}
      <div className="hidden md:block">
        <div className="relative">
          <div className="absolute top-5 left-0 right-0 h-[2px] bg-gradient-to-r from-p-600 to-t-400 opacity-30" />

          <div className="grid grid-cols-4 gap-6">
            {steps.map((step, i) => {
              const Icon = icons[i];
              return (
                <div key={nums[i]}>
                  <div className="relative z-10 flex items-center gap-3 mb-5">
                    <div className={`w-10 h-10 ${iconColors[i]} text-white flex items-center justify-center shrink-0`}>
                      <Icon className="size-4.5" strokeWidth={2} />
                    </div>
                    <div className="bg-white pr-2">
                      <span className="text-[11px] font-bold text-p-900/70 tracking-wider uppercase block leading-tight">
                        {t("step")} {nums[i]}
                      </span>
                      <span className="text-[11px] font-medium text-muted-custom/50 tracking-wider uppercase">
                        {step.time}
                      </span>
                    </div>
                  </div>

                  <h3 className="text-base font-bold text-p-900 mb-1">
                    {step.title}
                  </h3>
                  <p className="text-sm text-muted-custom leading-relaxed">
                    {step.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Mobile */}
      <div className="md:hidden relative">
        <div className="absolute left-5 top-0 bottom-0 w-[2px] bg-gradient-to-b from-p-600 to-t-400 opacity-30" />

        {steps.map((step, i) => {
          const Icon = icons[i];
          return (
            <div key={nums[i]} className="relative flex gap-6 pb-10 last:pb-0">
              <div className={`relative z-10 w-10 h-10 ${iconColors[i]} text-white flex items-center justify-center shrink-0`}>
                <Icon className="size-4.5" strokeWidth={2} />
              </div>
              <div className="pt-1">
                <div className="flex items-baseline gap-3 mb-2">
                  <span className="text-[11px] font-bold text-p-900/70 tracking-wider uppercase">
                    {t("step")} {nums[i]}
                  </span>
                  <span className="text-[11px] font-medium text-muted-custom/50 tracking-wider uppercase">
                    {step.time}
                  </span>
                </div>
                <h3 className="text-base font-bold text-p-900 mb-1">
                  {step.title}
                </h3>
                <p className="text-sm text-muted-custom leading-relaxed">
                  {step.desc}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </Section>
  );
}
