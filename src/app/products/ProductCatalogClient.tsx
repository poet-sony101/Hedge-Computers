"use client";

import { useState, useMemo } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import {
  Search,
  Filter,
  X,
  Layers,
  Smartphone,
  Laptop,
  Watch,
  Zap,
  ArrowRight,
} from "lucide-react";
import { Phone, DeviceCategory } from "@/types/phone";
import PhoneCard from "@/components/phone/PhoneCard";

const CATEGORIES: { id: "All" | DeviceCategory; label: string; icon: React.ComponentType<{ className?: string }> }[] = [
  { id: "All", label: "All Tech", icon: Layers },
  { id: "phone", label: "Smartphones", icon: Smartphone },
  { id: "laptop", label: "Laptops", icon: Laptop },
  { id: "gadget", label: "Smartwatches & Audio", icon: Watch },
  { id: "accessory", label: "Power & Accessories", icon: Zap },
];

const CONDITIONS = ["All", "Brand New", "UK Used"];

interface ProductCatalogClientProps {
  initialProducts: Phone[];
}

export default function ProductCatalogClient({
  initialProducts,
}: ProductCatalogClientProps) {
  const searchParams = useSearchParams();
  const router = useRouter();

  const selectedCategory = (searchParams.get("category") || "All") as "All" | DeviceCategory;
  const selectedBrand = searchParams.get("brand") || "All";
  const selectedCondition = searchParams.get("condition") || "All";

  const [searchQuery, setSearchQuery] = useState("");

  const handleCategoryChange = (category: "All" | DeviceCategory) => {
    const params = new URLSearchParams(searchParams.toString());
    if (category === "All") {
      params.delete("category");
    } else {
      params.set("category", category);
    }
    params.delete("brand"); // reset brand on category switch
    router.replace(`/products?${params.toString()}`, { scroll: false });
  };

  const handleBrandChange = (brand: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (brand === "All") {
      params.delete("brand");
    } else {
      params.set("brand", brand);
    }
    router.replace(`/products?${params.toString()}`, { scroll: false });
  };

  const handleConditionChange = (condition: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (condition === "All") {
      params.delete("condition");
    } else {
      params.set("condition", condition);
    }
    router.replace(`/products?${params.toString()}`, { scroll: false });
  };

  const clearFilters = () => {
    setSearchQuery("");
    router.replace("/products", { scroll: false });
  };

  // Available brands in the current category
  const availableBrands = useMemo(() => {
    const filteredByCategory =
      selectedCategory === "All"
        ? initialProducts
        : initialProducts.filter((p) => (p.category || "phone") === selectedCategory);

    const brandsSet = new Set(filteredByCategory.map((p) => p.brand));
    return ["All", ...Array.from(brandsSet)];
  }, [initialProducts, selectedCategory]);

  const filteredProducts = useMemo(() => {
    return initialProducts.filter((product) => {
      const productCat = product.category || "phone";

      const matchesCategory =
        selectedCategory === "All" || productCat === selectedCategory;

      const matchesBrand =
        selectedBrand === "All" ||
        product.brand.toLowerCase() === selectedBrand.toLowerCase();

      const matchesCondition =
        selectedCondition === "All" || product.condition === selectedCondition;

      const matchesSearch =
        searchQuery.trim() === "" ||
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (product.specs?.processor &&
          product.specs.processor.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (product.specs?.display &&
          product.specs.display.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (product.overview &&
          product.overview.toLowerCase().includes(searchQuery.toLowerCase()));

      return matchesCategory && matchesBrand && matchesCondition && matchesSearch;
    });
  }, [initialProducts, selectedCategory, selectedBrand, selectedCondition, searchQuery]);

  const hasActiveFilters =
    searchQuery !== "" ||
    selectedCategory !== "All" ||
    selectedBrand !== "All" ||
    selectedCondition !== "All";

  return (
    <div className="container-custom">
      {/* Header & Title */}
      <div className="max-w-3xl mb-10">
        <span className="text-xs font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
          Complete Inventory
        </span>
        <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-[#1d1d1f] dark:text-white mt-1">
          Technology Catalog
        </h1>
        <p className="mt-3 text-base text-zinc-600 dark:text-zinc-400">
          Explore genuine smartphones, laptops, smartwatches, audio, and charging accessories. Daily market-aligned rates quoted directly on WhatsApp.
        </p>
      </div>

      {/* Category Pills Row */}
      <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 no-scrollbar">
        {CATEGORIES.map((cat) => {
          const active = selectedCategory === cat.id;
          const Icon = cat.icon;
          return (
            <button
              key={cat.id}
              onClick={() => handleCategoryChange(cat.id)}
              className={`flex items-center gap-2 rounded-full px-5 py-2.5 text-xs font-semibold whitespace-nowrap transition-all active:scale-95 ${
                active
                  ? "bg-[#1d1d1f] hover:bg-black text-white dark:bg-white dark:text-black dark:hover:bg-zinc-200 shadow-sm"
                  : "border border-black/[0.08] dark:border-white/10 bg-white dark:bg-zinc-900/80 text-zinc-600 dark:text-zinc-400 hover:text-[#1d1d1f] dark:hover:text-white hover:bg-zinc-50 dark:hover:bg-zinc-800"
              }`}
            >
              <Icon className="h-3.5 w-3.5" />
              <span>{cat.label}</span>
            </button>
          );
        })}
      </div>

      {/* Search & Filter Controls */}
      <div className="space-y-5 rounded-3xl border border-black/[0.08] dark:border-white/10 bg-white dark:bg-[#1c1c1e] p-6 shadow-sm backdrop-blur-xl mb-10">
        {/* Search Bar */}
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search phones, MacBooks, watches, audio, or chargers..."
            className="w-full rounded-full border border-black/[0.08] dark:border-white/10 bg-zinc-50 dark:bg-zinc-900 py-3 pl-11 pr-10 text-xs text-[#1d1d1f] dark:text-white placeholder-zinc-400 outline-none transition focus:border-zinc-400 dark:focus:border-zinc-500"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              aria-label="Clear search"
              className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-700 dark:hover:text-white"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>

        {/* Brand & Condition Filters */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pt-2">
          {/* Brand Tabs */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-medium text-zinc-500 dark:text-zinc-400 mr-1 flex items-center gap-1">
              <Filter className="h-3.5 w-3.5" />
              Brand:
            </span>
            {availableBrands.map((brand) => {
              const active = selectedBrand === brand;
              return (
                <button
                  key={brand}
                  onClick={() => handleBrandChange(brand)}
                  className={`rounded-full px-3.5 py-1 text-xs font-medium transition-all ${
                    active
                      ? "bg-[#1d1d1f] text-white dark:bg-white dark:text-black shadow-sm font-semibold"
                      : "border border-black/[0.06] dark:border-white/10 bg-zinc-100/80 dark:bg-zinc-800/80 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-200 dark:hover:bg-zinc-700 hover:text-[#1d1d1f] dark:hover:text-white"
                  }`}
                >
                  {brand}
                </button>
              );
            })}
          </div>

          {/* Condition Pills */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-medium text-zinc-500 dark:text-zinc-400 mr-1">Condition:</span>
            {CONDITIONS.map((cond) => {
              const active = selectedCondition === cond;
              return (
                <button
                  key={cond}
                  onClick={() => handleConditionChange(cond)}
                  className={`rounded-full px-3.5 py-1 text-xs font-medium transition-all ${
                    active
                      ? "bg-[#1d1d1f] text-white dark:bg-white dark:text-black shadow-sm font-semibold"
                      : "border border-black/[0.06] dark:border-white/10 bg-zinc-100/80 dark:bg-zinc-800/80 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-200 dark:hover:bg-zinc-700 hover:text-[#1d1d1f] dark:hover:text-white"
                  }`}
                >
                  {cond}
                </button>
              );
            })}

            {hasActiveFilters && (
              <button
                onClick={clearFilters}
                className="ml-auto text-xs text-rose-500 hover:text-rose-600 dark:text-rose-400 underline underline-offset-2 flex items-center gap-1 font-medium"
              >
                Reset
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Results Header Count */}
      <div className="flex items-center justify-between mb-6 px-1">
        <p className="text-xs text-zinc-500 dark:text-zinc-400">
          Showing <span className="font-semibold text-[#1d1d1f] dark:text-white">{filteredProducts.length}</span> {filteredProducts.length === 1 ? "product" : "products"}
          {selectedCategory !== "All" && ` in ${selectedCategory}`}
          {selectedBrand !== "All" && ` (${selectedBrand})`}
          {selectedCondition !== "All" && ` • ${selectedCondition}`}
        </p>
      </div>

      {/* Grid or Empty State */}
      {filteredProducts.length > 0 ? (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredProducts.map((product) => (
            <PhoneCard key={product.id} phone={product} />
          ))}
        </div>
      ) : (
        <div className="rounded-[32px] border border-black/[0.08] dark:border-white/10 bg-white dark:bg-[#1c1c1e] p-12 text-center max-w-lg mx-auto shadow-sm dark:shadow-2xl">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-zinc-100 dark:bg-zinc-800 text-zinc-500 dark:text-zinc-300 mb-4 border border-black/[0.06] dark:border-white/10">
            <Layers className="h-6 w-6" />
          </div>
          <h3 className="text-lg font-bold text-[#1d1d1f] dark:text-white">No Products Found</h3>
          <p className="mt-2 text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
            We couldn&apos;t find any technology products matching your filters. Submit a custom request and we will source it for you!
          </p>
          <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-2.5">
            <button
              onClick={clearFilters}
              className="rounded-full border border-black/10 dark:border-white/15 bg-white dark:bg-zinc-800 px-5 py-2 text-xs font-semibold text-[#1d1d1f] dark:text-white hover:bg-zinc-100 dark:hover:bg-zinc-700"
            >
              Clear Filters
            </button>
            <Link
              href="/request"
              className="inline-flex items-center gap-1.5 rounded-full bg-[#1d1d1f] hover:bg-black text-white dark:bg-white dark:text-black dark:hover:bg-zinc-200 px-5 py-2 text-xs font-semibold shadow-sm"
            >
              <span>Request a Product</span>
              <ArrowRight className="h-3 w-3" />
            </Link>
          </div>
        </div>
      )}

      {/* Bottom Custom Request Helper */}
      <div className="mt-16 rounded-[32px] border border-black/[0.08] dark:border-white/10 bg-white dark:bg-[#1c1c1e] p-8 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-sm">
        <div>
          <h4 className="text-base font-bold text-[#1d1d1f] dark:text-white">
            Looking for a specific device or accessory not listed?
          </h4>
          <p className="text-xs text-zinc-600 dark:text-zinc-400 mt-1">
            We source brand new and UK-used technology products directly on demand.
          </p>
        </div>
        <Link
          href="/request"
          className="shrink-0 rounded-full bg-[#1d1d1f] hover:bg-black text-white dark:bg-white dark:text-black dark:hover:bg-zinc-200 px-6 py-2.5 text-xs font-semibold shadow-sm transition-all"
        >
          Submit a Product Request
        </Link>
      </div>
    </div>
  );
}
