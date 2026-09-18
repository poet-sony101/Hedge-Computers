export const SITE_CONFIG = {
  name: "Available Tech",
  shortName: "Available Tech",
  tagline: "Premium Technology Sourcing & Daily Market Inquiries",
  description:
    "Discover verified brand-new and premium UK-used smartphones, MacBooks, laptops, and gadgets. Request today's best market price directly on WhatsApp.",
  url: "https://availabletech.ng",
  phone: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "+2348000000000",
  displayPhone: "+234 (0) 800 000 0000",
  email: "inquiries@availabletech.ng",
  address: "Computer Village, Ikeja, Lagos, Nigeria",
  operatingHours: "Mon - Sat: 9:00 AM - 6:30 PM",
  socials: {
    whatsapp: "https://wa.me/2348000000000",
    instagram: "https://instagram.com/availabletech",
    twitter: "https://twitter.com/availabletech",
  },
  navLinks: [
    { label: "Home", href: "/" },
    { label: "All Products", href: "/products" },
    { label: "Phones", href: "/phones" },
    { label: "Laptops", href: "/laptops" },
    { label: "Request a Product", href: "/request" },
    { label: "Contact", href: "/contact" },
  ],
};
