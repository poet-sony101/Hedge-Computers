import Link from "next/link";
import { MessageCircle, Search, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getGeneralInquiryUrl } from "@/utils/whatsapp";

export default function CTA() {
  const whatsappUrl = getGeneralInquiryUrl();

  return (
    <section className="container-custom py-20">
      <div className="relative overflow-hidden rounded-[36px] border border-black/[0.08] dark:border-white/10 bg-white dark:bg-[#1c1c1e] p-8 sm:p-14 text-center shadow-lg dark:shadow-2xl">
        {/* Subtle Ambient Silver Light */}
        <div className="absolute -top-24 left-1/2 -translate-x-1/2 h-48 w-96 rounded-full bg-zinc-300/30 dark:bg-zinc-700/15 blur-[120px] pointer-events-none" />

        <div className="relative z-10 max-w-2xl mx-auto space-y-4">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-zinc-100 dark:bg-zinc-800 px-3.5 py-1 text-xs font-semibold text-zinc-700 dark:text-zinc-300 border border-black/[0.06] dark:border-white/10">
            <Search className="h-3.5 w-3.5" />
            Custom Device Sourcing
          </span>

          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-[#1d1d1f] dark:text-white">
            Can&apos;t Find the Device You Need?
          </h2>

          <p className="text-sm sm:text-base leading-relaxed text-zinc-600 dark:text-zinc-400">
            Looking for a specific color, higher storage tier, or a model not currently displayed? Tell us what you want and our team will source it with verified authenticity at today&apos;s best rate.
          </p>

          <div className="pt-4 flex flex-wrap items-center justify-center gap-3">
            <Link href="/request">
              <Button
                size="lg"
                className="rounded-full bg-[#1d1d1f] hover:bg-black text-white dark:bg-white dark:text-black dark:hover:bg-zinc-200 px-7 font-semibold text-xs shadow-sm transition active:scale-95"
              >
                Request a Specific Device
                <ArrowRight className="ml-1.5 h-3.5 w-3.5" />
              </Button>
            </Link>

            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button
                size="lg"
                variant="outline"
                className="rounded-full border-black/10 dark:border-white/15 bg-white dark:bg-zinc-900/80 hover:bg-zinc-100 dark:hover:bg-zinc-800 text-[#1d1d1f] dark:text-[#f5f5f7] px-7 text-xs font-semibold shadow-sm transition active:scale-95"
              >
                <MessageCircle className="mr-1.5 h-3.5 w-3.5 text-emerald-500" />
                Chat with an Agent
              </Button>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}