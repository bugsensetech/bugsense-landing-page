"use client";

import { Button } from "@/components/ui/button";
import { ArrowRight, FlaskConical } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useTranslations } from "next-intl";

export function Hero() {
    const t = useTranslations("hero");
    const videoRef = useRef<HTMLVideoElement>(null);
    const [stage, setStage] = useState(0);
    const [scrolled, setScrolled] = useState(false);

    const stats = [
        { value: t("stat1Value"), label: t("stat1Label") },
        { value: t("stat2Value"), label: t("stat2Label") },
        { value: t("stat3Value"), label: t("stat3Label") },
    ];

    useEffect(() => {
        const t1 = setTimeout(() => setStage(1), 150);
        const t2 = setTimeout(() => setStage(2), 900);
        const t3 = setTimeout(() => setStage(3), 900);

        const video = videoRef.current;
        let videoReady = false;
        let stage3Reached = false;

        const showVideo = () => {
            if (videoReady && stage3Reached) setStage(4);
        };

        const onCanPlay = () => { videoReady = true; showVideo(); };

        const t4 = setTimeout(() => { stage3Reached = true; showVideo(); }, 900);

        if (video) {
            video.addEventListener("canplay", onCanPlay);
            if (video.readyState >= 3) videoReady = true;
        }

        return () => {
            clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); clearTimeout(t4);
            video?.removeEventListener("canplay", onCanPlay);
        };
    }, []);

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 50);
        window.addEventListener("scroll", onScroll, { passive: true });
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    const fade = (fromStage: number) =>
        `transition-all duration-700 ease-out ${
            stage >= fromStage ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
        }`;

    return (
        <section className="relative min-h-[100vh] bg-p-900 overflow-hidden flex items-center justify-center">
            {/* Video as a barely-visible texture */}
            <video
                ref={videoRef}
                autoPlay
                loop
                muted
                playsInline
                preload="metadata"
                poster="/hero-poster.webp"
                className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-[2000ms] ease-out ${
                    stage >= 4 ? "opacity-35" : "opacity-0"
                }`}
            >
                <source src="/hero-video.webm" type="video/webm" />
                <source src="/hero-video.m4v" type="video/mp4" />
            </video>

            {/* Top fade */}
            <div className="absolute top-0 left-0 right-0 h-[25%] bg-gradient-to-b from-p-900 to-transparent" />

            <div className="relative z-10 mx-auto max-w-[900px] px-6 w-full py-32 text-center">
                <h1 className={`text-5xl sm:text-6xl lg:text-[84px] font-extrabold text-white leading-[0.95] tracking-tighter mb-6 ${fade(1)}`}>
                    {t("headlineTop")}
                    <br />
                    <span className="text-p-400">{t("headlineBottom")}</span>
                </h1>

                <p className={`text-lg text-white/70 max-w-2xl mx-auto leading-relaxed mb-10 ${fade(2)}`}>
                    {t("descriptionPrefix")}
                    <strong className="text-white font-semibold">{t("descriptionGuess")}</strong>
                    {t("descriptionSuffix")}
                </p>

                <div className={`flex flex-wrap justify-center gap-2 mb-16 ${fade(3)}`}>
                    <Button render={<a href="#contact" />} size="lg">
                        {t("requestPilot")}
                        <ArrowRight className="size-4" />
                    </Button>
                    <Button render={<a href="#evidence" />} variant="outline" size="lg">
                        <FlaskConical className="size-4" />
                        {t("seeScience")}
                    </Button>
                </div>

                <div className={`flex items-stretch justify-center ${fade(3)}`}>
                    {stats.map((stat, i) => (
                        <div key={stat.label} className="flex items-stretch">
                            {i > 0 && <div className="w-px bg-white/20 mx-7 hidden sm:block" />}
                            {i > 0 && <div className="w-5 sm:hidden" />}
                            <div>
                                <div className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
                                    {stat.value}
                                </div>
                                <div className="text-xs text-white/60 mt-1 font-semibold uppercase tracking-wider">
                                    {stat.label}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Scroll indicator */}
            <div
                className={`absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex items-center gap-3 transition-opacity duration-500 ${
                    scrolled || stage < 3 ? "opacity-0 pointer-events-none" : "opacity-70 hover:opacity-100"
                }`}
            >
                <div className="flex flex-col items-center">
          <span className="text-[10px] font-semibold text-white/80 uppercase tracking-[0.2em] mb-2">
            Scroll
          </span>
                    <div className="w-[1.5px] h-8 bg-white/30 relative overflow-hidden">
                        <div className="w-full h-3 bg-white absolute animate-[scroll-down_1.5s_ease-in-out_infinite]" />
                    </div>
                </div>
            </div>
        </section>
    );
}
