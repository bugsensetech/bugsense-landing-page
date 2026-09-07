"use client";

import { useEffect, useState } from "react";
import { LOCALE_STORAGE_KEY } from "@/lib/constants";

const COPY = {
  en: {
    title: "404 · Page not found",
    body: "The page you are looking for does not exist or has moved.",
    cta: "Back to homepage",
  },
  de: {
    title: "404 · Seite nicht gefunden",
    body: "Die gesuchte Seite existiert nicht oder wurde verschoben.",
    cta: "Zur Startseite",
  },
} as const;

type Locale = keyof typeof COPY;

function detectLocale(): Locale {
  const path = window.location.pathname;
  if (/^\/de(\/|$)/.test(path)) return "de";
  if (/^\/en(\/|$)/.test(path)) return "en";
  try {
    if (window.localStorage.getItem(LOCALE_STORAGE_KEY) === "de") return "de";
  } catch {
    // Storage unavailable — fall through to the default.
  }
  return "en";
}

export function NotFoundContent() {
  const [locale, setLocale] = useState<Locale>("en");

  useEffect(() => {
    const detected = detectLocale();
    document.documentElement.lang = detected;
    // eslint-disable-next-line react-hooks/set-state-in-effect -- URL and storage are only readable on the client
    setLocale(detected);
  }, []);

  const copy = COPY[locale];

  return (
    <main style={{ padding: 24, maxWidth: 480 }}>
      <h1 style={{ fontSize: 32, fontWeight: 800, letterSpacing: "-0.02em", margin: "0 0 12px" }}>
        {copy.title}
      </h1>
      <p style={{ margin: "0 0 24px", fontSize: 14, lineHeight: 1.6, opacity: 0.7 }}>
        {copy.body}
      </p>
      <a
        href={`/${locale}/`}
        style={{
          color: "#fff",
          fontWeight: 600,
          textDecoration: "none",
          padding: "10px 18px",
          background: "#534AB7",
          display: "inline-block",
        }}
      >
        {copy.cta}
      </a>
    </main>
  );
}
