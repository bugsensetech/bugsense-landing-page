import { useTranslations } from "next-intl";
import { Section } from "@/components/ui/section";
import { Droplets, Thermometer, Smartphone, FileText } from "lucide-react";

const icons = [Droplets, Thermometer, Smartphone, FileText];
const nums = ["01", "02", "03", "04"];

export function HowItWorks() {
  const t = useTranslations("howItWorks");

  const steps = [
    { time: t("step1Time"), title: t("step1Title"), desc: t("step1Desc") },
    { time: t("step2Time"), title: t("step2Title"), desc: t("step2Desc") },
    { time: t("step3Time"), title: t("step3Title"), desc: t("step3Desc") },
    { time: t("step4Time"), title: t("step4Title"), desc: t("step4Desc") },
  ];

  return (
    <Section id="how-it-works" className="py-24 lg:py-32 bg-off border-t border-p-100/40">
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

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-p-100/60">
        {steps.map((step, i) => {
          const Icon = icons[i];
          return (
            <div key={nums[i]} className="bg-off p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-p-600 text-white flex items-center justify-center">
                  <Icon className="size-4.5" strokeWidth={2} />
                </div>
                <div>
                  <span className="text-[11px] font-bold text-p-600 tracking-wider uppercase block">
                    {t("step")} {nums[i]}
                  </span>
                  <span className="text-xs font-bold text-muted-custom/50 tracking-wider uppercase">
                    {step.time}
                  </span>
                </div>
              </div>
              <h3 className="text-base font-bold text-p-900 mb-2">
                {step.title}
              </h3>
              <p className="text-sm text-muted-custom leading-relaxed">
                {step.desc}
              </p>
            </div>
          );
        })}
      </div>
    </Section>
  );
}
