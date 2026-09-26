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
  orderType?: "Single Unit" | "Bulk Supply (Wholesale)";
  quantity?: string;
  organization?: string;
  destinationState?: string;
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
  const orderType = params.orderType || "Single Unit";
  const quantity = params.quantity || "1 Unit";

  const lines = [
    `Hello ${SITE_CONFIG.name}, ⚡`,
    "",
    `I would like to make a *Custom Request / Quote* for ${deviceType}s:`,
    "",
    `• *Order Type:* ${orderType}`,
    `• *Quantity Needed:* ${quantity}`,
    `• *Product / Model:* ${params.brand} ${params.model}`,
  ];

  if (params.storage) {
    lines.push(`• *Capacity / SSD:* ${params.storage}`);
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
    lines.push(`• *Contact Name:* ${params.customerName}`);
  }

  if (params.organization) {
    lines.push(`• *Company / Organization:* ${params.organization}`);
  }

  if (params.destinationState) {
    lines.push(`• *Delivery Destination:* ${params.destinationState}`);
  }

  if (params.notes) {
    lines.push(`• *Additional Specs / Notes:* ${params.notes}`);
  }

  lines.push("");
  if (orderType.includes("Bulk")) {
    lines.push("Please provide today's best wholesale / fleet pricing and availability for direct pickup at 12 Oshitelu Street, Computer Village or delivery.");
  } else {
    lines.push("Please confirm availability and today's sharpest rate for this machine.");
  }

  const message = lines.join("\n");
  return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
}

export function getGeneralInquiryUrl(): string {
  const phone = formatWhatsAppNumber(SITE_CONFIG.phone);
  const message = `Hello ${SITE_CONFIG.name}! I would like to inquire about your computers, laptops, and gadgets inventory.`;
  return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
}
