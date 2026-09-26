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
          ← Return to Hedge Computers
        </Link>
        <ThemeToggle />
      </div>

      {/* Ambient Glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute left-1/2 top-1/3 -translate-x-1/2 h-96 w-96 rounded-full bg-red-600/10 blur-[140px]" />
      </div>

      <div className="relative z-10 w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-3 group">
            {/* Hedge Computers 4-Diamond Emblem Squircle */}
            <div className="relative flex h-11 w-11 items-center justify-center rounded-[12px] bg-gradient-to-b from-[#27272a] via-[#18181b] to-[#09090b] p-0.5 shadow-md border border-red-500/20">
              <svg
                viewBox="0 0 24 24"
                className="h-6 w-6"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <polygon points="12,3 15.5,7.5 12,12 8.5,7.5" fill="url(#loginDiamondRed)" />
                <polygon points="12,12 15.5,16.5 12,21 8.5,16.5" fill="url(#loginDiamondRed)" />
                <polygon points="6,7.5 10.5,12 6,16.5 1.5,12" fill="url(#loginDiamondRed)" />
                <polygon points="18,7.5 22.5,12 18,16.5 13.5,12" fill="url(#loginDiamondRed)" />
                <defs>
                  <linearGradient
                    id="loginDiamondRed"
                    x1="0"
                    y1="0"
                    x2="24"
                    y2="24"
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop stopColor="#ef4444" />
                    <stop offset="1" stopColor="#b91c1c" />
                  </linearGradient>
                </defs>
              </svg>
            </div>
            <span className="text-2xl font-bold tracking-tight text-[#1d1d1f] dark:text-white">
              Hedge <span className="text-red-600 dark:text-red-500">Computers</span>
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
