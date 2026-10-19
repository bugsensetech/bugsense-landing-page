import type { Metadata, Viewport } from "next";
import { routing } from "@/i18n/routing";
import { localizedAlternates } from "@/lib/metadata";
import { LocaleRedirect } from "@/components/LocaleRedirect";

/**
 * Root URL: detect the visitor's locale in the browser and forward to it.
 * Prerendered to out/index.html in the static export; also served by `next dev`.
 * Kept out of the index — the localized pages are the canonical ones.
 */
export const metadata: Metadata = {
  title: "BugSense",
  robots: { index: false, follow: true },
  alternates: localizedAlternates(routing.defaultLocale),
  icons: {
    icon: [
      { url: "/icon-96.png", sizes: "96x96", type: "image/png" },
      { url: "/favicon.svg", type: "image/svg+xml", sizes: "any" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
  },
};

export const viewport: Viewport = {
  themeColor: "#26215C",
};

export default function RootPage() {
  return (
    <html lang={routing.defaultLocale}>
      <body
        style={{
          margin: 0,
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          background: "#26215C",
          color: "#fff",
          fontFamily: "Montserrat, system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif",
        }}
      >
        <LocaleRedirect />
        {/* Visible fallback if scripts are disabled or the redirect fails */}
        <noscript>
          <meta httpEquiv="refresh" content={`0; url=${routing.defaultLocale}/`} />
        </noscript>
        <main style={{ padding: 24 }}>
          <p style={{ margin: "0 0 12px", fontSize: 14, opacity: 0.7 }}>
            Redirecting&hellip; / Weiterleitung&hellip;
          </p>
          {routing.locales.map((locale) => (
            <a
              key={locale}
              href={`${locale}/`}
              hrefLang={locale}
              style={{
                color: "#fff",
                fontWeight: 600,
                textDecoration: "none",
                padding: "8px 14px",
                border: "1px solid rgba(255,255,255,0.25)",
                borderRadius: 6,
                display: "inline-block",
                margin: 4,
              }}
            >
              {locale === "de" ? "Deutsch" : "English"}
            </a>
          ))}
        </main>
      </body>
    </html>
  );
}
