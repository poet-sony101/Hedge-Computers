"use client";

import Image from "next/image";
import Link from "next/link";
import { MessageCircle, ArrowRight, CheckCircle2, Laptop } from "lucide-react";
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
    <div className="group relative flex flex-col justify-between overflow-hidden rounded-[28px] border border-black/[0.08] dark:border-white/10 bg-white dark:bg-[#1c1c1e] shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
      {/* Top Image & Badge Container */}
      <div className="relative flex h-60 w-full items-center justify-center bg-zinc-50 dark:bg-zinc-900/40 p-6 overflow-hidden">
        {/* Condition Badge */}
        <div className="absolute top-4 left-4 z-10 flex items-center gap-1.5">
          <span
            className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-[11px] font-semibold tracking-wide backdrop-blur-md ${
              phone.condition === "Brand New"
                ? "bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border border-emerald-500/20"
                : "bg-zinc-200/80 text-zinc-800 dark:bg-white/10 dark:text-zinc-200 border border-black/5 dark:border-white/10"
            }`}
          >
            {phone.condition}
          </span>

          {isLaptop && (
            <span className="inline-flex items-center gap-1 rounded-full bg-zinc-200/80 text-zinc-800 dark:bg-white/10 dark:text-zinc-200 px-2 py-0.5 text-[10px] font-semibold border border-black/5 dark:border-white/10">
              <Laptop className="h-3 w-3" />
              Laptop
            </span>
          )}
        </div>

        {/* Brand Tag */}
        <div className="absolute top-4 right-4 z-10">
          <span className="rounded-full bg-white/80 dark:bg-zinc-900/80 px-2.5 py-0.5 text-[11px] font-medium text-zinc-600 dark:text-zinc-400 border border-black/5 dark:border-white/5">
            {phone.brand}
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
            className="max-h-44 w-auto object-contain transition-transform duration-500 group-hover:scale-105 drop-shadow-md"
            priority={phone.featured}
            unoptimized={
              phone.image.startsWith("http") ||
              phone.image.startsWith("data:") ||
              phone.image.endsWith(".svg")
            }
          />
        </Link>
      </div>

      {/* Card Body */}
      <div className="flex flex-1 flex-col justify-between p-6">
        <div>
          <Link href={`/phones/${phone.slug}`}>
            <h3 className="text-lg font-bold text-[#1d1d1f] dark:text-white transition-colors group-hover:underline">
              {phone.name}
            </h3>
          </Link>

          <p className="mt-1 text-xs text-zinc-500 dark:text-zinc-400 line-clamp-1">
            {phone.tagline || (isLaptop ? phone.specs?.processor : `${phone.storage} capacity`)}
          </p>

          <div className="mt-4 flex flex-wrap items-center gap-2">
            <span className="rounded-full bg-zinc-100 dark:bg-zinc-800 px-2.5 py-0.5 text-[11px] font-medium text-zinc-700 dark:text-zinc-300 border border-black/[0.04] dark:border-white/5">
              {phone.storage}
            </span>
            {isLaptop && phone.specs?.ram && (
              <span className="rounded-full bg-zinc-100 dark:bg-zinc-800 px-2.5 py-0.5 text-[11px] font-semibold text-zinc-700 dark:text-zinc-300 border border-black/[0.04] dark:border-white/5">
                {phone.specs.ram}
              </span>
            )}
            <span className="inline-flex items-center gap-1 text-[11px] text-zinc-500 dark:text-zinc-400">
              <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500" />
              Verified Genuine
            </span>
          </div>

          <div className="mt-4 pt-3 border-t border-black/[0.06] dark:border-white/5 flex items-center justify-between">
            <span className="text-xs text-zinc-500 dark:text-zinc-400">Rate Status</span>
            <span className="text-[11px] font-semibold text-[#1d1d1f] dark:text-zinc-200 bg-zinc-100 dark:bg-white/10 px-2.5 py-0.5 rounded-full">
              {phone.priceNote || "Daily Market Rate"}
            </span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-5 grid grid-cols-2 gap-2">
          <Link
            href={`/phones/${phone.slug}`}
            className="flex items-center justify-center gap-1 rounded-full border border-black/10 dark:border-white/15 bg-white dark:bg-zinc-900 py-2 text-xs font-semibold text-[#1d1d1f] dark:text-zinc-200 transition-colors hover:bg-zinc-100 dark:hover:bg-zinc-800"
          >
            <span>Details</span>
            <ArrowRight className="h-3 w-3" />
          </Link>

          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-1.5 rounded-full bg-[#1d1d1f] hover:bg-black text-white dark:bg-white dark:text-black dark:hover:bg-zinc-200 py-2 text-xs font-semibold transition-colors shadow-sm"
          >
            <MessageCircle className="h-3.5 w-3.5 text-emerald-500" />
            <span>Ask Price</span>
          </a>
        </div>
      </div>
    </div>
  );
}