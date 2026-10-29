import { routing } from "@/i18n/routing";
import { LOCALE_COOKIE_NAME, LOCALE_STORAGE_KEY } from "@/lib/constants";

/**
 * Runs as an inline script in <head>, before the page paints and without
 * waiting for React to hydrate, so the root redirect page barely flashes.
 * Order: stored preference (language switcher) → browser language → default.
 */
function redirect(locales: readonly string[], fallback: string, storageKey: string, cookieName: string) {
  let target: string | null = null;
  try {
    const v = window.localStorage.getItem(storageKey);
    if (v && locales.includes(v)) target = v;
  } catch {
    // Storage unavailable (private mode, blocked site data) — fall through.
  }
  if (!target) {
    const match = document.cookie.match(new RegExp("(?:^|; )" + cookieName + "=([^;]+)"));
    if (match && locales.includes(match[1])) target = match[1];
  }
  if (!target) {
    const langs =
      navigator.languages && navigator.languages.length
        ? navigator.languages
        : [navigator.language || fallback];
    for (const lang of langs) {
      const code = String(lang).toLowerCase().split("-")[0];
      if (locales.includes(code)) {
        target = code;
        break;
      }
    }
  }
  let base = window.location.pathname;
  if (!base.endsWith("/")) base += "/";
  window.location.replace(base + (target || fallback) + "/" + window.location.search + window.location.hash);
}

/**
 * Client-side locale detection for the root URL. Static export has no
 * middleware, so this runs in the browser. Render it inside <head>.
 */
export function LocaleRedirect() {
  const args = [routing.locales, routing.defaultLocale, LOCALE_STORAGE_KEY, LOCALE_COOKIE_NAME]
    .map((a) => JSON.stringify(a))
    .join(",");
  return <script dangerouslySetInnerHTML={{ __html: `(${redirect.toString()})(${args})` }} />;
}
