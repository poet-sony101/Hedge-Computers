import Link from "next/link";
import { ArrowRight, Sparkles, MessageCircle, Layers, Laptop } from "lucide-react";
import PhoneCard from "../phone/PhoneCard";
import { getAllPhones } from "@/services/phoneService";
import { getGeneralInquiryUrl } from "@/utils/whatsapp";

export default async function FeaturedPhones() {
  const products = await getAllPhones();
  // Display latest products
  const displayList = products.slice(0, 6);
  const whatsappUrl = getGeneralInquiryUrl();

  return (
    <section className="container-custom py-16">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-10">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-red-600 dark:text-red-500">
            Certified Inventory
          </span>
          <h2 className="text-3xl sm:text-4xl font-black mt-1 text-zinc-950 dark:text-white tracking-tight">
            Featured Laptops &amp; Hardware Rigs
          </h2>
          <p className="mt-2 text-xs sm:text-sm text-zinc-600 dark:text-zinc-400">
            Hand-tested USA-Used and Brand New machines ready for same-day dispatch from Computer Village, Ikeja.
          </p>
        </div>

        {products.length > 0 && (
          <Link
            href="/products"
            className="mt-4 md:mt-0 inline-flex items-center gap-1.5 text-xs font-bold text-red-600 dark:text-red-500 hover:underline transition-colors"
          >
            <span>View Complete Inventory ({products.length})</span>
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
        <div className="rounded-[32px] border border-red-500/20 bg-white dark:bg-[#121216] p-8 sm:p-12 text-center backdrop-blur-xl max-w-2xl mx-auto shadow-2xl">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-red-500/10 text-red-600 mb-5 border border-red-500/20">
            <Laptop className="h-7 w-7" />
          </div>
          <h3 className="text-2xl font-black text-zinc-950 dark:text-white">
            Daily Stock Moving Fast
          </h3>
          <p className="mt-2 text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed max-w-md mx-auto">
            Need a specific HP EliteBook, MacBook Pro, Dell XPS, or ThinkPad today? We source, benchmark, and video-verify it on demand.
          </p>
          <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/request"
              className="hedge-btn-secondary text-xs"
            >
              <Layers className="h-3.5 w-3.5" />
              <span>Submit Custom Request</span>
            </Link>
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hedge-btn-crimson text-xs"
            >
              <MessageCircle className="h-3.5 w-3.5" />
              <span>Chat with Ikeja Store</span>
            </a>
          </div>
        </div>
      )}
    </section>
  );
}