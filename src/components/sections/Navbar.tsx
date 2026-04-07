"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { BugSenseIcon } from "@/components/ui/logo";

const navLinks = [
  { href: "#how-it-works", label: "How It Works" },
  { href: "#evidence", label: "Evidence" },
  { href: "#benefits", label: "Who It's For" },
  { href: "#about", label: "About" },
];

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 border-b transition-all duration-300 ${
        scrolled
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

        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-xs text-white/50 font-semibold uppercase tracking-wider hover:text-white transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </div>

        <Button
          render={<Link href="#contact" />}
          size="sm"
          className="hidden md:inline-flex"
        >
          Request a Pilot
        </Button>

        <button
          className="md:hidden text-white/60 hover:text-white transition-colors"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {mobileOpen && (
        <div className="md:hidden border-t border-white/10 bg-p-900/95 backdrop-blur-md px-6 pb-6 pt-4">
          <div className="mx-auto max-w-[1100px] flex flex-col gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm text-white/50 font-semibold uppercase tracking-wider hover:text-white transition-colors py-2.5"
                onClick={() => setMobileOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <Button
              render={<Link href="#contact" />}
              className="mt-3 w-full"
              onClick={() => setMobileOpen(false)}
            >
              Request a Pilot
            </Button>
          </div>
        </div>
      )}
    </nav>
  );
}
