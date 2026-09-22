"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  MessageCircle,
  ShieldCheck,
  Truck,
  CheckCircle2,
  Cpu,
  Monitor,
  Camera,
  Battery,
  HardDrive,
  Layers,
  Sparkles,
  ArrowLeft,
  Share2,
  Check,
} from "lucide-react";
import { Phone } from "@/types/phone";
import { getPhoneInquiryUrl } from "@/utils/whatsapp";
import PhoneCard from "@/components/phone/PhoneCard";

interface PhoneDetailClientProps {
  phone: Phone;
  relatedPhones: Phone[];
}

export default function PhoneDetailClient({
  phone,
  relatedPhones,
}: PhoneDetailClientProps) {
  const [selectedStorage, setSelectedStorage] = useState(
    phone.storageOptions?.[0] || phone.storage
  );
  const [selectedColor, setSelectedColor] = useState(
    phone.colors?.[0] || ""
  );
  const [copied, setCopied] = useState(false);

  const isLaptop = phone.category === "laptop";

  // Generate dynamic WhatsApp link based on current selected storage & color
  const whatsappUrl = getPhoneInquiryUrl({
    phoneName: phone.name,
    category: phone.category,
    storage: selectedStorage,
    condition: phone.condition,
    color: selectedColor || undefined,
    ram: phone.specs?.ram,
    processor: phone.specs?.processor,
  });

  const handleShare = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const specList = [
    { label: "Display & Screen", value: phone.specs?.display || phone.specs?.screenSize, icon: Monitor },
    { label: "Processor", value: phone.specs?.processor, icon: Cpu },
    { label: "Graphics / GPU", value: phone.specs?.gpu, icon: Sparkles },
    { label: "RAM Memory", value: phone.specs?.ram, icon: HardDrive },
    { label: "Camera Setup", value: phone.specs?.camera, icon: Camera },
    { label: "Battery & Health", value: phone.specs?.battery || phone.specs?.batteryHealth, icon: Battery },
    { label: "Ports & Connectivity", value: phone.specs?.ports, icon: Layers },
    { label: "Operating System", value: phone.specs?.os, icon: Layers },
    { label: "Power & Charging", value: phone.specs?.charging, icon: Sparkles },
    { label: "Biometrics", value: phone.specs?.biometrics, icon: ShieldCheck },
  ].filter((item) => !!item.value);

  return (
    <div className="container-custom">
      {/* Top Navigation & Breadcrumbs */}
      <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
        <Link
          href={isLaptop ? "/laptops" : "/phones"}
          className="inline-flex items-center gap-2 rounded-full border border-black/10 dark:border-white/10 bg-white/80 dark:bg-zinc-900/60 px-4 py-2 text-xs font-medium text-[#86868b] dark:text-zinc-400 transition hover:text-[#1d1d1f] dark:hover:text-white backdrop-blur-md"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          <span>{isLaptop ? "Back to Laptops" : "Back to Catalog"}</span>
        </Link>

        <button
          onClick={handleShare}
          className="inline-flex items-center gap-2 rounded-full border border-black/10 dark:border-white/10 bg-white/80 dark:bg-zinc-900/60 px-4 py-2 text-xs font-medium text-[#86868b] dark:text-zinc-400 transition hover:text-[#1d1d1f] dark:hover:text-white backdrop-blur-md"
        >
          {copied ? (
            <>
              <Check className="h-3.5 w-3.5 text-emerald-500" />
              <span className="text-emerald-500">Link Copied</span>
            </>
          ) : (
            <>
              <Share2 className="h-3.5 w-3.5" />
              <span>Share Device</span>
            </>
          )}
        </button>
      </div>

      {/* Main Product Showcase Grid */}
      <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 mb-20">
        {/* Left Column: Media Gallery */}
        <div className="lg:col-span-6 flex flex-col items-center">
          <div className="relative flex h-[420px] sm:h-[500px] w-full items-center justify-center rounded-[36px] border border-black/5 dark:border-white/10 bg-gradient-to-b from-black/[0.02] dark:from-zinc-900 via-transparent dark:via-zinc-950 to-black/5 dark:to-black p-8 shadow-2xl overflow-hidden backdrop-blur-xl">
            {/* Ambient Background Glow */}
            <div className="absolute inset-0 bg-gradient-to-tr from-black/[0.03] dark:from-white/5 to-transparent blur-3xl pointer-events-none" />

            {/* Condition Pill */}
            <div className="absolute top-6 left-6 z-10">
              <span className="inline-flex items-center gap-1.5 rounded-full px-3.5 py-1 text-xs font-semibold backdrop-blur-md bg-black/5 dark:bg-white/10 text-[#1d1d1f] dark:text-white border border-black/10 dark:border-white/10">
                <CheckCircle2 className="h-3.5 w-3.5 text-[#86868b]" />
                {phone.condition}
              </span>
            </div>

            {/* Main Image */}
            <div className="relative flex h-full w-full items-center justify-center">
              <Image
                src={phone.image}
                alt={phone.name}
                width={360}
                height={360}
                className="max-h-[360px] w-auto object-contain drop-shadow-2xl transition-transform duration-500 hover:scale-105"
                priority
                unoptimized={
                  phone.image.startsWith("http") ||
                  phone.image.startsWith("data:") ||
                  phone.image.endsWith(".svg")
                }
              />
            </div>
          </div>

          {/* Guarantee Badges Under Image */}
          <div className="mt-6 grid grid-cols-2 gap-4 w-full">
            <div className="flex items-center gap-3 rounded-2xl border border-black/5 dark:border-white/5 bg-black/[0.02] dark:bg-white/[0.02] p-4">
              <ShieldCheck className="h-5 w-5 text-[#86868b] dark:text-[#f5f5f7] shrink-0" />
              <div className="text-xs">
                <p className="font-semibold text-[#1d1d1f] dark:text-white">Hardware Inspected</p>
                <p className="text-[#86868b]">Tested & 100% verified</p>
              </div>
            </div>
            <div className="flex items-center gap-3 rounded-2xl border border-black/5 dark:border-white/5 bg-black/[0.02] dark:bg-white/[0.02] p-4">
              <Truck className="h-5 w-5 text-[#86868b] dark:text-[#f5f5f7] shrink-0" />
              <div className="text-xs">
                <p className="font-semibold text-[#1d1d1f] dark:text-white">Nationwide Shipping</p>
                <p className="text-[#86868b]">Lagos & all Nigeria states</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Details, Selectors, and Inquiry Actions */}
        <div className="lg:col-span-6 flex flex-col justify-between">
          <div className="space-y-6">
            <div>
              <span className="rounded-full bg-black/5 dark:bg-white/10 px-3 py-1 text-xs font-semibold text-[#1d1d1f] dark:text-[#f5f5f7] border border-black/10 dark:border-white/10">
                {phone.brand}
              </span>
              <h1 className="mt-3 text-3xl sm:text-5xl font-extrabold tracking-tight text-[#1d1d1f] dark:text-white">
                {phone.name}
              </h1>
              {phone.tagline && (
                <p className="mt-2 text-base text-[#86868b] dark:text-zinc-400 leading-relaxed">
                  {phone.tagline}
                </p>
              )}
            </div>

            {/* Pricing Policy Card */}
            <div className="rounded-3xl border border-black/5 dark:border-white/10 bg-black/[0.02] dark:bg-white/[0.03] p-6 backdrop-blur-md">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-xs font-semibold uppercase tracking-wider text-[#86868b]">
                    Pricing Policy
                  </span>
                  <p className="text-xl font-bold text-[#1d1d1f] dark:text-white mt-0.5">
                    Today&apos;s Market Price on Request
                  </p>
                </div>
                <span className="rounded-full bg-black/5 dark:bg-white/10 px-3 py-1 text-xs font-semibold text-[#1d1d1f] dark:text-[#f5f5f7]">
                  Daily Rates
                </span>
              </div>
              <p className="mt-2 text-xs text-[#86868b] dark:text-zinc-400 leading-relaxed">
                Devices trade at dynamic wholesale rates. Available Tech quotes today&apos;s sharpest real-time price on WhatsApp with zero bloated markups.
              </p>
            </div>

            {/* Storage Selection */}
            {phone.storageOptions && phone.storageOptions.length > 0 && (
              <div>
                <label className="text-xs font-semibold uppercase tracking-wider text-[#86868b] block mb-2.5">
                  Select Storage Capacity
                </label>
                <div className="flex flex-wrap gap-2.5">
                  {phone.storageOptions.map((storage) => {
                    const active = selectedStorage === storage;
                    return (
                      <button
                        key={storage}
                        onClick={() => setSelectedStorage(storage)}
                        className={`rounded-full px-5 py-2.5 text-xs font-semibold transition-all ${
                          active
                            ? "bg-[#1d1d1f] dark:bg-white text-white dark:text-black shadow-md shadow-black/10"
                            : "border border-black/10 dark:border-white/10 bg-black/5 dark:bg-white/5 text-[#86868b] hover:text-[#1d1d1f] dark:hover:text-white"
                        }`}
                      >
                        {storage}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Color Options */}
            {phone.colors && phone.colors.length > 0 && (
              <div>
                <label className="text-xs font-semibold uppercase tracking-wider text-[#86868b] block mb-2.5">
                  Available Colorways
                </label>
                <div className="flex flex-wrap gap-2">
                  {phone.colors.map((color) => {
                    const active = selectedColor === color;
                    return (
                      <button
                        key={color}
                        onClick={() => setSelectedColor(color)}
                        className={`rounded-full px-4 py-2 text-xs font-medium transition-all ${
                          active
                            ? "bg-[#1d1d1f] dark:bg-white text-white dark:text-black font-semibold"
                            : "border border-black/10 dark:border-white/10 bg-black/5 dark:bg-white/5 text-[#86868b] hover:text-[#1d1d1f] dark:hover:text-white"
                        }`}
                      >
                        {color}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Overview Snippet */}
            {phone.overview && (
              <div className="pt-2">
                <h3 className="text-xs font-semibold uppercase tracking-wider text-[#86868b] mb-2">
                  Device Overview
                </h3>
                <p className="text-sm leading-relaxed text-[#1d1d1f] dark:text-zinc-300">
                  {phone.overview}
                </p>
              </div>
            )}

            {/* Primary Action Button */}
            <div className="pt-4 space-y-3">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex w-full items-center justify-center gap-3 rounded-full bg-[#1d1d1f] hover:bg-black dark:bg-white dark:hover:bg-[#f5f5f7] py-4 text-base font-semibold text-white dark:text-black shadow-xl shadow-black/10 transition"
              >
                <MessageCircle className="h-5 w-5" />
                <span>Ask for Today&apos;s Price on WhatsApp</span>
              </a>

              <p className="text-center text-xs text-[#86868b]">
                ⚡ Connects with our sales representative with your specs pre-filled.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Specifications Grid */}
      {specList.length > 0 && (
        <section className="mb-24 rounded-3xl border border-black/5 dark:border-white/10 bg-white/60 dark:bg-zinc-950/60 p-8 sm:p-12 backdrop-blur-xl shadow-xl">
          <div className="mb-8">
            <span className="text-xs font-semibold uppercase tracking-wider text-[#86868b]">
              Technical Specifications
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#1d1d1f] dark:text-white mt-1">
              Hardware & Performance Matrix
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {specList.map((spec) => (
              <div
                key={spec.label}
                className="flex items-start gap-4 rounded-2xl border border-black/5 dark:border-white/5 bg-black/[0.02] dark:bg-white/[0.02] p-5"
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-black/5 dark:bg-white/10 text-[#1d1d1f] dark:text-white">
                  <spec.icon className="h-5 w-5" />
                </div>
                <div>
                  <span className="text-xs font-medium text-[#86868b]">
                    {spec.label}
                  </span>
                  <p className="text-sm font-semibold text-[#1d1d1f] dark:text-white mt-0.5">
                    {spec.value}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Similar & Related Devices */}
      {relatedPhones.length > 0 && (
        <section className="mb-20">
          <div className="mb-8">
            <span className="text-xs font-semibold uppercase tracking-wider text-[#86868b]">
              Alternative Options
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#1d1d1f] dark:text-white mt-1">
              More {phone.brand} & Similar Devices
            </h2>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {relatedPhones.map((related) => (
              <PhoneCard key={related.id} phone={related} />
            ))}
          </div>
        </section>
      )}

      {/* Sticky Bottom Inquiry Bar on Mobile Viewports */}
      <div className="fixed bottom-0 left-0 z-40 w-full border-t border-black/10 dark:border-white/10 bg-white/95 dark:bg-black/95 p-4 backdrop-blur-xl md:hidden">
        <div className="flex items-center justify-between gap-4">
          <div className="min-w-0">
            <p className="text-sm font-bold text-[#1d1d1f] dark:text-white truncate">{phone.name}</p>
            <p className="text-xs text-[#86868b]">
              {selectedStorage} • {phone.condition}
            </p>
          </div>

          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="shrink-0 inline-flex items-center gap-2 rounded-full bg-[#1d1d1f] dark:bg-white px-5 py-2.5 text-xs font-bold text-white dark:text-black shadow-lg shadow-black/10"
          >
            <MessageCircle className="h-4 w-4" />
            <span>Ask Price</span>
          </a>
        </div>
      </div>
    </div>
  );
}
