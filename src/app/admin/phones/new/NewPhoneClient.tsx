"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft,
  PlusCircle,
  AlertCircle,
  Smartphone,
  Laptop,
  Watch,
  Zap,
  Loader2,
} from "lucide-react";
import { PhoneCondition, DeviceCategory } from "@/types/phone";
import ImageUploader from "@/components/admin/ImageUploader";

const POPULAR_PHONE_BRANDS = [
  "Apple",
  "Samsung",
  "Google",
  "Xiaomi",
  "Tecno",
  "OnePlus",
  "Infinix",
  "Oppo",
];

const POPULAR_LAPTOP_BRANDS = [
  "Apple",
  "Dell",
  "HP",
  "Lenovo",
  "ASUS",
  "Acer",
  "Microsoft",
];

const POPULAR_GADGET_BRANDS = [
  "Apple",
  "Samsung",
  "Sony",
  "Google",
  "Bose",
  "Huawei",
  "Xiaomi",
];

const POPULAR_ACCESSORY_BRANDS = [
  "Apple",
  "Anker",
  "Samsung",
  "Baseus",
  "Belkin",
  "Oraimo",
  "UGREEN",
];

export default function NewPhoneClient() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    slug: "",
    category: "phone" as DeviceCategory,
    brand: "Apple",
    condition: "UK Used" as PhoneCondition,
    storage: "256GB",
    storageOptions: "128GB, 256GB, 512GB",
    colors: "Black, Silver, Blue",
    image: "",
    priceNote: "Price on daily request (market rate)",
    inStock: true,
    featured: true,
    tagline: "",
    overview: "",
    // Specs
    display: "",
    processor: "",
    ram: "",
    camera: "",
    battery: "",
    os: "",
    charging: "",
    gpu: "",
    ports: "",
    batteryHealth: "",
  });

  const [galleryImages, setGalleryImages] = useState<string[]>([]);

  const isLaptop = formData.category === "laptop";
  const isGadget = formData.category === "gadget";
  const isAccessory = formData.category === "accessory";

  const categoryLabel =
    formData.category === "laptop"
      ? "Laptop"
      : formData.category === "gadget"
      ? "Gadget"
      : formData.category === "accessory"
      ? "Accessory"
      : "Smartphone";

  const handleCategoryChange = (cat: DeviceCategory) => {
    setFormData((prev) => ({
      ...prev,
      category: cat,
      brand: cat === "accessory" ? "Anker" : "Apple",
      storage:
        cat === "laptop"
          ? "512GB SSD"
          : cat === "gadget"
          ? "64GB / Standard"
          : cat === "accessory"
          ? "10,000mAh / 35W"
          : "256GB",
      storageOptions:
        cat === "laptop"
          ? "512GB SSD, 1TB SSD, 2TB SSD"
          : cat === "gadget"
          ? "GPS, GPS + Cellular"
          : cat === "accessory"
          ? "Standard"
          : "128GB, 256GB, 512GB",
      condition:
        cat === "accessory" || cat === "gadget" ? "Brand New" : prev.condition,
      ram: cat === "laptop" ? "16GB Unified Memory" : prev.ram,
      os:
        cat === "laptop"
          ? "macOS Sonoma / Windows 11"
          : cat === "gadget"
          ? "watchOS / Bluetooth 5.3"
          : prev.os,
    }));
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.value;
    const autoSlug = name
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)+/g, "");

    setFormData((prev) => ({
      ...prev,
      name,
      slug: autoSlug,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      // Determine image to use: uploaded image OR fallback category silhouette
      const defaultPlaceholder =
        formData.category === "laptop"
          ? "/images/placeholder-laptop.svg"
          : formData.category === "gadget"
          ? "/images/placeholder-gadget.svg"
          : formData.category === "accessory"
          ? "/images/placeholder-accessory.svg"
          : "/images/placeholder-phone.svg";

      const finalImage = formData.image || defaultPlaceholder;

      const storageArr = formData.storageOptions
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean);

      const colorsArr = formData.colors
        .split(",")
        .map((c) => c.trim())
        .filter(Boolean);

      const payload = {
        name: formData.name.trim(),
        slug: formData.slug.trim(),
        category: formData.category,
        brand: formData.brand,
        condition: formData.condition,
        storage: formData.storage,
        storageOptions: storageArr.length > 0 ? storageArr : [formData.storage],
        colors: colorsArr,
        image: finalImage,
        images: [finalImage, ...galleryImages].filter(Boolean),
        priceNote: formData.priceNote,
        inStock: formData.inStock,
        featured: formData.featured,
        tagline: formData.tagline,
        overview: formData.overview,
        specs: {
          display: formData.display || undefined,
          processor: formData.processor || undefined,
          ram: formData.ram || undefined,
          camera: formData.camera || undefined,
          battery: formData.battery || undefined,
          os: formData.os || undefined,
          charging: formData.charging || undefined,
          gpu: formData.gpu || undefined,
          ports: formData.ports || undefined,
          batteryHealth: formData.batteryHealth || undefined,
        },
      };

      const res = await fetch("/api/admin/phones", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok) {
        if (res.status === 401) {
          setError("Your admin session has expired. Please log in again.");
        } else {
          const errorMsg = data.error || "Failed to add device listing";
          setError(errorMsg);
        }
        setLoading(false);
        if (typeof window !== "undefined") {
          window.scrollTo({ top: 0, behavior: "smooth" });
        }
        return;
      }

      const redirectUrl = `/admin/phones?added=${encodeURIComponent(payload.name)}&t=${Date.now()}`;
      if (typeof window !== "undefined") {
        window.location.href = redirectUrl;
      } else {
        router.push(redirectUrl);
        router.refresh();
      }
    } catch {
      setError("An unexpected error occurred while saving the device.");
      setLoading(false);
      if (typeof window !== "undefined") {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    }
  };

  const brandOptions =
    formData.category === "laptop"
      ? POPULAR_LAPTOP_BRANDS
      : formData.category === "gadget"
      ? POPULAR_GADGET_BRANDS
      : formData.category === "accessory"
      ? POPULAR_ACCESSORY_BRANDS
      : POPULAR_PHONE_BRANDS;

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Back Link */}
      <div>
        <Link
          href="/admin/phones"
          className="inline-flex items-center gap-1.5 text-xs text-[#86868b] hover:text-[#1d1d1f] dark:hover:text-white transition"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          <span>Back to Inventory</span>
        </Link>
      </div>

      <div className="flex items-center justify-between">
        <div>
          <span className="text-xs font-semibold uppercase tracking-wider text-[#86868b]">
            Catalog Expansion
          </span>
          <h1 className="text-3xl font-extrabold tracking-tight text-[#1d1d1f] dark:text-white mt-1">
            Add New {categoryLabel}
          </h1>
          <p className="text-xs text-[#86868b] mt-1">
            Publish a new {categoryLabel.toLowerCase()} listing to the Available Tech catalog.
          </p>
        </div>
      </div>

      {error && (
        <div className="flex items-center gap-3 rounded-2xl border border-rose-500/30 bg-rose-500/10 p-4 text-xs text-rose-600 dark:text-rose-400">
          <AlertCircle className="h-4 w-4 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {/* Category Toggle Banner */}
      <div className="apple-card p-6 shadow-sm">
        <label className="block text-xs font-semibold uppercase tracking-wider text-[#86868b] mb-3">
          Select Device Category
        </label>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 max-w-2xl">
          <button
            type="button"
            onClick={() => handleCategoryChange("phone")}
            className={`flex items-center justify-center gap-2 rounded-2xl p-3.5 text-xs font-bold transition-all ${
              formData.category === "phone"
                ? "bg-[#1d1d1f] dark:bg-white text-white dark:text-black shadow-md shadow-black/10"
                : "border border-black/10 dark:border-white/10 bg-black/[0.02] dark:bg-white/5 text-[#86868b] hover:text-[#1d1d1f] dark:hover:text-white"
            }`}
          >
            <Smartphone className="h-4 w-4" />
            <span>Smartphone</span>
          </button>

          <button
            type="button"
            onClick={() => handleCategoryChange("laptop")}
            className={`flex items-center justify-center gap-2 rounded-2xl p-3.5 text-xs font-bold transition-all ${
              formData.category === "laptop"
                ? "bg-[#1d1d1f] dark:bg-white text-white dark:text-black shadow-md shadow-black/10"
                : "border border-black/10 dark:border-white/10 bg-black/[0.02] dark:bg-white/5 text-[#86868b] hover:text-[#1d1d1f] dark:hover:text-white"
            }`}
          >
            <Laptop className="h-4 w-4" />
            <span>Laptop</span>
          </button>

          <button
            type="button"
            onClick={() => handleCategoryChange("gadget")}
            className={`flex items-center justify-center gap-2 rounded-2xl p-3.5 text-xs font-bold transition-all ${
              formData.category === "gadget"
                ? "bg-[#1d1d1f] dark:bg-white text-white dark:text-black shadow-md shadow-black/10"
                : "border border-black/10 dark:border-white/10 bg-black/[0.02] dark:bg-white/5 text-[#86868b] hover:text-[#1d1d1f] dark:hover:text-white"
            }`}
          >
            <Watch className="h-4 w-4" />
            <span>Gadget / Audio</span>
          </button>

          <button
            type="button"
            onClick={() => handleCategoryChange("accessory")}
            className={`flex items-center justify-center gap-2 rounded-2xl p-3.5 text-xs font-bold transition-all ${
              formData.category === "accessory"
                ? "bg-[#1d1d1f] dark:bg-white text-white dark:text-black shadow-md shadow-black/10"
                : "border border-black/10 dark:border-white/10 bg-black/[0.02] dark:bg-white/5 text-[#86868b] hover:text-[#1d1d1f] dark:hover:text-white"
            }`}
          >
            <Zap className="h-4 w-4" />
            <span>Accessory</span>
          </button>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Section 1: Basic Information */}
        <div className="apple-card p-6 sm:p-8 shadow-sm space-y-5">
          <div className="flex items-center gap-2 pb-3 border-b border-black/5 dark:border-white/10">
            {formData.category === "laptop" ? (
              <Laptop className="h-4 w-4 text-[#1d1d1f] dark:text-white" />
            ) : formData.category === "gadget" ? (
              <Watch className="h-4 w-4 text-[#1d1d1f] dark:text-white" />
            ) : formData.category === "accessory" ? (
              <Zap className="h-4 w-4 text-[#1d1d1f] dark:text-white" />
            ) : (
              <Smartphone className="h-4 w-4 text-[#1d1d1f] dark:text-white" />
            )}
            <h2 className="text-sm font-bold uppercase tracking-wider text-[#1d1d1f] dark:text-white">
              1. Device Identity
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-[#86868b] mb-2">
                {categoryLabel} Name *
              </label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={handleNameChange}
                placeholder={
                  isLaptop
                    ? "e.g. MacBook Pro 16 M3 Max"
                    : isGadget
                    ? "e.g. Apple Watch Ultra 2"
                    : isAccessory
                    ? "e.g. Anker MagGo Qi2 Power Bank"
                    : "e.g. iPhone 16 Pro Max"
                }
                className="w-full rounded-2xl border border-black/10 dark:border-white/10 bg-black/[0.02] dark:bg-white/5 px-4 py-3 text-sm text-[#1d1d1f] dark:text-white outline-none focus:border-[#1d1d1f] dark:focus:border-white transition"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-[#86868b] mb-2">
                URL Slug *
              </label>
              <input
                type="text"
                required
                value={formData.slug}
                onChange={(e) =>
                  setFormData({ ...formData, slug: e.target.value })
                }
                placeholder="iphone-16-pro-max"
                className="w-full rounded-2xl border border-black/10 dark:border-white/10 bg-black/[0.02] dark:bg-white/5 px-4 py-3 text-sm text-[#1d1d1f] dark:text-white font-mono outline-none focus:border-[#1d1d1f] dark:focus:border-white transition"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-[#86868b] mb-2">
                Brand *
              </label>
              <select
                value={formData.brand}
                onChange={(e) =>
                  setFormData({ ...formData, brand: e.target.value })
                }
                className="w-full rounded-2xl border border-black/10 dark:border-white/10 bg-black/[0.02] dark:bg-white/5 px-4 py-3 text-sm text-[#1d1d1f] dark:text-white outline-none focus:border-[#1d1d1f] dark:focus:border-white transition"
              >
                {brandOptions.map((b) => (
                  <option key={b} value={b} className="bg-white dark:bg-zinc-900 text-[#1d1d1f] dark:text-white">
                    {b}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-[#86868b] mb-2">
                Condition *
              </label>
              <select
                value={formData.condition}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    condition: e.target.value as PhoneCondition,
                  })
                }
                className="w-full rounded-2xl border border-black/10 dark:border-white/10 bg-black/[0.02] dark:bg-white/5 px-4 py-3 text-sm text-[#1d1d1f] dark:text-white outline-none focus:border-[#1d1d1f] dark:focus:border-white transition"
              >
                <option value="UK Used" className="bg-white dark:bg-zinc-900">UK Used (Clean / Tested)</option>
                <option value="Brand New" className="bg-white dark:bg-zinc-900">Brand New (Sealed)</option>
                <option value="Open Box" className="bg-white dark:bg-zinc-900">Open Box</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-[#86868b] mb-2">
                Base Storage / SSD *
              </label>
              <input
                type="text"
                required
                value={formData.storage}
                onChange={(e) =>
                  setFormData({ ...formData, storage: e.target.value })
                }
                placeholder={isLaptop ? "512GB SSD" : "256GB"}
                className="w-full rounded-2xl border border-black/10 dark:border-white/10 bg-black/[0.02] dark:bg-white/5 px-4 py-3 text-sm text-[#1d1d1f] dark:text-white outline-none focus:border-[#1d1d1f] dark:focus:border-white transition"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-[#86868b] mb-2">
                Storage Options (comma-separated)
              </label>
              <input
                type="text"
                value={formData.storageOptions}
                onChange={(e) =>
                  setFormData({ ...formData, storageOptions: e.target.value })
                }
                placeholder="128GB, 256GB, 512GB, 1TB"
                className="w-full rounded-2xl border border-black/10 dark:border-white/10 bg-black/[0.02] dark:bg-white/5 px-4 py-3 text-sm text-[#1d1d1f] dark:text-white outline-none focus:border-[#1d1d1f] dark:focus:border-white transition"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-[#86868b] mb-2">
                Available Colors (comma-separated)
              </label>
              <input
                type="text"
                value={formData.colors}
                onChange={(e) =>
                  setFormData({ ...formData, colors: e.target.value })
                }
                placeholder="Space Black, Silver, Natural Titanium"
                className="w-full rounded-2xl border border-black/10 dark:border-white/10 bg-black/[0.02] dark:bg-white/5 px-4 py-3 text-sm text-[#1d1d1f] dark:text-white outline-none focus:border-[#1d1d1f] dark:focus:border-white transition"
              />
            </div>
          </div>
        </div>

        {/* Section 2: Pricing & Availability */}
        <div className="apple-card p-6 sm:p-8 shadow-sm space-y-5">
          <div className="flex items-center gap-2 pb-3 border-b border-black/5 dark:border-white/10">
            <h2 className="text-sm font-bold uppercase tracking-wider text-[#1d1d1f] dark:text-white">
              2. Pricing Policy & Stock Status
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-[#86868b] mb-2">
                Today&apos;s Price Note *
              </label>
              <input
                type="text"
                required
                value={formData.priceNote}
                onChange={(e) =>
                  setFormData({ ...formData, priceNote: e.target.value })
                }
                placeholder="Price on daily request (market rate)"
                className="w-full rounded-2xl border border-black/10 dark:border-white/10 bg-black/[0.02] dark:bg-white/5 px-4 py-3 text-sm text-[#1d1d1f] dark:text-white outline-none focus:border-[#1d1d1f] dark:focus:border-white transition"
              />
              <p className="mt-1 text-[11px] text-[#86868b]">
                e.g. &apos;Price on daily request&apos; or &apos;₦1,550,000 promo today&apos;
              </p>
            </div>

            <div className="flex items-center gap-6 pt-5">
              <label className="flex items-center gap-2.5 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.inStock}
                  onChange={(e) =>
                    setFormData({ ...formData, inStock: e.target.checked })
                  }
                  className="h-4 w-4 rounded text-[#1d1d1f] focus:ring-black"
                />
                <span className="text-xs font-semibold text-[#1d1d1f] dark:text-white">
                  In Stock & Ready to Ship
                </span>
              </label>

              <label className="flex items-center gap-2.5 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.featured}
                  onChange={(e) =>
                    setFormData({ ...formData, featured: e.target.checked })
                  }
                  className="h-4 w-4 rounded text-amber-500 focus:ring-amber-500"
                />
                <span className="text-xs font-semibold text-[#1d1d1f] dark:text-white">
                  Featured on Homepage
                </span>
              </label>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-[#86868b] mb-2">
                Catchy Tagline (Optional)
              </label>
              <input
                type="text"
                value={formData.tagline}
                onChange={(e) =>
                  setFormData({ ...formData, tagline: e.target.value })
                }
                placeholder="Titanium. So strong. So light. So Pro."
                className="w-full rounded-2xl border border-black/10 dark:border-white/10 bg-black/[0.02] dark:bg-white/5 px-4 py-3 text-sm text-[#1d1d1f] dark:text-white outline-none focus:border-[#1d1d1f] dark:focus:border-white transition"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-[#86868b] mb-2">
                Overview / Sales Note (Optional)
              </label>
              <textarea
                rows={2}
                value={formData.overview}
                onChange={(e) =>
                  setFormData({ ...formData, overview: e.target.value })
                }
                placeholder="Brief summary of highlights, battery health, or grade A condition..."
                className="w-full rounded-2xl border border-black/10 dark:border-white/10 bg-black/[0.02] dark:bg-white/5 px-4 py-2.5 text-sm text-[#1d1d1f] dark:text-white outline-none focus:border-[#1d1d1f] dark:focus:border-white resize-none transition"
              />
            </div>
          </div>
        </div>

        {/* Section 3: Specs Matrix */}
        <div className="apple-card p-6 sm:p-8 shadow-sm space-y-5">
          <div className="flex items-center gap-2 pb-3 border-b border-black/5 dark:border-white/10">
            <h2 className="text-sm font-bold uppercase tracking-wider text-[#1d1d1f] dark:text-white">
              3. Specifications Matrix
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            <div>
              <label className="block text-xs text-[#86868b] mb-1">Display & Screen</label>
              <input
                type="text"
                value={formData.display}
                onChange={(e) =>
                  setFormData({ ...formData, display: e.target.value })
                }
                placeholder={isLaptop ? '14.2" Liquid Retina XDR, 120Hz' : '6.7" OLED, 120Hz Super Retina'}
                className="w-full rounded-2xl border border-black/10 dark:border-white/10 bg-black/[0.02] dark:bg-white/5 px-3.5 py-2.5 text-xs text-[#1d1d1f] dark:text-white outline-none"
              />
            </div>

            <div>
              <label className="block text-xs text-[#86868b] mb-1">Processor / CPU</label>
              <input
                type="text"
                value={formData.processor}
                onChange={(e) =>
                  setFormData({ ...formData, processor: e.target.value })
                }
                placeholder={isLaptop ? "Apple M3 Pro / Intel Core i7" : "Apple A18 Pro / Snapdragon 8 Elite"}
                className="w-full rounded-2xl border border-black/10 dark:border-white/10 bg-black/[0.02] dark:bg-white/5 px-3.5 py-2.5 text-xs text-[#1d1d1f] dark:text-white outline-none"
              />
            </div>

            <div>
              <label className="block text-xs text-[#86868b] mb-1">RAM Memory</label>
              <input
                type="text"
                value={formData.ram}
                onChange={(e) =>
                  setFormData({ ...formData, ram: e.target.value })
                }
                placeholder={isLaptop ? "18GB Unified / 32GB RAM" : "8GB / 12GB RAM"}
                className="w-full rounded-2xl border border-black/10 dark:border-white/10 bg-black/[0.02] dark:bg-white/5 px-3.5 py-2.5 text-xs text-[#1d1d1f] dark:text-white outline-none"
              />
            </div>

            {isLaptop ? (
              <div>
                <label className="block text-xs text-[#86868b] mb-1">Graphics / GPU</label>
                <input
                  type="text"
                  value={formData.gpu}
                  onChange={(e) =>
                    setFormData({ ...formData, gpu: e.target.value })
                  }
                  placeholder="NVIDIA RTX 4060 8GB / Apple 14-Core GPU"
                  className="w-full rounded-2xl border border-black/10 dark:border-white/10 bg-black/[0.02] dark:bg-white/5 px-3.5 py-2.5 text-xs text-[#1d1d1f] dark:text-white outline-none"
                />
              </div>
            ) : (
              <div>
                <label className="block text-xs text-[#86868b] mb-1">Camera Setup</label>
                <input
                  type="text"
                  value={formData.camera}
                  onChange={(e) =>
                    setFormData({ ...formData, camera: e.target.value })
                  }
                  placeholder="48MP Main + 12MP Ultra-wide + 12MP 5x"
                  className="w-full rounded-2xl border border-black/10 dark:border-white/10 bg-black/[0.02] dark:bg-white/5 px-3.5 py-2.5 text-xs text-[#1d1d1f] dark:text-white outline-none"
                />
              </div>
            )}

            <div>
              <label className="block text-xs text-[#86868b] mb-1">Battery & Health</label>
              <input
                type="text"
                value={formData.battery}
                onChange={(e) =>
                  setFormData({ ...formData, battery: e.target.value })
                }
                placeholder={isLaptop ? "70Whr, 96% battery health" : "4685 mAh, All-day life"}
                className="w-full rounded-2xl border border-black/10 dark:border-white/10 bg-black/[0.02] dark:bg-white/5 px-3.5 py-2.5 text-xs text-[#1d1d1f] dark:text-white outline-none"
              />
            </div>

            <div>
              <label className="block text-xs text-[#86868b] mb-1">Operating System</label>
              <input
                type="text"
                value={formData.os}
                onChange={(e) =>
                  setFormData({ ...formData, os: e.target.value })
                }
                placeholder={isLaptop ? "macOS Sonoma / Windows 11 Pro" : "iOS 18 / Android 15"}
                className="w-full rounded-2xl border border-black/10 dark:border-white/10 bg-black/[0.02] dark:bg-white/5 px-3.5 py-2.5 text-xs text-[#1d1d1f] dark:text-white outline-none"
              />
            </div>

            {isLaptop && (
              <div className="sm:col-span-3">
                <label className="block text-xs text-[#86868b] mb-1">I/O Ports</label>
                <input
                  type="text"
                  value={formData.ports}
                  onChange={(e) =>
                    setFormData({ ...formData, ports: e.target.value })
                  }
                  placeholder="3x Thunderbolt 4, HDMI, SDXC, MagSafe 3"
                  className="w-full rounded-2xl border border-black/10 dark:border-white/10 bg-black/[0.02] dark:bg-white/5 px-3.5 py-2.5 text-xs text-[#1d1d1f] dark:text-white outline-none"
                />
              </div>
            )}
          </div>
        </div>

        {/* Section 4: Image */}
        <div className="apple-card p-6 sm:p-8 shadow-sm space-y-5">
          <div className="flex items-center gap-2 pb-3 border-b border-black/5 dark:border-white/10">
            <h2 className="text-sm font-bold uppercase tracking-wider text-[#1d1d1f] dark:text-white">
              4. Product Pictures & Media
            </h2>
          </div>

          <ImageUploader
            primaryImage={formData.image}
            galleryImages={galleryImages}
            category={formData.category}
            onPrimaryChange={(url) =>
              setFormData((prev) => ({ ...prev, image: url }))
            }
            onGalleryChange={setGalleryImages}
          />
        </div>

        {/* Bottom Error Notification Banner (Right above submit button) */}
        {error && (
          <div className="flex items-center gap-3 rounded-2xl border border-rose-500/30 bg-rose-500/10 p-4 text-xs text-rose-600 dark:text-rose-400">
            <AlertCircle className="h-4 w-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {/* Submit Action */}
        <div className="flex items-center justify-end gap-3 pt-4">
          <Link
            href="/admin/phones"
            className="apple-button-secondary text-xs"
          >
            Cancel
          </Link>

          <button
            type="submit"
            disabled={loading}
            className="inline-flex items-center gap-2 rounded-full bg-[#1d1d1f] hover:bg-black dark:bg-white dark:hover:bg-[#f5f5f7] px-8 py-3.5 text-xs font-semibold text-white dark:text-black shadow-lg shadow-black/10 transition disabled:opacity-50"
          >
            {loading ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                <span>Publishing Device...</span>
              </>
            ) : (
              <>
                <PlusCircle className="h-4 w-4" />
                <span>Add Device to Catalog</span>
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
