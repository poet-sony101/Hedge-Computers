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
    <section className="relative flex min-h-[90vh] items-center overflow-hidden pt-20">
      {/* Background Ambient Glows */}
      <div className="absolute inset-0 -z-10 pointer-events-none">
        <div className="absolute left-1/2 top-20 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-blue-600/15 blur-[140px]" />
        <div className="absolute bottom-10 right-10 h-80 w-80 rounded-full bg-sky-500/10 blur-[120px]" />
      </div>

      <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 px-6 py-12 md:grid-cols-12">
        {/* Left Column (Content) */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="md:col-span-7 space-y-6 text-left"
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-blue-500/30 bg-blue-500/10 px-4 py-1.5 text-xs font-semibold text-blue-400">
            <Zap className="h-3.5 w-3.5 text-blue-400" />
            <span>Smartphones & Laptops • Daily Real-Time Pricing</span>
          </div>

          <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-6xl lg:text-7xl leading-[1.08]">
            Phones & Laptops.
            <br />
            <span className="bg-gradient-to-r from-blue-400 via-sky-300 to-white bg-clip-text text-transparent">
              Today&apos;s Best Price.
            </span>
          </h1>

          <p className="max-w-xl text-base sm:text-lg leading-relaxed text-zinc-400">
            Browse verified brand-new and clean UK-used flagships from Apple, Samsung, Dell, Google, and HP. Real-time market pricing with instant WhatsApp inquiries.
          </p>

          <div className="flex flex-wrap items-center gap-3 pt-2">
            <Link href="/phones">
              <Button size="lg" className="rounded-full bg-blue-600 hover:bg-blue-500 px-6 font-semibold text-white shadow-lg shadow-blue-900/30">
                <Smartphone className="mr-2 h-4 w-4" />
                Browse Phones
              </Button>
            </Link>

            <Link href="/laptops">
              <Button size="lg" variant="outline" className="rounded-full border-white/15 bg-zinc-900/80 hover:bg-zinc-800 px-6 font-semibold text-white">
                <Laptop className="mr-2 h-4 w-4 text-sky-400" />
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
                className="rounded-full border-emerald-500/40 bg-emerald-950/30 hover:bg-emerald-900/40 text-emerald-400 px-6 font-medium"
              >
                <MessageCircle className="mr-2 h-4 w-4 text-emerald-400" />
                WhatsApp
              </Button>
            </a>
          </div>

          {/* Quick Trust Highlights */}
          <div className="grid grid-cols-3 gap-4 pt-6 border-t border-white/5">
            <div>
              <p className="text-xl font-bold text-white">100%</p>
              <p className="text-xs text-zinc-400">Inspected Hardware</p>
            </div>
            <div>
              <p className="text-xl font-bold text-white">Real-Time</p>
              <p className="text-xs text-zinc-400">Daily Market Rates</p>
            </div>
            <div>
              <p className="text-xl font-bold text-white">Nationwide</p>
              <p className="text-xs text-zinc-400">Insured Delivery</p>
            </div>
          </div>
        </motion.div>

        {/* Right Column (Visual Showcase) */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="md:col-span-5 flex justify-center"
        >
          <div className="relative w-full max-w-sm">
            {/* Glowing Backdrop */}
            <div className="absolute inset-0 rounded-[48px] bg-gradient-to-tr from-blue-600/30 to-sky-400/20 blur-2xl" />

            {/* Showcase Device Card */}
            {spotlightProduct ? (
              <div className="relative overflow-hidden rounded-[40px] border border-white/10 bg-zinc-950/80 p-6 backdrop-blur-xl shadow-2xl">
                <div className="flex items-center justify-between pb-4 border-b border-white/5">
                  <span className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">
                    Spotlight Flagship
                  </span>
                  <span className="flex items-center gap-1 rounded-full bg-emerald-500/10 px-2.5 py-0.5 text-[11px] font-semibold text-emerald-400 border border-emerald-500/20">
                    <ShieldCheck className="h-3 w-3" />
                    {spotlightProduct.inStock ? "In Stock" : "Available to Order"}
                  </span>
                </div>

                {/* Spotlight Image */}
                <div className="relative my-6 flex h-64 items-center justify-center">
                  <Image
                    src={spotlightProduct.image}
                    alt={spotlightProduct.name}
                    width={240}
                    height={240}
                    className="max-h-56 w-auto object-contain drop-shadow-2xl"
                    priority
                  />
                </div>

                <div className="space-y-3">
                  <div className="flex items-baseline justify-between">
                    <h3 className="text-lg font-bold text-white">
                      {spotlightProduct.name}
                    </h3>
                    <span className="text-xs font-medium text-blue-400">
                      {spotlightProduct.storage} • {spotlightProduct.condition}
                    </span>
                  </div>
                  <p className="text-xs text-zinc-400 line-clamp-1">
                    {spotlightProduct.tagline || "Grade A+ Pristine • 100% Inspected"}
                  </p>

                  <div className="grid grid-cols-2 gap-2 pt-1">
                    <Link
                      href={`/phones/${spotlightProduct.slug}`}
                      className="flex items-center justify-center gap-1 rounded-xl bg-blue-600 py-2.5 text-xs font-semibold text-white transition hover:bg-blue-500"
                    >
                      <span>View Details</span>
                      <ArrowRight className="h-3 w-3" />
                    </Link>
                    <Link
                      href="/products"
                      className="flex items-center justify-center gap-1 rounded-xl border border-white/10 bg-zinc-900 py-2.5 text-xs font-semibold text-zinc-300 transition hover:bg-zinc-800 hover:text-white"
                    >
                      <span>All Products</span>
                      <ArrowRight className="h-3 w-3" />
                    </Link>
                  </div>
                </div>
              </div>
            ) : (
              <div className="relative overflow-hidden rounded-[40px] border border-white/10 bg-gradient-to-b from-zinc-900/90 to-zinc-950/90 p-7 backdrop-blur-xl shadow-2xl space-y-5">
                <div className="flex items-center justify-between pb-3 border-b border-white/5">
                  <span className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">
                    Lagos Tech Hub
                  </span>
                  <span className="flex items-center gap-1.5 rounded-full bg-emerald-500/15 px-2.5 py-0.5 text-[11px] font-semibold text-emerald-400 border border-emerald-500/20">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    Computer Village, Ikeja
                  </span>
                </div>

                <div className="relative my-6 flex flex-col items-center justify-center py-6 text-center">
                  <div className="relative flex h-20 w-20 items-center justify-center rounded-3xl bg-gradient-to-tr from-blue-600 to-sky-400 text-white shadow-xl shadow-blue-500/30 mb-4">
                    <Sparkles className="h-10 w-10" />
                  </div>
                  <h3 className="text-xl font-bold text-white">
                    Direct Device Sourcing
                  </h3>
                  <p className="mt-1.5 text-xs text-zinc-400 max-w-[260px] leading-relaxed">
                    Flagship phones, MacBooks, and premium accessories sourced with live wholesale market rates.
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-2 pt-2">
                  <Link
                    href="/request"
                    className="flex items-center justify-center gap-1.5 rounded-xl bg-blue-600 py-2.5 text-xs font-semibold text-white transition hover:bg-blue-500 shadow-md shadow-blue-900/30"
                  >
                    <Layers className="h-3.5 w-3.5" />
                    <span>Request Device</span>
                  </Link>
                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-1.5 rounded-xl border border-emerald-500/30 bg-emerald-950/30 py-2.5 text-xs font-semibold text-emerald-400 transition hover:bg-emerald-900/40"
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