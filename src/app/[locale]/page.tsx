import { setRequestLocale } from "next-intl/server";
import { Navbar } from "@/components/sections/Navbar";
import { Hero } from "@/components/sections/Hero";
import { Problem } from "@/components/sections/Problem";
import { Solution } from "@/components/sections/Solution";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { Validation } from "@/components/sections/Validation";
import { Benefits } from "@/components/sections/Benefits";
import { About } from "@/components/sections/About";
import { Blog } from "@/components/sections/Blog";
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
        <Solution />
        <HowItWorks />
        <Benefits />
        <Validation />
        <About />
        <Blog />
        <CTA />
      </main>
      <Footer />
    </>
  );
}
