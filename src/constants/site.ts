export const SITE_CONFIG = {
  name: "Hedge Computers",
  shortName: "Hedge Computers",
  tagline: "USA Used & Brand New Computers, Laptops & Gadgets",
  description:
    "Discover verified brand-new and premium USA-used laptops, MacBooks, computers, and gadgets. We supply in bulk and sell in units at Computer Village, Ikeja, Lagos.",
  url: "https://hedgecomputers.ng",
  phone: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "+2349091285828",
  displayPhone: "+234 909 128 5828",
  email: "sales@hedgecomputers.ng",
  address: "12 Oshitelu street, Computer Village, Ikeja, Lagos, Nigeria 100271",
  operatingHours: "Mon - Sat: 8:30 AM - 6:30 PM",
  socials: {
    whatsapp: "https://wa.me/2349091285828",
    instagram: "https://instagram.com/hedge_computers",
    twitter: "https://twitter.com/hedge_computers",
  },
  navLinks: [
    { label: "Home", href: "/" },
    { label: "Laptops", href: "/laptops" },
    { label: "Phones & Gadgets", href: "/phones" },
    { label: "All Products", href: "/products" },
    { label: "Bulk Quote", href: "/request" },
    { label: "Store Contact", href: "/contact" },
  ],
};
