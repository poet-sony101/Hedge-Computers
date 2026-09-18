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
  ExternalLink,
  Loader2,
} from "lucide-react";
import { Phone, PhoneCondition, DeviceCategory } from "@/types/phone";
import ImageUploader from "@/components/admin/ImageUploader";

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

  const [galleryImages, setGalleryImages] = useState<string[]>(
    (phone.images || []).filter((img) => img !== phone.image)
  );

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
        condition: formData.condition as PhoneCondition,
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

      const res = await fetch(`/api/admin/phones/${phone.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok) {
        const errorMsg = data.error || "Failed to update device details";
        setError(errorMsg);
        setLoading(false);
        if (typeof window !== "undefined") {
          window.scrollTo({ top: 0, behavior: "smooth" });
        }
        return;
      }

      if (typeof window !== "undefined") {
        window.location.href = "/admin/phones";
      } else {
        router.push("/admin/phones");
        router.refresh();
      }
    } catch {
      setError("An unexpected error occurred while saving modifications.");
      setLoading(false);
      if (typeof window !== "undefined") {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Top Breadcrumb */}
      <div className="flex items-center justify-between">
        <Link
          href="/admin/phones"
          className="inline-flex items-center gap-1.5 text-xs text-[#86868b] hover:text-[#1d1d1f] dark:hover:text-white transition"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          <span>Back to Inventory</span>
        </Link>

        <Link
          href={`/phones/${phone.slug}`}
          target="_blank"
          className="inline-flex items-center gap-1.5 text-xs text-[#1d1d1f] dark:text-white hover:underline"
        >
          <span>View Public Page</span>
          <ExternalLink className="h-3.5 w-3.5 text-[#86868b]" />
        </Link>
      </div>

      <div className="flex items-center justify-between">
        <div>
          <span className="text-xs font-semibold uppercase tracking-wider text-[#86868b]">
            Catalog Editor
          </span>
          <h1 className="text-3xl font-extrabold tracking-tight text-[#1d1d1f] dark:text-white mt-1">
            Edit {phone.name}
          </h1>
          <p className="text-xs text-[#86868b] mt-1">
            Modify specifications, daily pricing policies, or update imagery for this device listing.
          </p>
        </div>
      </div>

      {error && (
        <div className="flex items-center gap-3 rounded-2xl border border-rose-500/30 bg-rose-500/10 p-4 text-xs text-rose-600 dark:text-rose-400">
          <AlertCircle className="h-4 w-4 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Section 1: Basic Information */}
        <div className="apple-card p-6 sm:p-8 shadow-sm space-y-5">
          <div className="flex items-center gap-2 pb-3 border-b border-black/5 dark:border-white/10">
            {isLaptop ? (
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
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
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
                {ALL_BRANDS.map((b) => (
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
                className="w-full rounded-2xl border border-black/10 dark:border-white/10 bg-black/[0.02] dark:bg-white/5 px-4 py-3 text-sm text-[#1d1d1f] dark:text-white outline-none focus:border-[#1d1d1f] dark:focus:border-white transition"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-[#86868b] mb-2">
                Colors (comma-separated)
              </label>
              <input
                type="text"
                value={formData.colors}
                onChange={(e) =>
                  setFormData({ ...formData, colors: e.target.value })
                }
                className="w-full rounded-2xl border border-black/10 dark:border-white/10 bg-black/[0.02] dark:bg-white/5 px-4 py-3 text-sm text-[#1d1d1f] dark:text-white outline-none focus:border-[#1d1d1f] dark:focus:border-white transition"
              />
            </div>
          </div>
        </div>

        {/* Section 2: Pricing & Stock */}
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
                className="w-full rounded-2xl border border-black/10 dark:border-white/10 bg-black/[0.02] dark:bg-white/5 px-4 py-3 text-sm text-[#1d1d1f] dark:text-white outline-none focus:border-[#1d1d1f] dark:focus:border-white transition"
              />
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
                Tagline (Optional)
              </label>
              <input
                type="text"
                value={formData.tagline}
                onChange={(e) =>
                  setFormData({ ...formData, tagline: e.target.value })
                }
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
                className="w-full rounded-2xl border border-black/10 dark:border-white/10 bg-black/[0.02] dark:bg-white/5 px-4 py-2.5 text-sm text-[#1d1d1f] dark:text-white outline-none focus:border-[#1d1d1f] dark:focus:border-white resize-none transition"
              />
            </div>
          </div>
        </div>

        {/* Section 3: Technical Specifications */}
        <div className="apple-card p-6 sm:p-8 shadow-sm space-y-5">
          <div className="flex items-center gap-2 pb-3 border-b border-black/5 dark:border-white/10">
            <h2 className="text-sm font-bold uppercase tracking-wider text-[#1d1d1f] dark:text-white">
              3. Specifications Matrix
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            <div>
              <label className="block text-xs text-[#86868b] mb-1">Display</label>
              <input
                type="text"
                value={formData.display}
                onChange={(e) =>
                  setFormData({ ...formData, display: e.target.value })
                }
                className="w-full rounded-2xl border border-black/10 dark:border-white/10 bg-black/[0.02] dark:bg-white/5 px-3.5 py-2.5 text-xs text-[#1d1d1f] dark:text-white outline-none"
              />
            </div>

            <div>
              <label className="block text-xs text-[#86868b] mb-1">Processor</label>
              <input
                type="text"
                value={formData.processor}
                onChange={(e) =>
                  setFormData({ ...formData, processor: e.target.value })
                }
                className="w-full rounded-2xl border border-black/10 dark:border-white/10 bg-black/[0.02] dark:bg-white/5 px-3.5 py-2.5 text-xs text-[#1d1d1f] dark:text-white outline-none"
              />
            </div>

            <div>
              <label className="block text-xs text-[#86868b] mb-1">RAM</label>
              <input
                type="text"
                value={formData.ram}
                onChange={(e) =>
                  setFormData({ ...formData, ram: e.target.value })
                }
                className="w-full rounded-2xl border border-black/10 dark:border-white/10 bg-black/[0.02] dark:bg-white/5 px-3.5 py-2.5 text-xs text-[#1d1d1f] dark:text-white outline-none"
              />
            </div>

            {isLaptop ? (
              <div>
                <label className="block text-xs text-[#86868b] mb-1">GPU</label>
                <input
                  type="text"
                  value={formData.gpu}
                  onChange={(e) =>
                    setFormData({ ...formData, gpu: e.target.value })
                  }
                  className="w-full rounded-2xl border border-black/10 dark:border-white/10 bg-black/[0.02] dark:bg-white/5 px-3.5 py-2.5 text-xs text-[#1d1d1f] dark:text-white outline-none"
                />
              </div>
            ) : (
              <div>
                <label className="block text-xs text-[#86868b] mb-1">Camera</label>
                <input
                  type="text"
                  value={formData.camera}
                  onChange={(e) =>
                    setFormData({ ...formData, camera: e.target.value })
                  }
                  className="w-full rounded-2xl border border-black/10 dark:border-white/10 bg-black/[0.02] dark:bg-white/5 px-3.5 py-2.5 text-xs text-[#1d1d1f] dark:text-white outline-none"
                />
              </div>
            )}

            <div>
              <label className="block text-xs text-[#86868b] mb-1">Battery</label>
              <input
                type="text"
                value={formData.battery}
                onChange={(e) =>
                  setFormData({ ...formData, battery: e.target.value })
                }
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

        {/* Bottom Error Notification Banner */}
        {error && (
          <div className="flex items-center gap-3 rounded-2xl border border-rose-500/30 bg-rose-500/10 p-4 text-xs text-rose-600 dark:text-rose-400">
            <AlertCircle className="h-4 w-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {/* Actions */}
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
                <span>Saving Changes...</span>
              </>
            ) : (
              <>
                <Save className="h-4 w-4" />
                <span>Save Modifications</span>
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
