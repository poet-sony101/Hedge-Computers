import { createClient, SupabaseClient } from "@supabase/supabase-js";
import { Phone, PhoneCondition, DeviceCategory } from "@/types/phone";

let supabaseAdmin: SupabaseClient | null = null;

export function isSupabaseConfigured(): boolean {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key =
    process.env.SUPABASE_SERVICE_ROLE_KEY ||
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  return Boolean(url && key && url.startsWith("http"));
}

export function getSupabaseAdminClient(): SupabaseClient | null {
  if (!isSupabaseConfigured()) {
    return null;
  }

  if (!supabaseAdmin) {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL!;
    const key = (process.env.SUPABASE_SERVICE_ROLE_KEY ||
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY)!;

    supabaseAdmin = createClient(url, key, {
      auth: {
        persistSession: false,
        autoRefreshToken: false,
      },
    });
  }

  return supabaseAdmin;
}

/**
 * Maps a Supabase SQL row to the application Phone domain model
 */
export function rowToPhone(row: Record<string, unknown>): Phone {
  return {
    id: Number(row.id),
    slug: String(row.slug || ""),
    name: String(row.name || ""),
    brand: String(row.brand || ""),
    category: (row.category || "phone") as DeviceCategory,
    storage: String(row.storage || ""),
    storageOptions: Array.isArray(row.storage_options)
      ? (row.storage_options as string[])
      : [String(row.storage || "256GB")],
    condition: (row.condition || "UK Used") as PhoneCondition,
    colors: Array.isArray(row.colors) ? (row.colors as string[]) : [],
    image: String(row.image || "/images/placeholder-phone.svg"),
    images: Array.isArray(row.images)
      ? (row.images as string[])
      : [String(row.image || "/images/placeholder-phone.svg")],
    featured: Boolean(row.featured),
    inStock: Boolean(row.in_stock),
    tagline: String(row.tagline || ""),
    overview: String(row.overview || ""),
    specs: (row.specs as Phone["specs"]) || {},
    priceNote: String(
      row.price_note || "Price on daily request (market rate)"
    ),
  };
}

/**
 * Maps an application Phone data object to Supabase SQL columns
 */
export function phoneToRow(data: Partial<Phone>): Record<string, unknown> {
  const row: Record<string, unknown> = {};

  if (data.name !== undefined) row.name = data.name;
  if (data.slug !== undefined) row.slug = data.slug;
  if (data.brand !== undefined) row.brand = data.brand;
  if (data.category !== undefined) row.category = data.category;
  if (data.storage !== undefined) row.storage = data.storage;
  if (data.storageOptions !== undefined)
    row.storage_options = data.storageOptions;
  if (data.condition !== undefined) row.condition = data.condition;
  if (data.colors !== undefined) row.colors = data.colors;
  if (data.image !== undefined) row.image = data.image;
  if (data.images !== undefined) row.images = data.images;
  if (data.featured !== undefined) row.featured = data.featured;
  if (data.inStock !== undefined) row.in_stock = data.inStock;
  if (data.tagline !== undefined) row.tagline = data.tagline;
  if (data.overview !== undefined) row.overview = data.overview;
  if (data.specs !== undefined) row.specs = data.specs;
  if (data.priceNote !== undefined) row.price_note = data.priceNote;

  return row;
}
