import { Phone } from "@/types/phone";

const CLOUD_BIN_ID = "fdddffb";
const CLOUD_BIN_URL = `https://extendsclass.com/api/json-storage/bin/${CLOUD_BIN_ID}`;
const CLOUD_BIN_KEY = "AvailableTechAdmin2026!";

// Fast in-memory cache for high-throughput visitor page loads
let memoryCache: Phone[] | null = null;
let lastFetchTime = 0;
const CACHE_TTL_MS = 3000; // 3 seconds TTL

export function isCloudStoreConfigured(): boolean {
  return true;
}

export function invalidateCloudCache(): void {
  memoryCache = null;
  lastFetchTime = 0;
}

/**
 * Fetch catalog directly from global persistent Cloud Storage
 */
export async function fetchFromCloudStore(): Promise<Phone[] | null> {
  const now = Date.now();
  if (memoryCache && now - lastFetchTime < CACHE_TTL_MS) {
    return memoryCache;
  }

  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 6000);

    const res = await fetch(CLOUD_BIN_URL, {
      signal: controller.signal,
      headers: {
        "Cache-Control": "no-cache",
        "Accept": "application/json",
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AvailableTech/1.0",
      },
      next: { revalidate: 0 },
    });
    clearTimeout(timeout);

    if (res.ok) {
      const data = await res.json();
      if (Array.isArray(data) && data.length > 0) {
        memoryCache = data;
        lastFetchTime = now;
        return data;
      }
    }
  } catch (err) {
    console.warn("[CloudStore] Read error, falling back to local storage:", err);
  }

  return memoryCache;
}

/**
 * Persist updated catalog directly to global Cloud Storage
 */
export async function saveToCloudStore(phones: Phone[]): Promise<boolean> {
  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 8000);

    const res = await fetch(CLOUD_BIN_URL, {
      method: "PUT",
      signal: controller.signal,
      headers: {
        "Content-Type": "application/json",
        "Security-key": CLOUD_BIN_KEY,
        "Accept": "application/json",
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AvailableTech/1.0",
      },
      body: JSON.stringify(phones),
    });
    clearTimeout(timeout);

    if (res.ok) {
      memoryCache = phones;
      lastFetchTime = Date.now();
      return true;
    }

    const errorText = await res.text().catch(() => "");
    console.error("[CloudStore] Save failed with status:", res.status, errorText);
  } catch (err) {
    console.error("[CloudStore] Save fatal exception:", err);
  }

  return false;
}
