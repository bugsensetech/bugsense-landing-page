"use client";

import { useEffect } from "react";
import { routing } from "@/i18n/routing";
import { LOCALE_COOKIE_NAME, LOCALE_STORAGE_KEY } from "@/lib/constants";

const LOCALES: readonly string[] = routing.locales;

/** A locale the visitor explicitly chose earlier via the language switcher. */
function storedLocale(): string | null {
  try {
    const v = window.localStorage.getItem(LOCALE_STORAGE_KEY);
    if (v && LOCALES.includes(v)) return v;
  } catch {
    // Storage unavailable (private mode, blocked site data) — fall through.
  }
  const match = document.cookie.match(new RegExp(`(?:^|; )${LOCALE_COOKIE_NAME}=([^;]+)`));
  if (match && LOCALES.includes(match[1])) return match[1];
  return null;
}

/** The first browser language we support, in the user's preference order. */
function browserLocale(): string {
  const langs =
    navigator.languages && navigator.languages.length
      ? navigator.languages
      : [navigator.language || routing.defaultLocale];
  for (const lang of langs) {
    const code = String(lang).toLowerCase().split("-")[0];
    if (LOCALES.includes(code)) return code;
  }
  return routing.defaultLocale;
}

/**
 * Client-side locale detection for the root URL. Static export has no
 * middleware, so this runs in the browser: stored preference → browser
 * language → default locale. Works identically in `next dev` and on the
 * exported site.
 */
export function LocaleRedirect() {
  useEffect(() => {
    const target = storedLocale() ?? browserLocale();
    let base = window.location.pathname;
    if (!base.endsWith("/")) base += "/";
    window.location.replace(`${base}${target}/${window.location.search}${window.location.hash}`);
  }, []);

  return null;
}
