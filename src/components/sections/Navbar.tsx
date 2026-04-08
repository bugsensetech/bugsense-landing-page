"use client";

import { useState, useEffect } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { BugSenseIcon } from "@/components/ui/logo";
import { LanguageSwitcher } from "@/components/ui/language-switcher";

export function Navbar({ solid = false, showNav = true }: { solid?: boolean; showNav?: boolean }) {
  const t = useTranslations("navbar");
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const navLinks = [
    { href: "#how-it-works", label: t("howItWorks") },
    { href: "#evidence", label: t("evidence") },
    { href: "#benefits", label: t("whoBenefits") },
    { href: "#about", label: t("about") },
  ];

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 border-b transition-all duration-300 ${
        solid || scrolled
          ? "bg-p-900/95 backdrop-blur-md border-white/10"
          : "bg-transparent border-transparent"
      }`}
    >
      <div className="mx-auto max-w-[1100px] px-6 lg:px-12 flex items-center justify-between h-14">
        <Link href="/" className="flex items-center gap-2.5">
          <BugSenseIcon className="w-5 h-5" color="white" />
          <span className="text-sm font-bold text-white tracking-tight">
            BugSense
          </span>
        </Link>

        {showNav && (
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-xs text-white/50 font-semibold uppercase tracking-wider hover:text-white transition-colors"
              >
                {link.label}
              </a>
            ))}
          </div>
        )}

        <div className="hidden md:flex items-center gap-3">
          <LanguageSwitcher />
          {showNav && (
            <Button
              render={<a href="#contact" />}
              size="sm"
            >
              {t("requestPilot")}
            </Button>
          )}
        </div>

        {showNav && (
          <button
            className="md:hidden text-white/60 hover:text-white transition-colors"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        )}
      </div>

      {showNav && mobileOpen && (
        <div className="md:hidden border-t border-white/10 bg-p-900/95 backdrop-blur-md px-6 pb-6 pt-4">
          <div className="mx-auto max-w-[1100px] flex flex-col gap-1">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm text-white/50 font-semibold uppercase tracking-wider hover:text-white transition-colors py-2.5"
                onClick={() => setMobileOpen(false)}
              >
                {link.label}
              </a>
            ))}
            <div className="flex items-center gap-3 mt-3">
              <LanguageSwitcher />
            </div>
            <Button
              render={<a href="#contact" />}
              className="mt-3 w-full"
              onClick={() => setMobileOpen(false)}
            >
              {t("requestPilot")}
            </Button>
          </div>
        </div>
      )}
    </nav>
  );
}
