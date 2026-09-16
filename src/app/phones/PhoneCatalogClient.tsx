"use client";

import { useState, useMemo } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import { Search, Filter, X, Smartphone, ArrowRight } from "lucide-react";
import { Phone } from "@/types/phone";
import PhoneCard from "@/components/phone/PhoneCard";
import { phones as defaultPhones, BRANDS } from "@/data/phones";

const CONDITIONS = ["All", "Brand New", "UK Used"];

interface PhoneCatalogClientProps {
  initialPhones?: Phone[];
}

export default function PhoneCatalogClient({
  initialPhones,
}: PhoneCatalogClientProps) {
  const allPhones = initialPhones && initialPhones.length > 0 ? initialPhones : defaultPhones;
  const searchParams = useSearchParams();
  const router = useRouter();

  const selectedBrand = searchParams.get("brand") || "All";
  const selectedCondition = searchParams.get("condition") || "All";

  const [searchQuery, setSearchQuery] = useState("");

  // Update URL search parameters when filters change
  const handleBrandChange = (brand: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (brand === "All") {
      params.delete("brand");
    } else {
      params.set("brand", brand);
    }
    router.replace(`/phones?${params.toString()}`, { scroll: false });
  };

  const handleConditionChange = (condition: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (condition === "All") {
      params.delete("condition");
    } else {
      params.set("condition", condition);
    }
    router.replace(`/phones?${params.toString()}`, { scroll: false });
  };

  const clearFilters = () => {
    setSearchQuery("");
    router.replace("/phones", { scroll: false });
  };

  // Filter phones
  const filteredPhones = useMemo(() => {
    return allPhones.filter((phone) => {
      // Brand match
      const matchesBrand =
        selectedBrand === "All" ||
        phone.brand.toLowerCase() === selectedBrand.toLowerCase();

      // Condition match
      const matchesCondition =
        selectedCondition === "All" || phone.condition === selectedCondition;

      // Search match
      const matchesSearch =
        searchQuery.trim() === "" ||
        phone.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        phone.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (phone.overview &&
          phone.overview.toLowerCase().includes(searchQuery.toLowerCase()));

      return matchesBrand && matchesCondition && matchesSearch;
    });
  }, [allPhones, selectedBrand, selectedCondition, searchQuery]);

  const hasActiveFilters =
    searchQuery !== "" || selectedBrand !== "All" || selectedCondition !== "All";

  return (
    <div className="container-custom">
      {/* Header & Title */}
      <div className="max-w-3xl mb-10">
        <span className="text-xs font-semibold uppercase tracking-wider text-blue-400">
          Live Inventory
        </span>
        <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-white mt-1">
          Smartphone Catalog
        </h1>
        <p className="mt-3 text-base text-zinc-400">
          Explore genuine brand-new and pristine UK-used devices. Prices are dynamic and quoted instantly on WhatsApp to give you today&apos;s lowest rate.
        </p>
      </div>

      {/* Search & Filter Controls */}
      <div className="space-y-5 rounded-3xl border border-white/10 bg-zinc-950/70 p-6 backdrop-blur-xl mb-10">
        {/* Search Bar */}
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-zinc-500" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search phones by name, brand, or model (e.g., iPhone 15 Pro, S25 Ultra, Pixel)..."
            className="w-full rounded-2xl border border-white/10 bg-zinc-900/90 py-3.5 pl-12 pr-10 text-sm text-white placeholder-zinc-500 outline-none transition focus:border-blue-500/80 focus:ring-1 focus:ring-blue-500/50"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              aria-label="Clear search"
              className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-white"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>

        {/* Brand & Condition Filters */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pt-2">
          {/* Brand Tabs */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-medium text-zinc-400 mr-1 flex items-center gap-1">
              <Filter className="h-3.5 w-3.5" />
              Brand:
            </span>
            {BRANDS.map((brand) => {
              const active = selectedBrand === brand;
              return (
                <button
                  key={brand}
                  onClick={() => handleBrandChange(brand)}
                  className={`rounded-xl px-3.5 py-1.5 text-xs font-medium transition-all ${
                    active
                      ? "bg-blue-600 text-white shadow-md shadow-blue-900/30"
                      : "border border-white/10 bg-zinc-900/60 text-zinc-400 hover:bg-zinc-800 hover:text-white"
                  }`}
                >
                  {brand}
                </button>
              );
            })}
          </div>

          {/* Condition Pills */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-medium text-zinc-400 mr-1">Condition:</span>
            {CONDITIONS.map((cond) => {
              const active = selectedCondition === cond;
              return (
                <button
                  key={cond}
                  onClick={() => handleConditionChange(cond)}
                  className={`rounded-xl px-3 py-1.5 text-xs font-medium transition-all ${
                    active
                      ? "bg-zinc-100 text-black font-semibold"
                      : "border border-white/10 bg-zinc-900/60 text-zinc-400 hover:bg-zinc-800 hover:text-white"
                  }`}
                >
                  {cond}
                </button>
              );
            })}

            {hasActiveFilters && (
              <button
                onClick={clearFilters}
                className="ml-auto text-xs text-rose-400 hover:text-rose-300 underline underline-offset-2 flex items-center gap-1"
              >
                Reset
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Results Header Count */}
      <div className="flex items-center justify-between mb-6 px-1">
        <p className="text-sm text-zinc-400">
          Showing <span className="font-semibold text-white">{filteredPhones.length}</span> {filteredPhones.length === 1 ? "device" : "devices"}
          {selectedBrand !== "All" && ` in ${selectedBrand}`}
          {selectedCondition !== "All" && ` (${selectedCondition})`}
        </p>
      </div>

      {/* Grid or Empty State */}
      {filteredPhones.length > 0 ? (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredPhones.map((phone) => (
            <PhoneCard key={phone.id} phone={phone} />
          ))}
        </div>
      ) : (
        <div className="rounded-3xl border border-white/10 bg-zinc-950/40 p-12 text-center max-w-lg mx-auto">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-zinc-900 text-zinc-500 mb-4">
            <Smartphone className="h-8 w-8" />
          </div>
          <h3 className="text-xl font-bold text-white">No Phones Found</h3>
          <p className="mt-2 text-sm text-zinc-400">
            We couldn&apos;t find any phones matching your current filters. But don&apos;t worry—we can source any phone for you on request!
          </p>
          <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-3">
            <button
              onClick={clearFilters}
              className="rounded-xl border border-white/10 bg-zinc-900 px-5 py-2.5 text-xs font-semibold text-white hover:bg-zinc-800"
            >
              Clear Filters
            </button>
            <Link
              href="/request"
              className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-2.5 text-xs font-semibold text-white hover:bg-blue-500 shadow-md shadow-blue-900/30"
            >
              Request This Device
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </div>
      )}

      {/* Bottom Custom Request Helper */}
      <div className="mt-20 rounded-3xl border border-white/10 bg-gradient-to-r from-zinc-950 via-zinc-900/60 to-zinc-950 p-8 flex flex-col sm:flex-row items-center justify-between gap-6">
        <div>
          <h4 className="text-lg font-bold text-white">
            Looking for a specific model not listed here?
          </h4>
          <p className="text-sm text-zinc-400 mt-1">
            We source brand new and UK-used devices directly on demand.
          </p>
        </div>
        <Link
          href="/request"
          className="shrink-0 rounded-full bg-blue-600 hover:bg-blue-500 text-white px-6 py-3 text-xs font-semibold shadow-lg shadow-blue-900/30 transition-colors"
        >
          Submit a Phone Request
        </Link>
      </div>
    </div>
  );
}
