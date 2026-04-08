import { setRequestLocale } from "next-intl/server";
import { useTranslations } from "next-intl";
import { Section } from "@/components/ui/section";
import { Navbar } from "@/components/sections/Navbar";
import { Footer } from "@/components/sections/Footer";
import { routing } from "@/i18n/routing";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function PrivacyPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <Navbar solid showNav={false} />
      <main>
        <PrivacyContent />
      </main>
      <Footer />
    </>
  );
}

function PrivacyContent() {
  const t = useTranslations("privacy");

  return (
    <Section className="pt-32 pb-20 bg-white">
      <h1 className="text-3xl font-bold text-p-900 mb-10">{t("title")}</h1>

      <div className="space-y-8 text-sm text-text leading-relaxed max-w-2xl">
        <div>
          <h2 className="text-base font-semibold text-p-900 mb-2">
            {t("introTitle")}
          </h2>
          <p>{t("intro")}</p>
        </div>

        <div>
          <h2 className="text-base font-semibold text-p-900 mb-2">
            {t("responsibleTitle")}
          </h2>
          <p className="mb-2">{t("responsible")}</p>
          <p className="whitespace-pre-line">{t("responsibleEntity")}</p>
        </div>

        <div>
          <h2 className="text-base font-semibold text-p-900 mb-2">
            {t("dataCollectionTitle")}
          </h2>

          <h3 className="text-sm font-semibold text-p-900 mb-1">
            {t("serverLogsTitle")}
          </h3>
          <p className="mb-4">{t("serverLogs")}</p>

          <h3 className="text-sm font-semibold text-p-900 mb-1">
            {t("contactFormTitle")}
          </h3>
          <p>{t("contactForm")}</p>
        </div>

        <div>
          <h2 className="text-base font-semibold text-p-900 mb-2">
            {t("cookiesTitle")}
          </h2>
          <p>{t("cookies")}</p>
        </div>

        <div>
          <h2 className="text-base font-semibold text-p-900 mb-2">
            {t("rightsTitle")}
          </h2>
          <p>{t("rights")}</p>
        </div>

        <div>
          <h2 className="text-base font-semibold text-p-900 mb-2">
            {t("changesTitle")}
          </h2>
          <p>{t("changes")}</p>
        </div>
      </div>
    </Section>
  );
}
