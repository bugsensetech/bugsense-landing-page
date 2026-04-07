import { Section } from "@/components/ui/section";
import { BugSenseIcon } from "@/components/ui/logo";

export function Footer() {
  return (
    <Section
      as="footer"
      className="bg-p-900 py-8 border-t border-white/[0.04]"
      innerClassName="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
    >
      <div className="flex items-center gap-3">
        <BugSenseIcon className="w-4 h-4" color="white" />
        <span className="text-xs font-bold text-white uppercase tracking-wider">
          BugSense
        </span>
        <span className="text-[10px] text-white/20 ml-3 hidden sm:inline">
          Einsteinstr. 25, 81675 Munich
        </span>
      </div>
      <a
        href="mailto:contact@bugsensedx.com"
        className="text-[10px] text-white/25 hover:text-white/50 transition-colors"
      >
        contact@bugsensedx.com
      </a>
    </Section>
  );
}
