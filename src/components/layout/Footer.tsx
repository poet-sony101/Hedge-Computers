import Link from "next/link";
import { MessageCircle, Mail, MapPin, PhoneCall } from "lucide-react";
import { SITE_CONFIG } from "@/constants/site";
import { getGeneralInquiryUrl } from "@/utils/whatsapp";

export default function Footer() {
  const whatsappUrl = getGeneralInquiryUrl();

  return (
    <footer className="border-t border-black/[0.08] dark:border-white/10 bg-[#f5f5f7] dark:bg-black pt-16 pb-12 text-zinc-600 dark:text-zinc-400">
      <div className="container-custom">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-4 pb-12 border-b border-black/[0.08] dark:border-white/10">
          {/* Brand Column */}
          <div className="space-y-4 md:col-span-1">
            <Link href="/" className="flex items-center gap-2.5">
              <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-gradient-to-br from-zinc-800 to-zinc-950 dark:from-zinc-100 dark:to-zinc-300 text-white dark:text-zinc-900 shadow-sm border border-black/10 dark:border-white/20">
                <svg
                  className="h-3.5 w-3.5 fill-current"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M12 2L2 22h4.5l2.25-5h6.5l2.25 5H22L12 2zm0 6.5l2.2 4.5h-4.4L12 8.5z" />
                </svg>
              </span>
              <span className="text-lg font-bold tracking-tight text-[#1d1d1f] dark:text-white">
                Available<span className="font-light text-zinc-500 dark:text-zinc-400 ml-0.5">Tech</span>
              </span>
            </Link>
            <p className="text-xs leading-relaxed text-zinc-500 dark:text-zinc-400">
              Your trusted destination for genuine brand-new and premium UK-used technology. Transparent, daily market-aligned pricing without the hassle.
            </p>
            <div className="pt-1">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-4 py-2 text-xs font-semibold text-emerald-700 dark:text-emerald-400 hover:bg-emerald-500/20 transition-colors shadow-sm"
              >
                <MessageCircle className="h-3.5 w-3.5 text-emerald-500" />
                Inquire Directly on WhatsApp
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#1d1d1f] dark:text-white">
              Navigation
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/" className="hover:text-[#1d1d1f] dark:hover:text-white transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/products" className="hover:text-[#1d1d1f] dark:hover:text-white transition-colors">
                  All Products
                </Link>
              </li>
              <li>
                <Link href="/phones" className="hover:text-[#1d1d1f] dark:hover:text-white transition-colors">
                  Smartphones
                </Link>
              </li>
              <li>
                <Link href="/laptops" className="hover:text-[#1d1d1f] dark:hover:text-white transition-colors">
                  Laptops &amp; MacBooks
                </Link>
              </li>
              <li>
                <Link href="/request" className="hover:text-[#1d1d1f] dark:hover:text-white transition-colors">
                  Request a Device
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-[#1d1d1f] dark:hover:text-white transition-colors">
                  Contact &amp; Location
                </Link>
              </li>
            </ul>
          </div>

          {/* Popular Brands */}
          <div className="space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#1d1d1f] dark:text-white">
              Top Brands
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/phones?brand=Apple" className="hover:text-[#1d1d1f] dark:hover:text-white transition-colors">
                  Apple iPhone &amp; Mac
                </Link>
              </li>
              <li>
                <Link href="/phones?brand=Samsung" className="hover:text-[#1d1d1f] dark:hover:text-white transition-colors">
                  Samsung Galaxy
                </Link>
              </li>
              <li>
                <Link href="/laptops?brand=Dell" className="hover:text-[#1d1d1f] dark:hover:text-white transition-colors">
                  Dell XPS &amp; Laptops
                </Link>
              </li>
              <li>
                <Link href="/laptops?brand=HP" className="hover:text-[#1d1d1f] dark:hover:text-white transition-colors">
                  HP Spectre &amp; Envy
                </Link>
              </li>
              <li>
                <Link href="/phones?brand=Google" className="hover:text-[#1d1d1f] dark:hover:text-white transition-colors">
                  Google Pixel
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact / Service Hours */}
          <div className="space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#1d1d1f] dark:text-white">
              Tech Hub Location
            </h4>
            <div className="space-y-2.5 text-xs">
              <p className="flex items-start gap-2 text-zinc-600 dark:text-zinc-400">
                <MapPin className="h-4 w-4 shrink-0 text-zinc-800 dark:text-zinc-200 mt-0.5" />
                <span>{SITE_CONFIG.address}</span>
              </p>
              <p className="flex items-center gap-2 text-zinc-600 dark:text-zinc-400">
                <PhoneCall className="h-4 w-4 shrink-0 text-zinc-800 dark:text-zinc-200" />
                <span>{SITE_CONFIG.displayPhone}</span>
              </p>
              <p className="flex items-center gap-2 text-zinc-600 dark:text-zinc-400">
                <Mail className="h-4 w-4 shrink-0 text-zinc-800 dark:text-zinc-200" />
                <span>{SITE_CONFIG.email}</span>
              </p>
              <div className="pt-2 text-[11px] text-zinc-500">
                Operating Hours:
                <br />
                <span className="text-zinc-700 dark:text-zinc-300 font-medium">{SITE_CONFIG.operatingHours}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-8 flex flex-col items-center justify-between gap-4 text-xs text-zinc-500 sm:flex-row">
          <p>© {new Date().getFullYear()} {SITE_CONFIG.name}. All rights reserved.</p>
          <p className="flex items-center gap-2">
            <span>Direct device sourcing • Computer Village, Ikeja</span>
          </p>
        </div>
      </div>
    </footer>
  );
}