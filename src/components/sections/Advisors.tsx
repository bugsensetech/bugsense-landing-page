import Image from "next/image";
import { Section } from "@/components/ui/section";

const advisors = [
  {
    name: "Prof. Oliver Hayden",
    role: "Heinz-Nixdorf Chair for Biomedical Electronics, TUM",
    image: "/advisors/hayden.png",
  },
  {
    name: "Dr. Henning Sabersky-Muessigbrodt",
    role: "Senior Clinician, Urology & Infectious Disease",
    initials: "HS",
  },
  {
    name: "Prof. Clarissa Prazeres da Costa",
    role: "Director, Center of Global Health, TUM",
    image: "/advisors/costa.png",
  },
  {
    name: "Prof. Nina Wantia",
    role: "Head of Clinical Microbiology, MRI Munich",
    image: "/advisors/wantia.png",
  },
];

export function Advisors() {
  return (
    <Section className="py-24 lg:py-32">
      <div className="max-w-2xl mb-14">
        <span className="text-xs font-bold tracking-[0.12em] uppercase text-p-600 mb-4 block">
          Scientific advisory board
        </span>
        <h2 className="text-4xl sm:text-5xl font-extrabold text-p-900 tracking-tight leading-tight">
          Guided by world-class
          <br />
          clinical expertise.
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
              {a.role}
            </p>
          </div>
        ))}
      </div>
    </Section>
  );
}
