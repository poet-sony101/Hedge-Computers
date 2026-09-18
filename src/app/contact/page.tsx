import Link from "next/link";
import {
  MessageCircle,
  PhoneCall,
  Mail,
  MapPin,
  Clock,
  Truck,
  ShieldCheck,
  HelpCircle,
} from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { SITE_CONFIG } from "@/constants/site";
import { getGeneralInquiryUrl } from "@/utils/whatsapp";

export const metadata = {
  title: "Contact & Location | Available Tech",
  description:
    "Contact Available Tech. Connect via WhatsApp or phone call for immediate price inquiries and device delivery in Lagos and nationwide.",
};

const FAQS = [
  {
    q: "Why don't you display fixed prices on the website?",
    a: "Hardware—especially flagship brand-new and UK-used devices—is affected by daily foreign exchange fluctuations and international market shipments. Rather than showing outdated or inflated fixed prices, we quote today's sharpest rate in real-time.",
  },
  {
    q: "How are UK-used devices inspected?",
    a: "Every UK-used device undergoes a 25-point hardware diagnostic test including battery health, True Tone, Face ID / Touch ID, camera sensors, charging ports, and speaker clarity before being cleared for sale.",
  },
  {
    q: "Do you deliver outside Lagos?",
    a: "Yes! We offer secured, insured nationwide delivery across all 36 states in Nigeria via trusted logistics partners.",
  },
  {
    q: "Can I pick up my device in person?",
    a: "Yes, you can visit our tech hub in Computer Village, Ikeja, Lagos to test and pick up your device in person during operating hours.",
  },
];

