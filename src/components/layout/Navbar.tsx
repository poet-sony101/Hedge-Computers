"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { MessageCircle, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SITE_CONFIG } from "@/constants/site";
import { getGeneralInquiryUrl } from "@/utils/whatsapp";
import ThemeToggle from "@/components/theme/ThemeToggle";

export default function Navbar() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const whatsappUrl = getGeneralInquiryUrl();

  return (
    <header
      className={`fixed top-0 z-50 w-full transition-all duration-300 ${
        scrolled
          ? "border-b border-black/[0.08] dark:border-white/10 bg-[#f5f5f7]/85 dark:bg-black/80 backdrop-blur-2xl shadow-sm dark:shadow-black/40"
          : "border-b border-black/[0.04] dark:border-white/5 bg-[#f5f5f7]/60 dark:bg-black/40 backdrop-blur-xl"
      }`}
    >
      <div className="mx-auto flex h-18 max-w-7xl items-center justify-between px-6">
        {/* Brand Logo */}
        <Link href="/" className="group flex items-center gap-2.5">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-zinc-800 to-zinc-950 dark:from-zinc-100 dark:to-zinc-300 text-white dark:text-zinc-900 shadow-sm border border-black/10 dark:border-white/20 group-hover:scale-105 transition-all">
            <svg
              className="h-4 w-4 fill-current"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M12 2L2 22h4.5l2.25-5h6.5l2.25 5H22L12 2zm0 6.5l2.2 4.5h-4.4L12 8.5z" />
            </svg>
          </span>
          <div className="flex flex-col">
            <span className="text-lg font-bold tracking-tight text-[#1d1d1f] dark:text-white flex items-center gap-1">
              Available<span className="font-light text-zinc-500 dark:text-zinc-400">Tech</span>
            </span>
            <span className="text-[9px] uppercase tracking-widest text-zinc-500 dark:text-zinc-400 -mt-1 font-semibold">
              Ikeja • Lagos
            </span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-7 md:flex">
          {SITE_CONFIG.navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`text-xs font-medium transition-colors ${
                  isActive
                    ? "text-[#1d1d1f] dark:text-white font-semibold"
                    : "text-zinc-600 hover:text-[#1d1d1f] dark:text-zinc-400 dark:hover:text-white"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* Desktop Action Area: Theme Toggle & WhatsApp */}
        <div className="hidden items-center gap-3 md:flex">
          <ThemeToggle />

          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block"
          >
            <Button className="rounded-full bg-[#1d1d1f] hover:bg-black text-white dark:bg-white dark:text-black dark:hover:bg-zinc-200 text-xs font-semibold px-4 py-2 shadow-sm border border-black/10 dark:border-white/10 transition-transform active:scale-95">
              <MessageCircle className="mr-1.5 h-3.5 w-3.5 text-emerald-500" />
              Inquire on WhatsApp
            </Button>
          </a>
        </div>

        {/* Mobile Header Controls */}
        <div className="flex items-center gap-2.5 md:hidden">
          <ThemeToggle />

          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="WhatsApp"
            className="flex h-9 w-9 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20"
          >
            <MessageCircle className="h-4 w-4" />
          </a>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle Menu"
            className="flex h-9 w-9 items-center justify-center rounded-xl border border-black/10 dark:border-white/10 bg-white/60 dark:bg-zinc-900/60 text-[#1d1d1f] dark:text-zinc-200"
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="border-b border-black/[0.08] dark:border-white/10 bg-[#f5f5f7]/95 dark:bg-zinc-950/95 px-6 py-6 backdrop-blur-2xl md:hidden">
          <nav className="flex flex-col space-y-3">
            {SITE_CONFIG.navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center justify-between rounded-xl px-4 py-2.5 text-sm font-medium transition-colors ${
                    isActive
                      ? "bg-black/5 dark:bg-white/10 text-[#1d1d1f] dark:text-white font-semibold"
                      : "text-zinc-600 dark:text-zinc-300 hover:bg-black/5 dark:hover:bg-white/5"
                  }`}
                >
                  <span>{link.label}</span>
                </Link>
              );
            })}

            <div className="pt-3">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setMobileMenuOpen(false)}
                className="flex w-full items-center justify-center gap-2 rounded-full bg-[#1d1d1f] dark:bg-white text-white dark:text-black py-3 text-xs font-semibold shadow-sm"
              >
                <MessageCircle className="h-4 w-4 text-emerald-500" />
                Chat on WhatsApp
              </a>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}