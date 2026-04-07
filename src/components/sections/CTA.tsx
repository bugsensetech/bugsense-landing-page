import { Section } from "@/components/ui/section";
import { ArrowRight } from "lucide-react";

const cards = [
  {
    label: "For clinicians",
    title: "Run a pilot",
    desc: "Evaluate BugSense in your clinic or hospital. No commitment. Full onboarding support.",
    href: "mailto:contact@bugsensedx.com?subject=Pilot Enquiry",
  },
  {
    label: "For investors",
    title: "Request materials",
    desc: "Download our investor deck or schedule a call directly with the founding team.",
    href: "mailto:contact@bugsensedx.com?subject=Investor Enquiry",
  },
  {
    label: "For partners",
    title: "Explore a partnership",
    desc: "Distribution, co-development, or integration. Let\u2019s explore what makes sense together.",
    href: "mailto:contact@bugsensedx.com?subject=Partnership Enquiry",
  },
];

export function CTA() {
  return (
    <Section id="contact" className="bg-p-600 py-24 lg:py-32 text-center">
      <h2 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight mb-4">
        Ready to work together?
      </h2>
      <p className="text-base text-white/55 mb-14 max-w-md mx-auto leading-relaxed">
        We&apos;re running clinical pilots, building investor relationships, and
        exploring strategic partnerships.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-white/10 max-w-3xl mx-auto">
        {cards.map((card) => (
          <a
            key={card.label}
            href={card.href}
            className="group bg-p-600 hover:bg-p-400/30 p-7 text-left transition-colors"
          >
            <span className="text-[11px] font-bold uppercase tracking-[0.1em] text-white/35 block mb-3">
              {card.label}
            </span>
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-base font-bold text-white">{card.title}</h3>
              <ArrowRight className="size-4 text-white/25 group-hover:text-white/60 group-hover:translate-x-0.5 transition-all" />
            </div>
            <p className="text-sm text-white/45 leading-relaxed">
              {card.desc}
            </p>
          </a>
        ))}
      </div>
    </Section>
  );
}