export default function ContactPage() {
  const whatsappUrl = getGeneralInquiryUrl();

  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-28 pb-24">
        <div className="container-custom">
          {/* Header */}
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
              Customer Support &amp; Inquiries
            </span>
            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-[#1d1d1f] dark:text-white mt-2">
              Let&apos;s Start a Conversation
            </h1>
            <p className="mt-3 text-base text-zinc-600 dark:text-zinc-400">
              Have questions about an iPhone, MacBook, or Samsung Galaxy? Our team is available to assist you promptly.
            </p>
          </div>

          {/* Contact Channels Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16 max-w-5xl mx-auto">
            {/* WhatsApp */}
            <div className="rounded-[32px] border border-emerald-500/20 bg-emerald-500/5 dark:bg-emerald-950/20 p-8 flex flex-col justify-between backdrop-blur-xl shadow-sm">
              <div>
                <div className="h-12 w-12 rounded-2xl bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mb-5">
                  <MessageCircle className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-bold text-[#1d1d1f] dark:text-white">WhatsApp Chat</h3>
                <p className="text-xs text-zinc-600 dark:text-zinc-400 mt-2 leading-relaxed">
                  Fastest response. Send us a message to ask for today&apos;s price, availability, or photos.
                </p>
              </div>
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 flex items-center justify-center gap-2 rounded-full bg-[#1d1d1f] hover:bg-black text-white dark:bg-white dark:text-black dark:hover:bg-zinc-200 py-3 text-xs font-semibold shadow-sm transition active:scale-95"
              >
                <MessageCircle className="h-4 w-4 text-emerald-500" />
                <span>Chat on WhatsApp</span>
              </a>
            </div>

            {/* Direct Call */}
            <div className="rounded-[32px] border border-black/[0.08] dark:border-white/10 bg-white dark:bg-[#1c1c1e] p-8 flex flex-col justify-between backdrop-blur-xl shadow-sm">
              <div>
                <div className="h-12 w-12 rounded-2xl bg-zinc-100 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-200 flex items-center justify-center mb-5">
                  <PhoneCall className="h-5 w-5" />
                </div>
                <h3 className="text-xl font-bold text-[#1d1d1f] dark:text-white">Phone Call</h3>
                <p className="text-xs text-zinc-600 dark:text-zinc-400 mt-2 leading-relaxed">
                  Prefer to speak with an agent directly? Call during operating hours.
                </p>
              </div>
              <a
                href={`tel:${SITE_CONFIG.phone}`}
                className="mt-6 flex items-center justify-center gap-2 rounded-full border border-black/10 dark:border-white/15 bg-zinc-50 dark:bg-zinc-900 py-3 text-xs font-semibold text-[#1d1d1f] dark:text-white hover:bg-zinc-100 dark:hover:bg-zinc-800 transition active:scale-95"
              >
                <PhoneCall className="h-4 w-4 text-zinc-500" />
                <span>{SITE_CONFIG.displayPhone}</span>
              </a>
            </div>

            {/* Email */}
            <div className="rounded-[32px] border border-black/[0.08] dark:border-white/10 bg-white dark:bg-[#1c1c1e] p-8 flex flex-col justify-between backdrop-blur-xl shadow-sm">
              <div>
                <div className="h-12 w-12 rounded-2xl bg-zinc-100 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-200 flex items-center justify-center mb-5">
                  <Mail className="h-5 w-5" />
                </div>
                <h3 className="text-xl font-bold text-[#1d1d1f] dark:text-white">Email Inquiries</h3>
                <p className="text-xs text-zinc-600 dark:text-zinc-400 mt-2 leading-relaxed">
                  For bulk device orders, enterprise hardware, or partnership inquiries.
                </p>
              </div>
              <a
                href={`mailto:${SITE_CONFIG.email}`}
                className="mt-6 flex items-center justify-center gap-2 rounded-full border border-black/10 dark:border-white/15 bg-zinc-50 dark:bg-zinc-900 py-3 text-xs font-semibold text-[#1d1d1f] dark:text-white hover:bg-zinc-100 dark:hover:bg-zinc-800 transition active:scale-95"
              >
                <Mail className="h-4 w-4 text-zinc-500" />
                <span>Send Email</span>
              </a>
            </div>
          </div>

          {/* Location & Operating Hours Banner */}
          <div className="rounded-[36px] border border-black/[0.08] dark:border-white/10 bg-white dark:bg-[#1c1c1e] p-8 sm:p-12 backdrop-blur-2xl max-w-5xl mx-auto mb-20 shadow-sm">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div>
                <span className="text-xs font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
                  Physical Hub
                </span>
                <h2 className="text-2xl sm:text-3xl font-bold text-[#1d1d1f] dark:text-white mt-1">
                  Visit Us or Order Delivery
                </h2>
                <div className="space-y-4 mt-6 text-sm">
                  <div className="flex items-start gap-3 text-zinc-600 dark:text-zinc-300">
                    <MapPin className="h-5 w-5 text-zinc-800 dark:text-zinc-200 shrink-0 mt-0.5" />
                    <div>
                      <p className="font-semibold text-[#1d1d1f] dark:text-white">Location</p>
                      <p className="text-zinc-600 dark:text-zinc-400 text-xs">{SITE_CONFIG.address}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 text-zinc-600 dark:text-zinc-300">
                    <Clock className="h-5 w-5 text-zinc-800 dark:text-zinc-200 shrink-0 mt-0.5" />
                    <div>
                      <p className="font-semibold text-[#1d1d1f] dark:text-white">Working Hours</p>
                      <p className="text-zinc-600 dark:text-zinc-400 text-xs">{SITE_CONFIG.operatingHours}</p>
                      <p className="text-zinc-500 text-[11px] mt-0.5">Sundays: Closed for stock replenishment</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 text-zinc-600 dark:text-zinc-300">
                    <Truck className="h-5 w-5 text-zinc-800 dark:text-zinc-200 shrink-0 mt-0.5" />
                    <div>
                      <p className="font-semibold text-[#1d1d1f] dark:text-white">Logistics &amp; Delivery</p>
                      <p className="text-zinc-600 dark:text-zinc-400 text-xs">Same-day dispatch in Lagos. 24-48 hours nationwide delivery.</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="rounded-[28px] border border-black/[0.06] dark:border-white/10 bg-zinc-50 dark:bg-zinc-900/60 p-6">
                <div className="flex items-center gap-3 mb-4">
                  <ShieldCheck className="h-6 w-6 text-emerald-500" />
                  <h4 className="font-bold text-[#1d1d1f] dark:text-white">Our Quality Guarantee</h4>
                </div>
                <p className="text-xs leading-relaxed text-zinc-600 dark:text-zinc-400 mb-5">
                  Every device purchased from Available Tech is backed by our customer satisfaction commitment and rigorous warranty verification on genuine hardware.
                </p>
                <Link
                  href="/products"
                  className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#1d1d1f] hover:bg-black text-white dark:bg-white dark:text-black dark:hover:bg-zinc-200 py-3 text-xs font-semibold transition active:scale-95 shadow-sm"
                >
                  Browse Available Stock
                </Link>
              </div>
            </div>
          </div>

          {/* Frequently Asked Questions */}
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-10">
              <span className="text-xs font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
                Got Questions?
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold text-[#1d1d1f] dark:text-white mt-1">
                Frequently Asked Questions
              </h2>
            </div>

            <div className="space-y-4">
              {FAQS.map((faq, idx) => (
                <div
                  key={idx}
                  className="rounded-2xl border border-black/[0.06] dark:border-white/10 bg-white dark:bg-[#1c1c1e] p-6 shadow-sm"
                >
                  <h3 className="flex items-start gap-3 text-base font-semibold text-[#1d1d1f] dark:text-white">
                    <HelpCircle className="h-5 w-5 text-zinc-400 shrink-0 mt-0.5" />
                    <span>{faq.q}</span>
                  </h3>
                  <p className="mt-3 text-xs text-zinc-600 dark:text-zinc-400 pl-8 leading-relaxed">
                    {faq.a}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
