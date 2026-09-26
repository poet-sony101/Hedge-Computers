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
import {
  fetchFromCloudStore,
  saveToCloudStore,
  invalidateCloudCache,
} from "@/lib/cloudStore";

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
      const tmpPath = path.join(os.tmpdir(), "hedge_computers_inventory.json");
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
  invalidateCloudCache();
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
      const cloudPhones = await fetchFromCloudStore();
      const phonesToSeed = cloudPhones && cloudPhones.length > 0 ? cloudPhones : readLocalData();
      if (phonesToSeed.length > 0) {
        console.log(`[Supabase] Auto-seeding ${phonesToSeed.length} devices into Supabase...`);
        const rowsToInsert = phonesToSeed.map((p) => {
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

  // 1. Persistent Zero-Config Cloud Storage (guarantees persistence on Vercel across all lambdas & users)
  try {
    const cloudPhones = await fetchFromCloudStore();
    if (cloudPhones && Array.isArray(cloudPhones)) {
      return cloudPhones;
    }
  } catch (err) {
    console.warn("[CloudStore] Read error, falling back to local storage:", err);
  }

  // 2. Fallback to local data
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

  const phones = await getAllPhones();
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

  const phones = await getAllPhones();
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
      console.warn("[Supabase] createPhone error, seamlessly falling back to Persistent Cloud DB:", error?.message);
    } catch (e) {
      console.warn("[Supabase] createPhone exception, seamlessly falling back to Persistent Cloud DB:", e);
    }
  }

  // Cloud Store & Local fallback
  const phones = await getAllPhones();
  const nextId =
    phones.length > 0 ? Math.max(...phones.map((p) => Number(p.id) || 0)) + 1 : 1;

  const existingSlug = phones.find((p) => p.slug === slug);
  if (existingSlug) {
    slug = `${slug}-${nextId}`;
  }

  const newPhone: Phone = {
    ...data,
    id: nextId,
    slug,
  };

  const updatedPhones = [newPhone, ...phones.filter((p) => p.id !== nextId)];

  // Save to persistent cloud store
  await saveToCloudStore(updatedPhones);
  writeLocalData(updatedPhones);
  triggerRevalidation();
  return newPhone;
}

/**
 * Update existing device listing
 */
export async function updatePhone(
  id: number,
  data: Partial<Phone>,
  slug?: string
): Promise<{ success: boolean; phone?: Phone; error?: string }> {
  const supabase = getSupabaseAdminClient();
  let updatedPhone: Phone | null = null;

  if (supabase) {
    try {
      const row = phoneToRow(data);
      delete row.id;

      // 1. Try update by numeric ID
      let { data: updated, error } = await supabase
        .from("devices")
        .update(row)
        .eq("id", id)
        .select("*")
        .maybeSingle();

      // 2. If not found by ID, try update by slug
      const targetSlug = slug || data.slug;
      if (!error && !updated && targetSlug) {
        const slugRes = await supabase
          .from("devices")
          .update(row)
          .eq("slug", targetSlug)
          .select("*")
          .maybeSingle();
        updated = slugRes.data;
        error = slugRes.error;
      }

      if (!error && updated) {
        updatedPhone = rowToPhone(updated);
      }
    } catch (e) {
      console.error("[Supabase] updatePhone exception:", e);
    }
  }

  // Synchronize across Cloud Store & Local fallback
  const phones = await getAllPhones();
  const index = phones.findIndex(
    (p) => Number(p.id) === Number(id) || (slug && p.slug === slug)
  );

  let finalPhone: Phone;
  if (index !== -1) {
    finalPhone = {
      ...phones[index],
      ...data,
      id: Number(id),
    };
    phones[index] = finalPhone;
  } else if (updatedPhone) {
    finalPhone = updatedPhone;
    phones.unshift(finalPhone);
  } else {
    return { success: false, error: "Device not found in catalog" };
  }

  await saveToCloudStore(phones);
  writeLocalData(phones);

  triggerRevalidation();
  return { success: true, phone: updatedPhone || finalPhone };
}

/**
 * Delete a device listing permanently across all layers
 */
export async function deletePhone(
  id: number,
  slug?: string
): Promise<{ success: boolean; error?: string }> {
  const supabase = getSupabaseAdminClient();

  if (supabase) {
    try {
      // 1. Try deleting by numeric ID
      let { error, count } = await supabase
        .from("devices")
        .delete({ count: "exact" })
        .eq("id", id);

      // 2. If ID matched 0 rows and slug is provided, delete by slug
      if (!error && count === 0 && slug) {
        const slugRes = await supabase
          .from("devices")
          .delete({ count: "exact" })
          .eq("slug", slug);
        error = slugRes.error;
      }

      if (error) {
        console.error("[Supabase] deletePhone error:", error);
      }
    } catch (e) {
      console.error("[Supabase] deletePhone exception:", e);
    }
  }

  // Always purge from Cloud Store and local storage so the item NEVER returns
  try {
    const phones = await getAllPhones();
    const updatedPhones = phones.filter(
      (p) => Number(p.id) !== Number(id) && (!slug || p.slug !== slug)
    );
    await saveToCloudStore(updatedPhones);
    writeLocalData(updatedPhones);
  } catch (purgeErr) {
    console.warn("[Storage] Purge error:", purgeErr);
  }

  triggerRevalidation();
  return { success: true };
}
