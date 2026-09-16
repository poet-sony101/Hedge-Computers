import { SITE_CONFIG } from "@/constants/site";

export function formatWhatsAppNumber(phone: string): string {
  const cleaned = phone.replace(/[^0-9]/g, "");
  return cleaned;
}

export interface PhoneInquiryParams {
  phoneName: string;
  category?: "phone" | "laptop" | "gadget" | "accessory";
  storage?: string;
  condition?: string;
  color?: string;
  processor?: string;
  ram?: string;
  pageUrl?: string;
}

export function getPhoneInquiryUrl(params: PhoneInquiryParams): string {
  const phone = formatWhatsAppNumber(SITE_CONFIG.phone);
  
  const categoryLabels = {
    phone: "Smartphone",
    laptop: "Laptop / Computer",
    gadget: "Smart Gadget / Wearable",
    accessory: "Power / Accessory",
  };

  const categoryLabel = params.category ? categoryLabels[params.category] : "Product";

  const lines = [
    `Hello ${SITE_CONFIG.name}, 👋`,
    "",
    `I am interested in the *${params.phoneName}* (${categoryLabel}).`,
  ];

  const details: string[] = [];
  if (params.storage && params.storage !== "Standard") details.push(`Storage: *${params.storage}*`);
  if (params.ram) details.push(`RAM: *${params.ram}*`);
  if (params.processor) details.push(`CPU: *${params.processor}*`);
  if (params.condition) details.push(`Condition: *${params.condition}*`);
  if (params.color) details.push(`Color: *${params.color}*`);

  if (details.length > 0) {
    lines.push(`Specs: ${details.join(" | ")}`);
  }

  lines.push("");
  lines.push("Please, what is today's current price and availability?");

  if (params.pageUrl) {
    lines.push("");
    lines.push(`Link: ${params.pageUrl}`);
  }

  const message = lines.join("\n");
  return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
}

export interface CustomPhoneRequestParams {
  category?: "Smartphone" | "Laptop" | "Gadget" | "Accessory";
  brand: string;
  model: string;
  storage?: string;
  ram?: string;
  processor?: string;
  condition: string;
  budget?: string;
  customerName?: string;
  notes?: string;
}

export function getCustomPhoneRequestUrl(params: CustomPhoneRequestParams): string {
  const phone = formatWhatsAppNumber(SITE_CONFIG.phone);
  const deviceType = params.category || "Product";

  const lines = [
    `Hello ${SITE_CONFIG.name}, ⚡`,
    "",
    `I would like to make a *Custom Request* for a ${deviceType} not currently in the catalog:`,
    "",
    `• *Product:* ${params.brand} ${params.model}`,
  ];

  if (params.storage) {
    lines.push(`• *Capacity / Size:* ${params.storage}`);
  }

  if (params.ram) {
    lines.push(`• *RAM Memory:* ${params.ram}`);
  }

  if (params.processor) {
    lines.push(`• *Processor / Chip:* ${params.processor}`);
  }

  lines.push(`• *Condition Preference:* ${params.condition}`);

  if (params.budget) {
    lines.push(`• *Target Budget:* ${params.budget}`);
  }

  if (params.customerName) {
    lines.push(`• *Requested by:* ${params.customerName}`);
  }

  if (params.notes) {
    lines.push(`• *Additional Notes:* ${params.notes}`);
  }

  lines.push("");
  lines.push("Can you check if this item can be sourced and what today's best price is?");

  const message = lines.join("\n");
  return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
}

export function getGeneralInquiryUrl(): string {
  const phone = formatWhatsAppNumber(SITE_CONFIG.phone);
  const message = `Hello ${SITE_CONFIG.name}! I would like to inquire about your available technology products.`;
  return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
}
