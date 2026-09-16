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
          <span className="text-xs font-semibold uppercase tracking-wider text-blue-400">
            Spotlight Collection
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mt-1 text-white">
            Featured Technology
          </h2>
          <p className="mt-2 text-sm text-zinc-400">
            Hand-picked flagship smartphones, MacBooks, and smart wearables available for immediate inquiry.
          </p>
        </div>

        {products.length > 0 && (
          <Link
            href="/products"
            className="mt-4 md:mt-0 inline-flex items-center gap-2 text-sm font-semibold text-blue-400 hover:text-blue-300 transition-colors"
          >
            <span>View all {products.length} products</span>
            <ArrowRight className="h-4 w-4" />
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
        <div className="rounded-3xl border border-white/10 bg-gradient-to-b from-zinc-900/60 to-zinc-950/80 p-8 sm:p-12 text-center backdrop-blur-xl max-w-2xl mx-auto">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-500/10 text-blue-400 border border-blue-500/20 mb-5">
            <Sparkles className="h-7 w-7" />
          </div>
          <h3 className="text-2xl font-bold text-white">
            New Stock Landing Daily
          </h3>
          <p className="mt-3 text-sm text-zinc-400 leading-relaxed">
            Our daily Computer Village inventory rotates fast. Need a specific iPhone, MacBook, Samsung Galaxy, or accessory right now? We source, inspect, and verify it on demand.
          </p>
          <div className="mt-7 flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/request"
              className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-6 py-3 text-xs font-semibold text-white hover:bg-blue-500 shadow-lg shadow-blue-900/30 transition"
            >
              <Layers className="h-4 w-4" />
              <span>Request a Device</span>
            </Link>
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-xl border border-emerald-500/30 bg-emerald-950/30 px-6 py-3 text-xs font-semibold text-emerald-400 hover:bg-emerald-900/40 transition"
            >
              <MessageCircle className="h-4 w-4 text-emerald-400" />
              <span>Inquire on WhatsApp</span>
            </a>
          </div>
        </div>
      )}
    </section>
  );
}