export const SITE_CONFIG = {
  name: "New Dawn Technologies",
  shortName: "New Dawn",
  tagline: "Premium Technology Catalog & Daily Price Inquiries",
  description:
    "Discover genuine brand-new and premium UK-used phones, laptops, gadgets, and accessories. Request today's best market price directly on WhatsApp.",
  url: "https://newdawntechnologies.com",
  phone: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "+2348000000000",
  displayPhone: "+234 (0) 800 000 0000",
  email: "inquiries@newdawntechnologies.com",
  address: "Computer Village, Ikeja, Lagos, Nigeria",
  operatingHours: "Mon - Sat: 9:00 AM - 6:30 PM",
  socials: {
    whatsapp: "https://wa.me/2348000000000",
    instagram: "https://instagram.com/newdawntechnologies",
    twitter: "https://twitter.com/newdawntech",
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
