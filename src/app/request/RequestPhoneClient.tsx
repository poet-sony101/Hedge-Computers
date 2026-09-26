"use client";

import { useState } from "react";
import {
  MessageCircle,
  CheckCircle2,
  ShieldCheck,
  Sparkles,
  Send,
  Smartphone,
  Laptop,
  Building2,
  Package,
  Layers,
  MapPin,
  Truck,
} from "lucide-react";
import { getCustomPhoneRequestUrl } from "@/utils/whatsapp";

const LAPTOP_BRANDS = [
  "HP (EliteBook / Spectre / ZBook / Envy)",
  "Dell (XPS / Latitude / Precision)",
  "Lenovo (ThinkPad / Legion / Yoga)",
  "Apple MacBook (Pro / Air)",
  "ASUS (ZenBook / ROG Zephyrus)",
  "Microsoft Surface (Pro / Laptop Studio)",
  "Other Laptop Brand",
];

const PHONE_BRANDS = [
  "Apple iPhone",
  "Samsung Galaxy",
  "Google Pixel",
  "Xiaomi / Redmi",
  "Tecno Mobile",
  "Other Device",
];

const GADGET_BRANDS = [
  "Apple Watch / iPad",
  "Samsung Galaxy Watch / Tab",
  "Anker Power Banks & Fast Chargers",
  "Oraimo Accessories",
  "Other Tech Gadget",
];

const LAPTOP_STORAGE = ["512GB SSD", "1TB SSD", "2TB SSD", "256GB SSD", "Custom RAID / 4TB+"];
const LAPTOP_RAM = ["16GB RAM", "32GB RAM", "64GB RAM", "8GB RAM", "18GB / 36GB / 48GB Unified"];
const PHONE_STORAGE = ["128GB", "256GB", "512GB", "1TB", "64GB / Other"];

const CONDITION_OPTIONS = [
  "USA Used (Grade A+ Clean & Tested)",
  "Brand New Sealed",
  "Either is Fine",
];

const BULK_TIERS = [
  "2 - 5 Units (Small Team)",
  "6 - 10 Units (Department Fleet)",
  "11 - 25 Units (Corporate Office)",
  "26 - 50 Units (Enterprise / School)",
  "50+ Units (Institutional Fleet)",
];

const DESTINATION_OPTIONS = [
  "Lagos (Store Walk-in at 12 Oshitelu St, Computer Village)",
  "Lagos (Same-Day Doorstep Dispatch)",
  "Abuja (FCT)",
  "Port Harcourt (Rivers)",
  "Ibadan (Oyo)",
  "Kano",
  "Enugu",
  "Other Nigerian State (Nationwide Waybill)",
];

