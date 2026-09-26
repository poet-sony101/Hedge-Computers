"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Code,
  Video,
  Briefcase,
  Gamepad2,
  Sparkles,
  ArrowRight,
  MessageCircle,
  Laptop,
  Check,
} from "lucide-react";
import { formatWhatsAppNumber } from "@/utils/whatsapp";
import { SITE_CONFIG } from "@/constants/site";

const WORKLOADS = [
  {
    id: "dev",
    label: "Software Engineering & Cloud",
    icon: Code,
    desc: "Fast compilation, virtualization, Docker, multi-tasking",
    recommendation: "HP EliteBook 1040 G10 (32GB RAM) or MacBook Pro 14 M3",
    suggestedSpecs: "Minimum 16GB-32GB RAM, Intel Core i7 / Apple Silicon, NVMe SSD",
  },
  {
    id: "creative",
    label: "Creative / Video Editing & 3D",
    icon: Video,
    desc: "4K Premiere, After Effects, Blender, high color gamut",
    recommendation: "Dell XPS 15 (RTX 4070 / 3.5K OLED) or MacBook Pro M3 Max",
    suggestedSpecs: "Dedicated GPU (NVIDIA RTX / M3 Pro/Max), 32GB RAM, Color-Accurate Display",
  },
  {
    id: "business",
    label: "Corporate, Accounting & Mobility",
    icon: Briefcase,
    desc: "All-day battery life, Excel modeling, lightweight travel",
    recommendation: "Lenovo ThinkPad X1 Carbon or HP EliteBook 840 / 1040",
    suggestedSpecs: "Lightweight chassis under 1.4kg, 16GB RAM, Long Battery Run-time",
  },
  {
    id: "gaming",
    label: "Gaming, Rendering & CAD",
    icon: Gamepad2,
    desc: "High FPS, AutoCAD, SolidWorks, heavy graphic processing",
    recommendation: "Asus ROG Zephyrus G14 or Dell XPS with RTX Dedicated GPU",
    suggestedSpecs: "High refresh-rate display, NVIDIA RTX Graphics, High-TDP Processor",
  },
];

export default function LaptopFinder() {
  const [selectedWorkload, setSelectedWorkload] = useState(WORKLOADS[0]);
  const [selectedOs, setSelectedOs] = useState<"Windows" | "macOS" | "Any">("Any");
  const [selectedCondition, setSelectedCondition] = useState<"USA Used" | "Brand New" | "Any">("USA Used");

  const buildWhatsappUrl = () => {
    const phone = formatWhatsAppNumber(SITE_CONFIG.phone);
    const text = `Hello Hedge Computers! I used your Laptop Matcher tool on your website.
- Workload: ${selectedWorkload.label}
- Preferred OS: ${selectedOs}
- Preferred Condition: ${selectedCondition}
- Recommended: ${selectedWorkload.recommendation}

What verified models and daily prices do you have in stock at 12 Oshitelu Street, Computer Village?`;

    return `https://wa.me/${phone}?text=${encodeURIComponent(text)}`;
  };

  return (
    <section className="container-custom py-20">
      <div className="rounded-[36px] border border-red-500/20 bg-gradient-to-b from-white via-zinc-50 to-zinc-100 dark:from-[#14141a] dark:via-[#101014] dark:to-[#0a0a0c] p-8 sm:p-14 shadow-2xl relative overflow-hidden">
        {/* Glow */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-red-600/10 blur-[140px] pointer-events-none" />

        <div className="max-w-3xl mb-10">
          <div className="inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-bold bg-red-500/10 text-red-600 dark:text-red-400 border border-red-500/20 mb-3">
            <Sparkles className="h-3.5 w-3.5" />
            <span>Interactive Laptop Finder</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-zinc-950 dark:text-white tracking-tight">
            Find Your Ideal Computer in 3 Clicks
          </h2>
          <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
            Tell us how you work. We will match you with the exact verified laptop, tested battery specs, and today&apos;s wholesale price.
          </p>
        </div>

        {/* Step 1: Workload Select */}
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 block mb-4">
            Step 1: What is your primary work demand?
          </span>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {WORKLOADS.map((item) => {
              const active = item.id === selectedWorkload.id;
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => setSelectedWorkload(item)}
                  className={`text-left p-5 rounded-2xl border transition-all ${
                    active
                      ? "border-red-600 bg-red-600/5 dark:bg-red-600/10 shadow-md shadow-red-600/10"
                      : "border-black/10 dark:border-white/10 bg-white dark:bg-[#181820] hover:border-black/20 dark:hover:border-white/20"
                  }`}
                >
                  <div className="flex items-center justify-between mb-3">
                    <div
                      className={`h-9 w-9 rounded-xl flex items-center justify-center ${
                        active
                          ? "bg-red-600 text-white"
                          : "bg-black/5 dark:bg-white/10 text-zinc-700 dark:text-zinc-300"
                      }`}
                    >
                      <Icon className="h-4 w-4" />
                    </div>
                    {active && <Check className="h-4 w-4 text-red-600" />}
                  </div>
                  <h4 className="text-sm font-bold text-zinc-950 dark:text-white">
                    {item.label}
                  </h4>
                  <p className="mt-1 text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed">
                    {item.desc}
                  </p>
                </button>
              );
            })}
          </div>
        </div>

        {/* Step 2 & 3 Filters */}
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-6 pt-6 border-t border-black/10 dark:border-white/10">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 block mb-3">
              Step 2: Operating System
            </span>
            <div className="flex gap-2">
              {(["Windows", "macOS", "Any"] as const).map((os) => (
                <button
                  key={os}
                  onClick={() => setSelectedOs(os)}
                  className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
                    selectedOs === os
                      ? "bg-red-600 text-white shadow-sm"
                      : "border border-black/10 dark:border-white/10 bg-white dark:bg-[#181820] text-zinc-700 dark:text-zinc-300"
                  }`}
                >
                  {os}
                </button>
              ))}
            </div>
          </div>

          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 block mb-3">
              Step 3: Condition Preference
            </span>
            <div className="flex gap-2">
              {(["USA Used", "Brand New", "Any"] as const).map((cond) => (
                <button
                  key={cond}
                  onClick={() => setSelectedCondition(cond)}
                  className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
                    selectedCondition === cond
                      ? "bg-red-600 text-white shadow-sm"
                      : "border border-black/10 dark:border-white/10 bg-white dark:bg-[#181820] text-zinc-700 dark:text-zinc-300"
                  }`}
                >
                  {cond}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Recommendation Output Result Box */}
        <div className="mt-8 rounded-2xl border border-red-500/30 bg-red-500/5 dark:bg-red-500/10 p-6 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-1">
            <span className="text-[11px] font-bold uppercase tracking-wider text-red-600 dark:text-red-400">
              Recommended Machine Archetype
            </span>
            <h3 className="text-xl sm:text-2xl font-black text-zinc-950 dark:text-white">
              {selectedWorkload.recommendation}
            </h3>
            <p className="text-xs text-zinc-600 dark:text-zinc-400">
              Required spec profile: {selectedWorkload.suggestedSpecs}
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            <Link
              href="/laptops"
              className="hedge-btn-secondary text-xs py-3 text-center"
            >
              <Laptop className="h-3.5 w-3.5" />
              <span>Browse Stock</span>
            </Link>

            <a
              href={buildWhatsappUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="hedge-btn-crimson text-xs py-3 text-center"
            >
              <MessageCircle className="h-3.5 w-3.5" />
              <span>Inquire This Spec on WhatsApp</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
