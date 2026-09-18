import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

export default function Brands() {
  const brands = [
    { name: "Apple", tagline: "iPhone & MacBooks", href: "/phones?brand=Apple" },
    { name: "Samsung", tagline: "Galaxy S & Foldables", href: "/phones?brand=Samsung" },
    { name: "Dell", tagline: "XPS & Precision Laptops", href: "/laptops?brand=Dell" },
    { name: "HP", tagline: "Spectre & EliteBooks", href: "/laptops?brand=HP" },
    { name: "Google", tagline: "Pixel & Gemini AI", href: "/phones?brand=Google" },
    { name: "Lenovo", tagline: "ThinkPad Ultrabooks", href: "/laptops?brand=Lenovo" },
  ];

  return (
    <section className="container-custom py-16">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-10">
        <div>
          <span className="text-xs font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
            Trusted Ecosystems
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mt-1 text-[#1d1d1f] dark:text-white tracking-tight">
            Top Device Brands
          </h2>
        </div>
        <p className="mt-2 md:mt-0 text-sm text-zinc-600 dark:text-zinc-400 max-w-md">
          Curated smartphones and laptops from the world&apos;s leading manufacturers, individually tested for battery health and performance.
        </p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3.5">
        {brands.map((brand) => (
          <Link
            key={brand.name}
            href={brand.href}
            className="group relative flex flex-col justify-between rounded-2xl border border-black/[0.06] dark:border-white/10 bg-white dark:bg-[#1c1c1e] p-5 transition-all duration-300 hover:-translate-y-0.5 hover:border-black/20 dark:hover:border-white/25 shadow-sm"
          >
            <div className="flex items-center justify-between">
              <span className="text-base font-bold text-[#1d1d1f] dark:text-white group-hover:underline">
                {brand.name}
              </span>
              <ArrowUpRight className="h-3.5 w-3.5 text-zinc-400 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </div>
            <span className="mt-3 text-[11px] text-zinc-500 dark:text-zinc-400">
              {brand.tagline}
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}