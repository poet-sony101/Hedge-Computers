"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Lock, Sparkles, ArrowRight, AlertCircle, Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";

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
    <div className="min-h-screen flex items-center justify-center bg-black px-6 py-12 relative overflow-hidden">
      {/* Glow Backdrop */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute left-1/2 top-1/3 -translate-x-1/2 h-96 w-96 rounded-full bg-blue-600/15 blur-[120px]" />
      </div>

      <div className="relative z-10 w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2 group">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-tr from-blue-600 to-sky-400 text-white shadow-md shadow-blue-500/20">
              <Sparkles className="h-5 w-5" />
            </span>
            <span className="text-2xl font-bold tracking-tight text-white">
              New Dawn
              <span className="text-blue-500">.</span>
            </span>
          </Link>
          <h1 className="mt-4 text-2xl font-bold tracking-tight text-white">
            Admin Inventory Portal
          </h1>
          <p className="mt-1 text-xs text-zinc-400">
            Sign in with your master administrative passcode.
          </p>
        </div>

        {/* Login Card */}
        <div className="rounded-3xl border border-white/10 bg-zinc-950/80 p-8 backdrop-blur-2xl shadow-2xl">
          {error && (
            <div className="mb-6 flex items-center gap-3 rounded-xl border border-rose-500/30 bg-rose-950/30 p-3 text-xs text-rose-400">
              <AlertCircle className="h-4 w-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-400 mb-2">
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
                  className="w-full rounded-xl border border-white/10 bg-zinc-900/90 px-4 py-3 text-sm text-white placeholder-zinc-500 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                />
                <button
                  type="button"
                  onClick={() => setShowPasscode(!showPasscode)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-white"
                >
                  {showPasscode ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              </div>
              <p className="mt-2 text-[11px] text-zinc-500">
                Default key is configured in your local environment.
              </p>
            </div>

            <Button
              type="submit"
              disabled={loading || !passcode}
              className="w-full rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold py-3 shadow-lg shadow-blue-900/40"
            >
              {loading ? (
                "Authenticating..."
              ) : (
                <span className="flex items-center justify-center gap-2">
                  <Lock className="h-4 w-4" />
                  <span>Access Dashboard</span>
                  <ArrowRight className="h-4 w-4 ml-1" />
                </span>
              )}
            </Button>
          </form>
        </div>

        <div className="mt-8 text-center">
          <Link
            href="/"
            className="text-xs text-zinc-500 hover:text-zinc-300 transition-colors"
          >
            ← Return to Public Storefront
          </Link>
        </div>
      </div>
    </div>
  );
}
