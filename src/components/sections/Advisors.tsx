import Image from "next/image";
import { useTranslations } from "next-intl";
import { Section } from "@/components/ui/section";

const advisors: {
  name: string;
  roleKey: "haydenRole" | "saberskyRole" | "costaRole" | "wantiaRole";
  image?: string;
  initials?: string;
}[] = [
  {
    name: "Prof. Oliver Hayden",
    roleKey: "haydenRole",
    image: "/advisors/hayden.png",
  },
  {
    name: "Dr. Henning Sabersky-Muessigbrodt",
    roleKey: "saberskyRole",
    image: "/advisors/sabersky.jpeg",
  },
  {
    name: "Prof. Clarissa Prazeres da Costa",
    roleKey: "costaRole",
    image: "/advisors/costa.png",
  },
  {
    name: "Prof. Nina Wantia",
    roleKey: "wantiaRole",
    image: "/advisors/wantia.png",
  },
];

export function Advisors() {
  const t = useTranslations("advisors");

  return (
    <Section className="py-24 lg:py-32 bg-white">
      <div className="max-w-2xl mb-14">
        <span className="text-xs font-bold tracking-[0.12em] uppercase text-p-600 mb-4 block">
          {t("label")}
        </span>
        <h2 className="text-4xl sm:text-5xl font-extrabold text-p-900 tracking-tight leading-tight">
          {t("title1")}
          <br />
          {t("title2")}
        </h2>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-10">
        {advisors.map((a) => (
          <div key={a.name} className="flex flex-col items-center text-center">
            <div className="w-40 h-40 rounded-full overflow-hidden mb-5">
              {a.image ? (
                <Image
                  src={a.image}
                  alt={a.name}
                  width={160}
                  height={160}
                  className="w-full h-full object-cover object-[center_20%]"
                />
              ) : (
                <div className="w-full h-full bg-p-50 flex items-center justify-center text-4xl font-bold text-p-300">
                  {a.initials}
                </div>
              )}
            </div>
            <h3 className="text-[15px] font-bold text-p-900 leading-snug">
              {a.name}
            </h3>
            <p className="text-sm text-muted-custom leading-relaxed mt-1">
              {t(a.roleKey)}
            </p>
          </div>
        ))}
      </div>
    </Section>
  );
}
