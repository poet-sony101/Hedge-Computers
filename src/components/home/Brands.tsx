import Link from "next/link";
import { ArrowUpRight, Laptop, ShieldCheck } from "lucide-react";

export default function Brands() {
  const brands = [
    { name: "HP", tagline: "EliteBook, Spectre & ZBook Workstations", href: "/laptops?brand=HP", badge: "Enterprise" },
    { name: "Apple", tagline: "MacBook Pro, Air & M-Series Silicon", href: "/laptops?brand=Apple", badge: "Pro Creative" },
    { name: "Dell", tagline: "XPS, Latitude & Precision Rigs", href: "/laptops?brand=Dell", badge: "Performance" },
    { name: "Lenovo", tagline: "ThinkPad X1 & High-TDP Workstations", href: "/laptops?brand=Lenovo", badge: "Engineering" },
    { name: "ASUS", tagline: "ROG Zephyrus & Studio ZenBooks", href: "/laptops?brand=ASUS", badge: "Gaming / CAD" },
    { name: "Samsung", tagline: "Galaxy Books, Flagship Phones & Foldables", href: "/phones?brand=Samsung", badge: "Ecosystem" },
  ];

  return (
    <section className="container-custom py-16">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-8">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-red-600 dark:text-red-500">
            Hardware Ecosystems
          </span>
          <h2 className="text-3xl sm:text-4xl font-black mt-1 text-zinc-950 dark:text-white tracking-tight">
            Major Computer Brands in Stock
          </h2>
        </div>
        <p className="mt-2 md:mt-0 text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 max-w-md">
          Verified original factory chargers, benchmarked motherboards, and clean BIOS on every brand.
        </p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3.5">
        {brands.map((brand) => (
          <Link
            key={brand.name}
            href={brand.href}
            className="group relative flex flex-col justify-between rounded-2xl border border-black/10 dark:border-white/10 bg-white dark:bg-[#121216] p-4.5 transition-all duration-300 hover:-translate-y-1 hover:border-red-500/40 hover:shadow-lg hover:shadow-red-950/10 shadow-sm"
          >
            <div>
              <div className="flex items-center justify-between">
                <span className="text-lg font-black text-zinc-950 dark:text-white group-hover:text-red-600 dark:group-hover:text-red-500 transition-colors">
                  {brand.name}
                </span>
                <ArrowUpRight className="h-4 w-4 text-zinc-400 group-hover:text-red-600 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
              </div>
              <span className="inline-block mt-2 px-2 py-0.5 rounded-full bg-red-500/10 text-red-600 dark:text-red-400 text-[10px] font-bold border border-red-500/20">
                {brand.badge}
              </span>
            </div>
            <span className="mt-4 text-[11px] text-zinc-500 dark:text-zinc-400 font-medium leading-relaxed">
              {brand.tagline}
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}