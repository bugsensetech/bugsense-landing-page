"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, FlaskConical } from "lucide-react";

const stats = [
  { value: "12h", label: "Full result" },
  { value: "100%", label: "Sensitivity" },
  { value: "n=142", label: "Clinical samples" },
];

export function Hero() {
  return (
    <section className="relative min-h-[100vh] bg-p-900 overflow-hidden flex items-center">
      {/* Video — full bleed */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover opacity-50"
      >
        <source src="/hero-video.m4v" type="video/mp4" />
      </video>

      {/* Overlay — smooth left-to-right */}
      <div className="absolute inset-0 bg-p-900/30" />
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(105deg, #26215C 0%, #26215Cee 22%, #26215Caa 40%, #26215C55 58%, #26215C22 75%, transparent 100%)",
        }}
      />
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-p-900 to-transparent" />

      <div className="relative z-10 mx-auto max-w-[1100px] px-6 lg:px-12 w-full py-32">
        <div className="max-w-xl">
          {/* Badge */}
          <div className="inline-flex items-center gap-2.5 border border-white/[0.08] px-4 py-2 mb-10">
            <span className="w-1.5 h-1.5 bg-t-400 animate-[pulse-dot_2s_infinite]" />
            <span className="text-xs font-bold text-white/40 tracking-[0.1em] uppercase">
              Published · Microbiology Spectrum (ASM, 2025)
            </span>
          </div>

          <h1 className="text-5xl sm:text-6xl lg:text-[80px] font-extrabold text-white leading-[0.95] tracking-tighter mb-6">
            The Lab in
            <br />
            <span className="text-p-400">Your Hands</span>
          </h1>

          <p className="text-lg text-white/45 max-w-lg leading-relaxed mb-10">
            UTI treatment is a{" "}
            <strong className="text-white/75 font-semibold">guess</strong>.
            Clinicians prescribe empirically and get it wrong up to 50% of the
            time. BugSense delivers complete microbiological diagnostics —
            pathogen ID, bacterial load, and antibiotic resistance — at the
            point of care, in 12 hours, on paper.
          </p>

          <div className="flex flex-wrap gap-2 mb-16">
            <Button render={<Link href="#contact" />} size="lg">
              Request a pilot
              <ArrowRight className="size-4" />
            </Button>
            <Button render={<Link href="#evidence" />} variant="outline" size="lg">
              <FlaskConical className="size-4" />
              See the science
            </Button>
          </div>

          {/* Stats row */}
          <div className="flex items-stretch">
            {stats.map((stat, i) => (
              <div key={stat.label} className="flex items-stretch">
                {i > 0 && (
                  <div className="w-px bg-white/10 mx-7 hidden sm:block" />
                )}
                {i > 0 && <div className="w-5 sm:hidden" />}
                <div>
                  <div className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
                    {stat.value}
                  </div>
                  <div className="text-xs text-white/30 mt-1 font-semibold uppercase tracking-wider">
                    {stat.label}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
