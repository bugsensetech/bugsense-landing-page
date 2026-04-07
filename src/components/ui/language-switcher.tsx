"use client";

import { useLocale } from "next-intl";
import { useRouter, usePathname } from "@/i18n/navigation";

export function LanguageSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const switchTo = locale === "en" ? "de" : "en";

  function handleSwitch() {
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
