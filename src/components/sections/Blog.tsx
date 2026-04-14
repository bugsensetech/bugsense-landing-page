"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { useTranslations, useLocale } from "next-intl";
import { Section } from "@/components/ui/section";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import rawBlogItems from "@/../content/blog.json";

type PostType = "news" | "video" | "podcast" | "blog";
type Localizable = string | { en: string; de: string };

interface RawBlogPost {
  id: string;
  type: PostType;
  title: Localizable;
  body: Localizable;
  link: Localizable;
  image?: string;
  embedUrl?: string;
}

interface BlogPost {
  id: string;
  type: PostType;
  title: string;
  body: string;
  link: string;
  image?: string;
  embedUrl?: string;
}

function resolve(value: Localizable, locale: string): string {
  if (typeof value === "string") return value;
  return (value as Record<string, string>)[locale] ?? value.en;
}

function localizePosts(raw: RawBlogPost[], locale: string): BlogPost[] {
  return raw.map((item) => ({
    ...item,
    title: resolve(item.title, locale),
    body: resolve(item.body, locale),
    link: resolve(item.link, locale),
  }));
}

const ITEMS_PER_PAGE = 4;
const AUTO_ADVANCE_MS = 12000;

/* ── CTA label per type ──────────────────────────────────────── */

function useCtaLabel(type: PostType) {
  const t = useTranslations("blog");
  const map: Record<PostType, string> = {
    news: t("ctaNews"),
    video: t("ctaVideo"),
    podcast: t("ctaPodcast"),
    blog: t("ctaBlog"),
  };
  return map[type] ?? t("ctaNews");
}

/* ── Progress bar ────────────────────────────────────────────── */

function ProgressBar({ running, duration }: { running: boolean; duration: number }) {
  return (
    <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-white/10" role="presentation">
      <div
        className={`h-full bg-white/60 ${running ? "animate-[progress-fill_linear_forwards]" : "w-0"}`}
        style={running ? { animationDuration: `${duration}ms` } : undefined}
      />
    </div>
  );
}

/* ── Desktop: accordion panel ────────────────────────────────── */

function Panel({
  item,
  isActive,
  onActivate,
  index,
  total,
  autoAdvancing,
  onHover,
  onLeave,
}: {
  item: BlogPost;
  isActive: boolean;
  onActivate: () => void;
  index: number;
  total: number;
  autoAdvancing: boolean;
  onHover: () => void;
  onLeave: () => void;
}) {
  const ctaLabel = useCtaLabel(item.type);

  const roundedClass =
    index === 0
      ? "rounded-l-lg"
      : index === total - 1
        ? "rounded-r-lg"
        : "";

  return (
    <article
      role="button"
      tabIndex={0}
      onClick={onActivate}
      onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); onActivate(); } }}
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
      onFocus={onHover}
      onBlur={onLeave}
      aria-label={item.title}
      className={`relative overflow-hidden cursor-pointer transition-[flex] duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] h-[340px] outline-none focus-visible:ring-2 focus-visible:ring-p-400 ${roundedClass} ${
        isActive ? "flex-[5]" : "flex-[1]"
      }`}
    >
      {/* Background */}
      <div className="absolute inset-0 bg-p-900">
        {item.image && (
          <img
            src={item.image}
            alt={item.title}
            className={`absolute inset-0 w-full h-full object-cover transition-[opacity,transform] duration-700 ${
              isActive ? "scale-105 opacity-50" : "scale-110 opacity-25"
            }`}
          />
        )}
        <div
          className={`absolute inset-0 ${
            isActive
              ? "bg-gradient-to-t from-black/80 via-black/40 to-transparent"
              : "bg-gradient-to-t from-black/90 via-black/60 to-black/40"
          }`}
        />
      </div>

      {/* Collapsed: rotated title strip */}
      <div
        aria-hidden={isActive}
        className={`absolute inset-0 flex items-end justify-center pb-6 transition-opacity duration-300 ${
          isActive ? "opacity-0 pointer-events-none" : "opacity-100"
        }`}
      >
        <span
          className="text-[13px] font-bold text-white/80 tracking-wide overflow-hidden max-h-[260px] line-clamp-2"
          style={{ writingMode: "vertical-rl", transform: "rotate(180deg)" }}
        >
          {item.title}
        </span>
      </div>

      {/* Expanded: content */}
      <div
        aria-hidden={!isActive}
        className={`absolute inset-0 flex flex-col justify-end p-6 transition-[opacity,transform] duration-500 ${
          isActive
            ? "opacity-100 translate-y-0 delay-100"
            : "opacity-0 translate-y-3 pointer-events-none"
        }`}
      >
        <h3 className="text-lg font-extrabold text-white leading-snug mb-1.5 line-clamp-2">
          {item.title}
        </h3>

        <p className="text-[13px] text-white/60 leading-relaxed mb-4 line-clamp-2 max-w-sm">
          {item.body}
        </p>

        <a
          href={item.link}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 text-sm font-semibold text-white/90 hover:text-white hover:gap-2.5 transition-all w-fit"
          onClick={(e) => e.stopPropagation()}
        >
          {ctaLabel}
          <ArrowRight className="size-3.5" />
        </a>
      </div>

      {/* Progress bar on active panel */}
      {isActive && (
        <ProgressBar running={autoAdvancing} duration={AUTO_ADVANCE_MS} />
      )}
    </article>
  );
}

