"use client";

import { useState } from "react";
import { MessageCircle, CheckCircle2, ShieldCheck, Sparkles, Send, Smartphone, Laptop } from "lucide-react";
import { getCustomPhoneRequestUrl } from "@/utils/whatsapp";

const PHONE_BRANDS = [
  "Apple iPhone",
  "Samsung Galaxy",
  "Google Pixel",
  "Xiaomi / Redmi",
  "Tecno Mobile",
  "OnePlus",
  "Other Smartphone",
];

const LAPTOP_BRANDS = [
  "Apple MacBook (Pro / Air)",
  "Dell (XPS / Latitude / Precision)",
  "HP (Spectre / Envy / EliteBook)",
  "Lenovo (ThinkPad / Legion / Yoga)",
  "ASUS (ZenBook / ROG)",
  "Other Laptop Brand",
];

const PHONE_STORAGE = ["128GB", "256GB", "512GB", "1TB", "64GB / Other"];
const LAPTOP_STORAGE = ["512GB SSD", "1TB SSD", "2TB SSD", "256GB SSD"];
const LAPTOP_RAM = ["16GB RAM", "32GB RAM", "64GB RAM", "8GB RAM", "18GB / 36GB Unified"];
const CONDITION_OPTIONS = ["Brand New Sealed", "UK Used (Clean / Tested)", "Either is Fine"];

