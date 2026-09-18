import Link from "next/link";
import { ArrowRight, Sparkles, MessageCircle, Layers } from "lucide-react";
import PhoneCard from "../phone/PhoneCard";
import { getAllPhones } from "@/services/phoneService";
import { getGeneralInquiryUrl } from "@/utils/whatsapp";

export default async function FeaturedPhones() {
  const products = await getAllPhones();
  const featuredList = products.filter((p) => p.featured);
  const displayList = featuredList.length > 0 ? featuredList.slice(0, 6) : products.slice(0, 6);
  const whatsappUrl = getGeneralInquiryUrl();

  return (
    <section className="container-custom py-20">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
        <div>
          <span className="text-xs font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
            Spotlight Collection
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mt-1 text-[#1d1d1f] dark:text-white tracking-tight">
            Featured Technology
          </h2>
          <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
            Hand-picked flagship smartphones, MacBooks, and smart wearables available for immediate inquiry.
          </p>
        </div>

        {products.length > 0 && (
          <Link
            href="/products"
            className="mt-4 md:mt-0 inline-flex items-center gap-1.5 text-xs font-semibold text-[#1d1d1f] dark:text-white hover:underline transition-colors"
          >
            <span>View all {products.length} products</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        )}
      </div>

      {displayList.length > 0 ? (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {displayList.map((product) => (
            <PhoneCard key={product.id} phone={product} />
          ))}
        </div>
      ) : (
        <div className="rounded-[32px] border border-black/[0.08] dark:border-white/10 bg-white dark:bg-[#1c1c1e] p-8 sm:p-12 text-center backdrop-blur-xl max-w-2xl mx-auto shadow-sm dark:shadow-2xl">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-zinc-100 dark:bg-zinc-800 text-[#1d1d1f] dark:text-white border border-black/[0.06] dark:border-white/10 mb-5">
            <Sparkles className="h-6 w-6" />
          </div>
          <h3 className="text-2xl font-bold text-[#1d1d1f] dark:text-white">
            New Stock Landing Daily
          </h3>
          <p className="mt-2.5 text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed max-w-md mx-auto">
            Our daily Computer Village inventory rotates fast. Need a specific iPhone, MacBook, Samsung Galaxy, or accessory right now? We source, inspect, and verify it on demand.
          </p>
          <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/request"
              className="inline-flex items-center gap-2 rounded-full bg-[#1d1d1f] hover:bg-black text-white dark:bg-white dark:text-black dark:hover:bg-zinc-200 px-6 py-2.5 text-xs font-semibold shadow-sm transition active:scale-95"
            >
              <Layers className="h-3.5 w-3.5" />
              <span>Request a Device</span>
            </Link>
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 hover:bg-emerald-500/20 px-6 py-2.5 text-xs font-semibold text-emerald-700 dark:text-emerald-400 shadow-sm transition active:scale-95"
            >
              <MessageCircle className="h-3.5 w-3.5" />
              <span>Inquire on WhatsApp</span>
            </a>
          </div>
        </div>
      )}
    </section>
  );
}