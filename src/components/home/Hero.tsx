"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  MessageCircle,
  ShieldCheck,
  Cpu,
  HardDrive,
  Zap,
  BatteryCharging,
  ArrowRight,
  CheckCircle2,
  Sparkles,
  Layers,
  MapPin,
} from "lucide-react";
import { Phone } from "@/types/phone";
import { getPhoneInquiryUrl, getGeneralInquiryUrl } from "@/utils/whatsapp";

interface HeroProps {
  spotlightProduct?: Phone | null;
}

const SHOWCASE_MODELS = [
  {
    id: "hp-elitebook-1040",
    name: "HP EliteBook 1040 G10 x360",
    series: "Executive 2-in-1 Touch Convertible",
    condition: "USA Used (Grade A+)",
    specs: {
      cpu: "Intel Core i7-1365U vPro (10-Core)",
      ram: "32GB LPDDR5 6400MHz",
      storage: "1TB PCIe Gen4 NVMe SSD",
      display: "14\" WUXGA IPS Touch (1000 nits SureView)",
      batteryHealth: "98% (Original OEM)",
      graphics: "Intel Iris Xe Graphics",
    },
    image: "/images/hp-elitebook.png",
    colorBadge: "Titanium Silver Aluminum",
  },
  {
    id: "macbook-pro-14-m3",
    name: "MacBook Pro 14\" M3 Max",
    series: "Pro Creative Workstation",
    condition: "Brand New Sealed",
    specs: {
      cpu: "Apple M3 Max (14-Core CPU / 30-Core GPU)",
      ram: "36GB Unified Memory",
      storage: "1TB Ultra-Fast SSD",
      display: "14.2\" Liquid Retina XDR (120Hz ProMotion)",
      batteryHealth: "100% Battery Cycle",
      graphics: "30-Core Hardware Ray-Tracing GPU",
    },
    image: "/images/macbook-pro.png",
    colorBadge: "Space Black Anodized",
  },
  {
    id: "dell-xps-15",
    name: "Dell XPS 15 9530",
    series: "Studio Performance Laptop",
    condition: "USA Used (Grade A+)",
    specs: {
      cpu: "Intel Core i9-13900H (14-Core)",
      ram: "32GB DDR5 4800MHz Dual-Channel",
      storage: "1TB M.2 PCIe NVMe SSD",
      display: "15.6\" 3.5K OLED InfinityEdge Touch",
      batteryHealth: "96% Verified Health",
      graphics: "NVIDIA GeForce RTX 4070 8GB GDDR6",
    },
    image: "/images/dell-xps.png",
    colorBadge: "CNC Machined Aluminum & Carbon",
  },
  {
    id: "thinkpad-x1-carbon",
    name: "ThinkPad X1 Carbon Gen 11",
    series: "Ultralight Enterprise Flagship",
    condition: "USA Used (Grade A+)",
    specs: {
      cpu: "Intel Core i7-1370P vPro (14-Core)",
      ram: "32GB LPDDR5 Memory",
      storage: "512GB PCIe 4.0 SSD",
      display: "14\" 2.8K OLED Anti-Glare Dolby Vision",
      batteryHealth: "97% Health Capacity",
      graphics: "Intel Iris Xe Graphics",
    },
    image: "/images/thinkpad-x1.png",
    colorBadge: "Deep Carbon Fiber Weave",
  },
];

