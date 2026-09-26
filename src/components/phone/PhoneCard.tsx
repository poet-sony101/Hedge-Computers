"use client";

import Image from "next/image";
import Link from "next/link";
import { MessageCircle, ArrowRight, CheckCircle2, Laptop, Smartphone, Cpu, HardDrive, ShieldCheck } from "lucide-react";
import { Phone } from "@/types/phone";
import { getPhoneInquiryUrl } from "@/utils/whatsapp";

interface PhoneCardProps {
  phone: Phone;
}

export default function PhoneCard({ phone }: PhoneCardProps) {
  const isLaptop = phone.category === "laptop";

  const whatsappUrl = getPhoneInquiryUrl({
    phoneName: phone.name,
    category: phone.category,
    storage: phone.storage,
    condition: phone.condition,
    ram: phone.specs?.ram,
    processor: phone.specs?.processor,
  });

  return (
    <div className="group relative flex flex-col justify-between overflow-hidden rounded-[26px] border border-black/10 dark:border-white/10 bg-white dark:bg-[#121216] shadow-sm hover:shadow-xl hover:border-red-500/40 dark:hover:border-red-500/40 hover:-translate-y-1 transition-all duration-300">
      {/* Top Header Badge Row */}
      <div className="relative flex h-56 w-full items-center justify-center bg-zinc-50 dark:bg-[#181820] p-6 overflow-hidden">
        {/* Ambient Hover Glow */}
        <div className="absolute inset-0 bg-red-600/0 group-hover:bg-red-600/5 transition-colors duration-300 pointer-events-none" />

        {/* Condition & Category Tag */}
        <div className="absolute top-3.5 left-3.5 z-10 flex flex-wrap items-center gap-1.5">
          <span
            className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-[10px] font-bold tracking-wide backdrop-blur-md ${
              phone.condition === "Brand New"
                ? "bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border border-emerald-500/20"
                : "bg-red-500/10 text-red-700 dark:text-red-400 border border-red-500/20"
            }`}
          >
            {phone.condition}
          </span>

          <span className="inline-flex items-center gap-1 rounded-full bg-black/5 dark:bg-white/10 text-zinc-700 dark:text-zinc-300 px-2 py-0.5 text-[10px] font-semibold border border-black/5 dark:border-white/5">
            {isLaptop ? <Laptop className="h-3 w-3" /> : <Smartphone className="h-3 w-3" />}
            {phone.brand}
          </span>
        </div>

        {/* Verified Badge */}
        <div className="absolute top-3.5 right-3.5 z-10">
          <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
            <ShieldCheck className="h-3 w-3" />
            Tested
          </span>
        </div>

        {/* Product Image */}
        <Link
          href={`/phones/${phone.slug}`}
          className="relative flex h-full w-full items-center justify-center"
        >
          <Image
            src={phone.image}
            alt={phone.name}
            width={200}
            height={200}
            className="max-h-40 w-auto object-contain transition-transform duration-500 group-hover:scale-105 drop-shadow-md"
            priority={phone.featured}
            unoptimized={
              phone.image.startsWith("http") ||
              phone.image.startsWith("data:") ||
              phone.image.endsWith(".svg")
            }
          />
        </Link>
      </div>

      {/* Card Details Body */}
      <div className="flex flex-1 flex-col justify-between p-5 space-y-4">
        <div>
          <Link href={`/phones/${phone.slug}`}>
            <h3 className="text-base sm:text-lg font-black text-zinc-950 dark:text-white transition-colors group-hover:text-red-600 dark:group-hover:text-red-500 line-clamp-1">
              {phone.name}
            </h3>
          </Link>

          <p className="mt-1 text-xs text-zinc-500 dark:text-zinc-400 line-clamp-1 font-medium">
            {phone.tagline || (isLaptop ? phone.specs?.processor : `${phone.storage} storage capacity`)}
          </p>

          {/* Hardware Specs Chips */}
          <div className="mt-3 flex flex-wrap items-center gap-1.5">
            <span className="rounded-lg bg-black/5 dark:bg-white/5 px-2 py-1 text-[11px] font-semibold text-zinc-800 dark:text-zinc-200 border border-black/5 dark:border-white/5 flex items-center gap-1">
              <HardDrive className="h-3 w-3 text-red-600" />
              {phone.storage}
            </span>

            {isLaptop && phone.specs?.ram && (
              <span className="rounded-lg bg-black/5 dark:bg-white/5 px-2 py-1 text-[11px] font-bold text-zinc-800 dark:text-zinc-200 border border-black/5 dark:border-white/5 flex items-center gap-1">
                <Cpu className="h-3 w-3 text-red-600" />
                {phone.specs.ram}
              </span>
            )}

            {isLaptop && phone.specs?.processor && (
              <span className="rounded-lg bg-black/5 dark:bg-white/5 px-2 py-1 text-[10px] font-medium text-zinc-700 dark:text-zinc-300 border border-black/5 dark:border-white/5 line-clamp-1 max-w-[150px]">
                {phone.specs.processor.split("(")[0]}
              </span>
            )}
          </div>

          {/* Price status bar */}
          <div className="mt-3 pt-2.5 border-t border-black/5 dark:border-white/5 flex items-center justify-between">
            <span className="text-[11px] font-medium text-zinc-500 dark:text-zinc-400">
              Rate Status
            </span>
            <span className="text-[11px] font-bold text-red-600 dark:text-red-400">
              {phone.priceNote || "Daily Market Rate"}
            </span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-2 gap-2 pt-1">
          <Link
            href={`/phones/${phone.slug}`}
            className="flex items-center justify-center gap-1 rounded-xl border border-black/10 dark:border-white/10 bg-black/[0.02] dark:bg-white/5 py-2 text-xs font-semibold text-zinc-800 dark:text-zinc-200 transition-colors hover:bg-black/5 dark:hover:bg-white/10"
          >
            <span>Specs</span>
            <ArrowRight className="h-3 w-3" />
          </Link>

          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-1.5 rounded-xl bg-red-600 hover:bg-red-700 text-white py-2 text-xs font-bold transition-all shadow-md shadow-red-600/20 active:scale-95"
          >
            <MessageCircle className="h-3.5 w-3.5" />
            <span>Ask Price</span>
          </a>
        </div>
      </div>
    </div>
  );
}