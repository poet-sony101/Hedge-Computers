import fs from "fs";
import path from "path";
import os from "os";
import { revalidatePath } from "next/cache";
import { Phone } from "@/types/phone";
import {
  getSupabaseAdminClient,
  rowToPhone,
  phoneToRow,
} from "@/lib/supabase";

/**
 * Returns the writable storage path.
 * On serverless platforms (e.g. Vercel), project files are read-only.
 * Using os.tmpdir() allows local seed mode to write without crashing with EROFS.
 */
function getLocalDataPath(): string {
  const bundlePath = path.join(process.cwd(), "src", "data", "phones.json");

  // In production or Vercel serverless environments, project root is read-only
  if (process.env.VERCEL || process.env.NODE_ENV === "production") {
    try {
      const tmpPath = path.join(os.tmpdir(), "available_tech_phones.json");
      if (!fs.existsSync(tmpPath)) {
        if (fs.existsSync(bundlePath)) {
          fs.copyFileSync(bundlePath, tmpPath);
        } else {
          fs.writeFileSync(tmpPath, "[]", "utf-8");
        }
      }
      return tmpPath;
    } catch (err) {
      console.warn("[Storage] Fallback to bundlePath:", err);
      return bundlePath;
    }
  }

  return bundlePath;
}

/**
 * Local file-based reader (fallback / seeding source)
 */
function readLocalData(): Phone[] {
  try {
    const filePath = getLocalDataPath();
    if (fs.existsSync(filePath)) {
      const content = fs.readFileSync(filePath, "utf-8");
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
    const filePath = getLocalDataPath();
    const dir = path.dirname(filePath);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    fs.writeFileSync(filePath, JSON.stringify(phones, null, 2), "utf-8");
    return true;
  } catch (error) {
    console.error("Error writing to phones storage:", error);
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
      throw new Error(error?.message || "Failed to create device in Supabase database");
    } catch (e) {
      console.error("[Supabase] createPhone exception:", e);
      throw e instanceof Error ? e : new Error("Failed to create device in Supabase database");
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
  const success = writeLocalData(phones);
  if (!success) {
    throw new Error(
      "Storage write failed (serverless filesystem is read-only). Please connect Supabase in Vercel settings."
    );
  }
  triggerRevalidation();
  return newPhone;
}

/**
 * Update existing device listing
 */
export async function updatePhone(
  id: number,
  data: Partial<Phone>
): Promise<{ success: boolean; phone?: Phone; error?: string }> {
  const supabase = getSupabaseAdminClient();

  if (supabase) {
    try {
      const row = phoneToRow(data);
      delete row.id;

      const { data: updated, error } = await supabase
        .from("devices")
        .update(row)
        .eq("id", id)
        .select("*")
        .maybeSingle();

      if (!error && updated) {
        triggerRevalidation();
        return { success: true, phone: rowToPhone(updated) };
      }
      console.error("[Supabase] updatePhone error:", error);
      return { success: false, error: error?.message || "Failed to update in database" };
    } catch (e) {
      console.error("[Supabase] updatePhone exception:", e);
      return { success: false, error: e instanceof Error ? e.message : "Database error" };
    }
  }

  // Local fallback
  const phones = readLocalData();
  const index = phones.findIndex((p) => p.id === id);
  if (index === -1) {
    return { success: false, error: "Device not found in catalog" };
  }

  const updated: Phone = {
    ...phones[index],
    ...data,
    id,
  };

  phones[index] = updated;
  const success = writeLocalData(phones);
  if (!success) {
    return {
      success: false,
      error: "Storage write failed (serverless filesystem is read-only). Please connect Supabase in Vercel settings.",
    };
  }

  triggerRevalidation();
  return { success: true, phone: updated };
}

/**
 * Delete a device listing
 */
export async function deletePhone(
  id: number
): Promise<{ success: boolean; error?: string }> {
  const supabase = getSupabaseAdminClient();

  if (supabase) {
    try {
      const { error, count } = await supabase
        .from("devices")
        .delete({ count: "exact" })
        .eq("id", id);

      if (!error) {
        if (count === 0) {
          return { success: false, error: "Device not found in database" };
        }
        triggerRevalidation();
        return { success: true };
      }
      console.error("[Supabase] deletePhone error:", error);
      return { success: false, error: error.message };
    } catch (e) {
      console.error("[Supabase] deletePhone exception:", e);
      return { success: false, error: e instanceof Error ? e.message : "Database error" };
    }
  }

  // Local fallback
  const phones = readLocalData();
  const index = phones.findIndex((p) => p.id === id);
  if (index === -1) {
    return { success: false, error: "Device not found in catalog" };
  }

  phones.splice(index, 1);
  const success = writeLocalData(phones);
  if (!success) {
    return {
      success: false,
      error: "Storage write failed (serverless filesystem is read-only). Please connect Supabase in Vercel settings.",
    };
  }

  triggerRevalidation();
  return { success: true };
}
