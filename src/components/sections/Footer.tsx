"use client";

import { useTranslations } from "next-intl";
import { Section } from "@/components/ui/section";
import { CONTACT_EMAIL } from "@/lib/constants";
import { BugSenseIcon } from "@/components/ui/logo";
import { Link } from "@/i18n/navigation";

export function Footer() {
  const t = useTranslations("footer");

  function openCookieSettings() {
    document.cookie =
      "bugsense_consent=;path=/;max-age=0;SameSite=Lax";
    window.dispatchEvent(new Event("cookie-consent-reset"));
  }

  return (
    <Section
      as="footer"
      className="bg-p-900 py-8 border-t border-white/[0.04]"
      innerClassName="flex flex-col gap-4"
    >
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3">
          <div className="flex items-center gap-3">
            <BugSenseIcon className="w-4 h-4" color="white" />
            <span className="text-sm font-bold text-white uppercase tracking-wider">
              BugSense
            </span>
          </div>
          <span className="text-xs text-white/40 sm:ml-3">
            {t("address")}
          </span>
        </div>
        <a
          href={`mailto:${CONTACT_EMAIL}`}
          className="text-xs text-white/40 hover:text-white/50 transition-colors"
        >
          {CONTACT_EMAIL}
        </a>
      </div>
      <div className="flex flex-wrap items-center gap-x-4 gap-y-1 border-t border-white/[0.06] pt-4">
        <Link
          href="/imprint"
          className="text-xs text-white/40 hover:text-white/50 transition-colors"
        >
          {t("imprint")}
        </Link>
        <Link
          href="/privacy"
          className="text-xs text-white/40 hover:text-white/50 transition-colors"
        >
          {t("privacyPolicy")}
        </Link>
      </div>
      {/* Hidden until HAS_NON_ESSENTIAL_COOKIES is enabled in CookieConsent.tsx */}
      {/* <div className="flex flex-wrap items-center gap-x-4 gap-y-1 border-t border-white/[0.06] pt-4">
        <button
          onClick={openCookieSettings}
          className="text-xs text-white/40 hover:text-white/50 transition-colors cursor-pointer"
        >
          {t("cookieSettings")}
        </button>
      </div> */}
    </Section>
  );
}
