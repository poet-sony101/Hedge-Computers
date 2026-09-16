import fs from "fs";
import path from "path";
import { Phone } from "@/types/phone";
import { phones as fallbackPhones } from "@/data/phones";

const DATA_FILE_PATH = path.join(process.cwd(), "src", "data", "phones.json");

function readData(): Phone[] {
  try {
    if (fs.existsSync(DATA_FILE_PATH)) {
      const content = fs.readFileSync(DATA_FILE_PATH, "utf-8");
      const parsed = JSON.parse(content);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed;
      }
    }
  } catch (error) {
    console.error("Error reading phones.json, using fallback:", error);
  }
  return fallbackPhones;
}

function writeData(phones: Phone[]): boolean {
  try {
    fs.writeFileSync(DATA_FILE_PATH, JSON.stringify(phones, null, 2), "utf-8");
    return true;
  } catch (error) {
    console.error("Error writing to phones.json:", error);
    return false;
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
  return updated;
}

export async function deletePhone(id: number): Promise<boolean> {
  const phones = readData();
  const index = phones.findIndex((p) => p.id === id);
  if (index === -1) return false;

  phones.splice(index, 1);
  return writeData(phones);
}
