import fs from "fs";
import path from "path";
import { revalidatePath } from "next/cache";
import { Phone } from "@/types/phone";
import {
  isSupabaseConfigured,
  getSupabaseAdminClient,
  rowToPhone,
  phoneToRow,
} from "@/lib/supabase";

const DATA_FILE_PATH = path.join(process.cwd(), "src", "data", "phones.json");

/**
 * Local file-based reader (fallback / seeding source)
 */
function readLocalData(): Phone[] {
  try {
    if (fs.existsSync(DATA_FILE_PATH)) {
      const content = fs.readFileSync(DATA_FILE_PATH, "utf-8");
      const parsed = JSON.parse(content);
      if (Array.isArray(parsed)) {
        return parsed;
      }
    }
  } catch (error) {
    console.error("Error reading phones.json:", error);
  }
  return [];
}

/**
 * Local file-based writer (used in local development when Supabase is not set)
 */
function writeLocalData(phones: Phone[]): boolean {
  try {
    const dir = path.dirname(DATA_FILE_PATH);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    fs.writeFileSync(DATA_FILE_PATH, JSON.stringify(phones, null, 2), "utf-8");
    return true;
  } catch (error) {
    console.error("Error writing to phones.json:", error);
    return false;
  }
}

/**
 * Invalidate Next.js cache across both server and client pages
 */
function triggerRevalidation() {
  try {
    revalidatePath("/", "layout");
    revalidatePath("/", "page");
    revalidatePath("/admin", "layout");
    revalidatePath("/admin", "page");
    revalidatePath("/admin/phones", "layout");
    revalidatePath("/admin/phones", "page");
    revalidatePath("/admin/phones/[id]/edit", "page");
    revalidatePath("/admin/phones/new", "page");
    revalidatePath("/phones", "layout");
    revalidatePath("/phones", "page");
    revalidatePath("/phones/[slug]", "page");
    revalidatePath("/products", "page");
    revalidatePath("/laptops", "page");
  } catch {
    // revalidatePath may throw in non-request contexts
  }
}

/**
 * Auto-seed Supabase database from phones.json if empty on first boot
 */
async function autoSeedSupabaseIfEmpty(supabase: ReturnType<typeof getSupabaseAdminClient>) {
  if (!supabase) return;
  try {
    const { count, error } = await supabase
      .from("devices")
      .select("*", { count: "exact", head: true });

    if (!error && count === 0) {
      const localPhones = readLocalData();
      if (localPhones.length > 0) {
        console.log(`[Supabase] Auto-seeding ${localPhones.length} devices into Supabase...`);
        const rowsToInsert = localPhones.map((p) => {
          const row = phoneToRow(p);
          // Omit id so Supabase serial generates sequence
          delete row.id;
          return row;
        });
        await supabase.from("devices").insert(rowsToInsert);
      }
    }
  } catch (seedErr) {
    console.warn("[Supabase] Auto-seed check failed:", seedErr);
  }
}

/**
 * Fetch all catalog items
 */
export async function getAllPhones(): Promise<Phone[]> {
  const supabase = getSupabaseAdminClient();

  if (supabase) {
    try {
      await autoSeedSupabaseIfEmpty(supabase);

      const { data, error } = await supabase
        .from("devices")
        .select("*")
        .order("id", { ascending: false });

      if (!error && data) {
        return data.map((row) => rowToPhone(row));
      }
      console.error("[Supabase] getAllPhones error:", error);
    } catch (e) {
      console.error("[Supabase] getAllPhones exception:", e);
    }
  }

  // Fallback to local data
  return readLocalData();
}

/**
 * Fetch single item by slug
 */
export async function getPhoneBySlug(slug: string): Promise<Phone | null> {
  const supabase = getSupabaseAdminClient();

  if (supabase) {
    try {
      const { data, error } = await supabase
        .from("devices")
        .select("*")
        .eq("slug", slug)
        .maybeSingle();

      if (!error && data) {
        return rowToPhone(data);
      }
    } catch (e) {
      console.error("[Supabase] getPhoneBySlug exception:", e);
    }
  }

  const phones = readLocalData();
  return phones.find((p) => p.slug === slug) || null;
}

