import type { MetadataRoute } from "next";
import { routing } from "@/i18n/routing";
import { SITE_URL } from "@/lib/constants";

export default function sitemap(): MetadataRoute.Sitemap {
  const languages = Object.fromEntries(
    routing.locales.map((locale) => [locale, `${SITE_URL}/${locale}`])
  );

  return routing.locales.map((locale) => ({
    url: `${SITE_URL}/${locale}`,
    lastModified: "2026-04-08",
    alternates: { languages },
  }));
}