export default function RequestPhoneClient() {
  const [deviceCategory, setDeviceCategory] = useState<"Smartphone" | "Laptop">("Smartphone");

  const [formData, setFormData] = useState({
    customerName: "",
    whatsappPhone: "",
    brand: "Apple iPhone",
    model: "",
    storage: "256GB",
    ram: "16GB RAM",
    processor: "",
    condition: "UK Used (Clean / Tested)",
    budget: "",
    notes: "",
  });

  const [submitted, setSubmitted] = useState(false);

  const handleCategorySwitch = (category: "Smartphone" | "Laptop") => {
    setDeviceCategory(category);
    if (category === "Laptop") {
      setFormData((prev) => ({
        ...prev,
        brand: "Apple MacBook (Pro / Air)",
        storage: "512GB SSD",
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        brand: "Apple iPhone",
        storage: "256GB",
      }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const whatsappUrl = getCustomPhoneRequestUrl({
      category: deviceCategory,
      brand: formData.brand,
      model: formData.model,
      storage: formData.storage,
      ram: deviceCategory === "Laptop" ? formData.ram : undefined,
      processor: deviceCategory === "Laptop" && formData.processor ? formData.processor : undefined,
      condition: formData.condition,
      budget: formData.budget || undefined,
      customerName: formData.customerName || undefined,
      notes: formData.notes || undefined,
    });

    setSubmitted(true);

    if (typeof window !== "undefined") {
      window.open(whatsappUrl, "_blank", "noopener,noreferrer");
    }
  };

  const currentBrands = deviceCategory === "Smartphone" ? PHONE_BRANDS : LAPTOP_BRANDS;
  const currentStorage = deviceCategory === "Smartphone" ? PHONE_STORAGE : LAPTOP_STORAGE;

  return (
    <div className="container-custom">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-black/5 dark:bg-white/10 px-4 py-1.5 text-xs font-semibold text-[#1d1d1f] dark:text-[#f5f5f7] border border-black/10 dark:border-white/10 backdrop-blur-md">
            <Sparkles className="h-3.5 w-3.5 text-[#86868b]" />
            Custom Device Sourcing
          </span>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-[#1d1d1f] dark:text-[#f5f5f7] mt-3">
            Request a Specific Device
          </h1>
          <p className="mt-3 text-base text-[#86868b] dark:text-[#a1a1a6] max-w-xl mx-auto">
            Looking for a specific phone, MacBook, or Windows workstation not currently in our catalog? Fill out the specifications and we will confirm availability and today&apos;s sharpest price.
          </p>
        </div>

        {submitted ? (
          <div className="rounded-3xl border border-emerald-500/30 bg-emerald-500/10 p-10 text-center backdrop-blur-xl">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 mb-4">
              <CheckCircle2 className="h-8 w-8" />
            </div>
            <h2 className="text-2xl font-bold text-[#1d1d1f] dark:text-white">
              Request Sent to WhatsApp!
            </h2>
            <p className="mt-2 text-sm text-[#86868b] dark:text-zinc-300 max-w-md mx-auto">
              Your custom request for the <strong className="text-[#1d1d1f] dark:text-white">{formData.brand} {formData.model}</strong> has been prepared. An Available Tech specialist will follow up in your chat within minutes.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
              <button
                onClick={() => setSubmitted(false)}
                className="apple-button-secondary text-xs"
              >
                Submit Another Request
              </button>
            </div>
          </div>
        ) : (
          <div className="apple-card p-8 sm:p-12 shadow-2xl">
            {/* Category Selector Buttons */}
            <div className="mb-8">
              <label className="block text-xs font-semibold uppercase tracking-wider text-[#86868b] dark:text-zinc-400 mb-3 text-center">
                Select Device Category
              </label>
              <div className="grid grid-cols-2 gap-3 max-w-md mx-auto">
                <button
                  type="button"
                  onClick={() => handleCategorySwitch("Smartphone")}
                  className={`flex items-center justify-center gap-2 rounded-2xl p-3.5 text-xs font-bold transition-all ${
                    deviceCategory === "Smartphone"
                      ? "bg-[#1d1d1f] dark:bg-white text-white dark:text-black shadow-lg shadow-black/10"
                      : "border border-black/10 dark:border-white/10 bg-black/5 dark:bg-white/5 text-[#86868b] dark:text-zinc-400 hover:text-[#1d1d1f] dark:hover:text-white"
                  }`}
                >
                  <Smartphone className="h-4 w-4" />
                  <span>Smartphone</span>
                </button>

                <button
                  type="button"
                  onClick={() => handleCategorySwitch("Laptop")}
                  className={`flex items-center justify-center gap-2 rounded-2xl p-3.5 text-xs font-bold transition-all ${
                    deviceCategory === "Laptop"
                      ? "bg-[#1d1d1f] dark:bg-white text-white dark:text-black shadow-lg shadow-black/10"
                      : "border border-black/10 dark:border-white/10 bg-black/5 dark:bg-white/5 text-[#86868b] dark:text-zinc-400 hover:text-[#1d1d1f] dark:hover:text-white"
                  }`}
                >
                  <Laptop className="h-4 w-4" />
                  <span>Laptop / MacBook</span>
                </button>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Customer Contact Details */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-[#86868b] dark:text-zinc-400 mb-2">
                    Your Name
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.customerName}
                    onChange={(e) =>
                      setFormData({ ...formData, customerName: e.target.value })
                    }
                    placeholder="e.g. Samuel Adewale"
                    className="w-full rounded-2xl border border-black/10 dark:border-white/10 bg-black/[0.02] dark:bg-white/5 px-4 py-3 text-sm text-[#1d1d1f] dark:text-white placeholder-[#86868b] outline-none focus:border-[#1d1d1f] dark:focus:border-white transition"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-[#86868b] dark:text-zinc-400 mb-2">
                    WhatsApp Phone Number
                  </label>
                  <input
                    type="tel"
                    required
                    value={formData.whatsappPhone}
                    onChange={(e) =>
                      setFormData({ ...formData, whatsappPhone: e.target.value })
                    }
                    placeholder="e.g. 08012345678"
                    className="w-full rounded-2xl border border-black/10 dark:border-white/10 bg-black/[0.02] dark:bg-white/5 px-4 py-3 text-sm text-[#1d1d1f] dark:text-white placeholder-[#86868b] outline-none focus:border-[#1d1d1f] dark:focus:border-white transition"
                  />
                </div>
              </div>

              {/* Brand & Model Selection */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-[#86868b] dark:text-zinc-400 mb-2">
                    Brand Ecosystem
                  </label>
                  <select
                    value={formData.brand}
                    onChange={(e) =>
                      setFormData({ ...formData, brand: e.target.value })
                    }
                    className="w-full rounded-2xl border border-black/10 dark:border-white/10 bg-black/[0.02] dark:bg-white/5 px-4 py-3 text-sm text-[#1d1d1f] dark:text-white outline-none focus:border-[#1d1d1f] dark:focus:border-white transition"
                  >
                    {currentBrands.map((b) => (
                      <option key={b} value={b} className="bg-white dark:bg-zinc-900 text-[#1d1d1f] dark:text-white">
                        {b}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-[#86868b] dark:text-zinc-400 mb-2">
                    Specific Model Name
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.model}
                    onChange={(e) =>
                      setFormData({ ...formData, model: e.target.value })
                    }
                    placeholder={
                      deviceCategory === "Laptop"
                        ? "e.g. MacBook Pro 16 M3 Max or Dell XPS 15"
                        : "e.g. iPhone 15 Pro Max or Galaxy S24 Ultra"
                    }
                    className="w-full rounded-2xl border border-black/10 dark:border-white/10 bg-black/[0.02] dark:bg-white/5 px-4 py-3 text-sm text-[#1d1d1f] dark:text-white placeholder-[#86868b] outline-none focus:border-[#1d1d1f] dark:focus:border-white transition"
                  />
                </div>
              </div>

              {/* Laptop Specific: RAM & Processor */}
              {deviceCategory === "Laptop" && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-[#86868b] dark:text-zinc-400 mb-2">
                      RAM Memory Preference
                    </label>
                    <select
                      value={formData.ram}
                      onChange={(e) =>
                        setFormData({ ...formData, ram: e.target.value })
                      }
                      className="w-full rounded-2xl border border-black/10 dark:border-white/10 bg-black/[0.02] dark:bg-white/5 px-4 py-3 text-sm text-[#1d1d1f] dark:text-white outline-none focus:border-[#1d1d1f] dark:focus:border-white transition"
                    >
                      {LAPTOP_RAM.map((r) => (
                        <option key={r} value={r} className="bg-white dark:bg-zinc-900 text-[#1d1d1f] dark:text-white">
                          {r}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-[#86868b] dark:text-zinc-400 mb-2">
                      Processor / Chip Preference
                    </label>
                    <input
                      type="text"
                      value={formData.processor}
                      onChange={(e) =>
                        setFormData({ ...formData, processor: e.target.value })
                      }
                      placeholder="e.g. Apple M3 Pro, Intel Core i7 13th Gen, RTX 4060"
                      className="w-full rounded-2xl border border-black/10 dark:border-white/10 bg-black/[0.02] dark:bg-white/5 px-4 py-3 text-sm text-[#1d1d1f] dark:text-white placeholder-[#86868b] outline-none focus:border-[#1d1d1f] dark:focus:border-white transition"
                    />
                  </div>
                </div>
              )}

              {/* Storage & Condition Preferences */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-[#86868b] dark:text-zinc-400 mb-2">
                    Storage Capacity
                  </label>
                  <select
                    value={formData.storage}
                    onChange={(e) =>
                      setFormData({ ...formData, storage: e.target.value })
                    }
                    className="w-full rounded-2xl border border-black/10 dark:border-white/10 bg-black/[0.02] dark:bg-white/5 px-4 py-3 text-sm text-[#1d1d1f] dark:text-white outline-none focus:border-[#1d1d1f] dark:focus:border-white transition"
                  >
                    {currentStorage.map((s) => (
                      <option key={s} value={s} className="bg-white dark:bg-zinc-900 text-[#1d1d1f] dark:text-white">
                        {s}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-[#86868b] dark:text-zinc-400 mb-2">
                    Condition Preference
                  </label>
                  <select
                    value={formData.condition}
                    onChange={(e) =>
                      setFormData({ ...formData, condition: e.target.value })
                    }
                    className="w-full rounded-2xl border border-black/10 dark:border-white/10 bg-black/[0.02] dark:bg-white/5 px-4 py-3 text-sm text-[#1d1d1f] dark:text-white outline-none focus:border-[#1d1d1f] dark:focus:border-white transition"
                  >
                    {CONDITION_OPTIONS.map((c) => (
                      <option key={c} value={c} className="bg-white dark:bg-zinc-900 text-[#1d1d1f] dark:text-white">
                        {c}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Budget Range (Optional) */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#86868b] dark:text-zinc-400 mb-2">
                  Target Budget / Price Range (Optional)
                </label>
                <input
                  type="text"
                  value={formData.budget}
                  onChange={(e) =>
                    setFormData({ ...formData, budget: e.target.value })
                  }
                  placeholder="e.g. ₦1,200,000 - ₦1,500,000"
                  className="w-full rounded-2xl border border-black/10 dark:border-white/10 bg-black/[0.02] dark:bg-white/5 px-4 py-3 text-sm text-[#1d1d1f] dark:text-white placeholder-[#86868b] outline-none focus:border-[#1d1d1f] dark:focus:border-white transition"
                />
              </div>

              {/* Additional Notes */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#86868b] dark:text-zinc-400 mb-2">
                  Colorway or Configuration Details
                </label>
                <textarea
                  rows={3}
                  value={formData.notes}
                  onChange={(e) =>
                    setFormData({ ...formData, notes: e.target.value })
                  }
                  placeholder="e.g. Space Black colorway preference, battery health above 90%, comes with original charger..."
                  className="w-full rounded-2xl border border-black/10 dark:border-white/10 bg-black/[0.02] dark:bg-white/5 px-4 py-3 text-sm text-[#1d1d1f] dark:text-white placeholder-[#86868b] outline-none focus:border-[#1d1d1f] dark:focus:border-white resize-none transition"
                />
              </div>

              {/* Submit CTA */}
              <div className="pt-2">
                <button
                  type="submit"
                  className="flex w-full items-center justify-center gap-3 rounded-full bg-[#1d1d1f] hover:bg-black dark:bg-white dark:hover:bg-[#f5f5f7] py-4 text-base font-semibold text-white dark:text-black shadow-xl shadow-black/10 transition"
                >
                  <MessageCircle className="h-5 w-5" />
                  <span>Send Custom {deviceCategory} Request to WhatsApp</span>
                </button>
                <p className="text-center text-xs text-[#86868b] mt-3">
                  This generates a pre-formatted message into your WhatsApp chat with our sourcing specialists.
                </p>
              </div>
            </form>
          </div>
        )}

        {/* Guarantees */}
        <div className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
          <div className="p-4">
            <ShieldCheck className="h-6 w-6 text-[#86868b] dark:text-[#f5f5f7] mx-auto mb-2" />
            <p className="text-sm font-semibold text-[#1d1d1f] dark:text-white">Genuine Sourcing</p>
            <p className="text-xs text-[#86868b] mt-1">
              Direct from verified suppliers with zero counterfeit risk.
            </p>
          </div>
          <div className="p-4">
            <Send className="h-6 w-6 text-[#86868b] dark:text-[#f5f5f7] mx-auto mb-2" />
            <p className="text-sm font-semibold text-[#1d1d1f] dark:text-white">Prompt Feedback</p>
            <p className="text-xs text-[#86868b] mt-1">
              Availability and quotes confirmed quickly.
            </p>
          </div>
          <div className="p-4">
            <Sparkles className="h-6 w-6 text-[#86868b] dark:text-[#f5f5f7] mx-auto mb-2" />
            <p className="text-sm font-semibold text-[#1d1d1f] dark:text-white">Fair Daily Pricing</p>
            <p className="text-xs text-[#86868b] mt-1">
              Reflects prevailing wholesale market rates.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