/* ── Mobile card ─────────────────────────────────────────────── */

function MobileCard({ item }: { item: BlogPost }) {
  const ctaLabel = useCtaLabel(item.type);

  return (
    <a
      href={item.link}
      target="_blank"
      rel="noopener noreferrer"
      className="group block rounded-xl overflow-hidden bg-p-900 relative aspect-[16/10]"
    >
      {item.image && (
        <img
          src={item.image}
          alt={item.title}
          className="absolute inset-0 w-full h-full object-cover opacity-45 group-active:opacity-55 transition-opacity duration-300"
        />
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent" />

      <div className="absolute inset-0 flex flex-col justify-end p-5">
        <h3 className="text-base font-extrabold text-white leading-snug mb-1.5 line-clamp-2">
          {item.title}
        </h3>
        <p className="text-[13px] text-white/55 leading-relaxed line-clamp-2 mb-4">
          {item.body}
        </p>
        <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-white/80 group-active:text-white transition-colors">
          {ctaLabel}
          <ArrowRight className="size-3.5" />
        </span>
      </div>
    </a>
  );
}

/* ── Pagination dots ─────────────────────────────────────────── */

function PageDots({
  total,
  current,
  onSelect,
}: {
  total: number;
  current: number;
  onSelect: (page: number) => void;
}) {
  if (total <= 1) return null;
  return (
    <div className="flex items-center gap-1.5" role="tablist" aria-label="Pages">
      {Array.from({ length: total }, (_, i) => (
        <button
          key={i}
          role="tab"
          aria-selected={i === current}
          onClick={() => onSelect(i)}
          className={`rounded-full transition-all duration-300 ${
            i === current
              ? "w-5 h-1.5 bg-p-600"
              : "w-1.5 h-1.5 bg-p-200 hover:bg-p-300"
          }`}
          aria-label={`Page ${i + 1}`}
        />
      ))}
    </div>
  );
}

/* ── Visually hidden SEO block ───────────────────────────────── */

function SeoContent({ items }: { items: BlogPost[] }) {
  return (
    <div className="sr-only">
      {items.map((item) => (
        <article key={item.id}>
          <h3>{item.title}</h3>
          <p>{item.body}</p>
          <a href={item.link}>{item.title}</a>
        </article>
      ))}
    </div>
  );
}

/* ── Main section ────────────────────────────────────────────── */

export function Blog() {
  const t = useTranslations("blog");
  const locale = useLocale();
  const items = localizePosts(rawBlogItems as RawBlogPost[], locale);

  const totalPages = Math.ceil(items.length / ITEMS_PER_PAGE);
  const [page, setPage] = useState(0);
  const [activeInPage, setActiveInPage] = useState(0);
  const [autoAdvancing, setAutoAdvancing] = useState(true);
  const [hovered, setHovered] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const pauseTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const pageItems = items.slice(
    page * ITEMS_PER_PAGE,
    page * ITEMS_PER_PAGE + ITEMS_PER_PAGE
  );

  const advance = useCallback(() => {
    setActiveInPage((prev) => {
      const next = prev + 1;
      if (next >= pageItems.length) {
        setPage((p) => (p + 1 >= totalPages ? 0 : p + 1));
        return 0;
      }
      return next;
    });
  }, [pageItems.length, totalPages]);

  // Auto-advance timer — pauses on hover/focus
  useEffect(() => {
    if (!autoAdvancing || hovered) return;
    timerRef.current = setTimeout(advance, AUTO_ADVANCE_MS);
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [activeInPage, page, autoAdvancing, hovered, advance]);

  const handleManualSelect = useCallback(
    (index: number) => {
      setActiveInPage(index);
      setAutoAdvancing(false);
      if (pauseTimeoutRef.current) clearTimeout(pauseTimeoutRef.current);
      pauseTimeoutRef.current = setTimeout(() => setAutoAdvancing(true), 15000);
    },
    []
  );

  const goToPage = useCallback(
    (p: number) => {
      setPage(p);
      setActiveInPage(0);
      setAutoAdvancing(false);
      if (pauseTimeoutRef.current) clearTimeout(pauseTimeoutRef.current);
      pauseTimeoutRef.current = setTimeout(() => setAutoAdvancing(true), 15000);
    },
    []
  );

  const prevPage = () => goToPage(page - 1 < 0 ? totalPages - 1 : page - 1);
  const nextPage = () => goToPage(page + 1 >= totalPages ? 0 : page + 1);

  return (
    <Section id="blog" className="py-24 lg:py-32 bg-white border-t border-p-100/40">
      {/* Hidden SEO content — all items always in DOM for crawlers */}
      <SeoContent items={items} />

      {/* Header row with pagination controls */}
      <div className="flex items-end justify-between mb-8 md:mb-12">
        <div className="max-w-2xl">
          <span className="text-xs font-bold tracking-[0.12em] uppercase text-p-600 mb-4 block">
            {t("label")}
          </span>
          <h2 className="text-4xl sm:text-5xl font-extrabold text-p-900 tracking-tight leading-tight">
            {t("title")}
          </h2>
        </div>

        {totalPages > 1 && (
          <div className="hidden md:flex items-center gap-3">
            <button
              onClick={prevPage}
              className="size-8 rounded-full border border-p-100 flex items-center justify-center text-p-900/40 hover:text-p-900 hover:border-p-200 transition-colors"
              aria-label="Previous page"
            >
              <ChevronLeft className="size-4" />
            </button>
            <PageDots total={totalPages} current={page} onSelect={goToPage} />
            <button
              onClick={nextPage}
              className="size-8 rounded-full border border-p-100 flex items-center justify-center text-p-900/40 hover:text-p-900 hover:border-p-200 transition-colors"
              aria-label="Next page"
            >
              <ChevronRight className="size-4" />
            </button>
          </div>
        )}
      </div>

      {/* Desktop accordion */}
      <div className="hidden md:flex gap-1" role="region" aria-label={t("label")}>
        {pageItems.map((item, i) => (
          <Panel
            key={item.id}
            item={item}
            isActive={i === activeInPage}
            onActivate={() => handleManualSelect(i)}
            index={i}
            total={pageItems.length}
            autoAdvancing={autoAdvancing && !hovered}
            onHover={() => setHovered(true)}
            onLeave={() => setHovered(false)}
          />
        ))}
      </div>

      {/* Mobile vertical list */}
      <div className="md:hidden flex flex-col gap-4">
        {items.map((item) => (
          <MobileCard key={item.id} item={item} />
        ))}
      </div>
    </Section>
  );
}
