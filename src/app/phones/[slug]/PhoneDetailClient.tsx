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
          className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-zinc-900/60 px-4 py-2 text-xs font-medium text-zinc-400 transition hover:bg-zinc-800 hover:text-white"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          <span>{isLaptop ? "Back to Laptops" : "Back to Catalog"}</span>
        </Link>

        <button
          onClick={handleShare}
          className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-zinc-900/60 px-4 py-2 text-xs font-medium text-zinc-400 transition hover:bg-zinc-800 hover:text-white"
        >
          {copied ? (
            <>
              <Check className="h-3.5 w-3.5 text-emerald-400" />
              <span className="text-emerald-400">Link Copied</span>
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
          <div className="relative flex h-[420px] sm:h-[500px] w-full items-center justify-center rounded-[36px] border border-white/10 bg-gradient-to-b from-zinc-900/90 via-zinc-950 to-black p-8 shadow-2xl overflow-hidden">
            {/* Ambient Background Glow */}
            <div className="absolute inset-0 bg-blue-600/10 blur-3xl pointer-events-none" />

            {/* Condition Pill */}
            <div className="absolute top-6 left-6 z-10">
              <span
                className={`inline-flex items-center gap-1.5 rounded-full px-3.5 py-1 text-xs font-semibold backdrop-blur-md ${
                  phone.condition === "Brand New"
                    ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
                    : "bg-blue-500/20 text-blue-400 border border-blue-500/30"
                }`}
              >
                <CheckCircle2 className="h-3.5 w-3.5" />
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
              />
            </div>
          </div>

          {/* Guarantee Badges Under Image */}
          <div className="mt-6 grid grid-cols-2 gap-4 w-full">
            <div className="flex items-center gap-3 rounded-2xl border border-white/5 bg-zinc-950/40 p-4">
              <ShieldCheck className="h-5 w-5 text-emerald-400 shrink-0" />
              <div className="text-xs">
                <p className="font-semibold text-white">Hardware Inspected</p>
                <p className="text-zinc-500">Tested & 100% verified</p>
              </div>
            </div>
            <div className="flex items-center gap-3 rounded-2xl border border-white/5 bg-zinc-950/40 p-4">
              <Truck className="h-5 w-5 text-blue-400 shrink-0" />
              <div className="text-xs">
                <p className="font-semibold text-white">Nationwide Shipping</p>
                <p className="text-zinc-500">Lagos & all Nigeria states</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Details, Selectors, and Inquiry Actions */}
        <div className="lg:col-span-6 flex flex-col justify-between">
          <div className="space-y-6">
            <div>
              <span className="rounded-md bg-blue-600/10 px-2.5 py-1 text-xs font-semibold text-blue-400 border border-blue-500/20">
                {phone.brand}
              </span>
              <h1 className="mt-3 text-3xl sm:text-5xl font-extrabold tracking-tight text-white">
                {phone.name}
              </h1>
              {phone.tagline && (
                <p className="mt-2 text-base text-zinc-400 leading-relaxed">
                  {phone.tagline}
                </p>
              )}
            </div>

            {/* Pricing Notice */}
            <div className="rounded-2xl border border-blue-500/20 bg-blue-950/20 p-5">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-xs font-medium uppercase tracking-wider text-blue-400">
                    Pricing Policy
                  </span>
                  <p className="text-xl font-bold text-white mt-0.5">
                    Today&apos;s Market Price on Request
                  </p>
                </div>
                <span className="rounded-full bg-blue-500/20 px-3 py-1 text-xs font-semibold text-blue-300">
                  Daily Rates
                </span>
              </div>
              <p className="mt-2 text-xs text-zinc-400 leading-relaxed">
                Smartphones trade at dynamic market and foreign exchange rates. We quote you today&apos;s best real-time price on WhatsApp with zero bloated markups.
              </p>
            </div>

            {/* Storage Selection */}
            {phone.storageOptions && phone.storageOptions.length > 0 && (
              <div>
                <label className="text-xs font-semibold uppercase tracking-wider text-zinc-400 block mb-2.5">
                  Select Storage Capacity
                </label>
                <div className="flex flex-wrap gap-2.5">
                  {phone.storageOptions.map((storage) => {
                    const active = selectedStorage === storage;
                    return (
                      <button
                        key={storage}
                        onClick={() => setSelectedStorage(storage)}
                        className={`rounded-xl px-4 py-2.5 text-xs font-semibold transition-all ${
                          active
                            ? "bg-blue-600 text-white shadow-md shadow-blue-900/40 border border-blue-500"
                            : "border border-white/10 bg-zinc-900 text-zinc-400 hover:bg-zinc-800 hover:text-white"
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
                <label className="text-xs font-semibold uppercase tracking-wider text-zinc-400 block mb-2.5">
                  Available Colorways
                </label>
                <div className="flex flex-wrap gap-2">
                  {phone.colors.map((color) => {
                    const active = selectedColor === color;
                    return (
                      <button
                        key={color}
                        onClick={() => setSelectedColor(color)}
                        className={`rounded-xl px-3.5 py-2 text-xs font-medium transition-all ${
                          active
                            ? "bg-zinc-100 text-black font-semibold"
                            : "border border-white/10 bg-zinc-900/60 text-zinc-400 hover:bg-zinc-800 hover:text-white"
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
                <h3 className="text-xs font-semibold uppercase tracking-wider text-zinc-400 mb-2">
                  Device Overview
                </h3>
                <p className="text-sm leading-relaxed text-zinc-300">
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
                className="flex w-full items-center justify-center gap-3 rounded-2xl bg-emerald-600 py-4 text-base font-bold text-white shadow-xl shadow-emerald-950/60 transition hover:bg-emerald-500"
              >
                <MessageCircle className="h-5 w-5" />
                <span>Ask for Today&apos;s Price on WhatsApp</span>
              </a>

              <p className="text-center text-xs text-zinc-500">
                ⚡ Connects with our sales representative with your specs pre-filled.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Specifications Grid */}
      {specList.length > 0 && (
        <section className="mb-24 rounded-3xl border border-white/10 bg-zinc-950/60 p-8 sm:p-12 backdrop-blur-xl">
          <div className="mb-8">
            <span className="text-xs font-semibold uppercase tracking-wider text-blue-400">
              Technical Specifications
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-white mt-1">
              Hardware & Performance Matrix
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {specList.map((spec) => (
              <div
                key={spec.label}
                className="flex items-start gap-4 rounded-2xl border border-white/5 bg-zinc-900/40 p-5"
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-600/10 text-blue-400">
                  <spec.icon className="h-5 w-5" />
                </div>
                <div>
                  <span className="text-xs font-medium text-zinc-400">
                    {spec.label}
                  </span>
                  <p className="text-sm font-semibold text-white mt-0.5">
                    {spec.value}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Similar & Related Phones */}
      {relatedPhones.length > 0 && (
        <section className="mb-20">
          <div className="mb-8">
            <span className="text-xs font-semibold uppercase tracking-wider text-blue-400">
              Alternative Options
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-white mt-1">
              More {phone.brand} & Similar Smartphones
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
      <div className="fixed bottom-0 left-0 z-40 w-full border-t border-white/10 bg-zinc-950/95 p-4 backdrop-blur-xl md:hidden">
        <div className="flex items-center justify-between gap-4">
          <div className="min-w-0">
            <p className="text-sm font-bold text-white truncate">{phone.name}</p>
            <p className="text-xs text-zinc-400">
              {selectedStorage} • {phone.condition}
            </p>
          </div>

          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="shrink-0 inline-flex items-center gap-2 rounded-xl bg-emerald-600 px-5 py-2.5 text-xs font-bold text-white shadow-lg shadow-emerald-950/40 hover:bg-emerald-500"
          >
            <MessageCircle className="h-4 w-4" />
            <span>Ask Price</span>
          </a>
        </div>
      </div>
    </div>
  );
}
