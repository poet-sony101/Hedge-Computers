"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft,
  Save,
  AlertCircle,
  Smartphone,
  Laptop,
  Watch,
  Zap,
  Cpu,
  Sparkles,
  ExternalLink,
} from "lucide-react";
import { Phone, PhoneCondition, DeviceCategory } from "@/types/phone";

interface EditPhoneClientProps {
  phone: Phone;
}

const ALL_BRANDS = [
  "Apple",
  "Samsung",
  "Google",
  "Dell",
  "HP",
  "Lenovo",
  "ASUS",
  "Xiaomi",
  "Tecno",
  "OnePlus",
  "Infinix",
  "Oppo",
  "Anker",
  "Sony",
  "Bose",
  "Baseus",
];

export default function EditPhoneClient({ phone }: EditPhoneClientProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    name: phone.name,
    slug: phone.slug,
    category: (phone.category || "phone") as DeviceCategory,
    brand: phone.brand,
    condition: phone.condition,
    storage: phone.storage,
    storageOptions: (phone.storageOptions || [phone.storage]).join(", "),
    colors: (phone.colors || []).join(", "),
    image: phone.image,
    priceNote: phone.priceNote || "Price on daily request (market rate)",
    inStock: phone.inStock,
    featured: phone.featured,
    tagline: phone.tagline || "",
    overview: phone.overview || "",
    // Specs
    display: phone.specs?.display || "",
    processor: phone.specs?.processor || "",
    ram: phone.specs?.ram || "",
    camera: phone.specs?.camera || "",
    battery: phone.specs?.battery || "",
    os: phone.specs?.os || "",
    charging: phone.specs?.charging || "",
    gpu: phone.specs?.gpu || "",
    ports: phone.specs?.ports || "",
    batteryHealth: phone.specs?.batteryHealth || "",
  });

  const isLaptop = formData.category === "laptop";

  const categoryLabel =
    formData.category === "laptop"
      ? "Laptop"
      : formData.category === "gadget"
      ? "Gadget"
      : formData.category === "accessory"
      ? "Accessory"
      : "Smartphone";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
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
        condition: formData.condition as PhoneCondition,
        storage: formData.storage,
        storageOptions: storageArr.length > 0 ? storageArr : [formData.storage],
        colors: colorsArr,
        image: formData.image,
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

      const res = await fetch(`/api/admin/phones/${phone.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Failed to update device");
        setLoading(false);
        return;
      }

      router.push("/admin/phones");
      router.refresh();
    } catch {
      setError("An unexpected error occurred while saving modifications.");
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Back & View Public Link */}
      <div className="flex items-center justify-between">
        <Link
          href="/admin/phones"
          className="inline-flex items-center gap-1.5 text-xs text-zinc-400 hover:text-white transition"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          <span>Back to Inventory</span>
        </Link>

        <Link
          href={`/phones/${phone.slug}`}
          target="_blank"
          className="inline-flex items-center gap-1 text-xs text-blue-400 hover:text-blue-300"
        >
          <span>View on Live Store</span>
          <ExternalLink className="h-3 w-3" />
        </Link>
      </div>

      <div className="flex items-center justify-between">
        <div>
          <span className="text-xs font-semibold uppercase tracking-wider text-blue-400">
            Edit Listing ({categoryLabel})
          </span>
          <h1 className="text-3xl font-extrabold tracking-tight text-white mt-1">
            {phone.name}
          </h1>
          <p className="text-xs text-zinc-400 mt-1">
            Update daily price notes, stock availability, and device specifications.
          </p>
        </div>
      </div>

      {error && (
        <div className="flex items-center gap-3 rounded-2xl border border-rose-500/30 bg-rose-950/30 p-4 text-xs text-rose-400">
          <AlertCircle className="h-4 w-4 shrink-0" />
          <span>{error}</span>
        </div>
      )}

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
                Device Name *
              </label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
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
                className="w-full rounded-xl border border-white/10 bg-zinc-900/80 px-4 py-2.5 text-xs text-zinc-300 font-mono outline-none focus:border-blue-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-400 mb-2">
                Category
              </label>
              <select
                value={formData.category}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    category: e.target.value as DeviceCategory,
                  })
                }
                className="w-full rounded-xl border border-white/10 bg-zinc-900/80 px-4 py-2.5 text-xs text-white outline-none focus:border-blue-500"
              >
                <option value="phone" className="bg-zinc-900">Smartphone</option>
                <option value="laptop" className="bg-zinc-900">Laptop / MacBook</option>
                <option value="gadget" className="bg-zinc-900">Smartwatch / Gadget</option>
                <option value="accessory" className="bg-zinc-900">Power & Accessory</option>
              </select>
            </div>

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
                {ALL_BRANDS.map((b) => (
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
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
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
                className="w-full rounded-xl border border-white/10 bg-zinc-900/80 px-4 py-2.5 text-xs text-white outline-none focus:border-blue-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-400 mb-2">
                Storage Tiers (Comma Separated)
              </label>
              <input
                type="text"
                value={formData.storageOptions}
                onChange={(e) =>
                  setFormData({ ...formData, storageOptions: e.target.value })
                }
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
              2. Daily Price Note & Stock Availability
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
              placeholder="e.g. Price on daily request (market rate) or ₦1,250,000"
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
                In Stock & Ready for Sale
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

        {/* Section 3: Tech Specs */}
        <div className="rounded-3xl border border-white/10 bg-zinc-950/60 p-6 sm:p-8 backdrop-blur-xl space-y-5">
          <div className="flex items-center gap-2 pb-3 border-b border-white/10">
            <Cpu className="h-4 w-4 text-sky-400" />
            <h2 className="text-sm font-bold uppercase tracking-wider text-white">
              3. Specifications
            </h2>
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-400 mb-2">
              Tagline
            </label>
            <input
              type="text"
              value={formData.tagline}
              onChange={(e) =>
                setFormData({ ...formData, tagline: e.target.value })
              }
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
              className="w-full rounded-xl border border-white/10 bg-zinc-900/80 px-4 py-2.5 text-xs text-white outline-none focus:border-blue-500 resize-none"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs text-zinc-400 mb-1">Display</label>
              <input
                type="text"
                value={formData.display}
                onChange={(e) =>
                  setFormData({ ...formData, display: e.target.value })
                }
                className="w-full rounded-xl border border-white/10 bg-zinc-900/80 px-3 py-2 text-xs text-white outline-none"
              />
            </div>

            <div>
              <label className="block text-xs text-zinc-400 mb-1">Processor</label>
              <input
                type="text"
                value={formData.processor}
                onChange={(e) =>
                  setFormData({ ...formData, processor: e.target.value })
                }
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
              4. Image Path
            </h2>
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-400 mb-2">
              Image URL / Path
            </label>
            <input
              type="text"
              value={formData.image}
              onChange={(e) =>
                setFormData({ ...formData, image: e.target.value })
              }
              className="w-full rounded-xl border border-white/10 bg-zinc-900/80 px-4 py-2.5 text-xs text-white outline-none focus:border-blue-500 font-mono"
            />
          </div>
        </div>

        {/* Actions */}
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
            <Save className="h-4 w-4" />
            <span>{loading ? "Saving Changes..." : "Save Modifications"}</span>
          </button>
        </div>
      </form>
    </div>
  );
}
