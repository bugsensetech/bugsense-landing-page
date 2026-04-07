import { Section } from "@/components/ui/section";
import { BugSenseIcon } from "@/components/ui/logo";

export function Footer() {
  return (
    <Section
      as="footer"
      className="bg-p-900 py-8 border-t border-white/[0.04]"
      innerClassName="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
    >
      <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3">
        <div className="flex items-center gap-3">
          <BugSenseIcon className="w-4 h-4" color="white" />
          <span className="text-sm font-bold text-white uppercase tracking-wider">
            BugSense
          </span>
        </div>
        <span className="text-xs text-white/40 sm:ml-3">
          Center of Translational Cancer Research · Einsteinstr. 25, 81675 Munich, Germany
        </span>
      </div>
      <a
        href="mailto:contact@bugsensedx.com"
        className="text-xs text-white/40 hover:text-white/50 transition-colors"
      >
        contact@bugsensedx.com
      </a>
    </Section>
  );
}
