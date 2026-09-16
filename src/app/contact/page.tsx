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
  title: "Contact & Location | New Dawn Technologies",
  description:
    "Contact New Dawn Technologies. Connect via WhatsApp or phone call for immediate price inquiries and smartphone delivery in Lagos and nationwide.",
};

const FAQS = [
  {
    q: "Why don't you display fixed prices on the website?",
    a: "Smartphones—especially flagship brand-new and UK-used devices—are affected by daily foreign exchange fluctuations and international market shipments. Rather than showing outdated or inflated fixed prices, we quote today's sharpest rate in real-time.",
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
            <span className="text-xs font-semibold uppercase tracking-wider text-blue-400">
              Customer Support & Inquiries
            </span>
            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white mt-2">
              Let&apos;s Start a Conversation
            </h1>
            <p className="mt-3 text-base text-zinc-400">
              Have questions about an iPhone, Samsung, or Google Pixel? Our team is available to assist you promptly.
            </p>
          </div>

          {/* Contact Channels Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16 max-w-5xl mx-auto">
            {/* WhatsApp */}
            <div className="rounded-3xl border border-emerald-500/30 bg-emerald-950/15 p-8 flex flex-col justify-between backdrop-blur-xl">
              <div>
                <div className="h-12 w-12 rounded-2xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center mb-5">
                  <MessageCircle className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-bold text-white">WhatsApp Chat</h3>
                <p className="text-xs text-zinc-400 mt-2 leading-relaxed">
                  Fastest response. Send us a message to ask for today&apos;s price, availability, or photos.
                </p>
              </div>
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 flex items-center justify-center gap-2 rounded-xl bg-emerald-600 py-3 text-xs font-bold text-white shadow-lg shadow-emerald-950/50 hover:bg-emerald-500"
              >
                <MessageCircle className="h-4 w-4" />
                <span>Chat on WhatsApp</span>
              </a>
            </div>

            {/* Direct Call */}
            <div className="rounded-3xl border border-white/10 bg-zinc-950/60 p-8 flex flex-col justify-between backdrop-blur-xl">
              <div>
                <div className="h-12 w-12 rounded-2xl bg-blue-500/10 text-blue-400 flex items-center justify-center mb-5">
                  <PhoneCall className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-bold text-white">Phone Call</h3>
                <p className="text-xs text-zinc-400 mt-2 leading-relaxed">
                  Prefer to speak with an agent directly? Call during operating hours.
                </p>
              </div>
              <a
                href={`tel:${SITE_CONFIG.phone}`}
                className="mt-6 flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-zinc-900 py-3 text-xs font-bold text-white hover:bg-zinc-800"
              >
                <PhoneCall className="h-4 w-4 text-blue-400" />
                <span>{SITE_CONFIG.displayPhone}</span>
              </a>
            </div>

            {/* Email */}
            <div className="rounded-3xl border border-white/10 bg-zinc-950/60 p-8 flex flex-col justify-between backdrop-blur-xl">
              <div>
                <div className="h-12 w-12 rounded-2xl bg-sky-500/10 text-sky-400 flex items-center justify-center mb-5">
                  <Mail className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-bold text-white">Email Inquiries</h3>
                <p className="text-xs text-zinc-400 mt-2 leading-relaxed">
                  For bulk device orders, enterprise inquiries, or partnership proposals.
                </p>
              </div>
              <a
                href={`mailto:${SITE_CONFIG.email}`}
                className="mt-6 flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-zinc-900 py-3 text-xs font-bold text-white hover:bg-zinc-800"
              >
                <Mail className="h-4 w-4 text-sky-400" />
                <span>Send Email</span>
              </a>
            </div>
          </div>

          {/* Location & Operating Hours Banner */}
          <div className="rounded-3xl border border-white/10 bg-zinc-950/80 p-8 sm:p-12 backdrop-blur-2xl max-w-5xl mx-auto mb-20">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div>
                <span className="text-xs font-semibold uppercase tracking-wider text-blue-400">
                  Physical Hub
                </span>
                <h2 className="text-2xl sm:text-3xl font-bold text-white mt-1">
                  Visit Us or Order Delivery
                </h2>
                <div className="space-y-4 mt-6 text-sm">
                  <div className="flex items-start gap-3 text-zinc-300">
                    <MapPin className="h-5 w-5 text-blue-400 shrink-0 mt-0.5" />
                    <div>
                      <p className="font-semibold text-white">Location</p>
                      <p className="text-zinc-400">{SITE_CONFIG.address}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 text-zinc-300">
                    <Clock className="h-5 w-5 text-blue-400 shrink-0 mt-0.5" />
                    <div>
                      <p className="font-semibold text-white">Working Hours</p>
                      <p className="text-zinc-400">{SITE_CONFIG.operatingHours}</p>
                      <p className="text-zinc-500 text-xs mt-0.5">Sundays: Closed for stock replenishment</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 text-zinc-300">
                    <Truck className="h-5 w-5 text-blue-400 shrink-0 mt-0.5" />
                    <div>
                      <p className="font-semibold text-white">Logistics & Delivery</p>
                      <p className="text-zinc-400">Same-day dispatch in Lagos. 24-48 hours nationwide delivery.</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="rounded-2xl border border-white/10 bg-zinc-900/60 p-6">
                <div className="flex items-center gap-3 mb-4">
                  <ShieldCheck className="h-6 w-6 text-emerald-400" />
                  <h4 className="font-bold text-white">Our Quality Guarantee</h4>
                </div>
                <p className="text-xs leading-relaxed text-zinc-400 mb-4">
                  Every smartphone purchased from New Dawn Technologies is backed by our customer satisfaction commitment and warranty verification on genuine hardware.
                </p>
                <Link
                  href="/phones"
                  className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 py-3 text-xs font-semibold text-white hover:bg-blue-500 transition"
                >
                  Browse Available Stock
                </Link>
              </div>
            </div>
          </div>

          {/* Frequently Asked Questions */}
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-10">
              <span className="text-xs font-semibold uppercase tracking-wider text-blue-400">
                Got Questions?
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold text-white mt-1">
                Frequently Asked Questions
              </h2>
            </div>

            <div className="space-y-4">
              {FAQS.map((faq, idx) => (
                <div
                  key={idx}
                  className="rounded-2xl border border-white/10 bg-zinc-950/40 p-6"
                >
                  <h3 className="flex items-start gap-3 text-base font-semibold text-white">
                    <HelpCircle className="h-5 w-5 text-blue-400 shrink-0 mt-0.5" />
                    <span>{faq.q}</span>
                  </h3>
                  <p className="mt-3 text-sm text-zinc-400 pl-8 leading-relaxed">
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
