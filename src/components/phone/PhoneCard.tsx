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
    <div className="group relative flex flex-col justify-between overflow-hidden rounded-3xl border border-white/10 bg-zinc-950/60 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1.5 hover:border-blue-500/40 hover:shadow-2xl hover:shadow-blue-500/5">
      {/* Top Image & Badge Container */}
      <div className="relative flex h-64 w-full items-center justify-center bg-gradient-to-b from-zinc-900/80 to-black/40 p-6 overflow-hidden">
        {/* Condition Badge */}
        <div className="absolute top-4 left-4 z-10 flex items-center gap-1.5">
          <span
            className={`inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-semibold tracking-wide backdrop-blur-md ${
              phone.condition === "Brand New"
                ? "bg-emerald-500/15 text-emerald-400 border border-emerald-500/30"
                : "bg-blue-500/15 text-blue-400 border border-blue-500/30"
            }`}
          >
            {phone.condition}
          </span>

          {isLaptop && (
            <span className="inline-flex items-center gap-1 rounded-full bg-sky-500/20 px-2.5 py-1 text-[11px] font-semibold text-sky-300 border border-sky-500/30">
              <Laptop className="h-3 w-3" />
              Laptop
            </span>
          )}
        </div>

        {/* Brand Tag */}
        <div className="absolute top-4 right-4 z-10">
          <span className="rounded-full bg-zinc-900/80 px-2.5 py-1 text-[11px] font-medium text-zinc-400 border border-white/5">
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
            className="max-h-48 w-auto object-contain transition-transform duration-500 group-hover:scale-105"
            priority={phone.featured}
          />
        </Link>
      </div>

      {/* Card Body */}
      <div className="flex flex-1 flex-col justify-between p-6">
        <div>
          <Link href={`/phones/${phone.slug}`}>
            <h3 className="text-xl font-bold text-white transition-colors group-hover:text-blue-400">
              {phone.name}
            </h3>
          </Link>

          <p className="mt-1 text-xs text-zinc-400 line-clamp-1">
            {phone.tagline || (isLaptop ? phone.specs?.processor : `${phone.storage} storage capacity`)}
          </p>

          <div className="mt-4 flex flex-wrap items-center gap-2">
            <span className="rounded-lg bg-zinc-900 px-2.5 py-1 text-xs font-medium text-zinc-300 border border-white/5">
              {phone.storage}
            </span>
            {isLaptop && phone.specs?.ram && (
              <span className="rounded-lg bg-sky-950/40 px-2.5 py-1 text-xs font-semibold text-sky-400 border border-sky-500/20">
                {phone.specs.ram}
              </span>
            )}
            <span className="inline-flex items-center gap-1 text-xs text-zinc-400">
              <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" />
              Verified & Tested
            </span>
          </div>

          <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between">
            <span className="text-xs text-zinc-400">Pricing</span>
            <span className="text-xs font-semibold text-blue-400 bg-blue-500/10 px-2 py-0.5 rounded">
              Today&apos;s Best Price
            </span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-5 grid grid-cols-2 gap-2.5">
          <Link
            href={`/phones/${phone.slug}`}
            className="flex items-center justify-center gap-1.5 rounded-xl border border-white/10 bg-zinc-900/90 py-2.5 text-xs font-semibold text-zinc-200 transition-colors hover:bg-zinc-800 hover:text-white"
          >
            <span>Details</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>

          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-1.5 rounded-xl bg-emerald-600 py-2.5 text-xs font-semibold text-white transition-colors hover:bg-emerald-500 shadow-md shadow-emerald-950/40"
          >
            <MessageCircle className="h-3.5 w-3.5" />
            <span>Ask Price</span>
          </a>
        </div>
      </div>
    </div>
  );
}