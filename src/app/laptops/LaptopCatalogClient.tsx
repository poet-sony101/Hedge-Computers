"use client";

import { useState, useMemo } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import { Search, Filter, X, Laptop, ArrowRight } from "lucide-react";
import { Phone } from "@/types/phone";
import PhoneCard from "@/components/phone/PhoneCard";

const LAPTOP_BRANDS = ["All", "HP", "Dell", "Apple", "Lenovo", "ASUS"];
const CONDITIONS = ["All", "USA Used", "Brand New", "UK Used"];

interface LaptopCatalogClientProps {
  initialLaptops: Phone[];
}

export default function LaptopCatalogClient({
  initialLaptops,
}: LaptopCatalogClientProps) {
  const searchParams = useSearchParams();
  const router = useRouter();

  const selectedBrand = searchParams.get("brand") || "All";
  const selectedCondition = searchParams.get("condition") || "All";

  const [searchQuery, setSearchQuery] = useState("");

  const handleBrandChange = (brand: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (brand === "All") {
      params.delete("brand");
    } else {
      params.set("brand", brand);
    }
    router.replace(`/laptops?${params.toString()}`, { scroll: false });
  };

  const handleConditionChange = (condition: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (condition === "All") {
      params.delete("condition");
    } else {
      params.set("condition", condition);
    }
    router.replace(`/laptops?${params.toString()}`, { scroll: false });
  };

  const clearFilters = () => {
    setSearchQuery("");
    router.replace("/laptops", { scroll: false });
  };

  const filteredLaptops = useMemo(() => {
    return initialLaptops.filter((laptop) => {
      const matchesBrand =
        selectedBrand === "All" ||
        laptop.brand.toLowerCase() === selectedBrand.toLowerCase();

      const matchesCondition =
        selectedCondition === "All" ||
        laptop.condition.toLowerCase().includes(selectedCondition.toLowerCase());

      const matchesSearch =
        searchQuery.trim() === "" ||
        laptop.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        laptop.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (laptop.specs?.processor &&
          laptop.specs.processor
            .toLowerCase()
            .includes(searchQuery.toLowerCase())) ||
        (laptop.specs?.ram &&
          laptop.specs.ram.toLowerCase().includes(searchQuery.toLowerCase()));

      return matchesBrand && matchesCondition && matchesSearch;
    });
  }, [initialLaptops, selectedBrand, selectedCondition, searchQuery]);

  const hasActiveFilters =
    searchQuery !== "" || selectedBrand !== "All" || selectedCondition !== "All";

  return (
    <div className="container-custom">
      {/* Header & Title */}
      <div className="max-w-3xl mb-10">
        <span className="text-xs font-bold uppercase tracking-wider text-red-600 dark:text-red-500">
          Workstation &amp; Ultrabook Inventory
        </span>
        <h1 className="text-4xl sm:text-5xl font-black tracking-tight text-zinc-950 dark:text-white mt-1">
          Laptops, MacBooks &amp; Workstations
        </h1>
        <p className="mt-3 text-xs sm:text-sm text-zinc-600 dark:text-zinc-400">
          Discover verified HP EliteBooks, Dell XPS, Apple MacBooks, and Lenovo ThinkPads direct from 12 Oshitelu Street, Computer Village. Every unit is tested for clean motherboard diagnostics, original battery health, and keyboard reliability.
        </p>
      </div>

      {/* Search & Filter Controls */}
      <div className="space-y-5 rounded-3xl border border-red-500/20 bg-white dark:bg-[#121216] p-6 shadow-sm backdrop-blur-xl mb-10">
        {/* Search Bar */}
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search laptops by model, processor, or RAM (e.g., M3 Pro, XPS 15, Core i7, 32GB)..."
            className="w-full rounded-full border border-black/10 dark:border-white/10 bg-zinc-50 dark:bg-zinc-900 py-3 pl-11 pr-10 text-xs text-zinc-900 dark:text-white placeholder-zinc-400 outline-none transition focus:border-red-600 dark:focus:border-red-500"
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
            <span className="text-xs font-semibold text-zinc-500 dark:text-zinc-400 mr-1 flex items-center gap-1">
              <Filter className="h-3.5 w-3.5 text-red-600" />
              Brand:
            </span>
            {LAPTOP_BRANDS.map((brand) => {
              const active = selectedBrand === brand;
              return (
                <button
                  key={brand}
                  onClick={() => handleBrandChange(brand)}
                  className={`rounded-full px-3.5 py-1 text-xs font-semibold transition-all ${
                    active
                      ? "bg-red-600 text-white shadow-md shadow-red-600/20"
                      : "border border-black/10 dark:border-white/10 bg-zinc-100/80 dark:bg-zinc-800/80 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-200 dark:hover:bg-zinc-700 hover:text-zinc-950 dark:hover:text-white"
                  }`}
                >
                  {brand}
                </button>
              );
            })}
          </div>

          {/* Condition Tabs */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-semibold text-zinc-500 dark:text-zinc-400 mr-1">
              Condition:
            </span>
            {CONDITIONS.map((condition) => {
              const active = selectedCondition === condition;
              return (
                <button
                  key={condition}
                  onClick={() => handleConditionChange(condition)}
                  className={`rounded-full px-3.5 py-1 text-xs font-semibold transition-all ${
                    active
                      ? "bg-red-600 text-white shadow-md shadow-red-600/20"
                      : "border border-black/10 dark:border-white/10 bg-zinc-100/80 dark:bg-zinc-800/80 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-200 dark:hover:bg-zinc-700 hover:text-zinc-950 dark:hover:text-white"
                  }`}
                >
                  {condition}
                </button>
              );
            })}
          {hasActiveFilters && (
            <button
              onClick={clearFilters}
              className="text-xs text-red-600 hover:text-red-700 font-bold underline underline-offset-2 flex items-center gap-1"
            >
              Reset Filters
            </button>
          )}
        </div>
      </div>
    </div>

      {/* Results Header Count */}
      <div className="flex items-center justify-between mb-6 px-1">
        <p className="text-xs text-zinc-500 dark:text-zinc-400">
          Showing <span className="font-semibold text-[#1d1d1f] dark:text-white">{filteredLaptops.length}</span> {filteredLaptops.length === 1 ? "laptop" : "laptops"}
          {selectedBrand !== "All" && ` in ${selectedBrand}`}
          {selectedCondition !== "All" && ` (${selectedCondition})`}
        </p>
      </div>

      {/* Grid or Empty State */}
      {filteredLaptops.length > 0 ? (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredLaptops.map((laptop) => (
            <PhoneCard key={laptop.id} phone={laptop} />
          ))}
        </div>
      ) : (
        <div className="rounded-[32px] border border-black/[0.08] dark:border-white/10 bg-white dark:bg-[#1c1c1e] p-12 text-center max-w-lg mx-auto shadow-sm dark:shadow-2xl">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-zinc-100 dark:bg-zinc-800 text-zinc-500 dark:text-zinc-300 mb-4 border border-black/[0.06] dark:border-white/10">
            <Laptop className="h-6 w-6" />
          </div>
          <h3 className="text-lg font-bold text-[#1d1d1f] dark:text-white">No Laptops Found</h3>
          <p className="mt-2 text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
            We couldn&apos;t find any laptop matching your filters. Submit a custom laptop request and we will source it for you!
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
              <span>Request This Laptop</span>
              <ArrowRight className="h-3 w-3" />
            </Link>
          </div>
        </div>
      )}

      {/* Bottom Custom Request Helper */}
      <div className="mt-16 rounded-[32px] border border-black/[0.08] dark:border-white/10 bg-white dark:bg-[#1c1c1e] p-8 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-sm">
        <div>
          <h4 className="text-base font-bold text-[#1d1d1f] dark:text-white">
            Looking for a customized MacBook or Windows workstation?
          </h4>
          <p className="text-xs text-zinc-600 dark:text-zinc-400 mt-1">
            Need 32GB RAM, 1TB SSD, or a specific GPU? We source custom-configured machines directly.
          </p>
        </div>
        <Link
          href="/request"
          className="shrink-0 rounded-full bg-[#1d1d1f] hover:bg-black text-white dark:bg-white dark:text-black dark:hover:bg-zinc-200 px-6 py-2.5 text-xs font-semibold shadow-sm transition-all"
        >
          Submit a Custom Laptop Request
        </Link>
      </div>
    </div>
  );
}
