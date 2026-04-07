import { setRequestLocale } from "next-intl/server";
import { Navbar } from "@/components/sections/Navbar";
import { Hero } from "@/components/sections/Hero";
import { TrustBar } from "@/components/sections/TrustBar";
import { Problem } from "@/components/sections/Problem";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { Validation } from "@/components/sections/Validation";
import { Comparison } from "@/components/sections/Comparison";
import { Benefits } from "@/components/sections/Benefits";
import { About } from "@/components/sections/About";
import { Advisors } from "@/components/sections/Advisors";
import { CTA } from "@/components/sections/CTA";
import { Footer } from "@/components/sections/Footer";

export default async function Home({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Problem />
        <HowItWorks />
        <Validation />
        <Comparison />
        <Benefits />
        <About />
        <TrustBar />
        <Advisors />
        <CTA />
      </main>
      <Footer />
    </>
  );
}