export default function RequestPhoneClient() {
  const [orderType, setOrderType] = useState<"Single Unit" | "Bulk Supply (Wholesale)">("Single Unit");
  const [deviceCategory, setDeviceCategory] = useState<"Laptop" | "Smartphone" | "Gadget">("Laptop");

  const [formData, setFormData] = useState({
    customerName: "",
    organization: "",
    whatsappPhone: "",
    quantity: "1 Unit",
    customQuantity: "",
    destinationState: DESTINATION_OPTIONS[0],
    brand: "HP (EliteBook / Spectre / ZBook / Envy)",
    model: "",
    storage: "512GB SSD",
    ram: "16GB RAM",
    processor: "",
    condition: "USA Used (Grade A+ Clean & Tested)",
    budget: "",
    notes: "",
  });

  const [submitted, setSubmitted] = useState(false);

  const handleOrderTypeSwitch = (type: "Single Unit" | "Bulk Supply (Wholesale)") => {
    setOrderType(type);
    if (type === "Single Unit") {
      setFormData((prev) => ({ ...prev, quantity: "1 Unit" }));
    } else {
      setFormData((prev) => ({ ...prev, quantity: BULK_TIERS[0] }));
    }
  };

  const handleCategorySwitch = (category: "Laptop" | "Smartphone" | "Gadget") => {
    setDeviceCategory(category);
    if (category === "Laptop") {
      setFormData((prev) => ({
        ...prev,
        brand: "HP (EliteBook / Spectre / ZBook / Envy)",
        storage: "512GB SSD",
      }));
    } else if (category === "Smartphone") {
      setFormData((prev) => ({
        ...prev,
        brand: "Apple iPhone",
        storage: "256GB",
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        brand: "Apple Watch / iPad",
        storage: "Standard",
      }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const effectiveQty =
      orderType === "Single Unit"
        ? "1 Unit"
        : formData.customQuantity.trim() !== ""
        ? `${formData.customQuantity} Units`
        : formData.quantity;

    const whatsappUrl = getCustomPhoneRequestUrl({
      category: deviceCategory === "Laptop" ? "Laptop" : deviceCategory === "Smartphone" ? "Smartphone" : "Gadget",
      orderType: orderType,
      quantity: effectiveQty,
      organization: formData.organization || undefined,
      destinationState: formData.destinationState,
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

  const currentBrands =
    deviceCategory === "Laptop"
      ? LAPTOP_BRANDS
      : deviceCategory === "Smartphone"
      ? PHONE_BRANDS
      : GADGET_BRANDS;

  const currentStorage =
    deviceCategory === "Laptop"
      ? LAPTOP_STORAGE
      : deviceCategory === "Smartphone"
      ? PHONE_STORAGE
      : ["Standard / 64GB", "128GB", "256GB"];

  return (
    <div className="container-custom">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-red-500/10 px-4 py-1.5 text-xs font-bold text-red-600 dark:text-red-400 border border-red-500/20 backdrop-blur-md">
            <Sparkles className="h-3.5 w-3.5" />
            Wholesale &amp; Retail Procurement
          </span>
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-zinc-950 dark:text-white mt-3">
            Custom Machine &amp; Bulk Quote
          </h1>
          <p className="mt-2 text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 max-w-xl mx-auto leading-relaxed">
            Whether you need a single precision workstation for personal use, or a bulk supply of 10 to 50+ laptops for your company, school, or organization in Nigeria — we inspect, benchmark, and quote today&apos;s sharpest Computer Village rates.
          </p>
        </div>

        {submitted ? (
          <div className="rounded-3xl border border-emerald-500/30 bg-emerald-500/10 p-10 text-center backdrop-blur-xl">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 mb-4">
              <CheckCircle2 className="h-8 w-8" />
            </div>
            <h2 className="text-2xl font-black text-zinc-950 dark:text-white">
              Request Sent to WhatsApp!
            </h2>
            <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-300 max-w-md mx-auto">
              Your {orderType === "Bulk Supply (Wholesale)" ? "bulk quote" : "single unit"} request for{" "}
              <strong className="text-zinc-900 dark:text-white">
                {formData.brand} {formData.model}
              </strong>{" "}
              has been prepared. A Hedge Computers specialist will respond in your chat with live availability and pricing.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
              <button
                onClick={() => setSubmitted(false)}
                className="hedge-btn-secondary text-xs"
              >
                Submit Another Request
              </button>
            </div>
          </div>
        ) : (
          <div className="hedge-card p-6 sm:p-10 shadow-2xl border-red-500/20">
            {/* Step 1: Order Mode Toggle (Units vs Bulk) */}
            <div className="mb-8 p-1.5 rounded-2xl bg-zinc-100 dark:bg-[#181820] border border-black/5 dark:border-white/5">
              <label className="block text-[11px] font-bold uppercase tracking-wider text-center text-zinc-500 dark:text-zinc-400 mb-2 pt-1">
                Choose Procurement Mode
              </label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => handleOrderTypeSwitch("Single Unit")}
                  className={`flex flex-col items-center justify-center py-3 px-4 rounded-xl text-xs font-bold transition-all ${
                    orderType === "Single Unit"
                      ? "bg-white dark:bg-zinc-900 text-zinc-950 dark:text-white shadow-md border border-black/10 dark:border-white/10"
                      : "text-zinc-500 dark:text-zinc-400 hover:text-zinc-950 dark:hover:text-white"
                  }`}
                >
                  <span className="flex items-center gap-1.5 text-sm font-black">
                    <Package className="h-4 w-4 text-red-600" />
                    Single Unit
                  </span>
                  <span className="text-[10px] font-normal opacity-80 mt-0.5">
                    Retail / Personal Machine
                  </span>
                </button>

                <button
                  type="button"
                  onClick={() => handleOrderTypeSwitch("Bulk Supply (Wholesale)")}
                  className={`flex flex-col items-center justify-center py-3 px-4 rounded-xl text-xs font-bold transition-all ${
                    orderType === "Bulk Supply (Wholesale)"
                      ? "bg-red-600 text-white shadow-lg shadow-red-600/30"
                      : "text-zinc-500 dark:text-zinc-400 hover:text-zinc-950 dark:hover:text-white"
                  }`}
                >
                  <span className="flex items-center gap-1.5 text-sm font-black">
                    <Building2 className="h-4 w-4" />
                    Bulk Supply
                  </span>
                  <span className="text-[10px] font-normal opacity-90 mt-0.5">
                    Wholesale, Corporate &amp; Schools (2 - 50+ Units)
                  </span>
                </button>
              </div>

              {orderType === "Bulk Supply (Wholesale)" && (
                <div className="mt-3 p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-[11px] text-red-700 dark:text-red-400 flex items-center justify-between">
                  <span className="font-semibold">
                    ✓ Wholesale Tiered Pricing • Matching Specs • Custom OS Pre-Installed • Invoice Provided
                  </span>
                </div>
              )}
            </div>

            {/* Category Selector Buttons */}
            <div className="mb-8">
              <label className="block text-xs font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 mb-3 text-center">
                Device Category
              </label>
              <div className="grid grid-cols-3 gap-2.5 max-w-lg mx-auto">
                <button
                  type="button"
                  onClick={() => handleCategorySwitch("Laptop")}
                  className={`flex items-center justify-center gap-1.5 rounded-xl p-3 text-xs font-bold transition-all ${
                    deviceCategory === "Laptop"
                      ? "bg-red-600 text-white shadow-md shadow-red-600/20"
                      : "border border-black/10 dark:border-white/10 bg-black/5 dark:bg-white/5 text-zinc-600 dark:text-zinc-400 hover:text-zinc-950 dark:hover:text-white"
                  }`}
                >
                  <Laptop className="h-4 w-4" />
                  <span>Laptops</span>
                </button>

                <button
                  type="button"
                  onClick={() => handleCategorySwitch("Smartphone")}
                  className={`flex items-center justify-center gap-1.5 rounded-xl p-3 text-xs font-bold transition-all ${
                    deviceCategory === "Smartphone"
                      ? "bg-red-600 text-white shadow-md shadow-red-600/20"
                      : "border border-black/10 dark:border-white/10 bg-black/5 dark:bg-white/5 text-zinc-600 dark:text-zinc-400 hover:text-zinc-950 dark:hover:text-white"
                  }`}
                >
                  <Smartphone className="h-4 w-4" />
                  <span>Phones</span>
                </button>

                <button
                  type="button"
                  onClick={() => handleCategorySwitch("Gadget")}
                  className={`flex items-center justify-center gap-1.5 rounded-xl p-3 text-xs font-bold transition-all ${
                    deviceCategory === "Gadget"
                      ? "bg-red-600 text-white shadow-md shadow-red-600/20"
                      : "border border-black/10 dark:border-white/10 bg-black/5 dark:bg-white/5 text-zinc-600 dark:text-zinc-400 hover:text-zinc-950 dark:hover:text-white"
                  }`}
                >
                  <Layers className="h-4 w-4" />
                  <span>Gadgets</span>
                </button>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* If Bulk: Quantity Selector & Company Info */}
              {orderType === "Bulk Supply (Wholesale)" && (
                <div className="space-y-4 p-5 rounded-2xl border border-red-500/20 bg-red-500/[0.03] dark:bg-red-500/[0.05]">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-red-600 dark:text-red-400 mb-2">
                      Quantity Needed (Bulk Tiers)
                    </label>
                    <div className="flex flex-wrap gap-2 mb-3">
                      {BULK_TIERS.map((tier) => (
                        <button
                          key={tier}
                          type="button"
                          onClick={() => {
                            setFormData((prev) => ({ ...prev, quantity: tier, customQuantity: "" }));
                          }}
                          className={`text-xs px-3 py-1.5 rounded-lg font-semibold transition-all ${
                            formData.quantity === tier && formData.customQuantity === ""
                              ? "bg-red-600 text-white shadow-sm"
                              : "border border-black/10 dark:border-white/10 bg-white dark:bg-zinc-900 text-zinc-700 dark:text-zinc-300"
                          }`}
                        >
                          {tier}
                        </button>
                      ))}
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-zinc-500 dark:text-zinc-400 font-medium">Or enter exact number:</span>
                      <input
                        type="number"
                        min="2"
                        value={formData.customQuantity}
                        onChange={(e) =>
                          setFormData({ ...formData, customQuantity: e.target.value })
                        }
                        placeholder="e.g. 15"
                        className="w-28 rounded-xl border border-black/10 dark:border-white/10 bg-white dark:bg-zinc-900 px-3 py-1.5 text-xs text-zinc-900 dark:text-white outline-none focus:border-red-600"
                      />
                      <span className="text-xs text-zinc-500">Units</span>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 mb-1">
                      Company / Organization Name (Optional)
                    </label>
                    <input
                      type="text"
                      value={formData.organization}
                      onChange={(e) =>
                        setFormData({ ...formData, organization: e.target.value })
                      }
                      placeholder="e.g. Nexus Tech Ltd, Greenfield College, Zenith Studios"
                      className="w-full rounded-xl border border-black/10 dark:border-white/10 bg-white dark:bg-zinc-900 px-4 py-2.5 text-xs text-zinc-900 dark:text-white placeholder-zinc-400 outline-none focus:border-red-600"
                    />
                  </div>
                </div>
              )}

              {/* Customer Contact Details */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 mb-2">
                    Your Name / Contact Person
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.customerName}
                    onChange={(e) =>
                      setFormData({ ...formData, customerName: e.target.value })
                    }
                    placeholder="e.g. Samuel Adewale"
                    className="w-full rounded-2xl border border-black/10 dark:border-white/10 bg-black/[0.02] dark:bg-white/5 px-4 py-3 text-xs text-zinc-900 dark:text-white placeholder-zinc-400 outline-none focus:border-red-600 dark:focus:border-red-500 transition"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 mb-2">
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
                    className="w-full rounded-2xl border border-black/10 dark:border-white/10 bg-black/[0.02] dark:bg-white/5 px-4 py-3 text-xs text-zinc-900 dark:text-white placeholder-zinc-400 outline-none focus:border-red-600 dark:focus:border-red-500 transition"
                  />
                </div>
              </div>

              {/* Brand & Model Selection */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 mb-2">
                    Brand Ecosystem
                  </label>
                  <select
                    value={formData.brand}
                    onChange={(e) =>
                      setFormData({ ...formData, brand: e.target.value })
                    }
                    className="w-full rounded-2xl border border-black/10 dark:border-white/10 bg-zinc-50 dark:bg-[#181820] px-4 py-3 text-xs text-zinc-900 dark:text-white outline-none focus:border-red-600 dark:focus:border-red-500 transition font-medium"
                  >
                    {currentBrands.map((b) => (
                      <option key={b} value={b} className="bg-white dark:bg-zinc-900 text-zinc-900 dark:text-white">
                        {b}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 mb-2">
                    Specific Model Name or Series
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
                        ? "e.g. HP EliteBook 1040 G10 x360, Dell XPS 15, ThinkPad X1"
                        : "e.g. iPhone 15 Pro Max, Galaxy S24 Ultra"
                    }
                    className="w-full rounded-2xl border border-black/10 dark:border-white/10 bg-black/[0.02] dark:bg-white/5 px-4 py-3 text-xs text-zinc-900 dark:text-white placeholder-zinc-400 outline-none focus:border-red-600 dark:focus:border-red-500 transition"
                  />
                </div>
              </div>

              {/* Laptop Specific: RAM & Processor */}
              {deviceCategory === "Laptop" && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 mb-2">
                      RAM Memory Preference
                    </label>
                    <select
                      value={formData.ram}
                      onChange={(e) =>
                        setFormData({ ...formData, ram: e.target.value })
                      }
                      className="w-full rounded-2xl border border-black/10 dark:border-white/10 bg-zinc-50 dark:bg-[#181820] px-4 py-3 text-xs text-zinc-900 dark:text-white outline-none focus:border-red-600 dark:focus:border-red-500 transition font-medium"
                    >
                      {LAPTOP_RAM.map((r) => (
                        <option key={r} value={r} className="bg-white dark:bg-zinc-900 text-zinc-900 dark:text-white">
                          {r}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 mb-2">
                      Processor / GPU Preference
                    </label>
                    <input
                      type="text"
                      value={formData.processor}
                      onChange={(e) =>
                        setFormData({ ...formData, processor: e.target.value })
                      }
                      placeholder="e.g. Intel Core i7 13th Gen, Apple M3 Pro, RTX 4060"
                      className="w-full rounded-2xl border border-black/10 dark:border-white/10 bg-black/[0.02] dark:bg-white/5 px-4 py-3 text-xs text-zinc-900 dark:text-white placeholder-zinc-400 outline-none focus:border-red-600 dark:focus:border-red-500 transition"
                    />
                  </div>
                </div>
              )}

              {/* Storage & Condition Preferences */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 mb-2">
                    Storage Capacity
                  </label>
                  <select
                    value={formData.storage}
                    onChange={(e) =>
                      setFormData({ ...formData, storage: e.target.value })
                    }
                    className="w-full rounded-2xl border border-black/10 dark:border-white/10 bg-zinc-50 dark:bg-[#181820] px-4 py-3 text-xs text-zinc-900 dark:text-white outline-none focus:border-red-600 dark:focus:border-red-500 transition font-medium"
                  >
                    {currentStorage.map((s) => (
                      <option key={s} value={s} className="bg-white dark:bg-zinc-900 text-zinc-900 dark:text-white">
                        {s}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 mb-2">
                    Condition Preference
                  </label>
                  <select
                    value={formData.condition}
                    onChange={(e) =>
                      setFormData({ ...formData, condition: e.target.value })
                    }
                    className="w-full rounded-2xl border border-black/10 dark:border-white/10 bg-zinc-50 dark:bg-[#181820] px-4 py-3 text-xs text-zinc-900 dark:text-white outline-none focus:border-red-600 dark:focus:border-red-500 transition font-medium"
                  >
                    {CONDITION_OPTIONS.map((c) => (
                      <option key={c} value={c} className="bg-white dark:bg-zinc-900 text-zinc-900 dark:text-white">
                        {c}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Destination & Budget */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 mb-2">
                    Delivery Destination / Pickup
                  </label>
                  <select
                    value={formData.destinationState}
                    onChange={(e) =>
                      setFormData({ ...formData, destinationState: e.target.value })
                    }
                    className="w-full rounded-2xl border border-black/10 dark:border-white/10 bg-zinc-50 dark:bg-[#181820] px-4 py-3 text-xs text-zinc-900 dark:text-white outline-none focus:border-red-600 dark:focus:border-red-500 transition font-medium"
                  >
                    {DESTINATION_OPTIONS.map((d) => (
                      <option key={d} value={d} className="bg-white dark:bg-zinc-900 text-zinc-900 dark:text-white">
                        {d}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 mb-2">
                    Target Budget / Price Range (Optional)
                  </label>
                  <input
                    type="text"
                    value={formData.budget}
                    onChange={(e) =>
                      setFormData({ ...formData, budget: e.target.value })
                    }
                    placeholder="e.g. ₦850,000 / unit or ₦10M fleet budget"
                    className="w-full rounded-2xl border border-black/10 dark:border-white/10 bg-black/[0.02] dark:bg-white/5 px-4 py-3 text-xs text-zinc-900 dark:text-white placeholder-zinc-400 outline-none focus:border-red-600 dark:focus:border-red-500 transition"
                  />
                </div>
              </div>

              {/* Additional Notes */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 mb-2">
                  Special Notes or Specific Requests
                </label>
                <textarea
                  rows={3}
                  value={formData.notes}
                  onChange={(e) =>
                    setFormData({ ...formData, notes: e.target.value })
                  }
                  placeholder="e.g. Need touchscreen model, backlit keyboard, original 65W Type-C charger included, or custom company OS image..."
                  className="w-full rounded-2xl border border-black/10 dark:border-white/10 bg-black/[0.02] dark:bg-white/5 p-4 text-xs text-zinc-900 dark:text-white placeholder-zinc-400 outline-none focus:border-red-600 dark:focus:border-red-500 transition"
                />
              </div>

              {/* Submit CTA */}
              <div className="pt-2">
                <button
                  type="submit"
                  className="hedge-btn-crimson w-full py-4 text-xs font-black shadow-xl shadow-red-600/25 flex items-center justify-center gap-2"
                >
                  <MessageCircle className="h-4 w-4" />
                  <span>
                    {orderType === "Bulk Supply (Wholesale)"
                      ? "Request Bulk Wholesale Quote on WhatsApp"
                      : "Send Custom Unit Request to WhatsApp"}
                  </span>
                </button>
                <p className="text-center text-[11px] text-zinc-500 dark:text-zinc-400 mt-2.5">
                  Direct connection with Hedge Computers sales desk at 12 Oshitelu Street, Computer Village.
                </p>
              </div>
            </form>
          </div>
        )}

        {/* Value Proposition Pills */}
        <div className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
          <div className="p-4 rounded-2xl border border-black/5 dark:border-white/5 bg-white/60 dark:bg-white/[0.02]">
            <ShieldCheck className="h-5 w-5 text-red-600 mx-auto mb-2" />
            <h4 className="text-xs font-bold text-zinc-900 dark:text-white">25-Point Test Guaranteed</h4>
            <p className="text-[11px] text-zinc-500 mt-0.5">Motherboard, thermal load, and ports verified</p>
          </div>
          <div className="p-4 rounded-2xl border border-black/5 dark:border-white/5 bg-white/60 dark:bg-white/[0.02]">
            <Building2 className="h-5 w-5 text-red-600 mx-auto mb-2" />
            <h4 className="text-xs font-bold text-zinc-900 dark:text-white">Wholesale Invoicing</h4>
            <p className="text-[11px] text-zinc-500 mt-0.5">Fleet discounts for businesses and institutions</p>
          </div>
          <div className="p-4 rounded-2xl border border-black/5 dark:border-white/5 bg-white/60 dark:bg-white/[0.02]">
            <Truck className="h-5 w-5 text-red-600 mx-auto mb-2" />
            <h4 className="text-xs font-bold text-zinc-900 dark:text-white">Nationwide Delivery</h4>
            <p className="text-[11px] text-zinc-500 mt-0.5">Lagos same-day dispatch or secure state waybill</p>
          </div>
        </div>
      </div>
    </div>
  );
}
