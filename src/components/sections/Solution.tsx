import Image from "next/image";
import { useTranslations } from "next-intl";
import { Microscope, Clock, MapPin } from "lucide-react";

const icons = [Microscope, Clock, MapPin];

export function Solution() {
  const t = useTranslations("solution");

  const differentiators = [
    { title: t("diff1Title"), desc: t("diff1Desc") },
    { title: t("diff2Title"), desc: t("diff2Desc") },
    { title: t("diff3Title"), desc: t("diff3Desc") },
  ];

  return (
    <section
      id="solution"
      className=" py-24 lg:py-32 overflow-hidden"
    >
      <div className="relative mx-auto max-w-[1100px] px-8 lg:px-16 ">
          {/* Text - full width, on top */}
          <div className="relative z-10 max-w-full md:max-w-xl bg-p-900/40 backdrop-blur-xs rounded-sm p-6 -m-6">
            <span className="text-xs font-bold tracking-[0.12em] uppercase text-p-400 mb-4 block">
              {t("label")}
            </span>
            <h2 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight mb-5 drop-shadow-[0_2px_12px_rgba(0,0,0,0.5)]">
              {t("title")}
            </h2>
            <p className="text-base text-white/90 leading-relaxed mb-10 drop-shadow-[0_2px_8px_rgba(0,0,0,0.4)]">
              {t("description")}
            </p>

            <div className="flex flex-col gap-5">
              {differentiators.map((diff, i) => {
                const Icon = icons[i];
                return (
                  <div key={diff.title} className="flex gap-4 items-start">
                    <div className="w-9 h-9 shrink-0 bg-white/10 text-p-400 flex items-center justify-center backdrop-blur-sm">
                      <Icon className="size-4" strokeWidth={2} />
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-white mb-0.5 drop-shadow-[0_2px_8px_rgba(0,0,0,0.4)]">
                        {diff.title}
                      </h3>
                      <p className="text-sm text-white/90 leading-relaxed drop-shadow-[0_2px_8px_rgba(0,0,0,0.4)]">
                        {diff.desc}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Phone image - absolute, pinned to bottom right, clipped */}
          <div className="relative h-92 md:absolute md:top-0 md:w-full md:h-full">
              <div className="absolute hidden -top-10 left-0 min-[37rem]:block md:-top-10 md:left-auto md:-right-10 w-92 md:w-fit">
                  <Image
                      src="/app-preview-2.png"
                      alt="BugSense app showing test results"
                      width={500}
                      height={2070}
                  />
              </div>
              <div className="absolute -top-10 left-0 right-0 mx-auto min-[37rem]:left-auto md:-top-10 md:left-auto md:-right-40 w-92 md:w-fit">
                  <Image
                      src="/app-preview.png"
                      alt="BugSense app showing test results"
                      width={500}
                      height={2070}
                  />
              </div>
          </div>
      </div>
    </section>
  );
}
