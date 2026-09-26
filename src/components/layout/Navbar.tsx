"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { MessageCircle, Menu, X, Laptop, Smartphone, MapPin } from "lucide-react";
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

  const navLinks = [
    { label: "Laptops & Workstations", href: "/laptops", icon: Laptop },
    { label: "Phones & Gadgets", href: "/phones", icon: Smartphone },
    { label: "Inventory Catalog", href: "/products" },
    { label: "Custom Request", href: "/request" },
    { label: "Store Contact", href: "/contact", icon: MapPin },
  ];

  return (
    <header
      className={`fixed top-0 z-50 w-full transition-all duration-300 ${
        scrolled
          ? "border-b border-red-500/15 bg-white/90 dark:bg-[#09090b]/90 backdrop-blur-2xl shadow-lg shadow-red-950/5"
          : "border-b border-black/[0.04] dark:border-white/5 bg-white/60 dark:bg-[#09090b]/60 backdrop-blur-xl"
      }`}
    >
      <div className="mx-auto flex h-18 max-w-7xl items-center justify-between px-6">
        {/* Brand Logo - Hedge Computers 4-Diamond Emblem */}
        <Link href="/" className="group flex items-center gap-3">
          <span className="relative flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br from-zinc-900 via-zinc-950 to-black p-1 shadow-md border border-red-500/30 group-hover:border-red-500/60 group-hover:scale-105 transition-all">
            <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-sm" xmlns="http://www.w3.org/2000/svg">
              <polygon points="50,14 65,29 50,44 35,29" fill="#DC2626" />
              <polygon points="50,56 65,71 50,86 35,71" fill="#FFFFFF" />
              <polygon points="29,35 44,50 29,65 14,50" fill="#FFFFFF" />
              <polygon points="71,35 86,50 71,65 56,50" fill="#FFFFFF" />
              <line x1="24" y1="24" x2="76" y2="76" stroke="#DC2626" strokeWidth="3" strokeLinecap="round" />
              <line x1="76" y1="24" x2="24" y2="76" stroke="#DC2626" strokeWidth="3" strokeLinecap="round" />
            </svg>
            <span className="absolute -top-0.5 -right-0.5 h-2 w-2 rounded-full bg-red-600 animate-ping opacity-75" />
            <span className="absolute -top-0.5 -right-0.5 h-2 w-2 rounded-full bg-red-600" />
          </span>
          <div className="flex flex-col">
            <span className="text-lg font-black tracking-tight text-zinc-900 dark:text-white flex items-center">
              HEDGE<span className="text-red-600 ml-1 font-bold">COMPUTERS</span>
            </span>
            <span className="text-[9px] uppercase tracking-widest text-zinc-500 dark:text-zinc-400 font-semibold -mt-1 flex items-center gap-1">
              <span className="inline-block h-1 w-1 rounded-full bg-emerald-500" />
              Computer Village, Ikeja
            </span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-6 lg:flex">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;

            return (
              <Link
                key={link.href}
                href={link.href}
                className={`text-xs font-medium transition-all relative py-1 ${
                  isActive
                    ? "text-red-600 dark:text-red-500 font-bold"
                    : "text-zinc-600 hover:text-zinc-950 dark:text-zinc-400 dark:hover:text-white"
                }`}
              >
                {link.label}
                {isActive && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-red-600 rounded-full" />
                )}
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
            className="hedge-btn-crimson"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" />
            </span>
            <MessageCircle className="h-3.5 w-3.5" />
            <span>Chat on WhatsApp</span>
          </a>
        </div>

        {/* Mobile Header Controls */}
        <div className="flex items-center gap-2.5 lg:hidden">
          <ThemeToggle />

          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="WhatsApp"
            className="flex h-9 w-9 items-center justify-center rounded-full bg-red-600 text-white shadow-md shadow-red-600/30"
          >
            <MessageCircle className="h-4 w-4" />
          </a>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle Menu"
            className="flex h-9 w-9 items-center justify-center rounded-xl border border-black/10 dark:border-white/10 bg-white/80 dark:bg-zinc-900/80 text-zinc-900 dark:text-zinc-200"
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="border-b border-red-500/20 bg-white/95 dark:bg-[#0c0c10]/95 px-6 py-6 backdrop-blur-2xl lg:hidden shadow-2xl">
          <nav className="flex flex-col space-y-2.5">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center justify-between rounded-xl px-4 py-3 text-sm font-medium transition-colors ${
                    isActive
                      ? "bg-red-600 text-white font-semibold"
                      : "text-zinc-700 dark:text-zinc-300 hover:bg-black/5 dark:hover:bg-white/5"
                  }`}
                >
                  <span className="flex items-center gap-2.5">
                    {link.icon && <link.icon className="w-4 h-4 opacity-75" />}
                    {link.label}
                  </span>
                </Link>
              );
            })}

            <div className="pt-4 border-t border-black/10 dark:border-white/10">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setMobileMenuOpen(false)}
                className="hedge-btn-crimson w-full py-3"
              >
                <MessageCircle className="h-4 w-4" />
                <span>Chat with Computer Village Store</span>
              </a>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}