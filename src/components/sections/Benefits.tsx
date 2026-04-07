import { Section } from "@/components/ui/section";

const benefits = [
  {
    audience: "Clinics & Hospitals",
    accentBorder: "border-l-p-600",
    accentColor: "text-p-600",
    title: "Same-day resistance data. Fewer empirical prescriptions.",
    body: (
      <>
        Reduce antibiotic misuse, cut readmission risk, and save an average of{" "}
        <strong className="text-p-900 font-semibold">
          &euro;3,500 per complicated UTI case
        </strong>{" "}
        — with actionable results before the patient leaves.
      </>
    ),
  },
  {
    audience: "Doctors & Specialists",
    accentBorder: "border-l-t-600",
    accentColor: "text-t-600",
    title: "A diagnostic decision by end of day — not day 4.",
    body: "Billable as an in-house laboratory service (IGeL). Prescribe with confidence. No more chasing the lab or starting empirical treatment and hoping for the best.",
  },
  {
    audience: "Pharmacies",
    accentBorder: "border-l-p-400",
    accentColor: "text-p-400",
    title: "A new, differentiated health service for walk-in patients.",
    body: "No lab send-out required. Results same day. A compelling reason to return — and to choose your pharmacy over online alternatives.",
  },
  {
    audience: "Patients",
    accentBorder: "border-l-t-400",
    accentColor: "text-t-400",
    title: "The right antibiotic. The first time.",
    body: (
      <>
        No 4-day wait. No second failed prescription.{" "}
        <strong className="text-p-900 font-semibold">
          1 in 2 UTI patients today is treated with the wrong drug
        </strong>{" "}
        — BugSense ends that guessing game.
      </>
    ),
  },
];

export function Benefits() {
  return (
    <Section id="benefits" className="py-24 lg:py-32 bg-off border-t border-p-100/40">
      <div className="max-w-2xl mb-14">
        <span className="text-xs font-bold tracking-[0.12em] uppercase text-t-600 mb-4 block">
          Who benefits
        </span>
        <h2 className="text-4xl sm:text-5xl font-extrabold text-p-900 tracking-tight leading-tight">
          Built for the whole
          <br />
          care pathway.
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-p-100/50">
        {benefits.map((b) => (
          <div
            key={b.audience}
            className={`bg-white px-8 py-9 border-l-3 ${b.accentBorder} hover:-translate-y-0.5 transition-transform duration-200`}
          >
            <span
              className={`text-xs font-bold uppercase tracking-[0.1em] ${b.accentColor} block mb-4`}
            >
              {b.audience}
            </span>
            <h3 className="text-lg font-bold text-p-900 mb-4 leading-snug">
              {b.title}
            </h3>
            <p className="text-[15px] text-muted-custom leading-relaxed">
              {b.body}
            </p>
          </div>
        ))}
      </div>
    </Section>
  );
}
