"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight, MessageCircle, ShieldCheck, Zap, Laptop, Smartphone, Sparkles, Layers } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getGeneralInquiryUrl } from "@/utils/whatsapp";
import { Phone } from "@/types/phone";

interface HeroProps {
  spotlightProduct?: Phone | null;
}

export default function Hero({ spotlightProduct }: HeroProps) {
  const whatsappUrl = getGeneralInquiryUrl();

  return (
    <section className="relative flex min-h-[88vh] items-center overflow-hidden pt-24 pb-16">
      {/* Background Subtle Ambient Glows */}
      <div className="absolute inset-0 -z-10 pointer-events-none">
        <div className="absolute left-1/2 top-10 h-[520px] w-[520px] -translate-x-1/2 rounded-full bg-zinc-300/30 dark:bg-zinc-700/15 blur-[160px]" />
        <div className="absolute bottom-10 right-10 h-72 w-72 rounded-full bg-zinc-400/20 dark:bg-zinc-800/20 blur-[130px]" />
      </div>

      <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 px-6 py-8 md:grid-cols-12">
        {/* Left Column (Content) */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="md:col-span-7 space-y-6 text-left"
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-black/10 dark:border-white/15 bg-white/70 dark:bg-zinc-900/80 px-3.5 py-1 text-xs font-medium text-zinc-700 dark:text-zinc-300 shadow-sm backdrop-blur-md">
            <Zap className="h-3.5 w-3.5 text-zinc-800 dark:text-zinc-200" />
            <span>Smartphones &amp; Laptops • Real-Time Daily Market Pricing</span>
          </div>

          <h1 className="text-4xl font-extrabold tracking-tight text-[#1d1d1f] dark:text-white sm:text-6xl lg:text-7xl leading-[1.08]">
            Phones &amp; Laptops.
            <br />
            <span className="apple-silver-gradient">
              Today&apos;s Best Price.
            </span>
          </h1>

          <p className="max-w-xl text-base sm:text-lg leading-relaxed text-zinc-600 dark:text-zinc-400">
            Verified brand-new and pristine UK-used devices from Apple, Samsung, Dell, Google, and HP. Real-time market alignment with direct WhatsApp pricing.
          </p>

          <div className="flex flex-wrap items-center gap-3 pt-2">
            <Link href="/phones">
              <Button size="lg" className="rounded-full bg-[#1d1d1f] hover:bg-black text-white dark:bg-white dark:text-black dark:hover:bg-zinc-200 px-6 font-semibold text-xs shadow-sm active:scale-95 transition-all">
                <Smartphone className="mr-2 h-4 w-4" />
                Browse Phones
              </Button>
            </Link>

            <Link href="/laptops">
              <Button size="lg" variant="outline" className="rounded-full border-black/10 dark:border-white/15 bg-white dark:bg-zinc-900/80 hover:bg-zinc-100 dark:hover:bg-zinc-800 text-[#1d1d1f] dark:text-white px-6 font-semibold text-xs shadow-sm active:scale-95 transition-all">
                <Laptop className="mr-2 h-4 w-4 text-zinc-700 dark:text-zinc-300" />
                Browse Laptops
              </Button>
            </Link>

            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button
                size="lg"
                variant="outline"
                className="rounded-full border-emerald-500/30 bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-700 dark:text-emerald-400 px-6 font-medium text-xs shadow-sm active:scale-95 transition-all"
              >
                <MessageCircle className="mr-2 h-4 w-4 text-emerald-500" />
                Chat on WhatsApp
              </Button>
            </a>
          </div>

          {/* Quick Trust Highlights */}
          <div className="grid grid-cols-3 gap-4 pt-6 border-t border-black/[0.08] dark:border-white/10">
            <div>
              <p className="text-xl font-bold text-[#1d1d1f] dark:text-white">100%</p>
              <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">Inspected Hardware</p>
            </div>
            <div>
              <p className="text-xl font-bold text-[#1d1d1f] dark:text-white">Real-Time</p>
              <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">Daily Market Rates</p>
            </div>
            <div>
              <p className="text-xl font-bold text-[#1d1d1f] dark:text-white">Nationwide</p>
              <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">Insured Delivery</p>
            </div>
          </div>
        </motion.div>

        {/* Right Column (Visual Showcase) */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="md:col-span-5 flex justify-center"
        >
          <div className="relative w-full max-w-sm">
            {/* Subtle Silver Glow */}
            <div className="absolute inset-0 rounded-[44px] bg-gradient-to-tr from-zinc-300/30 to-zinc-500/20 dark:from-zinc-700/20 dark:to-zinc-800/20 blur-2xl" />

            {/* Showcase Device Card */}
            {spotlightProduct ? (
              <div className="relative overflow-hidden rounded-[36px] border border-black/[0.08] dark:border-white/10 bg-white dark:bg-[#1c1c1e] p-6 backdrop-blur-xl shadow-xl dark:shadow-2xl">
                <div className="flex items-center justify-between pb-4 border-b border-black/[0.06] dark:border-white/5">
                  <span className="text-xs font-semibold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">
                    Spotlight Device
                  </span>
                  <span className="flex items-center gap-1 rounded-full bg-emerald-500/10 px-2.5 py-0.5 text-[11px] font-semibold text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                    <ShieldCheck className="h-3 w-3" />
                    {spotlightProduct.inStock ? "In Stock" : "Available to Order"}
                  </span>
                </div>

                {/* Spotlight Image */}
                <div className="relative my-6 flex h-60 items-center justify-center">
                  <Image
                    src={spotlightProduct.image}
                    alt={spotlightProduct.name}
                    width={240}
                    height={240}
                    className="max-h-52 w-auto object-contain drop-shadow-xl"
                    priority
                  />
                </div>

                <div className="space-y-3">
                  <div className="flex items-baseline justify-between">
                    <h3 className="text-lg font-bold text-[#1d1d1f] dark:text-white">
                      {spotlightProduct.name}
                    </h3>
                    <span className="text-xs font-semibold text-zinc-700 dark:text-zinc-300">
                      {spotlightProduct.storage}
                    </span>
                  </div>
                  <p className="text-xs text-zinc-500 dark:text-zinc-400 line-clamp-1">
                    {spotlightProduct.tagline || "Grade A+ Pristine • 100% Inspected"}
                  </p>

                  <div className="grid grid-cols-2 gap-2 pt-1">
                    <Link
                      href={`/phones/${spotlightProduct.slug}`}
                      className="flex items-center justify-center gap-1 rounded-full bg-[#1d1d1f] hover:bg-black text-white dark:bg-white dark:text-black dark:hover:bg-zinc-200 py-2.5 text-xs font-semibold transition"
                    >
                      <span>View Details</span>
                      <ArrowRight className="h-3 w-3" />
                    </Link>
                    <Link
                      href="/products"
                      className="flex items-center justify-center gap-1 rounded-full border border-black/10 dark:border-white/10 bg-zinc-100 dark:bg-zinc-800 py-2.5 text-xs font-semibold text-[#1d1d1f] dark:text-zinc-200 transition hover:bg-zinc-200 dark:hover:bg-zinc-700"
                    >
                      <span>All Tech</span>
                      <ArrowRight className="h-3 w-3" />
                    </Link>
                  </div>
                </div>
              </div>
            ) : (
              <div className="relative overflow-hidden rounded-[36px] border border-black/[0.08] dark:border-white/10 bg-white dark:bg-[#1c1c1e] p-7 backdrop-blur-xl shadow-xl dark:shadow-2xl space-y-5">
                <div className="flex items-center justify-between pb-3 border-b border-black/[0.06] dark:border-white/5">
                  <span className="text-xs font-semibold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">
                    Lagos Tech Hub
                  </span>
                  <span className="flex items-center gap-1.5 rounded-full bg-emerald-500/10 px-2.5 py-0.5 text-[11px] font-semibold text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    Computer Village, Ikeja
                  </span>
                </div>

                <div className="relative my-4 flex flex-col items-center justify-center py-5 text-center">
                  <div className="relative flex h-18 w-18 items-center justify-center rounded-2xl bg-gradient-to-br from-zinc-800 to-zinc-950 dark:from-zinc-100 dark:to-zinc-300 text-white dark:text-zinc-900 shadow-md mb-4 border border-black/10 dark:border-white/20">
                    <Sparkles className="h-8 w-8" />
                  </div>
                  <h3 className="text-xl font-bold text-[#1d1d1f] dark:text-white">
                    Direct Device Sourcing
                  </h3>
                  <p className="mt-1.5 text-xs text-zinc-500 dark:text-zinc-400 max-w-[260px] leading-relaxed">
                    Flagship phones, MacBooks, and hardware sourced directly with live daily market rates.
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-2 pt-2">
                  <Link
                    href="/request"
                    className="flex items-center justify-center gap-1.5 rounded-full bg-[#1d1d1f] hover:bg-black text-white dark:bg-white dark:text-black dark:hover:bg-zinc-200 py-2.5 text-xs font-semibold shadow-sm transition"
                  >
                    <Layers className="h-3.5 w-3.5" />
                    <span>Request Device</span>
                  </Link>
                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 py-2.5 text-xs font-semibold text-emerald-700 dark:text-emerald-400 transition hover:bg-emerald-500/20"
                  >
                    <MessageCircle className="h-3.5 w-3.5" />
                    <span>WhatsApp</span>
                  </a>
                </div>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
}