export default function Hero({ spotlightProduct }: HeroProps) {
  const [selectedModelIndex, setSelectedModelIndex] = useState(0);
  const activeModel = SHOWCASE_MODELS[selectedModelIndex];

  const whatsappInquiryUrl = getPhoneInquiryUrl({
    phoneName: activeModel.name,
    category: "laptop",
    storage: activeModel.specs.storage,
    condition: activeModel.condition as any,
    ram: activeModel.specs.ram,
    processor: activeModel.specs.cpu,
  });

  const generalWhatsappUrl = getGeneralInquiryUrl();

  return (
    <section className="relative overflow-hidden pt-28 pb-16 md:pt-36 md:pb-24 tech-grid">
      {/* Dynamic Crimson Ambient Lighting */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-red-600/10 dark:bg-red-600/15 blur-[160px] pointer-events-none rounded-full" />
      <div className="absolute top-10 right-10 w-72 h-72 bg-red-500/5 blur-[100px] pointer-events-none rounded-full" />

      <div className="container-custom relative z-10">
        <div className="grid gap-12 lg:grid-cols-12 lg:items-center">
          {/* Left Column: Brand Statement & High-Impact Copy */}
          <div className="lg:col-span-6 space-y-6 text-center lg:text-left">
            {/* Live Status Pill */}
            <div className="inline-flex items-center gap-2 rounded-full border border-red-500/20 bg-red-500/10 px-3.5 py-1.5 text-[11px] font-semibold text-red-700 dark:text-red-400 backdrop-blur-md">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-500 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-red-600" />
              </span>
              <span>Computer Village Ikeja • Daily Wholesale &amp; Retail Rates</span>
            </div>

            {/* Main Headline */}
            <div className="space-y-3">
              <h1 className="text-3xl sm:text-5xl lg:text-[52px] font-black tracking-tight text-zinc-950 dark:text-white leading-[1.12]">
                <span className="hedge-gradient-text">USA Used &amp; Brand New</span> <br />
                Computers/Laptops
              </h1>

              <div className="space-y-1 pt-1">
                <p className="text-lg sm:text-2xl font-black text-zinc-900 dark:text-zinc-100 flex items-center justify-center lg:justify-start gap-2">
                  <span className="h-2 w-2 rounded-full bg-red-600 shrink-0" />
                  <span>We Supply in Bulk,</span>
                </p>
                <p className="text-lg sm:text-2xl font-black text-zinc-900 dark:text-zinc-100 flex items-center justify-center lg:justify-start gap-2">
                  <span className="h-2 w-2 rounded-full bg-red-600 shrink-0" />
                  <span>We Sell in Units,</span>
                </p>
                <p className="text-sm sm:text-base font-bold text-red-600 dark:text-red-400 pt-0.5">
                  Whatever your preference, we have one for your budget.
                </p>
              </div>
            </div>

            {/* Subtitle */}
            <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 max-w-xl mx-auto lg:mx-0 leading-relaxed font-normal">
              Direct from <strong className="text-zinc-900 dark:text-white font-semibold">12 Oshitelu Street, Computer Village, Ikeja</strong>. Individually benchmarked motherboards, verified original batteries, clean BIOS, and guaranteed warranty on every machine.
            </p>

            {/* Interactive Model Selector Pills */}
            <div className="pt-2">
              <span className="text-[11px] font-bold uppercase tracking-wider text-zinc-600 dark:text-zinc-300 block mb-2.5">
                Explore Flagship Workstations:
              </span>
              <div className="flex flex-wrap justify-center lg:justify-start gap-2">
                {SHOWCASE_MODELS.map((model, idx) => {
                  const isActive = idx === selectedModelIndex;
                  return (
                    <button
                      key={model.id}
                      onClick={() => setSelectedModelIndex(idx)}
                      className={`text-xs px-3.5 py-1.5 rounded-full font-semibold transition-all ${
                        isActive
                          ? "bg-red-600 text-white shadow-md shadow-red-600/30 scale-105"
                          : "bg-black/5 dark:bg-white/10 text-zinc-700 dark:text-zinc-300 hover:bg-black/10 dark:hover:bg-white/15"
                      }`}
                    >
                      {model.name.split(" ")[0]} {model.name.split(" ")[1]}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3.5 pt-4">
              <Link
                href="/laptops"
                className="hedge-btn-crimson w-full sm:w-auto text-sm py-3.5 px-7"
              >
                <span>Browse All Laptops</span>
                <ArrowRight className="h-4 w-4" />
              </Link>

              <a
                href={whatsappInquiryUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="hedge-btn-secondary w-full sm:w-auto text-sm py-3.5 px-7 flex items-center justify-center gap-2"
              >
                <MessageCircle className="h-4 w-4 text-emerald-500" />
                <span>Ask Today&apos;s Price on WhatsApp</span>
              </a>
            </div>

            {/* Trust Micro-Badges */}
            <div className="grid grid-cols-3 gap-3 pt-6 border-t border-black/10 dark:border-white/10 text-left">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-red-600 shrink-0" />
                <span className="text-[11px] font-medium text-zinc-600 dark:text-zinc-400">
                  Motherboard Tested
                </span>
              </div>
              <div className="flex items-center gap-2">
                <BatteryCharging className="h-4 w-4 text-red-600 shrink-0" />
                <span className="text-[11px] font-medium text-zinc-600 dark:text-zinc-400">
                  Battery 95%+ Health
                </span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="h-4 w-4 text-red-600 shrink-0" />
                <span className="text-[11px] font-medium text-zinc-600 dark:text-zinc-400">
                  Store Warranty
                </span>
              </div>
            </div>
          </div>

          {/* Right Column: Hardware Showcase Station (Carbon Chassis View) */}
          <div className="lg:col-span-6">
            <div className="relative rounded-[32px] border border-red-500/20 bg-gradient-to-b from-white via-zinc-50 to-zinc-100 dark:from-[#15151c] dark:via-[#101014] dark:to-[#0a0a0c] p-6 sm:p-8 shadow-2xl shadow-red-950/10 backdrop-blur-2xl">
              {/* Header inside card */}
              <div className="flex items-center justify-between pb-4 border-b border-black/10 dark:border-white/10">
                <div className="flex items-center gap-2.5">
                  <span className="h-3 w-3 rounded-full bg-red-600 animate-pulse" />
                  <span className="text-xs font-bold uppercase tracking-wider text-red-600 dark:text-red-400">
                    Featured Rig Spotlight
                  </span>
                </div>
                <span className="px-3 py-1 rounded-full bg-red-500/10 text-red-600 dark:text-red-400 text-xs font-bold border border-red-500/20">
                  {activeModel.condition}
                </span>
              </div>

              {/* Model Title & Series */}
              <div className="mt-4">
                <h3 className="text-2xl sm:text-3xl font-black text-zinc-950 dark:text-white tracking-tight">
                  {activeModel.name}
                </h3>
                <p className="text-xs font-semibold text-zinc-500 dark:text-zinc-400 mt-0.5">
                  {activeModel.series} • {activeModel.colorBadge}
                </p>
              </div>

              {/* Dynamic Specs Matrix */}
              <div className="mt-6 grid grid-cols-2 gap-3">
                <div className="rounded-2xl border border-black/5 dark:border-white/5 bg-black/[0.02] dark:bg-white/[0.03] p-3.5">
                  <div className="flex items-center gap-2 text-zinc-500 dark:text-zinc-400 text-xs mb-1 font-semibold">
                    <Cpu className="h-3.5 w-3.5 text-red-600" />
                    <span>Processor</span>
                  </div>
                  <p className="text-xs font-bold text-zinc-900 dark:text-white">
                    {activeModel.specs.cpu}
                  </p>
                </div>

                <div className="rounded-2xl border border-black/5 dark:border-white/5 bg-black/[0.02] dark:bg-white/[0.03] p-3.5">
                  <div className="flex items-center gap-2 text-zinc-500 dark:text-zinc-400 text-xs mb-1 font-semibold">
                    <Zap className="h-3.5 w-3.5 text-red-600" />
                    <span>Memory (RAM)</span>
                  </div>
                  <p className="text-xs font-bold text-zinc-900 dark:text-white">
                    {activeModel.specs.ram}
                  </p>
                </div>

                <div className="rounded-2xl border border-black/5 dark:border-white/5 bg-black/[0.02] dark:bg-white/[0.03] p-3.5">
                  <div className="flex items-center gap-2 text-zinc-500 dark:text-zinc-400 text-xs mb-1 font-semibold">
                    <HardDrive className="h-3.5 w-3.5 text-red-600" />
                    <span>Storage (SSD)</span>
                  </div>
                  <p className="text-xs font-bold text-zinc-900 dark:text-white">
                    {activeModel.specs.storage}
                  </p>
                </div>

                <div className="rounded-2xl border border-black/5 dark:border-white/5 bg-black/[0.02] dark:bg-white/[0.03] p-3.5">
                  <div className="flex items-center gap-2 text-zinc-500 dark:text-zinc-400 text-xs mb-1 font-semibold">
                    <BatteryCharging className="h-3.5 w-3.5 text-emerald-500" />
                    <span>Battery Status</span>
                  </div>
                  <p className="text-xs font-bold text-emerald-600 dark:text-emerald-400">
                    {activeModel.specs.batteryHealth}
                  </p>
                </div>
              </div>

              {/* Display & Graphics Banner */}
              <div className="mt-3 rounded-2xl border border-black/5 dark:border-white/5 bg-black/[0.02] dark:bg-white/[0.03] p-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div>
                  <span className="text-[10px] uppercase font-bold tracking-wider text-zinc-500 dark:text-zinc-400">
                    Display Specs:
                  </span>
                  <p className="text-xs font-semibold text-zinc-800 dark:text-zinc-200">
                    {activeModel.specs.display}
                  </p>
                </div>
                <div className="sm:text-right">
                  <span className="text-[10px] uppercase font-bold tracking-wider text-zinc-500 dark:text-zinc-400">
                    Graphics / GPU:
                  </span>
                  <p className="text-xs font-semibold text-zinc-800 dark:text-zinc-200">
                    {activeModel.specs.graphics}
                  </p>
                </div>
              </div>

              {/* Pricing & Inquiry Action */}
              <div className="mt-6 pt-5 border-t border-black/10 dark:border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <span className="text-[10px] uppercase font-bold tracking-wider text-zinc-500 dark:text-zinc-400 block">
                    Daily Rate Status
                  </span>
                  <span className="text-lg font-black text-zinc-950 dark:text-white">
                    Real-time Market Quote
                  </span>
                </div>

                <a
                  href={whatsappInquiryUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hedge-btn-crimson py-3 px-6 text-xs text-center"
                >
                  <MessageCircle className="h-4 w-4" />
                  <span>Request Rate for {activeModel.name.split(" ")[0]}</span>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Trust Ribbon */}
        <div className="mt-16 rounded-2xl border border-black/10 dark:border-white/10 bg-white/80 dark:bg-[#121216]/80 p-5 backdrop-blur-xl shadow-sm grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          <div>
            <p className="text-xl sm:text-2xl font-black text-red-600">12 Oshitelu St</p>
            <p className="text-xs font-semibold text-zinc-600 dark:text-zinc-400">Computer Village Walk-in</p>
          </div>
          <div>
            <p className="text-xl sm:text-2xl font-black text-zinc-900 dark:text-white">25-Point</p>
            <p className="text-xs font-semibold text-zinc-600 dark:text-zinc-400">Motherboard &amp; Battery Test</p>
          </div>
          <div>
            <p className="text-xl sm:text-2xl font-black text-zinc-900 dark:text-white">Video Call</p>
            <p className="text-xs font-semibold text-zinc-600 dark:text-zinc-400">Inspection Before Payment</p>
          </div>
          <div>
            <p className="text-xl sm:text-2xl font-black text-red-600">Nationwide</p>
            <p className="text-xs font-semibold text-zinc-600 dark:text-zinc-400">Insured Delivery in Nigeria</p>
          </div>
        </div>
      </div>
    </section>
  );
}