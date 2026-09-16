import Link from "next/link";
import { MessageCircle, Mail, MapPin, Sparkles, PhoneCall } from "lucide-react";
import { SITE_CONFIG } from "@/constants/site";
import { getGeneralInquiryUrl } from "@/utils/whatsapp";

export default function Footer() {
  const whatsappUrl = getGeneralInquiryUrl();

  return (
    <footer className="border-t border-white/10 bg-black pt-16 pb-12 text-zinc-400">
      <div className="container-custom">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-4 pb-12 border-b border-white/10">
          {/* Brand Column */}
          <div className="space-y-4 md:col-span-1">
            <Link href="/" className="flex items-center gap-2">
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-tr from-blue-600 to-sky-400 text-white">
                <Sparkles className="h-4 w-4" />
              </span>
              <span className="text-xl font-bold tracking-tight text-white">
                {SITE_CONFIG.shortName}
                <span className="text-blue-500">.</span>
              </span>
            </Link>
            <p className="text-sm leading-relaxed text-zinc-400">
              Your trusted destination for genuine brand-new and premium UK-used smartphones. Transparent, daily market-aligned pricing without the hassle.
            </p>
            <div className="pt-2">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-950/40 px-3.5 py-1.5 text-xs font-medium text-emerald-400 hover:bg-emerald-900/50 transition-colors"
              >
                <MessageCircle className="h-3.5 w-3.5" />
                Inquire Directly on WhatsApp
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="text-sm font-semibold uppercase tracking-wider text-white">
              Navigation
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/" className="hover:text-white transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/phones" className="hover:text-white transition-colors">
                  Browse Catalog
                </Link>
              </li>
              <li>
                <Link href="/request" className="hover:text-white transition-colors">
                  Request a Phone
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-white transition-colors">
                  Contact & Location
                </Link>
              </li>
            </ul>
          </div>

          {/* Popular Brands */}
          <div className="space-y-4">
            <h4 className="text-sm font-semibold uppercase tracking-wider text-white">
              Top Brands
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/phones?brand=Apple" className="hover:text-white transition-colors">
                  Apple iPhone
                </Link>
              </li>
              <li>
                <Link href="/phones?brand=Samsung" className="hover:text-white transition-colors">
                  Samsung Galaxy
                </Link>
              </li>
              <li>
                <Link href="/phones?brand=Google" className="hover:text-white transition-colors">
                  Google Pixel
                </Link>
              </li>
              <li>
                <Link href="/phones?brand=Xiaomi" className="hover:text-white transition-colors">
                  Xiaomi
                </Link>
              </li>
              <li>
                <Link href="/phones?brand=Tecno" className="hover:text-white transition-colors">
                  Tecno Mobile
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact / Service Hours */}
          <div className="space-y-4">
            <h4 className="text-sm font-semibold uppercase tracking-wider text-white">
              Get in Touch
            </h4>
            <div className="space-y-3 text-sm">
              <p className="flex items-start gap-2.5 text-zinc-400">
                <MapPin className="h-4 w-4 shrink-0 text-blue-400 mt-0.5" />
                <span>{SITE_CONFIG.address}</span>
              </p>
              <p className="flex items-center gap-2.5 text-zinc-400">
                <PhoneCall className="h-4 w-4 shrink-0 text-blue-400" />
                <span>{SITE_CONFIG.displayPhone}</span>
              </p>
              <p className="flex items-center gap-2.5 text-zinc-400">
                <Mail className="h-4 w-4 shrink-0 text-blue-400" />
                <span>{SITE_CONFIG.email}</span>
              </p>
              <div className="pt-2 text-xs text-zinc-500">
                Operating Hours:
                <br />
                <span className="text-zinc-400">{SITE_CONFIG.operatingHours}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-8 flex flex-col items-center justify-between gap-4 text-xs text-zinc-500 sm:flex-row">
          <p>© {new Date().getFullYear()} {SITE_CONFIG.name}. All rights reserved.</p>
          <p className="flex items-center gap-2">
            <span>Built for speed & inquiry-first smartphone sales</span>
          </p>
        </div>
      </div>
    </footer>
  );
}