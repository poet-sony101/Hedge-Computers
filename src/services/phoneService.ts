import fs from "fs";
import path from "path";
import { revalidatePath } from "next/cache";
import { Phone } from "@/types/phone";

const DATA_FILE_PATH = path.join(process.cwd(), "src", "data", "phones.json");

function readData(): Phone[] {
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

function writeData(phones: Phone[]): boolean {
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

function triggerRevalidation() {
  try {
    revalidatePath("/", "layout");
    revalidatePath("/", "page");
    revalidatePath("/admin", "layout");
    revalidatePath("/admin/phones", "page");
    revalidatePath("/admin", "page");
    revalidatePath("/phones", "page");
    revalidatePath("/products", "page");
    revalidatePath("/laptops", "page");
  } catch {
    // revalidatePath may throw in non-request contexts
  }
}

export async function getAllPhones(): Promise<Phone[]> {
  return readData();
}

export async function getPhoneBySlug(slug: string): Promise<Phone | null> {
  const phones = readData();
  return phones.find((p) => p.slug === slug) || null;
}

export async function getPhoneById(id: number): Promise<Phone | null> {
  const phones = readData();
  return phones.find((p) => p.id === id) || null;
}

export async function createPhone(
  data: Omit<Phone, "id">
): Promise<Phone> {
  const phones = readData();
  const nextId =
    phones.length > 0 ? Math.max(...phones.map((p) => p.id)) + 1 : 1;

  // Ensure unique slug
  let slug =
    data.slug ||
    data.name
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)+/g, "");

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
  writeData(phones);
  triggerRevalidation();
  return newPhone;
}

export async function updatePhone(
  id: number,
  data: Partial<Phone>
): Promise<Phone | null> {
  const phones = readData();
  const index = phones.findIndex((p) => p.id === id);
  if (index === -1) return null;

  const updated: Phone = {
    ...phones[index],
    ...data,
    id, // protect id
  };

  phones[index] = updated;
  writeData(phones);
  triggerRevalidation();
  return updated;
}

export async function deletePhone(id: number): Promise<boolean> {
  const phones = readData();
  const index = phones.findIndex((p) => p.id === id);
  if (index === -1) return false;

  phones.splice(index, 1);
  const success = writeData(phones);
  triggerRevalidation();
  return success;
}
