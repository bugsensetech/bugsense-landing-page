"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, FlaskConical } from "lucide-react";
import { useEffect, useRef, useState } from "react";

const stats = [
  { value: "12h", label: "Full result" },
  { value: "100%", label: "Sensitivity" },
  { value: "n=142", label: "Clinical samples" },
];

export function Hero() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [stage, setStage] = useState(0);
  // stage 0: nothing visible
  // stage 1: headline
  // stage 2: badge + description
  // stage 3: buttons + stats
  // stage 4: video fades in

  useEffect(() => {
    // Start the cascade
    const t1 = setTimeout(() => setStage(1), 150);
    const t2 = setTimeout(() => setStage(2), 900);
    const t3 = setTimeout(() => setStage(3), 900);

    // Video: fade in when it can play, but not before stage 3
    const video = videoRef.current;
    let videoReady = false;
    let stage3Reached = false;

    const showVideo = () => {
      if (videoReady && stage3Reached) {
        setStage(4);
      }
    };

    const onCanPlay = () => {
      videoReady = true;
      showVideo();
    };

    // After stage 3 delay + a small buffer
    const t4 = setTimeout(() => {
      stage3Reached = true;
      showVideo();
    }, 1800);

    if (video) {
      video.addEventListener("canplay", onCanPlay);
      // If already ready (cached)
      if (video.readyState >= 3) {
        videoReady = true;
      }
    }

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
      video?.removeEventListener("canplay", onCanPlay);
    };
  }, []);

  const fade = (fromStage: number) =>
    `transition-all duration-700 ease-out ${
      stage >= fromStage
        ? "opacity-100 translate-y-0"
        : "opacity-0 translate-y-4"
    }`;

  return (
    <section className="relative min-h-[100vh] bg-p-900 overflow-hidden flex items-center">
      {/* Video — full bleed, fades in last */}
      <video
        ref={videoRef}
        autoPlay
        loop
        muted
        playsInline
        className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-[1500ms] ease-out ${
          stage >= 4 ? "opacity-50" : "opacity-0"
        }`}
      >
        <source src="/hero-video.m4v" type="video/mp4" />
      </video>

      {/* Overlay */}
      <div className="absolute inset-0 bg-p-900/50" />

      <div className="relative z-10 mx-auto max-w-[1100px] px-6 lg:px-12 w-full py-32">
        <div className="max-w-xl">
          {/* Badge */}
          <div className={`inline-flex items-center gap-2.5 border border-white/[0.6] px-4 py-2 mb-10 ${fade(2)}`}>
            <span className="w-1.5 h-1.5 bg-t-400 animate-[pulse-dot_2s_infinite]" />
            <span className="text-xs font-bold text-white/80 tracking-[0.1em] uppercase">
              Published · Microbiology Spectrum (ASM, 2025)
            </span>
          </div>

          <h1 className={`text-5xl sm:text-6xl lg:text-[80px] font-extrabold text-white leading-[0.95] tracking-tighter mb-6 ${fade(1)}`}>
            The Lab in
            <br />
            <span className="text-p-400">Your Hands</span>
          </h1>

          <p className={`text-lg text-white max-w-lg leading-relaxed mb-10 ${fade(2)}`}>
            UTI treatment is a{" "}
            <strong className="text-white font-semibold">guess</strong>.
            Clinicians prescribe empirically and get it wrong up to 50% of the
            time. BugSense delivers complete microbiological diagnostics —
            pathogen ID, bacterial load, and antibiotic resistance — at the
            point of care, in 12 hours, on paper.
          </p>

          <div className={`flex flex-wrap gap-2 mb-16 ${fade(3)}`}>
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
          <div className={`flex items-stretch ${fade(3)}`}>
            {stats.map((stat, i) => (
              <div key={stat.label} className="flex items-stretch">
                {i > 0 && (
                  <div className="w-px bg-white/30 mx-7 hidden sm:block" />
                )}
                {i > 0 && <div className="w-5 sm:hidden" />}
                <div>
                  <div className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
                    {stat.value}
                  </div>
                  <div className="text-xs text-white/70 mt-1 font-semibold uppercase tracking-wider">
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
