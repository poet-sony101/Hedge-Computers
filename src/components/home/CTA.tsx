import Link from "next/link";
import { MessageCircle, Search, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getGeneralInquiryUrl } from "@/utils/whatsapp";

export default function CTA() {
  const whatsappUrl = getGeneralInquiryUrl();

  return (
    <section className="container-custom py-20">
      <div className="relative overflow-hidden rounded-[32px] border border-blue-500/20 bg-gradient-to-br from-blue-950/80 via-zinc-950 to-black p-8 sm:p-14 text-center">
        {/* Glow */}
        <div className="absolute -top-24 left-1/2 -translate-x-1/2 h-48 w-96 rounded-full bg-blue-600/20 blur-[100px] pointer-events-none" />

        <div className="relative z-10 max-w-2xl mx-auto space-y-4">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-blue-500/10 px-4 py-1.5 text-xs font-semibold text-blue-400 border border-blue-500/20">
            <Search className="h-3.5 w-3.5" />
            Custom Device Sourcing
          </span>

          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-white">
            Can&apos;t Find the Phone You Need?
          </h2>

          <p className="text-sm sm:text-base leading-relaxed text-zinc-400">
            Looking for a specific color, higher storage tier, or a model not currently displayed? Tell us what you want and our team will source it with verified authenticity at today&apos;s best rate.
          </p>

          <div className="pt-4 flex flex-wrap items-center justify-center gap-4">
            <Link href="/request">
              <Button
                size="lg"
                className="rounded-full bg-blue-600 hover:bg-blue-500 text-white px-8 font-semibold shadow-lg shadow-blue-900/40"
              >
                Request a Specific Phone
                <ArrowRight className="ml-2 h-4 w-4" />
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
                className="rounded-full border-white/10 bg-zinc-900/80 hover:bg-zinc-800 text-zinc-200 px-8"
              >
                <MessageCircle className="mr-2 h-4 w-4 text-emerald-400" />
                Chat with an Agent
              </Button>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}