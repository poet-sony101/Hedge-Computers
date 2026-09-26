import Link from "next/link";
import { MessageCircle, Search, ArrowRight, Building2, ShieldCheck, MapPin } from "lucide-react";
import { getGeneralInquiryUrl } from "@/utils/whatsapp";

export default function CTA() {
  const whatsappUrl = getGeneralInquiryUrl();

  return (
    <section className="container-custom py-20">
      <div className="relative overflow-hidden rounded-[36px] border border-red-500/20 bg-gradient-to-b from-white via-zinc-50 to-zinc-100 dark:from-[#14141c] dark:via-[#0e0e13] dark:to-[#09090b] p-8 sm:p-16 text-center shadow-2xl">
        {/* Crimson Center Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-72 w-96 rounded-full bg-red-600/10 blur-[150px] pointer-events-none" />

        <div className="relative z-10 max-w-2xl mx-auto space-y-5">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-red-500/10 px-4 py-1 text-xs font-bold text-red-600 dark:text-red-400 border border-red-500/20">
            <Building2 className="h-3.5 w-3.5" />
            Wholesale &amp; Retail Computer Engineering
          </span>

          <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-zinc-950 dark:text-white">
            Need a Specific Laptop Rig or Bulk Fleet Supply?
          </h2>

          <p className="text-xs sm:text-sm leading-relaxed text-zinc-600 dark:text-zinc-400 font-medium">
            Supplying companies, developer teams, creative studios, and individual power users across Nigeria. Tell us your target RAM, GPU, and budget — we inspect, benchmark, and deliver directly from Computer Village, Ikeja.
          </p>

          <div className="pt-4 flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/request"
              className="hedge-btn-crimson py-3.5 px-8 text-xs font-bold shadow-xl shadow-red-600/20"
            >
              <span>Submit Custom Machine Spec</span>
              <ArrowRight className="h-4 w-4" />
            </Link>

            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hedge-btn-secondary py-3.5 px-8 text-xs font-bold"
            >
              <MessageCircle className="h-4 w-4 text-emerald-500" />
              <span>Talk to Ikeja Engineer on WhatsApp</span>
            </a>
          </div>

          <div className="pt-6 flex items-center justify-center gap-6 text-[11px] font-semibold text-zinc-500 dark:text-zinc-400">
            <span className="flex items-center gap-1.5">
              <MapPin className="h-3.5 w-3.5 text-red-600" />
              12 Oshitelu St, Computer Village, Ikeja
            </span>
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="h-3.5 w-3.5 text-red-600" />
              Direct Store Warranty
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}