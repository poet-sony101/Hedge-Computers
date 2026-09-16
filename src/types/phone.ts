export type DeviceCategory = "phone" | "laptop" | "gadget" | "accessory";

export type PhoneCondition = "Brand New" | "UK Used" | "Open Box";

export interface PhoneSpecs {
  // Common / Phone Specs
  display?: string;
  processor?: string;
  ram?: string;
  camera?: string;
  battery?: string;
  os?: string;
  charging?: string;
  network?: string;
  biometrics?: string;

  // Laptop-specific Specs
  gpu?: string;
  screenSize?: string;
  storageType?: string;
  batteryHealth?: string;
  ports?: string;

  // Gadget / Accessory Specs
  connectivity?: string; // e.g. Bluetooth 5.3, MagSafe, Qi2
  compatibility?: string; // e.g. iOS & Android, USB-C Devices
  noiseCancellation?: string; // e.g. Active Noise Cancellation
  waterResistance?: string; // e.g. 100m Water Resistant, IP68
}

export interface Phone {
  id: number;
  slug: string;
  name: string;
  brand: string;
  category?: DeviceCategory;
  storage: string;
  storageOptions?: string[];
  condition: PhoneCondition;
  colors?: string[];
  image: string;
  images?: string[];
  featured: boolean;
  inStock: boolean;
  tagline?: string;
  overview?: string;
  specs?: PhoneSpecs;
  priceNote?: string;
}

export type BrandCategory =
  | "All"
  | "Apple"
  | "Samsung"
  | "Google"
  | "Dell"
  | "HP"
  | "Lenovo"
  | "Anker"
  | "Sony"
  | "Xiaomi"
  | "Tecno";