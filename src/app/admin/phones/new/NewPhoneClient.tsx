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
  Cpu,
  Sparkles,
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
    featured: false,
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
      if (!formData.image) {
        setError("Please choose or upload a main picture for this device.");
        setLoading(false);
        return;
      }

      const storageArr = formData.storageOptions
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean);

      const colorsArr = formData.colors
        .split(",")
        .map((c) => c.trim())
        .filter(Boolean);

      const payload = {
        name: formData.name,
        slug: formData.slug,
        category: formData.category,
        brand: formData.brand,
        condition: formData.condition,
        storage: formData.storage,
        storageOptions: storageArr.length > 0 ? storageArr : [formData.storage],
        colors: colorsArr,
        image: formData.image,
        images: [formData.image, ...galleryImages].filter(Boolean),
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
        setError(data.error || "Failed to add device listing");
        setLoading(false);
        return;
      }

      router.push("/admin/phones");
      router.refresh();
    } catch {
      setError("An unexpected error occurred while saving the device.");
      setLoading(false);
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
          className="inline-flex items-center gap-1.5 text-xs text-zinc-400 hover:text-white transition"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          <span>Back to Inventory</span>
        </Link>
      </div>

      <div className="flex items-center justify-between">
        <div>
          <span className="text-xs font-semibold uppercase tracking-wider text-blue-400">
            Catalog Expansion
          </span>
          <h1 className="text-3xl font-extrabold tracking-tight text-white mt-1">
            Add New {categoryLabel}
          </h1>
          <p className="text-xs text-zinc-400 mt-1">
            Create a new {categoryLabel.toLowerCase()} listing to appear in the public catalog and search.
          </p>
        </div>
      </div>

      {error && (
        <div className="flex items-center gap-3 rounded-2xl border border-rose-500/30 bg-rose-950/30 p-4 text-xs text-rose-400">
          <AlertCircle className="h-4 w-4 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {/* Category Toggle Banner */}
      <div className="rounded-3xl border border-white/10 bg-zinc-950/60 p-6 backdrop-blur-xl">
        <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-400 mb-3">
          Select Device Category
        </label>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-2xl">
          <button
            type="button"
            onClick={() => handleCategoryChange("phone")}
            className={`flex items-center justify-center gap-2 rounded-2xl p-3.5 text-xs font-bold transition-all ${
              formData.category === "phone"
                ? "bg-purple-600 text-white shadow-lg shadow-purple-900/40"
                : "border border-white/10 bg-zinc-900/80 text-zinc-400 hover:text-white"
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
                ? "bg-sky-600 text-white shadow-lg shadow-sky-900/40"
                : "border border-white/10 bg-zinc-900/80 text-zinc-400 hover:text-white"
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
                ? "bg-emerald-600 text-white shadow-lg shadow-emerald-900/40"
                : "border border-white/10 bg-zinc-900/80 text-zinc-400 hover:text-white"
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
                ? "bg-amber-600 text-white shadow-lg shadow-amber-900/40"
                : "border border-white/10 bg-zinc-900/80 text-zinc-400 hover:text-white"
            }`}
          >
            <Zap className="h-4 w-4" />
            <span>Accessory</span>
          </button>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Section 1: Basic Information */}
        <div className="rounded-3xl border border-white/10 bg-zinc-950/60 p-6 sm:p-8 backdrop-blur-xl space-y-5">
          <div className="flex items-center gap-2 pb-3 border-b border-white/10">
            {formData.category === "laptop" ? (
              <Laptop className="h-4 w-4 text-sky-400" />
            ) : formData.category === "gadget" ? (
              <Watch className="h-4 w-4 text-emerald-400" />
            ) : formData.category === "accessory" ? (
              <Zap className="h-4 w-4 text-amber-400" />
            ) : (
              <Smartphone className="h-4 w-4 text-purple-400" />
            )}
            <h2 className="text-sm font-bold uppercase tracking-wider text-white">
              1. Device Identity
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-400 mb-2">
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
                className="w-full rounded-xl border border-white/10 bg-zinc-900/80 px-4 py-2.5 text-xs text-white outline-none focus:border-blue-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-400 mb-2">
                URL Slug *
              </label>
              <input
                type="text"
                required
                value={formData.slug}
                onChange={(e) =>
                  setFormData({ ...formData, slug: e.target.value })
                }
                placeholder="macbook-pro-16-m3-max"
                className="w-full rounded-xl border border-white/10 bg-zinc-900/80 px-4 py-2.5 text-xs text-zinc-300 font-mono outline-none focus:border-blue-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-400 mb-2">
                Brand *
              </label>
              <select
                value={formData.brand}
                onChange={(e) =>
                  setFormData({ ...formData, brand: e.target.value })
                }
                className="w-full rounded-xl border border-white/10 bg-zinc-900/80 px-4 py-2.5 text-xs text-white outline-none focus:border-blue-500"
              >
                {brandOptions.map((b) => (
                  <option key={b} value={b} className="bg-zinc-900">
                    {b}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-400 mb-2">
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
                className="w-full rounded-xl border border-white/10 bg-zinc-900/80 px-4 py-2.5 text-xs text-white outline-none focus:border-blue-500"
              >
                <option value="UK Used" className="bg-zinc-900">UK Used (Clean / Tested)</option>
                <option value="Brand New" className="bg-zinc-900">Brand New (Sealed)</option>
                <option value="Open Box" className="bg-zinc-900">Open Box</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-400 mb-2">
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
                className="w-full rounded-xl border border-white/10 bg-zinc-900/80 px-4 py-2.5 text-xs text-white outline-none focus:border-blue-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-400 mb-2">
                Storage Options (Comma Separated)
              </label>
              <input
                type="text"
                value={formData.storageOptions}
                onChange={(e) =>
                  setFormData({ ...formData, storageOptions: e.target.value })
                }
                placeholder={isLaptop ? "512GB SSD, 1TB SSD, 2TB SSD" : "128GB, 256GB, 512GB"}
                className="w-full rounded-xl border border-white/10 bg-zinc-900/80 px-4 py-2.5 text-xs text-white outline-none focus:border-blue-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-400 mb-2">
                Colorways (Comma Separated)
              </label>
              <input
                type="text"
                value={formData.colors}
                onChange={(e) =>
                  setFormData({ ...formData, colors: e.target.value })
                }
                placeholder={isLaptop ? "Space Black, Silver, Midnight" : "Titanium Black, White, Natural Titanium"}
                className="w-full rounded-xl border border-white/10 bg-zinc-900/80 px-4 py-2.5 text-xs text-white outline-none focus:border-blue-500"
              />
            </div>
          </div>
        </div>

        {/* Section 2: Pricing & Placement */}
        <div className="rounded-3xl border border-white/10 bg-zinc-950/60 p-6 sm:p-8 backdrop-blur-xl space-y-5">
          <div className="flex items-center gap-2 pb-3 border-b border-white/10">
            <Sparkles className="h-4 w-4 text-emerald-400" />
            <h2 className="text-sm font-bold uppercase tracking-wider text-white">
              2. Daily Price Note & Availability
            </h2>
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-400 mb-2">
              Price Note / Today&apos;s Rate
            </label>
            <input
              type="text"
              value={formData.priceNote}
              onChange={(e) =>
                setFormData({ ...formData, priceNote: e.target.value })
              }
              placeholder="e.g. Price on daily request (market rate) or ₦1,850,000"
              className="w-full rounded-xl border border-white/10 bg-zinc-900/80 px-4 py-2.5 text-xs text-white outline-none focus:border-blue-500"
            />
          </div>

          <div className="flex flex-wrap items-center gap-6 pt-2">
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={formData.inStock}
                onChange={(e) =>
                  setFormData({ ...formData, inStock: e.target.checked })
                }
                className="h-4 w-4 rounded accent-blue-600"
              />
              <span className="text-xs font-semibold text-white">
                In Stock & Available Immediately
              </span>
            </label>

            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={formData.featured}
                onChange={(e) =>
                  setFormData({ ...formData, featured: e.target.checked })
                }
                className="h-4 w-4 rounded accent-amber-500"
              />
              <span className="text-xs font-semibold text-white">
                Feature on Homepage Spotlight
              </span>
            </label>
          </div>
        </div>

        {/* Section 3: Tech Specs & Overview */}
        <div className="rounded-3xl border border-white/10 bg-zinc-950/60 p-6 sm:p-8 backdrop-blur-xl space-y-5">
          <div className="flex items-center gap-2 pb-3 border-b border-white/10">
            <Cpu className="h-4 w-4 text-sky-400" />
            <h2 className="text-sm font-bold uppercase tracking-wider text-white">
              3. Specifications
            </h2>
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-400 mb-2">
              Marketing Tagline
            </label>
            <input
              type="text"
              value={formData.tagline}
              onChange={(e) =>
                setFormData({ ...formData, tagline: e.target.value })
              }
              placeholder={isLaptop ? "e.g. Scary fast M3 Max chip with 120Hz Liquid Retina XDR." : "e.g. Forged in titanium with next-gen power."}
              className="w-full rounded-xl border border-white/10 bg-zinc-900/80 px-4 py-2.5 text-xs text-white outline-none focus:border-blue-500"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-400 mb-2">
              Device Overview
            </label>
            <textarea
              rows={2}
              value={formData.overview}
              onChange={(e) =>
                setFormData({ ...formData, overview: e.target.value })
              }
              placeholder="Short description highlighting key capabilities..."
              className="w-full rounded-xl border border-white/10 bg-zinc-900/80 px-4 py-2.5 text-xs text-white outline-none focus:border-blue-500 resize-none"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs text-zinc-400 mb-1">Display & Screen</label>
              <input
                type="text"
                value={formData.display}
                onChange={(e) =>
                  setFormData({ ...formData, display: e.target.value })
                }
                placeholder={isLaptop ? 'e.g. 14.2" Liquid Retina XDR, 120Hz ProMotion' : 'e.g. 6.7" OLED, 120Hz'}
                className="w-full rounded-xl border border-white/10 bg-zinc-900/80 px-3 py-2 text-xs text-white outline-none"
              />
            </div>

            <div>
              <label className="block text-xs text-zinc-400 mb-1">Processor / CPU</label>
              <input
                type="text"
                value={formData.processor}
                onChange={(e) =>
                  setFormData({ ...formData, processor: e.target.value })
                }
                placeholder={isLaptop ? "e.g. Apple M3 Pro / Intel Core i7 13700H" : "e.g. Apple A18 Pro / Snapdragon 8 Elite"}
                className="w-full rounded-xl border border-white/10 bg-zinc-900/80 px-3 py-2 text-xs text-white outline-none"
              />
            </div>

            <div>
              <label className="block text-xs text-zinc-400 mb-1">RAM Memory</label>
              <input
                type="text"
                value={formData.ram}
                onChange={(e) =>
                  setFormData({ ...formData, ram: e.target.value })
                }
                placeholder={isLaptop ? "e.g. 18GB Unified / 32GB DDR5" : "e.g. 8GB / 12GB"}
                className="w-full rounded-xl border border-white/10 bg-zinc-900/80 px-3 py-2 text-xs text-white outline-none"
              />
            </div>

            {isLaptop ? (
              <div>
                <label className="block text-xs text-zinc-400 mb-1">Graphics / GPU</label>
                <input
                  type="text"
                  value={formData.gpu}
                  onChange={(e) =>
                    setFormData({ ...formData, gpu: e.target.value })
                  }
                  placeholder="e.g. NVIDIA RTX 4060 8GB / Apple 14-Core GPU"
                  className="w-full rounded-xl border border-white/10 bg-zinc-900/80 px-3 py-2 text-xs text-white outline-none"
                />
              </div>
            ) : (
              <div>
                <label className="block text-xs text-zinc-400 mb-1">Camera Setup</label>
                <input
                  type="text"
                  value={formData.camera}
                  onChange={(e) =>
                    setFormData({ ...formData, camera: e.target.value })
                  }
                  placeholder="e.g. 48MP Main + 12MP Ultra-wide + 12MP 5x"
                  className="w-full rounded-xl border border-white/10 bg-zinc-900/80 px-3 py-2 text-xs text-white outline-none"
                />
              </div>
            )}

            <div>
              <label className="block text-xs text-zinc-400 mb-1">Battery & Health</label>
              <input
                type="text"
                value={formData.battery}
                onChange={(e) =>
                  setFormData({ ...formData, battery: e.target.value })
                }
                placeholder={isLaptop ? "e.g. 70Whr, 96% battery health verified" : "e.g. 4685 mAh, All-day life"}
                className="w-full rounded-xl border border-white/10 bg-zinc-900/80 px-3 py-2 text-xs text-white outline-none"
              />
            </div>

            <div>
              <label className="block text-xs text-zinc-400 mb-1">Operating System</label>
              <input
                type="text"
                value={formData.os}
                onChange={(e) =>
                  setFormData({ ...formData, os: e.target.value })
                }
                placeholder={isLaptop ? "e.g. macOS Sonoma / Windows 11 Pro" : "e.g. iOS 18 / Android 15"}
                className="w-full rounded-xl border border-white/10 bg-zinc-900/80 px-3 py-2 text-xs text-white outline-none"
              />
            </div>

            {isLaptop && (
              <div className="sm:col-span-2">
                <label className="block text-xs text-zinc-400 mb-1">I/O Ports</label>
                <input
                  type="text"
                  value={formData.ports}
                  onChange={(e) =>
                    setFormData({ ...formData, ports: e.target.value })
                  }
                  placeholder="e.g. 3x Thunderbolt 4, HDMI, SDXC, MagSafe 3"
                  className="w-full rounded-xl border border-white/10 bg-zinc-900/80 px-3 py-2 text-xs text-white outline-none"
                />
              </div>
            )}
          </div>
        </div>

        {/* Section 4: Image */}
        <div className="rounded-3xl border border-white/10 bg-zinc-950/60 p-6 sm:p-8 backdrop-blur-xl space-y-5">
          <div className="flex items-center gap-2 pb-3 border-b border-white/10">
            <h2 className="text-sm font-bold uppercase tracking-wider text-white">
              4. Product Pictures & Media
            </h2>
          </div>

          <ImageUploader
            primaryImage={formData.image}
            galleryImages={galleryImages}
            onPrimaryChange={(url) =>
              setFormData((prev) => ({ ...prev, image: url }))
            }
            onGalleryChange={setGalleryImages}
          />
        </div>

        {/* Submit Action */}
        <div className="flex items-center justify-end gap-4 pt-4">
          <Link
            href="/admin/phones"
            className="rounded-xl border border-white/10 bg-zinc-900 px-6 py-3 text-xs font-semibold text-zinc-300 hover:bg-zinc-800"
          >
            Cancel
          </Link>

          <button
            type="submit"
            disabled={loading}
            className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-8 py-3 text-xs font-semibold text-white hover:bg-blue-500 shadow-lg shadow-blue-900/40 transition"
          >
            <PlusCircle className="h-4 w-4" />
            <span>{loading ? "Publishing..." : `Publish ${categoryLabel} Listing`}</span>
          </button>
        </div>
      </form>
    </div>
  );
}
