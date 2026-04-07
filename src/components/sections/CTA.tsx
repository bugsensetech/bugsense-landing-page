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
    <Section id="contact" className="bg-p-900 py-24 lg:py-32">
      <div className="text-center mb-16">
        <h2 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight mb-4">
          Ready to work together?
        </h2>
        <p className="text-base text-white/40 max-w-md mx-auto leading-relaxed">
          We&apos;re running clinical pilots, building investor relationships,
          and exploring strategic partnerships.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {cards.map((card) => (
          <a
            key={card.label}
            href={card.href}
            className="group relative border border-white/[0.08] rounded-lg p-7 hover:border-white/20 transition-all duration-300 hover:bg-white/[0.03]"
          >
            <span className="text-[11px] font-bold uppercase tracking-[0.1em] text-p-400/70 block mb-4">
              {card.label}
            </span>
            <h3 className="text-lg font-bold text-white mb-2">{card.title}</h3>
            <p className="text-sm text-white/30 leading-relaxed mb-6">
              {card.desc}
            </p>
            <div className="flex items-center gap-2 text-sm font-semibold text-p-400/80 group-hover:text-p-200 transition-colors">
              <span>Get in touch</span>
              <ArrowRight className="size-3.5 group-hover:translate-x-1 transition-transform duration-200" />
            </div>
          </a>
        ))}
      </div>
    </Section>
  );
}