/**
 * Fetch single item by numeric ID
 */
export async function getPhoneById(id: number): Promise<Phone | null> {
  const supabase = getSupabaseAdminClient();

  if (supabase) {
    try {
      const { data, error } = await supabase
        .from("devices")
        .select("*")
        .eq("id", id)
        .maybeSingle();

      if (!error && data) {
        return rowToPhone(data);
      }
    } catch (e) {
      console.error("[Supabase] getPhoneById exception:", e);
    }
  }

  const phones = readLocalData();
  return phones.find((p) => p.id === id) || null;
}

/**
 * Create a new device listing
 */
export async function createPhone(
  data: Omit<Phone, "id">
): Promise<Phone> {
  // Normalize slug
  let slug =
    data.slug ||
    data.name
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)+/g, "");

  const supabase = getSupabaseAdminClient();

  if (supabase) {
    try {
      // Check for slug collision
      const { data: existing } = await supabase
        .from("devices")
        .select("id")
        .eq("slug", slug)
        .maybeSingle();

      if (existing) {
        slug = `${slug}-${Date.now().toString().slice(-4)}`;
      }

      const row = phoneToRow({ ...data, slug });
      const { data: created, error } = await supabase
        .from("devices")
        .insert(row)
        .select("*")
        .single();

      if (!error && created) {
        triggerRevalidation();
        return rowToPhone(created);
      }
      console.error("[Supabase] createPhone error:", error);
    } catch (e) {
      console.error("[Supabase] createPhone exception:", e);
    }
  }

  // Local fallback
  const phones = readLocalData();
  const nextId =
    phones.length > 0 ? Math.max(...phones.map((p) => p.id)) + 1 : 1;

  const existingSlug = phones.find((p) => p.slug === slug);
  if (existingSlug) {
    slug = `${slug}-${nextId}`;
  }

  const newPhone: Phone = {
    ...data,
    id: nextId,
    slug,
  };

  phones.unshift(newPhone);
  writeLocalData(phones);
  triggerRevalidation();
  return newPhone;
}

/**
 * Update existing device listing
 */
export async function updatePhone(
  id: number,
  data: Partial<Phone>
): Promise<Phone | null> {
  const supabase = getSupabaseAdminClient();

  if (supabase) {
    try {
      const row = phoneToRow(data);
      delete row.id; // Protect primary key

      const { data: updated, error } = await supabase
        .from("devices")
        .update(row)
        .eq("id", id)
        .select("*")
        .single();

      if (!error && updated) {
        triggerRevalidation();
        return rowToPhone(updated);
      }
      console.error("[Supabase] updatePhone error:", error);
    } catch (e) {
      console.error("[Supabase] updatePhone exception:", e);
    }
  }

  // Local fallback
  const phones = readLocalData();
  const index = phones.findIndex((p) => p.id === id);
  if (index === -1) return null;

  const updated: Phone = {
    ...phones[index],
    ...data,
    id,
  };

  phones[index] = updated;
  writeLocalData(phones);
  triggerRevalidation();
  return updated;
}

/**
 * Delete a device listing
 */
export async function deletePhone(id: number): Promise<boolean> {
  const supabase = getSupabaseAdminClient();

  if (supabase) {
    try {
      const { error } = await supabase
        .from("devices")
        .delete()
        .eq("id", id);

      if (!error) {
        triggerRevalidation();
        return true;
      }
      console.error("[Supabase] deletePhone error:", error);
    } catch (e) {
      console.error("[Supabase] deletePhone exception:", e);
    }
  }

  // Local fallback
  const phones = readLocalData();
  const index = phones.findIndex((p) => p.id === id);
  if (index === -1) return false;

  phones.splice(index, 1);
  const success = writeLocalData(phones);
  triggerRevalidation();
  return success;
}
