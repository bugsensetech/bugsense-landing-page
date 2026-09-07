import { hasLocale } from "next-intl";
import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { Montserrat } from "next/font/google";
import type { Viewport } from "next";
import { routing } from "@/i18n/routing";
import { CONTACT_EMAIL, SITE_URL } from "@/lib/constants";
import { localizedAlternates, localizedUrl, ogImage } from "@/lib/metadata";
import { CookieConsent } from "@/components/CookieConsent";
import "../globals.css";

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
});

export async function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

// Unknown locales render the root not-found page instead of a dev-time
// "missing param in generateStaticParams" error (required with output: export).
export const dynamicParams = false;

export const viewport: Viewport = {
  themeColor: "#26215C",
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "metadata" });

  return {
    metadataBase: new URL(SITE_URL),
    title: t("title"),
    description: t("description"),
    keywords: t("keywords").split(", "),
    authors: [{ name: "BugSense" }],
    openGraph: {
      title: t("ogTitle"),
      description: t("ogDescription"),
      url: localizedUrl(locale),
      siteName: "BugSense",
      locale: locale === "de" ? "de_DE" : "en_US",
      alternateLocale: locale === "de" ? ["en_US"] : ["de_DE"],
      type: "website",
      images: [ogImage(locale)],
    },
    twitter: {
      card: "summary_large_image",
      title: t("twitterTitle"),
      description: t("twitterDescription"),
      images: [ogImage(locale).url],
    },
    robots: {
      index: true,
      follow: true,
    },
    alternates: localizedAlternates(locale),
    icons: {
      icon: [
        { url: "/icon-96.png", sizes: "96x96", type: "image/png" },
        { url: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { url: "/favicon.svg", type: "image/svg+xml", sizes: "any" },
      ],
      apple: [{ url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  setRequestLocale(locale);

  const messages = await getMessages();

  return (
    <html lang={locale} className={`${montserrat.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "BugSense",
              legalName: "BugSense GbR",
              url: SITE_URL,
              logo: `${SITE_URL}/app-icon-512.png`,
              email: CONTACT_EMAIL,
              description:
                locale === "de"
                  ? "Vollständige mikrobiologische HWI-Diagnostik am Point of Care"
                  : "Complete microbiological UTI diagnostics at the point of care",
              address: {
                "@type": "PostalAddress",
                streetAddress: "Einsteinstr. 25",
                postalCode: "81675",
                addressLocality: "Munich",
                addressCountry: "DE",
              },
              contactPoint: {
                "@type": "ContactPoint",
                email: CONTACT_EMAIL,
                contactType: "sales",
                availableLanguage: ["en", "de"],
              },
              sameAs: [
                "https://www.linkedin.com/company/bugsense-diagnostics/",
                "https://www.instagram.com/bugsense_dx/",
              ],
            }),
          }}
        />
        <NextIntlClientProvider messages={messages}>
          {children}
          <CookieConsent />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
