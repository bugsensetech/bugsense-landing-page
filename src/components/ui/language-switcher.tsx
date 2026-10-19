"use client";

import { useLocale } from "next-intl";
import { useRouter, usePathname } from "@/i18n/navigation";
import { LOCALE_COOKIE_NAME, LOCALE_STORAGE_KEY } from "@/lib/constants";

const ONE_YEAR = 365 * 24 * 60 * 60;

/**
 * Persist an explicit locale choice so the root redirect (public/index.html)
 * can send returning visitors straight to it. localStorage is the primary
 * store; the cookie mirrors it for a future server-side setup (next-intl
 * middleware reads NEXT_LOCALE). Both are strictly functional, no tracking.
 */
function rememberLocale(locale: string) {
  try {
    window.localStorage.setItem(LOCALE_STORAGE_KEY, locale);
  } catch {
    // Storage may be unavailable (private mode, blocked site data) — ignore.
  }
  document.cookie = `${LOCALE_COOKIE_NAME}=${locale};path=/;max-age=${ONE_YEAR};SameSite=Lax`;
}

export function LanguageSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const switchTo = locale === "en" ? "de" : "en";

  function handleSwitch() {
    rememberLocale(switchTo);
    router.replace(pathname, { locale: switchTo });
  }

  return (
    <button
      onClick={handleSwitch}
      className="text-xs font-bold text-white/50 hover:text-white uppercase tracking-wider transition-colors px-2 py-1 border border-white/10 hover:border-white/25"
      aria-label={`Switch to ${switchTo === "de" ? "Deutsch" : "English"}`}
    >
      {switchTo === "de" ? "DE" : "EN"}
    </button>
  );
}
