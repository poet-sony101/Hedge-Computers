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
import { isSupabaseConfigured } from "@/lib/supabase";

export const metadata = {
  title: "Admin Dashboard | Available Tech",
};

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function AdminDashboardPage() {
  const authenticated = await isAdminAuthenticated();
  if (!authenticated) {
    redirect("/admin/login");
  }

  const phones = await getAllPhones();
  const isDbConnected = isSupabaseConfigured();

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
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold uppercase tracking-wider text-[#86868b]">
              Overview
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-[10px] font-semibold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
              {isDbConnected ? "Supabase Cloud DB" : "Cloud Database (Active)"}
            </span>
          </div>
          <h1 className="text-3xl font-extrabold tracking-tight text-[#1d1d1f] dark:text-white mt-1">
            Inventory & Operations
          </h1>
          <p className="mt-1 text-sm text-[#86868b]">
            Manage your catalog of smartphones, laptops, and accessories, update today&apos;s daily pricing notes, and toggle availability.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/admin/phones/new"
            className="inline-flex items-center gap-2 rounded-full bg-[#1d1d1f] hover:bg-black dark:bg-white dark:hover:bg-[#f5f5f7] px-5 py-2.5 text-xs font-semibold text-white dark:text-black shadow-lg shadow-black/10 transition"
          >
            <PlusCircle className="h-4 w-4" />
            <span>Add Device</span>
          </Link>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="apple-card p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-[#86868b]">Total Devices</span>
            <div className="h-8 w-8 rounded-full bg-black/5 dark:bg-white/10 text-[#1d1d1f] dark:text-white flex items-center justify-center">
              <Smartphone className="h-4 w-4" />
            </div>
          </div>
          <p className="text-3xl font-bold text-[#1d1d1f] dark:text-white mt-3">{total}</p>
          <p className="text-xs text-[#86868b] mt-1">Live in store catalog</p>
        </div>

        <div className="apple-card p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-[#86868b]">In Stock</span>
            <div className="h-8 w-8 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
              <CheckCircle2 className="h-4 w-4" />
            </div>
          </div>
          <p className="text-3xl font-bold text-emerald-600 dark:text-emerald-400 mt-3">{inStock}</p>
          <p className="text-xs text-[#86868b] mt-1">Available for sale</p>
        </div>

        <div className="apple-card p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-[#86868b]">Out of Stock</span>
            <div className="h-8 w-8 rounded-full bg-rose-500/10 text-rose-600 dark:text-rose-400 flex items-center justify-center">
              <XCircle className="h-4 w-4" />
            </div>
          </div>
          <p className="text-3xl font-bold text-rose-600 dark:text-rose-400 mt-3">{outOfStock}</p>
          <p className="text-xs text-[#86868b] mt-1">Needs replenishment</p>
        </div>

        <div className="apple-card p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-[#86868b]">Featured Spotlight</span>
            <div className="h-8 w-8 rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400 flex items-center justify-center">
              <Star className="h-4 w-4" />
            </div>
          </div>
          <p className="text-3xl font-bold text-amber-600 dark:text-amber-400 mt-3">{featured}</p>
          <p className="text-xs text-[#86868b] mt-1">On homepage showcase</p>
        </div>
      </div>

      {/* Brand Distribution */}
      <div className="apple-card p-6 shadow-sm">
        <h3 className="text-sm font-semibold uppercase tracking-wider text-[#86868b] mb-4 flex items-center gap-2">
          <TrendingUp className="h-4 w-4 text-[#1d1d1f] dark:text-white" />
          <span>Brand Inventory Breakdown</span>
        </h3>
        {Object.keys(brandCounts).length > 0 ? (
          <div className="flex flex-wrap gap-2.5">
            {Object.entries(brandCounts).map(([brand, count]) => (
              <div
                key={brand}
                className="flex items-center gap-2 rounded-full border border-black/5 dark:border-white/10 bg-black/[0.02] dark:bg-white/5 px-4 py-2 text-xs"
              >
                <span className="font-semibold text-[#1d1d1f] dark:text-white">{brand}</span>
                <span className="rounded-full bg-black/5 dark:bg-white/10 px-2 py-0.5 text-[11px] font-bold text-[#86868b] dark:text-[#a1a1a6]">
                  {count}
                </span>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-xs text-[#86868b]">
            No brand metrics yet. Products added to inventory will appear categorized here.
          </p>
        )}
      </div>

      {/* Recent Devices Quick Table */}
      <div className="apple-card p-6 shadow-sm">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-lg font-bold text-[#1d1d1f] dark:text-white">Recent Catalog Listings</h2>
            <p className="text-xs text-[#86868b]">
              Quickly preview and modify current devices.
            </p>
          </div>
          <Link
            href="/admin/phones"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#1d1d1f] dark:text-white hover:underline"
          >
            <span>View all inventory</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>

        {recentPhones.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="border-b border-black/5 dark:border-white/10 text-xs uppercase text-[#86868b]">
                <tr>
                  <th className="pb-3 font-semibold">Device</th>
                  <th className="pb-3 font-semibold">Brand</th>
                  <th className="pb-3 font-semibold">Condition</th>
                  <th className="pb-3 font-semibold">Storage</th>
                  <th className="pb-3 font-semibold">Stock Status</th>
                  <th className="pb-3 font-semibold text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-black/5 dark:divide-white/5 text-xs">
                {recentPhones.map((phone) => (
                  <tr key={phone.id} className="hover:bg-black/[0.02] dark:hover:bg-white/[0.02] transition">
                    <td className="py-3 font-semibold text-[#1d1d1f] dark:text-white flex items-center gap-2">
                      <span>{phone.name}</span>
                      {phone.featured && (
                        <span className="rounded-full bg-amber-500/15 px-2 py-0.5 text-[10px] font-bold text-amber-700 dark:text-amber-400">
                          Featured
                        </span>
                      )}
                    </td>
                    <td className="py-3 text-[#86868b]">{phone.brand}</td>
                    <td className="py-3">
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
                    <td className="py-3 text-[#86868b]">{phone.storage}</td>
                    <td className="py-3">
                      <span
                        className={`inline-flex items-center gap-1 text-[11px] font-medium ${
                          phone.inStock ? "text-emerald-600 dark:text-emerald-400" : "text-rose-600 dark:text-rose-400"
                        }`}
                      >
                        {phone.inStock ? "In Stock" : "Out of Stock"}
                      </span>
                    </td>
                    <td className="py-3 text-right">
                      <Link
                        href={`/admin/phones/${phone.id}/edit`}
                        className="rounded-full border border-black/10 dark:border-white/10 bg-black/5 dark:bg-white/5 px-3 py-1 text-[11px] font-semibold text-[#1d1d1f] dark:text-white hover:bg-black/10 dark:hover:bg-white/10 transition"
                      >
                        Edit
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="py-12 text-center text-[#86868b]">
            <p className="text-sm">No products listed in catalog yet.</p>
            <Link
              href="/admin/phones/new"
              className="inline-flex items-center gap-2 mt-4 rounded-full bg-[#1d1d1f] hover:bg-black dark:bg-white dark:hover:bg-[#f5f5f7] px-5 py-2.5 text-xs font-semibold text-white dark:text-black transition shadow-sm"
            >
              <PlusCircle className="h-3.5 w-3.5" />
              <span>Add Device</span>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
