import { useTranslations } from "next-intl";
import { Section } from "@/components/ui/section";
import { ArrowRight } from "lucide-react";

export function Benefits() {
  const t = useTranslations("benefits");

  const benefits = [
    {
      audience: t("audience1"),
      title: t("audience1Title"),
      body: t("audience1Body"),
      link: t("audience1Link"),
      href: "#evidence",
      accentBorder: "border-l-p-400",
      accentColor: "text-p-400",
    },
    {
      audience: t("audience2"),
      title: t("audience2Title"),
      body: t("audience2Body"),
      link: t("audience2Link"),
      href: "#evidence",
      accentBorder: "border-l-t-400",
      accentColor: "text-t-400",
    },
    {
      audience: t("audience3"),
      title: t("audience3Title"),
      body: t("audience3Body"),
      link: t("audience3Link"),
      href: "#contact",
      accentBorder: "border-l-p-400",
      accentColor: "text-p-400",
    },
  ];

  return (
    <Section id="benefits" className="py-24 lg:py-32 bg-off">
      <div className="max-w-2xl mb-14">
        <span className="text-xs font-bold tracking-[0.12em] uppercase text-t-400 mb-4 block">
          {t("label")}
        </span>
        <h2 className="text-4xl sm:text-5xl font-extrabold text-p-900 tracking-tight leading-tight">
          {t("title")}
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-p-900/[0.06]">
        {benefits.map((b) => (
          <div
            key={b.audience}
            className={`bg-off px-8 py-9 border-l-3 ${b.accentBorder}`}
          >
            <span
              className={`text-xs font-bold uppercase tracking-[0.1em] ${b.accentColor} block mb-4`}
            >
              {b.audience}
            </span>
            <h3 className="text-lg font-bold text-p-900 mb-4 leading-snug">
              {b.title}
            </h3>
            <p className="text-[15px] text-p-900/50 leading-relaxed mb-6">
              {b.body}
            </p>
            <a
              href={b.href}
              className={`inline-flex items-center gap-1.5 text-sm font-semibold ${b.accentColor} hover:opacity-70 transition-opacity`}
            >
              {b.link}
              <ArrowRight className="size-3.5" />
            </a>
          </div>
        ))}
      </div>
    </Section>
  );
}
