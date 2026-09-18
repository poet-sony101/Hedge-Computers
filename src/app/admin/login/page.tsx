"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowRight, AlertCircle, Eye, EyeOff } from "lucide-react";
import ThemeToggle from "@/components/theme/ThemeToggle";

export default function AdminLoginPage() {
  const router = useRouter();
  const [passcode, setPasscode] = useState("");
  const [showPasscode, setShowPasscode] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/admin/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ passcode }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Authentication failed. Incorrect passcode.");
        setLoading(false);
        return;
      }

      router.push("/admin");
      router.refresh();
    } catch {
      setError("An unexpected error occurred. Please try again.");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f5f5f7] dark:bg-black px-6 py-12 relative overflow-hidden transition-colors duration-300">
      {/* Top Bar for Storefront Return & Theme Toggle */}
      <div className="absolute top-6 left-6 right-6 flex items-center justify-between z-20">
        <Link
          href="/"
          className="text-xs font-medium text-[#86868b] hover:text-[#1d1d1f] dark:hover:text-white transition"
        >
          ← Return to Available Tech
        </Link>
        <ThemeToggle />
      </div>

      {/* Ambient Glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute left-1/2 top-1/3 -translate-x-1/2 h-96 w-96 rounded-full bg-black/5 dark:bg-white/5 blur-[120px]" />
      </div>

      <div className="relative z-10 w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-3 group">
            {/* Apple Titanium Monogram Squircle */}
            <div className="relative flex h-11 w-11 items-center justify-center rounded-[12px] bg-gradient-to-b from-[#2c2c2e] via-[#1c1c1e] to-[#000000] p-0.5 shadow-md border border-black/10 dark:border-white/20">
              <svg
                viewBox="0 0 40 40"
                className="h-6 w-6"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M20 7L31 31H25.5L23.2 26H16.8L14.5 31H9L20 7Z"
                  fill="url(#adminLoginLogoA)"
                />
                <path
                  d="M18.2 22H21.8L20 17.5L18.2 22Z"
                  fill="#000000"
                />
                <defs>
                  <linearGradient
                    id="adminLoginLogoA"
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
            <span className="text-2xl font-bold tracking-tight text-[#1d1d1f] dark:text-white">
              Available Tech
            </span>
          </Link>
          <h1 className="mt-4 text-2xl font-bold tracking-tight text-[#1d1d1f] dark:text-white">
            Admin Inventory Portal
          </h1>
          <p className="mt-1 text-xs text-[#86868b]">
            Sign in with your master administrative passcode.
          </p>
        </div>

        {/* Login Card */}
        <div className="apple-card p-8 sm:p-10 shadow-2xl">
          {error && (
            <div className="mb-6 flex items-center gap-3 rounded-2xl border border-rose-500/30 bg-rose-500/10 p-3.5 text-xs text-rose-600 dark:text-rose-400">
              <AlertCircle className="h-4 w-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-[#86868b] mb-2">
                Admin Passcode
              </label>
              <div className="relative">
                <input
                  type={showPasscode ? "text" : "password"}
                  required
                  autoFocus
                  value={passcode}
                  onChange={(e) => setPasscode(e.target.value)}
                  placeholder="Enter administrator passcode..."
                  className="w-full rounded-2xl border border-black/10 dark:border-white/10 bg-black/[0.02] dark:bg-white/5 px-4 py-3 text-sm text-[#1d1d1f] dark:text-white placeholder-[#86868b] outline-none focus:border-[#1d1d1f] dark:focus:border-white transition"
                />
                <button
                  type="button"
                  onClick={() => setShowPasscode(!showPasscode)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#86868b] hover:text-[#1d1d1f] dark:hover:text-white"
                >
                  {showPasscode ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              </div>
              <p className="mt-2 text-[11px] text-[#86868b]">
                Default key is configured in your local environment.
              </p>
            </div>

            <button
              type="submit"
              disabled={loading || !passcode}
              className="w-full rounded-full bg-[#1d1d1f] hover:bg-black dark:bg-white dark:hover:bg-[#f5f5f7] py-3.5 text-sm font-semibold text-white dark:text-black shadow-lg shadow-black/10 transition disabled:opacity-50"
            >
              {loading ? (
                "Authenticating..."
              ) : (
                <span className="flex items-center justify-center gap-2">
                  <span>Sign In to Admin Panel</span>
                  <ArrowRight className="h-4 w-4" />
                </span>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
