"use client";

import Image from "next/image";
import { useRef, useState, useEffect, useCallback } from "react";
import { useTranslations } from "next-intl";
import { Section } from "@/components/ui/section";
import { ExternalLink, ChevronLeft, ChevronRight } from "lucide-react";

const partners = [
  { name: "TUM", logo: "/logos/tum.svg", height: 44 },
  { name: "TUM Venture Labs", logo: "/logos/tum-venture-labs.png", height: 38 },
  { name: "MRI", logo: "/logos/mri.png", height: 60 },
  { name: "BMBF", logo: "/logos/bmbf.svg", height: 60 },
  { name: "BMWi", logo: "/logos/bmwi.svg", height: 60 },
  { name: "GO-Bio", logo: "/logos/go-bio.svg", height: 38 },
  { name: "BioM", logo: "/logos/biom.svg", height: 42 },
  { name: "Bavarian Ministry", logo: "/logos/bavarian-ministry.png", height: 38 },
  { name: "Zeidler Forschungsstiftung", logo: "/logos/zeidler.png", height: 50 },
];

export function Validation() {
  const t = useTranslations("traction");

  const metrics = [
    { value: t("metric1Value"), label: t("metric1Label") },
    { value: t("metric2Value"), label: t("metric2Label") },
    { value: t("metric3Value"), label: t("metric3Label") },
    { value: t("metric4Value"), label: t("metric4Label") },
  ];

  return (
    <Section id="traction" className="bg-white py-24 lg:py-32">
      <div className="max-w-2xl mb-14">
        <span className="text-xs font-bold tracking-[0.12em] uppercase text-t-600 mb-4 block">
          {t("label")}
        </span>
        <h2 className="text-4xl sm:text-5xl font-extrabold text-p-900 tracking-tight leading-tight">
          {t("title")}
        </h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-[1fr_1fr_1.4fr_1fr] gap-px bg-p-100/60 mb-4">
        {metrics.map((m) => (
          <div key={m.label} className="bg-white p-8 min-w-0">
            <div className="text-3xl sm:text-4xl font-extrabold text-p-900 tracking-tighter leading-none mb-3 whitespace-nowrap">
              {m.value}
            </div>
            <p className="text-sm text-muted-custom leading-relaxed">
              {m.label}
            </p>
          </div>
        ))}
      </div>

      {/* Publication */}
      <div className="bg-slate-50 border border-slate-200 p-8 sm:p-10 flex flex-col sm:flex-row items-center gap-8 mb-16 mt-12">
        <Image
          src="/logos/microbiology-spectrum.svg"
          alt="American Society for Microbiology"
          width={180}
          height={85}
          className="shrink-0"
          style={{ width: 180, height: "auto" }}
        />
        <div className="hidden sm:block w-px bg-slate-200 self-stretch shrink-0" />
        <div>
          <p className="text-sm text-slate-600 leading-relaxed">
            {t("citationText")}
            <br />
            <strong className="text-slate-900">
              {t("citationSource")}
            </strong>
          </p>
          <a
            href="https://journals.asm.org/doi/10.1128/spectrum.00888-25"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-t-600 mt-3 hover:text-t-500 transition-colors uppercase tracking-wider"
          >
            {t("requestPaper")}
            <ExternalLink className="size-3.5" />
          </a>
        </div>
      </div>

      {/* Backed by */}
      <div>
        <div className="text-center">
          <span className="text-xs font-bold text-muted-custom/50 tracking-[0.12em] uppercase">
            {t("backedBy")}
          </span>
        </div>

        <LogoSlider />
      </div>
    </Section>
  );
}

function LogoSlider() {
  const trackRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);
  const pausedRef = useRef(false);
  const resumeTimerRef = useRef<ReturnType<typeof setTimeout>>(undefined);

  const updateButtons = useCallback(() => {
    const el = trackRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 1);
    setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 1);
  }, []);

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    updateButtons();
    el.addEventListener("scroll", updateButtons, { passive: true });
    window.addEventListener("resize", updateButtons);
    return () => {
      el.removeEventListener("scroll", updateButtons);
      window.removeEventListener("resize", updateButtons);
    };
  }, [updateButtons]);

  // Auto-scroll with seamless loop
  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    const interval = setInterval(() => {
      if (pausedRef.current) return;
      // Half the scrollWidth is one full set of logos
      const half = el.scrollWidth / 2;
      if (el.scrollLeft >= half) {
        el.scrollLeft -= half;
      }
      el.scrollBy({ left: 1, behavior: "auto" });
    }, 30);
    return () => clearInterval(interval);
  }, []);

  function pause() {
    pausedRef.current = true;
    clearTimeout(resumeTimerRef.current);
  }

  function resumeAfterDelay() {
    clearTimeout(resumeTimerRef.current);
    resumeTimerRef.current = setTimeout(() => {
      pausedRef.current = false;
    }, 2000);
  }

  function scroll(direction: "left" | "right") {
    const el = trackRef.current;
    if (!el) return;
    pause();
    el.scrollBy({ left: direction === "left" ? -250 : 250, behavior: "smooth" });
    resumeAfterDelay();
  }

  return (
    <div className="relative">
      <button
        onClick={() => scroll("left")}
        className="absolute left-2 top-1/2 -translate-y-1/2 z-10 size-10 rounded-full backdrop-blur-xl bg-white/60 border flex items-center justify-center cursor-pointer transition-all duration-200 "
        style={{ opacity: canScrollLeft ? 1 : 0, pointerEvents: canScrollLeft ? "auto" : "none" }}
      >
        <ChevronLeft className="size-4" />
      </button>

      <button
        onClick={() => scroll("right")}
        className="absolute right-2 top-1/2 -translate-y-1/2 z-10 size-10 rounded-full backdrop-blur-xl bg-white/60 border  flex items-center justify-center cursor-pointer transition-all duration-200"
        style={{ opacity: canScrollRight ? 1 : 0, pointerEvents: canScrollRight ? "auto" : "none" }}
      >
        <ChevronRight className="size-4" />
      </button>

      {/* Track */}
      <div
        ref={trackRef}
        className="flex items-center gap-14 overflow-x-auto py-6"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        onMouseEnter={pause}
        onMouseLeave={resumeAfterDelay}
        onTouchStart={pause}
        onTouchEnd={resumeAfterDelay}
      >
        {[...partners, ...partners].map((p, i) => (
          <Image
            key={`${p.name}-${i}`}
            src={p.logo}
            alt={p.name}
            width={0}
            height={p.height * 1.2}
            sizes="200px"
            className="h-auto w-auto shrink-0"
            style={{ height: p.height * 1.2, width: "auto" }}
          />
        ))}
      </div>
    </div>
  );
}
