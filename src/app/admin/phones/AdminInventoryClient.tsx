"use client";

import { useState, useMemo, useEffect, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import {
  Search,
  PlusCircle,
  Edit2,
  Trash2,
  CheckCircle2,
  XCircle,
  Star,
  DollarSign,
  AlertTriangle,
  X,
  ExternalLink,
  RefreshCw,
} from "lucide-react";
import { Phone } from "@/types/phone";

interface AdminInventoryClientProps {
  initialPhones: Phone[];
}

export default function AdminInventoryClient({
  initialPhones,
}: AdminInventoryClientProps) {
  const searchParams = useSearchParams();
  const [phones, setPhones] = useState<Phone[]>(initialPhones);
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All"); // All, phone, laptop, gadget, accessory
  const [brandFilter, setBrandFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All"); // All, InStock, OutOfStock
  const [updatingId, setUpdatingId] = useState<number | null>(null);
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Store prevInitialPhones to synchronize state during render (official React pattern)
  const [prevInitialPhones, setPrevInitialPhones] = useState(initialPhones);
  if (initialPhones !== prevInitialPhones) {
    setPrevInitialPhones(initialPhones);
    setPhones(initialPhones);
  }

  // Derive notifications from searchParams without setState in effect
  const addedParam = searchParams.get("added");
  const updatedParam = searchParams.get("updated");
  const [dismissedKey, setDismissedKey] = useState<string | null>(null);

  const activeNotificationKey = addedParam
    ? `added-${addedParam}`
    : updatedParam
    ? `updated-${updatedParam}`
    : null;

  const notification = useMemo(() => {
    if (!activeNotificationKey || dismissedKey === activeNotificationKey) {
      return null;
    }
    if (addedParam) {
      return {
        message: `Success! "${addedParam}" was created and published live in the store catalog.`,
        type: "success" as const,
      };
    }
    if (updatedParam) {
      return {
        message: `Success! "${updatedParam}" details were saved and updated live.`,
        type: "success" as const,
      };
    }
    return null;
  }, [activeNotificationKey, dismissedKey, addedParam, updatedParam]);

  // Client-side live data refresh for manual button click
  const fetchLivePhones = useCallback(async () => {
    setIsRefreshing(true);
    try {
      const res = await fetch("/api/admin/phones", { cache: "no-store" });
      if (res.ok) {
        const data = await res.json();
        if (Array.isArray(data.phones)) {
          setPhones(data.phones);
        }
      }
    } catch (e) {
      console.error("Failed to fetch fresh phones:", e);
    } finally {
      setIsRefreshing(false);
    }
  }, []);

  // Automatically fetch fresh data asynchronously on mount
  useEffect(() => {
    let ignore = false;
    async function loadData() {
      try {
        const res = await fetch("/api/admin/phones", { cache: "no-store" });
        if (res.ok && !ignore) {
          const data = await res.json();
          if (Array.isArray(data.phones)) {
            setPhones(data.phones);
          }
        }
      } catch (e) {
        console.error("Failed to load inventory:", e);
      }
    }
    loadData();
    return () => {
      ignore = true;
    };
  }, []);

  // Clean up URL query parameters after banner is displayed
  useEffect(() => {
    if (addedParam || updatedParam) {
      const timer = setTimeout(() => {
        window.history.replaceState({}, "", "/admin/phones");
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [addedParam, updatedParam]);

  // Quick Price Edit Modal State
  const [editingPricePhone, setEditingPricePhone] = useState<Phone | null>(null);
  const [newPriceNote, setNewPriceNote] = useState("");
  const [priceSaveLoading, setPriceSaveLoading] = useState(false);

  // Delete Modal State
  const [deletingPhone, setDeletingPhone] = useState<Phone | null>(null);
  const [deleteLoading, setDeleteLoading] = useState(false);

  // Dynamic brand list
  const availableBrands = useMemo(() => {
    const brandSet = new Set<string>(["Apple", "Samsung", "Google", "Dell", "HP", "Lenovo", "Anker"]);
    phones.forEach((p) => {
      if (p.brand) brandSet.add(p.brand);
    });
    return Array.from(brandSet).sort();
  }, [phones]);

  // Filter devices
  const filteredPhones = useMemo(() => {
    return phones.filter((phone) => {
      const matchesCategory =
        categoryFilter === "All" ||
        (phone.category || "phone") === categoryFilter;

      const matchesBrand =
        brandFilter === "All" ||
        phone.brand.toLowerCase() === brandFilter.toLowerCase();

      const matchesStatus =
        statusFilter === "All" ||
        (statusFilter === "InStock" && phone.inStock) ||
        (statusFilter === "OutOfStock" && !phone.inStock);

      const matchesSearch =
        search.trim() === "" ||
        phone.name.toLowerCase().includes(search.toLowerCase()) ||
        phone.brand.toLowerCase().includes(search.toLowerCase()) ||
        phone.storage.toLowerCase().includes(search.toLowerCase());

      return matchesCategory && matchesBrand && matchesStatus && matchesSearch;
    });
  }, [phones, search, categoryFilter, brandFilter, statusFilter]);

  // Toggle In Stock
  const handleToggleStock = async (phone: Phone) => {
    setUpdatingId(phone.id);
    const newStatus = !phone.inStock;

    try {
      const res = await fetch(`/api/admin/phones/${phone.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ inStock: newStatus }),
      });

      if (res.ok) {
        setPhones((prev) =>
          prev.map((p) => (p.id === phone.id ? { ...p, inStock: newStatus } : p))
        );
      }
    } catch (err) {
      console.error("Failed to toggle stock", err);
    } finally {
      setUpdatingId(null);
    }
  };

  // Toggle Featured
  const handleToggleFeatured = async (phone: Phone) => {
    setUpdatingId(phone.id);
    const newFeatured = !phone.featured;

    try {
      const res = await fetch(`/api/admin/phones/${phone.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ featured: newFeatured }),
      });

      if (res.ok) {
        setPhones((prev) =>
          prev.map((p) =>
            p.id === phone.id ? { ...p, featured: newFeatured } : p
          )
        );
      }
    } catch (err) {
      console.error("Failed to toggle featured", err);
    } finally {
      setUpdatingId(null);
    }
  };

  // Quick Price Save
  const handleSavePrice = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingPricePhone) return;

    setPriceSaveLoading(true);
    try {
      const res = await fetch(`/api/admin/phones/${editingPricePhone.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ priceNote: newPriceNote }),
      });

      if (res.ok) {
        setPhones((prev) =>
          prev.map((p) =>
            p.id === editingPricePhone.id ? { ...p, priceNote: newPriceNote } : p
          )
        );
        setEditingPricePhone(null);
      }
    } catch (err) {
      console.error("Failed to update price note", err);
    } finally {
      setPriceSaveLoading(false);
    }
  };

  // Delete Phone
  const handleConfirmDelete = async () => {
    if (!deletingPhone) return;

    setDeleteLoading(true);
    try {
      const res = await fetch(`/api/admin/phones/${deletingPhone.id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        setPhones((prev) => prev.filter((p) => p.id !== deletingPhone.id));
        setDeletingPhone(null);
      }
    } catch (err) {
      console.error("Failed to delete device", err);
    } finally {
      setDeleteLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Dynamic Action Notification Banner */}
      {notification && (
        <div className="flex items-center justify-between gap-3 rounded-2xl border border-emerald-500/30 bg-emerald-500/10 p-4 text-xs font-semibold text-emerald-800 dark:text-emerald-300 shadow-sm transition">
          <div className="flex items-center gap-2.5">
            <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-600 dark:text-emerald-400" />
            <span>{notification.message}</span>
          </div>
          <button
            onClick={() => setDismissedKey(activeNotificationKey)}
            className="text-emerald-700 dark:text-emerald-400 hover:text-emerald-950 dark:hover:text-white p-1 rounded-full transition"
            title="Dismiss notification"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-semibold uppercase tracking-wider text-[#86868b]">
            Catalog Management
          </span>
          <h1 className="text-3xl font-extrabold tracking-tight text-[#1d1d1f] dark:text-white mt-1">
            Device Inventory
          </h1>
          <p className="text-xs text-[#86868b] mt-1">
            Live database of smartphones, laptops, smartwatches, audio, and accessories. Toggle availability or click to adjust daily pricing notes.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={fetchLivePhones}
            disabled={isRefreshing}
            className="apple-button-secondary text-xs inline-flex items-center gap-2"
            title="Refresh inventory list"
          >
            <RefreshCw className={`h-3.5 w-3.5 ${isRefreshing ? "animate-spin" : ""}`} />
            <span>{isRefreshing ? "Refreshing..." : "Refresh"}</span>
          </button>

          <Link
            href="/admin/phones/new"
            className="inline-flex items-center gap-2 rounded-full bg-[#1d1d1f] hover:bg-black dark:bg-white dark:hover:bg-[#f5f5f7] px-5 py-2.5 text-xs font-semibold text-white dark:text-black shadow-lg shadow-black/10 transition"
          >
            <PlusCircle className="h-4 w-4" />
            <span>Add Device</span>
          </Link>
        </div>
      </div>

      {/* Search & Filters */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 apple-card p-5 shadow-sm">
        <div className="relative w-full md:w-96">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-[#86868b]" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Filter by name or model..."
            className="w-full rounded-full border border-black/10 dark:border-white/10 bg-black/[0.02] dark:bg-white/5 py-2 pl-10 pr-4 text-xs text-[#1d1d1f] dark:text-white placeholder-[#86868b] outline-none focus:border-[#1d1d1f] dark:focus:border-white transition"
          />
        </div>

        <div className="flex flex-wrap items-center gap-2.5 w-full md:w-auto">
          {/* Category Filter */}
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="rounded-full border border-black/10 dark:border-white/10 bg-black/[0.02] dark:bg-white/5 px-3.5 py-2 text-xs text-[#1d1d1f] dark:text-white outline-none focus:border-[#1d1d1f] dark:focus:border-white transition"
          >
            <option value="All" className="bg-white dark:bg-zinc-900">Type: All Devices</option>
            <option value="phone" className="bg-white dark:bg-zinc-900">Type: Smartphones</option>
            <option value="laptop" className="bg-white dark:bg-zinc-900">Type: Laptops</option>
            <option value="gadget" className="bg-white dark:bg-zinc-900">Type: Gadgets & Audio</option>
            <option value="accessory" className="bg-white dark:bg-zinc-900">Type: Power & Accessories</option>
          </select>

          {/* Brand Filter */}
          <select
            value={brandFilter}
            onChange={(e) => setBrandFilter(e.target.value)}
            className="rounded-full border border-black/10 dark:border-white/10 bg-black/[0.02] dark:bg-white/5 px-3.5 py-2 text-xs text-[#1d1d1f] dark:text-white outline-none focus:border-[#1d1d1f] dark:focus:border-white transition"
          >
            <option value="All" className="bg-white dark:bg-zinc-900">Brand: All</option>
            {availableBrands.map((b) => (
              <option key={b} value={b} className="bg-white dark:bg-zinc-900">
                Brand: {b}
              </option>
            ))}
          </select>

          {/* Status Filter */}
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="rounded-full border border-black/10 dark:border-white/10 bg-black/[0.02] dark:bg-white/5 px-3.5 py-2 text-xs text-[#1d1d1f] dark:text-white outline-none focus:border-[#1d1d1f] dark:focus:border-white transition"
          >
            <option value="All" className="bg-white dark:bg-zinc-900">Status: All</option>
            <option value="InStock" className="bg-white dark:bg-zinc-900">Status: In Stock</option>
            <option value="OutOfStock" className="bg-white dark:bg-zinc-900">Status: Out of Stock</option>
          </select>
        </div>
      </div>

      {/* Inventory Table */}
      <div className="overflow-hidden apple-card shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="border-b border-black/5 dark:border-white/10 text-[11px] uppercase tracking-wider text-[#86868b] bg-black/[0.01] dark:bg-white/[0.02]">
              <tr>
                <th className="py-3 px-4 font-semibold">Device</th>
                <th className="py-3 px-4 font-semibold">Category</th>
                <th className="py-3 px-4 font-semibold">Brand</th>
                <th className="py-3 px-4 font-semibold">Condition</th>
                <th className="py-3 px-4 font-semibold">Base Storage</th>
                <th className="py-3 px-4 font-semibold">Pricing Note</th>
                <th className="py-3 px-4 font-semibold text-center">In Stock</th>
                <th className="py-3 px-4 font-semibold text-center">Featured</th>
                <th className="py-3 px-4 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-black/5 dark:divide-white/5">
              {filteredPhones.map((phone) => (
                <tr
                  key={phone.id}
                  className="hover:bg-black/[0.02] dark:hover:bg-white/[0.02] transition"
                >
                  {/* Name + Thumbnail */}
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-3">
                      <div className="relative h-10 w-10 shrink-0 rounded-xl border border-black/10 dark:border-white/10 bg-black/[0.02] dark:bg-white/5 p-1 flex items-center justify-center overflow-hidden">
                        <Image
                          src={phone.image}
                          alt={phone.name}
                          width={36}
                          height={36}
                          className="max-h-8 w-auto object-contain"
                          unoptimized={
                            phone.image.startsWith("http") ||
                            phone.image.startsWith("data:") ||
                            phone.image.endsWith(".svg")
                          }
                        />
                      </div>
                      <div className="min-w-0">
                        <p className="font-semibold text-[#1d1d1f] dark:text-white truncate max-w-[180px]">
                          {phone.name}
                        </p>
                        <p className="text-[10px] text-[#86868b] font-mono truncate">
                          /{phone.slug}
                        </p>
                      </div>
                    </div>
                  </td>

                  {/* Category */}
                  <td className="py-3 px-4">
                    <span className="rounded-full bg-black/5 dark:bg-white/10 px-2.5 py-0.5 text-[10px] font-semibold text-[#1d1d1f] dark:text-[#f5f5f7] capitalize">
                      {phone.category || "phone"}
                    </span>
                  </td>

                  {/* Brand */}
                  <td className="py-3 px-4 font-medium text-[#1d1d1f] dark:text-white">
                    {phone.brand}
                  </td>

                  {/* Condition */}
                  <td className="py-3 px-4">
                    <span
                      className={`rounded-full px-2.5 py-0.5 text-[10px] font-semibold ${
                        phone.condition === "Brand New"
                          ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
                          : "bg-black/5 dark:bg-white/10 text-[#1d1d1f] dark:text-white"
                      }`}
                    >
                      {phone.condition}
                    </span>
                  </td>

                  {/* Storage */}
                  <td className="py-3 px-4 text-[#86868b]">{phone.storage}</td>

                  {/* Pricing Note */}
                  <td className="py-3 px-4 max-w-[200px]">
                    <button
                      onClick={() => {
                        setEditingPricePhone(phone);
                        setNewPriceNote(phone.priceNote || "");
                      }}
                      className="group flex items-center gap-1.5 text-left text-[11px] text-[#86868b] hover:text-[#1d1d1f] dark:hover:text-white transition truncate w-full"
                      title="Click to quickly edit daily price note"
                    >
                      <DollarSign className="h-3 w-3 shrink-0 text-[#86868b] group-hover:text-[#1d1d1f] dark:group-hover:text-white" />
                      <span className="truncate">{phone.priceNote || "Daily rate on request"}</span>
                      <Edit2 className="h-2.5 w-2.5 shrink-0 opacity-0 group-hover:opacity-100" />
                    </button>
                  </td>

                  {/* In Stock Toggle */}
                  <td className="py-3 px-4 text-center">
                    <button
                      onClick={() => handleToggleStock(phone)}
                      disabled={updatingId === phone.id}
                      className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-[10px] font-bold transition ${
                        phone.inStock
                          ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 hover:bg-emerald-500/20"
                          : "bg-rose-500/10 text-rose-600 dark:text-rose-400 hover:bg-rose-500/20"
                      }`}
                      title="Click to toggle availability"
                    >
                      {phone.inStock ? (
                        <>
                          <CheckCircle2 className="h-3 w-3" />
                          <span>In Stock</span>
                        </>
                      ) : (
                        <>
                          <XCircle className="h-3 w-3" />
                          <span>Out</span>
                        </>
                      )}
                    </button>
                  </td>

                  {/* Featured Toggle */}
                  <td className="py-3 px-4 text-center">
                    <button
                      onClick={() => handleToggleFeatured(phone)}
                      disabled={updatingId === phone.id}
                      className={`p-1.5 rounded-full transition ${
                        phone.featured
                          ? "text-amber-500 bg-amber-500/10 hover:bg-amber-500/20"
                          : "text-[#86868b] hover:text-[#1d1d1f] dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/5"
                      }`}
                      title={phone.featured ? "Featured on homepage" : "Not featured"}
                    >
                      <Star
                        className={`h-4 w-4 ${
                          phone.featured ? "fill-amber-500" : ""
                        }`}
                      />
                    </button>
                  </td>

                  {/* Actions */}
                  <td className="py-3 px-4 text-right">
                    <div className="flex items-center justify-end gap-1.5">
                      <Link
                        href={`/phones/${phone.slug}`}
                        target="_blank"
                        className="p-1.5 rounded-full text-[#86868b] hover:text-[#1d1d1f] dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/5 transition"
                        title="Preview Public Page"
                      >
                        <ExternalLink className="h-3.5 w-3.5" />
                      </Link>

                      <Link
                        href={`/admin/phones/${phone.id}/edit`}
                        className="p-1.5 rounded-full text-[#86868b] hover:text-[#1d1d1f] dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/5 transition"
                        title="Full Edit"
                      >
                        <Edit2 className="h-3.5 w-3.5" />
                      </Link>

                      <button
                        onClick={() => setDeletingPhone(phone)}
                        className="p-1.5 rounded-full text-rose-500 hover:bg-rose-500/10 transition"
                        title="Delete Device"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredPhones.length === 0 && (
          <div className="py-16 text-center text-[#86868b]">
            <p className="text-sm">No devices matched your filter criteria.</p>
            <button
              onClick={() => {
                setSearch("");
                setCategoryFilter("All");
                setBrandFilter("All");
                setStatusFilter("All");
              }}
              className="mt-3 text-xs font-semibold text-[#1d1d1f] dark:text-white hover:underline"
            >
              Reset Filters
            </button>
          </div>
        )}
      </div>

      {/* Quick Price Edit Modal */}
      {editingPricePhone && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="w-full max-w-md apple-card p-6 shadow-2xl">
            <div className="flex items-center justify-between pb-3 border-b border-black/5 dark:border-white/10">
              <h3 className="text-sm font-bold text-[#1d1d1f] dark:text-white">
                Edit Daily Price Note
              </h3>
              <button
                onClick={() => setEditingPricePhone(null)}
                className="text-[#86868b] hover:text-[#1d1d1f] dark:hover:text-white"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <form onSubmit={handleSavePrice} className="mt-4 space-y-4">
              <div>
                <p className="text-xs font-semibold text-[#1d1d1f] dark:text-white">
                  {editingPricePhone.name}
                </p>
                <p className="text-[11px] text-[#86868b]">
                  {editingPricePhone.storage} • {editingPricePhone.condition}
                </p>
              </div>

              <div>
                <label className="block text-xs font-medium text-[#86868b] mb-1.5">
                  Today&apos;s Price Note
                </label>
                <input
                  type="text"
                  required
                  autoFocus
                  value={newPriceNote}
                  onChange={(e) => setNewPriceNote(e.target.value)}
                  placeholder="e.g. ₦1,450,000 promo today or Price on WhatsApp"
                  className="w-full rounded-xl border border-black/10 dark:border-white/10 bg-black/[0.02] dark:bg-white/5 px-3.5 py-2.5 text-xs text-[#1d1d1f] dark:text-white outline-none focus:border-[#1d1d1f] dark:focus:border-white transition"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setEditingPricePhone(null)}
                  className="apple-button-secondary text-xs"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={priceSaveLoading}
                  className="apple-button-primary text-xs"
                >
                  {priceSaveLoading ? "Saving..." : "Save Daily Price"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deletingPhone && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="w-full max-w-md apple-card p-6 shadow-2xl">
            <div className="flex items-center gap-3 text-rose-600 dark:text-rose-400 mb-3">
              <div className="h-10 w-10 rounded-full bg-rose-500/10 flex items-center justify-center">
                <AlertTriangle className="h-5 w-5" />
              </div>
              <h3 className="text-sm font-bold text-[#1d1d1f] dark:text-white">
                Delete Device from Inventory?
              </h3>
            </div>

            <p className="text-xs text-[#86868b] leading-relaxed">
              Are you sure you want to permanently delete{" "}
              <strong className="text-[#1d1d1f] dark:text-white">{deletingPhone.name}</strong>? This action cannot be undone.
            </p>

            <div className="mt-6 flex items-center justify-end gap-2">
              <button
                type="button"
                onClick={() => setDeletingPhone(null)}
                disabled={deleteLoading}
                className="apple-button-secondary text-xs"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleConfirmDelete}
                disabled={deleteLoading}
                className="rounded-full bg-rose-600 px-5 py-2 text-xs font-semibold text-white hover:bg-rose-500 transition"
              >
                {deleteLoading ? "Deleting..." : "Permanently Delete"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
