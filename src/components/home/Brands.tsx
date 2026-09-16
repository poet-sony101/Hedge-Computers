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
          <span className="text-xs font-semibold uppercase tracking-wider text-blue-400">
            Trusted Ecosystems
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mt-1 text-white">
            Top Device Brands
          </h2>
        </div>
        <p className="mt-2 md:mt-0 text-sm text-zinc-400 max-w-md">
          Curated smartphones and laptops from the world&apos;s leading manufacturers, individually tested for battery health and performance.
        </p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
        {brands.map((brand) => (
          <Link
            key={brand.name}
            href={brand.href}
            className="group relative flex flex-col justify-between rounded-2xl border border-white/10 bg-zinc-900/50 p-5 transition-all duration-300 hover:-translate-y-1 hover:border-blue-500/50 hover:bg-zinc-900/90 shadow-sm"
          >
            <div className="flex items-center justify-between">
              <span className="text-lg font-bold text-white group-hover:text-blue-400 transition-colors">
                {brand.name}
              </span>
              <ArrowUpRight className="h-4 w-4 text-zinc-500 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-blue-400" />
            </div>
            <span className="mt-3 text-xs text-zinc-500 group-hover:text-zinc-400 transition-colors">
              {brand.tagline}
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}