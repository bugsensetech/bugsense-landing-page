import type { MetadataRoute } from "next";
import { routing } from "@/i18n/routing";
import { localizedUrl } from "@/lib/metadata";

export const dynamic = "force-static";

const pages = ["", "/imprint", "/privacy"];

export default function sitemap(): MetadataRoute.Sitemap {
  return pages.flatMap((page) => {
    const languages = Object.fromEntries(
      routing.locales.map((locale) => [locale, localizedUrl(locale, page)])
    );

    return routing.locales.map((locale) => ({
      url: localizedUrl(locale, page),
      changeFrequency: page === "" ? "monthly" : "yearly",
      priority: page === "" ? 1 : 0.3,
      alternates: { languages },
    }));
  });
}
