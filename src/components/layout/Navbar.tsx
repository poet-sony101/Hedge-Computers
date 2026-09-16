"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { MessageCircle, Menu, X, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SITE_CONFIG } from "@/constants/site";
import { getGeneralInquiryUrl } from "@/utils/whatsapp";

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
          ? "border-b border-white/10 bg-black/80 backdrop-blur-xl shadow-lg shadow-black/30"
          : "border-b border-white/5 bg-black/40 backdrop-blur-md"
      }`}
    >
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6">
        {/* Brand Logo */}
        <Link href="/" className="group flex items-center gap-2">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-tr from-blue-600 to-sky-400 text-white shadow-md shadow-blue-500/20 group-hover:scale-105 transition-transform">
            <Sparkles className="h-5 w-5" />
          </span>
          <div className="flex flex-col">
            <span className="text-xl font-bold tracking-tight text-white">
              {SITE_CONFIG.shortName}
              <span className="text-blue-500">.</span>
            </span>
            <span className="text-[10px] uppercase tracking-widest text-zinc-400 -mt-1 font-medium">
              Technologies
            </span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-8 md:flex">
          {SITE_CONFIG.navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm font-medium transition-colors hover:text-white ${
                  isActive ? "text-blue-400 font-semibold" : "text-zinc-400"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* Desktop WhatsApp Action */}
        <div className="hidden items-center gap-4 md:flex">
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block"
          >
            <Button className="rounded-full bg-emerald-600 hover:bg-emerald-500 text-white font-medium shadow-lg shadow-emerald-950/40 border border-emerald-500/30">
              <MessageCircle className="mr-2 h-4 w-4" />
              Chat on WhatsApp
            </Button>
          </a>
        </div>

        {/* Mobile Menu Toggle Button */}
        <div className="flex items-center gap-3 md:hidden">
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="WhatsApp"
            className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-600/20 text-emerald-400 border border-emerald-500/30"
          >
            <MessageCircle className="h-5 w-5" />
          </a>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle Menu"
            className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-zinc-900/80 text-zinc-300 hover:text-white"
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="border-b border-white/10 bg-zinc-950/95 px-6 py-6 backdrop-blur-2xl md:hidden">
          <nav className="flex flex-col space-y-4">
            {SITE_CONFIG.navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center justify-between rounded-xl px-4 py-3 text-base font-medium transition-colors ${
                    isActive
                      ? "bg-blue-600/10 text-blue-400 border border-blue-500/20"
                      : "text-zinc-300 hover:bg-white/5 hover:text-white"
                  }`}
                >
                  <span>{link.label}</span>
                </Link>
              );
            })}

            <div className="pt-4">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setMobileMenuOpen(false)}
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-600 py-3.5 font-medium text-white shadow-lg shadow-emerald-950/50"
              >
                <MessageCircle className="h-5 w-5" />
                Chat with Us on WhatsApp
              </a>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}