"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
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
} from "lucide-react";
import { Phone } from "@/types/phone";

interface AdminInventoryClientProps {
  initialPhones: Phone[];
}

export default function AdminInventoryClient({
  initialPhones,
}: AdminInventoryClientProps) {
  const [phones, setPhones] = useState<Phone[]>(initialPhones);
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All"); // All, phone, laptop
  const [brandFilter, setBrandFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All"); // All, InStock, OutOfStock
  const [updatingId, setUpdatingId] = useState<number | null>(null);

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
      console.error("Failed to delete phone", err);
    } finally {
      setDeleteLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-semibold uppercase tracking-wider text-blue-400">
            Catalog Management
          </span>
          <h1 className="text-3xl font-extrabold tracking-tight text-white mt-1">
            Device Inventory
          </h1>
          <p className="text-xs text-zinc-400 mt-1">
            Live database of smartphones, laptops, smartwatches, audio, and accessories. Toggle availability or click to adjust daily pricing notes.
          </p>
        </div>

        <Link
          href="/admin/phones/new"
          className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-4 py-2.5 text-xs font-semibold text-white hover:bg-blue-500 shadow-lg shadow-blue-900/40"
        >
          <PlusCircle className="h-4 w-4" />
          <span>Add New Device</span>
        </Link>
      </div>

      {/* Search & Filters */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 rounded-3xl border border-white/10 bg-zinc-950/60 p-5 backdrop-blur-xl">
        <div className="relative w-full md:w-96">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-500" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Filter by name or model..."
            className="w-full rounded-xl border border-white/10 bg-zinc-900/80 py-2.5 pl-10 pr-4 text-xs text-white placeholder-zinc-500 outline-none focus:border-blue-500"
          />
        </div>

        <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
          {/* Category Filter */}
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="rounded-xl border border-white/10 bg-zinc-900/80 px-3 py-2 text-xs text-white outline-none focus:border-blue-500"
          >
            <option value="All" className="bg-zinc-900">Type: All Devices</option>
            <option value="phone" className="bg-zinc-900">Type: Smartphones</option>
            <option value="laptop" className="bg-zinc-900">Type: Laptops</option>
            <option value="gadget" className="bg-zinc-900">Type: Gadgets & Audio</option>
            <option value="accessory" className="bg-zinc-900">Type: Power & Accessories</option>
          </select>

          {/* Brand Filter */}
          <select
            value={brandFilter}
            onChange={(e) => setBrandFilter(e.target.value)}
            className="rounded-xl border border-white/10 bg-zinc-900/80 px-3 py-2 text-xs text-white outline-none focus:border-blue-500"
          >
            <option value="All" className="bg-zinc-900">Brand: All</option>
            {availableBrands.map((b) => (
              <option key={b} value={b} className="bg-zinc-900">
                Brand: {b}
              </option>
            ))}
          </select>

          {/* Status Filter */}
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="rounded-xl border border-white/10 bg-zinc-900/80 px-3 py-2 text-xs text-white outline-none focus:border-blue-500"
          >
            <option value="All" className="bg-zinc-900">Status: All</option>
            <option value="InStock" className="bg-zinc-900">Status: In Stock</option>
            <option value="OutOfStock" className="bg-zinc-900">Status: Out of Stock</option>
          </select>
        </div>
      </div>

      {/* Inventory Table */}
      <div className="overflow-hidden rounded-3xl border border-white/10 bg-zinc-950/60 backdrop-blur-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="border-b border-white/10 bg-zinc-900/40 text-[11px] uppercase tracking-wider text-zinc-400">
              <tr>
                <th className="py-4 px-6 font-semibold">Device</th>
                <th className="py-4 px-4 font-semibold">Type</th>
                <th className="py-4 px-4 font-semibold">Brand</th>
                <th className="py-4 px-4 font-semibold">Condition</th>
                <th className="py-4 px-4 font-semibold">Today&apos;s Price Note</th>
                <th className="py-4 px-4 font-semibold text-center">In Stock</th>
                <th className="py-4 px-4 font-semibold text-center">Featured</th>
                <th className="py-4 px-6 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {filteredPhones.map((phone) => (
                <tr
                  key={phone.id}
                  className="hover:bg-white/[0.02] transition-colors"
                >
                  {/* Device Info & Image */}
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-3">
                      <div className="relative h-12 w-12 rounded-xl bg-zinc-900 p-1 flex items-center justify-center border border-white/5 overflow-hidden shrink-0">
                        <Image
                          src={phone.image}
                          alt={phone.name}
                          width={40}
                          height={40}
                          className="max-h-10 w-auto object-contain"
                        />
                      </div>
                      <div>
                        <Link
                          href={`/phones/${phone.slug}`}
                          target="_blank"
                          className="font-bold text-white hover:text-blue-400 inline-flex items-center gap-1 group"
                        >
                          <span>{phone.name}</span>
                          <ExternalLink className="h-3 w-3 text-zinc-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                        </Link>
                        <p className="text-[11px] text-zinc-400">{phone.storage}</p>
                      </div>
                    </div>
                  </td>

                  {/* Type */}
                  <td className="py-4 px-4">
                    <span
                      className={`rounded-md px-2 py-0.5 text-[10px] font-semibold ${
                        phone.category === "laptop"
                          ? "bg-sky-500/15 text-sky-400 border border-sky-500/20"
                          : phone.category === "gadget"
                          ? "bg-emerald-500/15 text-emerald-400 border border-emerald-500/20"
                          : phone.category === "accessory"
                          ? "bg-amber-500/15 text-amber-400 border border-amber-500/20"
                          : "bg-purple-500/15 text-purple-400 border border-purple-500/20"
                      }`}
                    >
                      {phone.category === "laptop"
                        ? "Laptop"
                        : phone.category === "gadget"
                        ? "Gadget"
                        : phone.category === "accessory"
                        ? "Accessory"
                        : "Phone"}
                    </span>
                  </td>

                  {/* Brand */}
                  <td className="py-4 px-4">
                    <span className="rounded-md bg-zinc-900 px-2 py-0.5 font-medium text-zinc-300 border border-white/5">
                      {phone.brand}
                    </span>
                  </td>

                  {/* Condition */}
                  <td className="py-4 px-4">
                    <span
                      className={`rounded-full px-2.5 py-0.5 text-[10px] font-semibold ${
                        phone.condition === "Brand New"
                          ? "bg-emerald-500/15 text-emerald-400 border border-emerald-500/20"
                          : "bg-blue-500/15 text-blue-400 border border-blue-500/20"
                      }`}
                    >
                      {phone.condition}
                    </span>
                  </td>

                  {/* Price Note & Quick Edit */}
                  <td className="py-4 px-4">
                    <button
                      onClick={() => {
                        setEditingPricePhone(phone);
                        setNewPriceNote(
                          phone.priceNote || "Price on daily request (market rate)"
                        );
                      }}
                      className="group flex items-center gap-2 text-left rounded-lg p-1.5 -ml-1.5 hover:bg-white/5 transition"
                      title="Click to quickly update daily price note"
                    >
                      <span className="text-zinc-300 text-[11px] group-hover:text-blue-400">
                        {phone.priceNote || "Price on request"}
                      </span>
                      <Edit2 className="h-3 w-3 text-zinc-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </button>
                  </td>

                  {/* In Stock Toggle */}
                  <td className="py-4 px-4 text-center">
                    <button
                      onClick={() => handleToggleStock(phone)}
                      disabled={updatingId === phone.id}
                      className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[11px] font-semibold transition ${
                        phone.inStock
                          ? "bg-emerald-500/20 text-emerald-400 hover:bg-emerald-500/30"
                          : "bg-rose-500/20 text-rose-400 hover:bg-rose-500/30"
                      }`}
                    >
                      {phone.inStock ? (
                        <>
                          <CheckCircle2 className="h-3.5 w-3.5" />
                          <span>In Stock</span>
                        </>
                      ) : (
                        <>
                          <XCircle className="h-3.5 w-3.5" />
                          <span>Sold Out</span>
                        </>
                      )}
                    </button>
                  </td>

                  {/* Featured Toggle */}
                  <td className="py-4 px-4 text-center">
                    <button
                      onClick={() => handleToggleFeatured(phone)}
                      disabled={updatingId === phone.id}
                      className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[11px] font-semibold transition ${
                        phone.featured
                          ? "bg-amber-500/20 text-amber-400 hover:bg-amber-500/30"
                          : "bg-zinc-800 text-zinc-500 hover:text-zinc-300"
                      }`}
                    >
                      <Star
                        className={`h-3.5 w-3.5 ${
                          phone.featured ? "fill-amber-400 text-amber-400" : ""
                        }`}
                      />
                      <span>{phone.featured ? "Featured" : "Standard"}</span>
                    </button>
                  </td>

                  {/* Actions */}
                  <td className="py-4 px-6 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Link
                        href={`/admin/phones/${phone.id}/edit`}
                        className="rounded-lg border border-white/10 bg-zinc-900 p-2 text-zinc-300 hover:bg-zinc-800 hover:text-white transition"
                        title="Full Edit"
                      >
                        <Edit2 className="h-3.5 w-3.5" />
                      </Link>

                      <button
                        onClick={() => setDeletingPhone(phone)}
                        className="rounded-lg border border-rose-500/20 bg-rose-950/20 p-2 text-rose-400 hover:bg-rose-900/40 transition"
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
          <div className="p-12 text-center text-zinc-500">
            No devices match the active filters.
          </div>
        )}
      </div>

      {/* Quick Edit Price Note Modal */}
      {editingPricePhone && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
          <div className="w-full max-w-md rounded-3xl border border-white/10 bg-zinc-950 p-6 shadow-2xl">
            <div className="flex items-center justify-between pb-4 border-b border-white/10">
              <div className="flex items-center gap-2">
                <DollarSign className="h-5 w-5 text-blue-400" />
                <h3 className="font-bold text-white text-base">
                  Update Price Note
                </h3>
              </div>
              <button
                onClick={() => setEditingPricePhone(null)}
                className="text-zinc-500 hover:text-white"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <form onSubmit={handleSavePrice} className="space-y-4 pt-4">
              <div>
                <p className="text-xs text-zinc-400 mb-1 font-semibold">
                  {editingPricePhone.name} ({editingPricePhone.storage})
                </p>
                <label className="block text-xs text-zinc-400 mb-1.5">
                  Daily Price Note / Estimated Price
                </label>
                <input
                  type="text"
                  required
                  value={newPriceNote}
                  onChange={(e) => setNewPriceNote(e.target.value)}
                  placeholder="e.g. ₦1,250,000 or Price on daily request"
                  className="w-full rounded-xl border border-white/10 bg-zinc-900 px-4 py-2.5 text-xs text-white outline-none focus:border-blue-500"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setEditingPricePhone(null)}
                  className="rounded-xl border border-white/10 bg-zinc-900 px-4 py-2 text-xs font-semibold text-zinc-300 hover:bg-zinc-800"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={priceSaveLoading}
                  className="rounded-xl bg-blue-600 px-4 py-2 text-xs font-semibold text-white hover:bg-blue-500 shadow-md shadow-blue-900/30"
                >
                  {priceSaveLoading ? "Saving..." : "Save Changes"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deletingPhone && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
          <div className="w-full max-w-sm rounded-3xl border border-white/10 bg-zinc-950 p-6 shadow-2xl text-center">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-rose-500/20 text-rose-400 mb-4">
              <AlertTriangle className="h-6 w-6" />
            </div>

            <h3 className="font-bold text-white text-lg">Remove Device?</h3>
            <p className="text-xs text-zinc-400 mt-2">
              Are you sure you want to remove <strong className="text-white">{deletingPhone.name}</strong> from the catalog? This action will immediately remove it from public view.
            </p>

            <div className="flex items-center justify-center gap-3 mt-6">
              <button
                type="button"
                onClick={() => setDeletingPhone(null)}
                className="rounded-xl border border-white/10 bg-zinc-900 px-4 py-2 text-xs font-semibold text-zinc-300 hover:bg-zinc-800"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleConfirmDelete}
                disabled={deleteLoading}
                className="rounded-xl bg-rose-600 px-4 py-2 text-xs font-semibold text-white hover:bg-rose-500 shadow-md shadow-rose-950/40"
              >
                {deleteLoading ? "Removing..." : "Yes, Remove"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
