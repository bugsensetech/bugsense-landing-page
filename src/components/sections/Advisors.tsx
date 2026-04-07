import { Section } from "@/components/ui/section";

const advisors = [
  {
    initials: "OH",
    name: "Prof. Oliver Hayden",
    role: "Heinz-Nixdorf Chair for Biomedical Electronics, TUM",
  },
  {
    initials: "HS",
    name: "Dr. Henning Sabersky-Muessigbrodt",
    role: "Senior Clinician, Urology & Infectious Disease",
  },
  {
    initials: "CP",
    name: "Prof. Clarissa Prazeres da Costa",
    role: "Director, Center of Global Health, TUM",
  },
  {
    initials: "NW",
    name: "Prof. Nina Wantia",
    role: "Head of Clinical Microbiology, MRI Munich",
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

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-px bg-p-100/50">
        {advisors.map((a) => (
          <div key={a.initials} className="bg-white p-6 text-center">
            <div className="w-16 h-16 bg-p-50 border border-p-100/40 flex items-center justify-center mx-auto mb-4 text-lg font-bold text-p-600">
              {a.initials}
            </div>
            <h3 className="text-[15px] font-bold text-p-900 mb-1">{a.name}</h3>
            <p className="text-sm text-muted-custom leading-relaxed">
              {a.role}
            </p>
          </div>
        ))}
      </div>
    </Section>
  );
}
