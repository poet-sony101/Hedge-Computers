"use client";

import { useTheme } from "./ThemeProvider";
import { Sun, Moon } from "lucide-react";

interface ThemeToggleProps {
  className?: string;
  variant?: "pill" | "icon";
}

export default function ThemeToggle({ className = "", variant = "icon" }: ThemeToggleProps) {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === "dark";

  if (variant === "pill") {
    return (
      <button
        onClick={toggleTheme}
        type="button"
        aria-label={`Switch to ${isDark ? "light" : "dark"} mode`}
        className={`group relative inline-flex h-8 items-center gap-1.5 rounded-full border border-black/10 dark:border-white/15 bg-black/5 dark:bg-white/10 px-2.5 py-1 text-xs font-medium text-[#1d1d1f] dark:text-[#f5f5f7] transition-all hover:bg-black/10 dark:hover:bg-white/15 ${className}`}
      >
        {isDark ? (
          <>
            <Moon className="h-3.5 w-3.5 text-zinc-300" />
            <span className="text-[11px] text-zinc-300">Dark</span>
          </>
        ) : (
          <>
            <Sun className="h-3.5 w-3.5 text-amber-500" />
            <span className="text-[11px] text-zinc-700">Light</span>
          </>
        )}
      </button>
    );
  }

  return (
    <button
      onClick={toggleTheme}
      type="button"
      aria-label={`Switch to ${isDark ? "light" : "dark"} mode`}
      title={`Switch to ${isDark ? "light" : "dark"} mode`}
      className={`relative flex h-9 w-9 items-center justify-center rounded-full border border-black/10 dark:border-white/15 bg-white/70 dark:bg-zinc-900/80 text-[#1d1d1f] dark:text-[#f5f5f7] shadow-sm backdrop-blur-md transition-all hover:scale-105 hover:bg-white dark:hover:bg-zinc-800 active:scale-95 ${className}`}
    >
      {isDark ? (
        <Sun className="h-4 w-4 text-zinc-200 transition-transform duration-300 hover:rotate-45" />
      ) : (
        <Moon className="h-4 w-4 text-zinc-700 transition-transform duration-300 hover:-rotate-12" />
      )}
    </button>
  );
}
