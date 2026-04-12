import { setRequestLocale } from "next-intl/server";
import { useTranslations } from "next-intl";
import { Section } from "@/components/ui/section";
import { Navbar } from "@/components/sections/Navbar";
import { Footer } from "@/components/sections/Footer";
import { routing } from "@/i18n/routing";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function ImprintPage({
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
        <ImprintContent />
      </main>
      <Footer />
    </>
  );
}

function ImprintContent() {
  const t = useTranslations("imprint");

  return (
    <Section className="pt-32 pb-20 bg-white">
      <h1 className="text-3xl font-bold text-p-900 mb-10">{t("title")}</h1>

      <div className="space-y-8 text-sm text-text leading-relaxed max-w-2xl">
        <div>
          <h2 className="text-base font-semibold text-p-900 mb-2">
            {t("infoAccordingTo")}
          </h2>
          <p className="font-medium">{t("companyName")}</p>
          <p className="whitespace-pre-line">{t("address")}</p>
        </div>

        <div>
          <h2 className="text-base font-semibold text-p-900 mb-2">
            {t("representedBy")}
          </h2>
          <p>{t("representativeName")}</p>
        </div>

        <div>
          <h2 className="text-base font-semibold text-p-900 mb-2">
            {t("contactTitle")}
          </h2>
          <p>
            E-Mail:{" "}
            <a
              href={`mailto:${t("email")}`}
              className="text-p-700 hover:text-p-900 underline"
            >
              {t("email")}
            </a>
          </p>
          <p>
            Tel:{" "}
            <a
              href={`tel:${t("phone")}`}
              className="text-p-700 hover:text-p-900 underline"
            >
              {t("phone")}
            </a>
          </p>
        </div>

        <div>
          <h2 className="text-base font-semibold text-p-900 mb-2">
            {t("responsibleForContent")}
          </h2>
          <p>{t("responsibleName")}</p>
          <p className="whitespace-pre-line">{t("responsibleAddress")}</p>
        </div>

        <hr className="border-neutral-200" />

        <div>
          <h2 className="text-lg font-semibold text-p-900 mb-4">
            {t("disclaimerTitle")}
          </h2>

          <h3 className="text-base font-semibold text-p-900 mb-2">
            {t("liabilityForContentTitle")}
          </h3>
          <p className="mb-6">{t("liabilityForContent")}</p>

          <h3 className="text-base font-semibold text-p-900 mb-2">
            {t("liabilityForLinksTitle")}
          </h3>
          <p className="mb-6">{t("liabilityForLinks")}</p>

          <h3 className="text-base font-semibold text-p-900 mb-2">
            {t("copyrightTitle")}
          </h3>
          <p>{t("copyright")}</p>
        </div>
      </div>
    </Section>
  );
}
