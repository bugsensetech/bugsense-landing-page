"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";

// Set to true when analytics or marketing tools are integrated.
// While false, the banner is hidden from users and only visible in development.
const HAS_NON_ESSENTIAL_COOKIES = false;

type CookiePreferences = {
  necessary: true;
  analytics: boolean;
  marketing: boolean;
};

const COOKIE_NAME = "bugsense_consent";
const COOKIE_MAX_AGE = 365 * 24 * 60 * 60; // 1 year

function getConsent(): CookiePreferences | null {
  if (typeof document === "undefined") return null;
  const match = document.cookie
    .split("; ")
    .find((c) => c.startsWith(`${COOKIE_NAME}=`));
  if (!match) return null;
  try {
    return JSON.parse(decodeURIComponent(match.split("=")[1]));
  } catch {
    return null;
  }
}

function setConsent(prefs: CookiePreferences) {
  document.cookie = `${COOKIE_NAME}=${encodeURIComponent(JSON.stringify(prefs))};path=/;max-age=${COOKIE_MAX_AGE};SameSite=Lax`;
}

export function CookieConsent() {
  const t = useTranslations("cookieConsent");
  const [visible, setVisible] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [analytics, setAnalytics] = useState(false);
  const [marketing, setMarketing] = useState(false);

  useEffect(() => {
    if (!getConsent()) setVisible(true);

    function handleReset() {
      setShowDetails(false);
      setAnalytics(false);
      setMarketing(false);
      setVisible(true);
    }

    window.addEventListener("cookie-consent-reset", handleReset);
    return () =>
      window.removeEventListener("cookie-consent-reset", handleReset);
  }, []);

  function accept(prefs: CookiePreferences) {
    setConsent(prefs);
    setVisible(false);
  }

  function acceptAll() {
    accept({ necessary: true, analytics: true, marketing: true });
  }

  function rejectAll() {
    accept({ necessary: true, analytics: false, marketing: false });
  }

  function saveCustom() {
    accept({ necessary: true, analytics, marketing });
  }

  if (!visible || !HAS_NON_ESSENTIAL_COOKIES) return null;

  return (
    <div
      role="dialog"
      aria-label={t("title")}
      className="fixed bottom-0 inset-x-0 z-[9999] p-4 sm:p-6"
    >
      <div className="mx-auto max-w-[680px] rounded-2xl border border-p-100 bg-white shadow-2xl shadow-p-900/10 p-5 sm:p-6 relative">
        {/* Dev note — same style as "needs verification" banners */}
        <span className="absolute top-2 right-2 text-[10px] font-bold text-red-400 bg-red-500/20 px-2 py-0.5 uppercase tracking-wider">
          {t("devNote")}
        </span>

        <p className="text-sm font-semibold text-p-900 mb-1">{t("title")}</p>
        <p className="text-xs text-muted-custom leading-relaxed mb-4">
          {t("description")}
        </p>

        {showDetails && (
          <div className="mb-4 space-y-3 rounded-xl bg-off p-4">
            {/* Necessary — always on */}
            <label className="flex items-center justify-between text-xs">
              <span>
                <span className="font-semibold text-p-900">
                  {t("necessary")}
                </span>
                <span className="block text-muted-custom mt-0.5">
                  {t("necessaryDesc")}
                </span>
              </span>
              <input
                type="checkbox"
                checked
                disabled
                className="accent-p-600 h-4 w-4 shrink-0 ml-4"
              />
            </label>

            {/* Analytics */}
            <label className="flex items-center justify-between text-xs cursor-pointer">
              <span>
                <span className="font-semibold text-p-900">
                  {t("analytics")}
                </span>
                <span className="block text-muted-custom mt-0.5">
                  {t("analyticsDesc")}
                </span>
              </span>
              <input
                type="checkbox"
                checked={analytics}
                onChange={(e) => setAnalytics(e.target.checked)}
                className="accent-p-600 h-4 w-4 shrink-0 ml-4"
              />
            </label>

            {/* Marketing */}
            <label className="flex items-center justify-between text-xs cursor-pointer">
              <span>
                <span className="font-semibold text-p-900">
                  {t("marketing")}
                </span>
                <span className="block text-muted-custom mt-0.5">
                  {t("marketingDesc")}
                </span>
              </span>
              <input
                type="checkbox"
                checked={marketing}
                onChange={(e) => setMarketing(e.target.checked)}
                className="accent-p-600 h-4 w-4 shrink-0 ml-4"
              />
            </label>
          </div>
        )}

        <div className="flex flex-wrap items-center gap-2">
          {showDetails ? (
            <button
              onClick={saveCustom}
              className="rounded-lg bg-p-600 px-4 py-2 text-xs font-semibold text-white hover:bg-p-800 transition-colors"
            >
              {t("savePreferences")}
            </button>
          ) : (
            <button
              onClick={() => setShowDetails(true)}
              className="rounded-lg border border-p-200 px-4 py-2 text-xs font-semibold text-p-900 hover:bg-p-50 transition-colors"
            >
              {t("customize")}
            </button>
          )}
          <button
            onClick={rejectAll}
            className="rounded-lg border border-p-200 px-4 py-2 text-xs font-semibold text-p-900 hover:bg-p-50 transition-colors"
          >
            {t("rejectAll")}
          </button>
          <button
            onClick={acceptAll}
            className="rounded-lg bg-p-600 px-4 py-2 text-xs font-semibold text-white hover:bg-p-800 transition-colors"
          >
            {t("acceptAll")}
          </button>
        </div>
      </div>
    </div>
  );
}
