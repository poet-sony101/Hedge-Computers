import Link from "next/link";
import { redirect } from "next/navigation";
import {
  Smartphone,
  CheckCircle2,
  XCircle,
  Star,
  PlusCircle,
  ArrowRight,
  TrendingUp,
} from "lucide-react";
import { isAdminAuthenticated } from "@/lib/adminAuth";
import { getAllPhones } from "@/services/phoneService";

export const metadata = {
  title: "Admin Dashboard | New Dawn Technologies",
};

export default async function AdminDashboardPage() {
  const authenticated = await isAdminAuthenticated();
  if (!authenticated) {
    redirect("/admin/login");
  }

  const phones = await getAllPhones();

  const total = phones.length;
  const inStock = phones.filter((p) => p.inStock).length;
  const outOfStock = total - inStock;
  const featured = phones.filter((p) => p.featured).length;

  // Group by brand
  const brandCounts: Record<string, number> = {};
  phones.forEach((p) => {
    brandCounts[p.brand] = (brandCounts[p.brand] || 0) + 1;
  });

  const recentPhones = phones.slice(0, 5);

  return (
    <div className="space-y-8">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-semibold uppercase tracking-wider text-blue-400">
            Overview
          </span>
          <h1 className="text-3xl font-extrabold tracking-tight text-white mt-1">
            Inventory & Operations
          </h1>
          <p className="mt-1 text-sm text-zinc-400">
            Manage your catalog of smartphones, laptops, and accessories, update today&apos;s daily pricing notes, and toggle availability.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/admin/phones/new"
            className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-4 py-2.5 text-xs font-semibold text-white hover:bg-blue-500 shadow-lg shadow-blue-900/40 transition"
          >
            <PlusCircle className="h-4 w-4" />
            <span>Add New Device</span>
          </Link>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="rounded-3xl border border-white/10 bg-zinc-950/60 p-6 backdrop-blur-xl">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-zinc-400">Total Devices</span>
            <div className="h-8 w-8 rounded-xl bg-blue-500/10 text-blue-400 flex items-center justify-center">
              <Smartphone className="h-4 w-4" />
            </div>
          </div>
          <p className="text-3xl font-bold text-white mt-3">{total}</p>
          <p className="text-xs text-zinc-500 mt-1">Live in store catalog</p>
        </div>

        <div className="rounded-3xl border border-white/10 bg-zinc-950/60 p-6 backdrop-blur-xl">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-zinc-400">In Stock</span>
            <div className="h-8 w-8 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center">
              <CheckCircle2 className="h-4 w-4" />
            </div>
          </div>
          <p className="text-3xl font-bold text-emerald-400 mt-3">{inStock}</p>
          <p className="text-xs text-zinc-500 mt-1">Available for sale</p>
        </div>

        <div className="rounded-3xl border border-white/10 bg-zinc-950/60 p-6 backdrop-blur-xl">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-zinc-400">Out of Stock</span>
            <div className="h-8 w-8 rounded-xl bg-rose-500/10 text-rose-400 flex items-center justify-center">
              <XCircle className="h-4 w-4" />
            </div>
          </div>
          <p className="text-3xl font-bold text-rose-400 mt-3">{outOfStock}</p>
          <p className="text-xs text-zinc-500 mt-1">Needs replenishment</p>
        </div>

        <div className="rounded-3xl border border-white/10 bg-zinc-950/60 p-6 backdrop-blur-xl">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-zinc-400">Featured Spotlight</span>
            <div className="h-8 w-8 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center">
              <Star className="h-4 w-4" />
            </div>
          </div>
          <p className="text-3xl font-bold text-amber-400 mt-3">{featured}</p>
          <p className="text-xs text-zinc-500 mt-1">On homepage showcase</p>
        </div>
      </div>

      {/* Brand Distribution */}
      <div className="rounded-3xl border border-white/10 bg-zinc-950/60 p-6 backdrop-blur-xl">
        <h3 className="text-sm font-semibold uppercase tracking-wider text-zinc-400 mb-4 flex items-center gap-2">
          <TrendingUp className="h-4 w-4 text-blue-400" />
          <span>Brand Inventory Breakdown</span>
        </h3>
        <div className="flex flex-wrap gap-3">
          {Object.entries(brandCounts).map(([brand, count]) => (
            <div
              key={brand}
              className="flex items-center gap-2 rounded-2xl border border-white/10 bg-zinc-900/60 px-4 py-2 text-xs"
            >
              <span className="font-semibold text-white">{brand}</span>
              <span className="rounded-full bg-blue-500/20 px-2 py-0.5 text-[11px] font-bold text-blue-400">
                {count}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Devices Quick Table */}
      <div className="rounded-3xl border border-white/10 bg-zinc-950/60 p-6 backdrop-blur-xl">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-lg font-bold text-white">Recent Catalog Listings</h2>
            <p className="text-xs text-zinc-400">
              Quickly preview and modify current devices.
            </p>
          </div>
          <Link
            href="/admin/phones"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-blue-400 hover:text-blue-300"
          >
            <span>View all inventory</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="border-b border-white/10 text-xs uppercase text-zinc-500">
              <tr>
                <th className="pb-3 font-semibold">Device</th>
                <th className="pb-3 font-semibold">Brand</th>
                <th className="pb-3 font-semibold">Condition</th>
                <th className="pb-3 font-semibold">Storage</th>
                <th className="pb-3 font-semibold">Stock Status</th>
                <th className="pb-3 font-semibold text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 text-xs">
              {recentPhones.map((phone) => (
                <tr key={phone.id} className="hover:bg-white/[0.02]">
                  <td className="py-3 font-semibold text-white flex items-center gap-2">
                    <span>{phone.name}</span>
                    {phone.featured && (
                      <span className="rounded bg-amber-500/20 px-1.5 py-0.5 text-[10px] font-bold text-amber-400">
                        Featured
                      </span>
                    )}
                  </td>
                  <td className="py-3 text-zinc-400">{phone.brand}</td>
                  <td className="py-3">
                    <span
                      className={`rounded-full px-2 py-0.5 text-[10px] font-semibold ${
                        phone.condition === "Brand New"
                          ? "bg-emerald-500/20 text-emerald-400"
                          : "bg-blue-500/20 text-blue-400"
                      }`}
                    >
                      {phone.condition}
                    </span>
                  </td>
                  <td className="py-3 text-zinc-400">{phone.storage}</td>
                  <td className="py-3">
                    <span
                      className={`inline-flex items-center gap-1 text-[11px] font-medium ${
                        phone.inStock ? "text-emerald-400" : "text-rose-400"
                      }`}
                    >
                      {phone.inStock ? "In Stock" : "Out of Stock"}
                    </span>
                  </td>
                  <td className="py-3 text-right">
                    <Link
                      href={`/admin/phones/${phone.id}/edit`}
                      className="rounded-lg border border-white/10 bg-zinc-900 px-3 py-1.5 text-[11px] font-semibold text-zinc-200 hover:bg-zinc-800 hover:text-white"
                    >
                      Edit
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
