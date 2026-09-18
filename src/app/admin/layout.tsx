"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  Smartphone,
  PlusCircle,
  ExternalLink,
  LogOut,
} from "lucide-react";
import ThemeToggle from "@/components/theme/ThemeToggle";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();

  // If on login page, don't show admin chrome
  if (pathname === "/admin/login") {
    return <>{children}</>;
  }

  const handleLogout = async () => {
    try {
      await fetch("/api/admin/auth", { method: "DELETE" });
      router.push("/admin/login");
      router.refresh();
    } catch (e) {
      console.error("Logout error", e);
    }
  };

  const navItems = [
    { label: "Dashboard", href: "/admin", icon: LayoutDashboard },
    { label: "Inventory", href: "/admin/phones", icon: Smartphone },
    { label: "Add Device", href: "/admin/phones/new", icon: PlusCircle },
  ];

  return (
    <div className="min-h-screen bg-[#f5f5f7] dark:bg-black text-[#1d1d1f] dark:text-[#f5f5f7] transition-colors duration-300">
      {/* Top Admin Header */}
      <header className="sticky top-0 z-50 border-b border-black/5 dark:border-white/10 bg-white/80 dark:bg-zinc-950/80 backdrop-blur-xl transition-colors duration-300">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
          {/* Brand */}
          <div className="flex items-center gap-6">
            <Link href="/admin" className="flex items-center gap-2.5">
              {/* Apple Titanium Monogram Squircle */}
              <div className="relative flex h-8 w-8 items-center justify-center rounded-[9px] bg-gradient-to-b from-[#2c2c2e] via-[#1c1c1e] to-[#000000] p-0.5 shadow-sm border border-black/10 dark:border-white/20">
                <svg
                  viewBox="0 0 40 40"
                  className="h-4 w-4"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M20 7L31 31H25.5L23.2 26H16.8L14.5 31H9L20 7Z"
                    fill="url(#adminLogoA)"
                  />
                  <path
                    d="M18.2 22H21.8L20 17.5L18.2 22Z"
                    fill="#000000"
                  />
                  <defs>
                    <linearGradient
                      id="adminLogoA"
                      x1="20"
                      y1="7"
                      x2="20"
                      y2="31"
                      gradientUnits="userSpaceOnUse"
                    >
                      <stop stopColor="#ffffff" />
                      <stop offset="0.6" stopColor="#e5e5ea" />
                      <stop offset="1" stopColor="#8e8e93" />
                    </linearGradient>
                  </defs>
                </svg>
              </div>
              <span className="text-base font-bold tracking-tight text-[#1d1d1f] dark:text-white">
                Available Tech
              </span>
              <span className="rounded-full bg-black/5 dark:bg-white/10 px-2.5 py-0.5 text-[10px] font-semibold text-[#86868b] dark:text-[#a1a1a6] border border-black/5 dark:border-white/10">
                Admin
              </span>
            </Link>

            {/* Nav Links */}
            <nav className="hidden sm:flex items-center gap-1.5 pl-4 border-l border-black/5 dark:border-white/10">
              {navItems.map((item) => {
                const isActive =
                  item.href === "/admin"
                    ? pathname === "/admin"
                    : pathname.startsWith(item.href);

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`flex items-center gap-2 rounded-full px-3.5 py-1.5 text-xs font-medium transition-all ${
                      isActive
                        ? "bg-[#1d1d1f] dark:bg-white text-white dark:text-black font-semibold shadow-sm"
                        : "text-[#86868b] hover:text-[#1d1d1f] dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/5"
                    }`}
                  >
                    <item.icon className="h-3.5 w-3.5" />
                    <span>{item.label}</span>
                  </Link>
                );
              })}
            </nav>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2.5">
            {/* Apple Theme Toggle */}
            <ThemeToggle />

            <Link
              href="/"
              target="_blank"
              className="hidden sm:inline-flex items-center gap-1.5 rounded-full border border-black/10 dark:border-white/10 bg-black/5 dark:bg-white/5 px-3.5 py-1.5 text-xs font-medium text-[#1d1d1f] dark:text-zinc-300 hover:text-black dark:hover:text-white hover:bg-black/10 dark:hover:bg-white/10 transition"
            >
              <span>View Store</span>
              <ExternalLink className="h-3.5 w-3.5 text-[#86868b]" />
            </Link>

            <button
              onClick={handleLogout}
              className="inline-flex items-center gap-1.5 rounded-full border border-rose-500/20 bg-rose-500/10 px-3.5 py-1.5 text-xs font-medium text-rose-600 dark:text-rose-400 hover:bg-rose-500/20 transition-colors"
            >
              <LogOut className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">Logout</span>
            </button>
          </div>
        </div>

        {/* Mobile Navigation Row */}
        <div className="flex sm:hidden items-center justify-around border-t border-black/5 dark:border-white/5 px-4 py-2 bg-black/[0.02] dark:bg-zinc-900/40">
          {navItems.map((item) => {
            const isActive =
              item.href === "/admin"
                ? pathname === "/admin"
                : pathname.startsWith(item.href);

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium transition-all ${
                  isActive
                    ? "bg-[#1d1d1f] dark:bg-white text-white dark:text-black font-semibold"
                    : "text-[#86868b]"
                }`}
              >
                <item.icon className="h-3.5 w-3.5" />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </div>
      </header>

      {/* Admin Content Area */}
      <main className="mx-auto max-w-7xl px-6 py-8">{children}</main>
    </div>
  );
}
