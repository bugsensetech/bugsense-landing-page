import type { Metadata } from "next";
import { routing } from "@/i18n/routing";
import { SITE_URL } from "@/lib/constants";

/** Absolute, trailing-slash URL for a localized page — matches `trailingSlash: true`. */
export function localizedUrl(locale: string, path = "") {
  return `${SITE_URL}/${locale}${path}/`;
}

/** Static share image per locale — regenerate with scripts/og-image.py when copy changes. */
export function ogImage(locale: string) {
  return {
    url: `${SITE_URL}/og-image-${locale}.png`,
    width: 1200,
    height: 630,
    alt: "BugSense — The Lab in Your Hands",
  };
}

/** canonical + hreflang alternates for a localized page. */
export function localizedAlternates(locale: string, path = ""): Metadata["alternates"] {
  const languages = Object.fromEntries(
    routing.locales.map((l) => [l, localizedUrl(l, path)])
  );
  return {
    canonical: localizedUrl(locale, path),
    languages: {
      ...languages,
      "x-default": localizedUrl(routing.defaultLocale, path),
    },
  };
}

/** Metadata for a secondary page (imprint, privacy, …) that overrides the layout defaults. */
export function pageMetadata({
  locale,
  path,
  title,
  description,
}: {
  locale: string;
  path: string;
  title: string;
  description: string;
}): Metadata {
  return {
    title,
    description,
    alternates: localizedAlternates(locale, path),
    openGraph: {
      title,
      description,
      url: localizedUrl(locale, path),
      siteName: "BugSense",
      locale: locale === "de" ? "de_DE" : "en_US",
      type: "website",
      images: [ogImage(locale)],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage(locale).url],
    },
  };
}
