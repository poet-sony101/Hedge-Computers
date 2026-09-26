/**
 * Hedge Computers - Available Tech UI Engine
 * Built with Apple-minimalist Design System + Hedge Computers Crimson Brand Colors
 */

// Inventory Data
const LAPTOP_INVENTORY = [
  {
    id: 'hp-elitebook-1040-g10',
    title: 'HP EliteBook 1040 G10 x360',
    brand: 'hp',
    condition: 'used',
    conditionLabel: 'USA Used (Grade A+)',
    price: 1150000,
    category: 'business',
    processor: 'Intel Core i7-1365U (13th Gen, 10-Cores, up to 5.2GHz)',
    ram: 16,
    storage: '512GB PCIe NVMe SSD',
    display: '14.0" WUXGA Touchscreen 360° Foldable IPS',
    gpu: 'Intel Iris Xe Graphics',
    batteryHealth: '94% Certified Health',
    weight: '1.34 kg',
    featured: true,
    image: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=700&q=80',
    tags: ['Touchscreen', 'Convertible x360', '13th Gen i7', 'Backlit KB'],
    description: 'Flagship enterprise convertible directly imported from corporate US. Clean metal chassis, vivid 360-degree touchscreen with pen support, rapid 13th Gen i7 processing power, and crisp Bang & Olufsen audio.'
  },
  {
    id: 'macbook-pro-14-m3',
    title: 'Apple MacBook Pro 14" (M3 Chip)',
    brand: 'apple',
    condition: 'new',
    conditionLabel: 'Brand New Sealed',
    price: 2100000,
    category: 'creative',
    processor: 'Apple M3 Chip (8-Core CPU, 10-Core GPU)',
    ram: 16,
    storage: '512GB Ultra-Fast SSD',
    display: '14.2" Liquid Retina XDR (3024x1964) 120Hz ProMotion',
    gpu: 'Apple 10-Core Integrated GPU',
    batteryHealth: '100% Brand New Sealed',
    weight: '1.55 kg',
    featured: true,
    image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=700&q=80',
    tags: ['M3 Chip', 'Liquid Retina XDR', '120Hz ProMotion', 'New Sealed'],
    description: 'Brand new sealed Apple MacBook Pro 14 featuring the revolutionary M3 silicon. Unrivaled performance per watt, breathtaking 120Hz Liquid Retina XDR display, up to 22 hours of battery life, and complete Apple warranty.'
  },
  {
    id: 'dell-xps-15-9530',
    title: 'Dell XPS 15 9530 Creator Edition',
    brand: 'dell',
    condition: 'used',
    conditionLabel: 'USA Used (Grade A+)',
    price: 1750000,
    category: 'creative',
    processor: 'Intel Core i7-13700H (14-Cores, 20-Threads, up to 5.0GHz)',
    ram: 32,
    storage: '1TB M.2 PCIe Gen 4 SSD',
    display: '15.6" 3.5K (3456x2160) OLED InfinityEdge Touch',
    gpu: 'NVIDIA GeForce RTX 4060 (8GB GDDR6)',
    batteryHealth: '92% Certified Health',
    weight: '1.92 kg',
    featured: true,
    image: 'https://images.unsplash.com/photo-1593642632823-8f785ba67e45?auto=format&fit=crop&w=700&q=80',
    tags: ['RTX 4060 8GB', '3.5K OLED Touch', '32GB RAM', 'CNC Aluminum'],
    description: 'Top-tier powerhouse for video editors, 3D artists, and machine learning engineers. Features a jaw-dropping 3.5K OLED display, 14-core 13th Gen i7 processor, and dedicated 8GB RTX 4060 graphics.'
  },
  {
    id: 'thinkpad-x1-carbon-gen10',
    title: 'Lenovo ThinkPad X1 Carbon Gen 10',
    brand: 'lenovo',
    condition: 'used',
    conditionLabel: 'USA Used (Grade A+)',
    price: 780000,
    category: 'business',
    processor: 'Intel Core i7-1260P (12-Cores, up to 4.70GHz)',
    ram: 16,
    storage: '512GB PCIe Gen 4 SSD',
    display: '14.0" WUXGA (1920x1200) Anti-Glare IPS 400 nits',
    gpu: 'Intel Iris Xe Graphics',
    batteryHealth: '91% Certified Health',
    weight: '1.12 kg',
    featured: true,
    image: 'https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?auto=format&fit=crop&w=700&q=80',
    tags: ['Ultra-Light 1.1kg', 'Carbon Fiber', 'Legendary Keyboard'],
    description: 'The definitive business executive laptop. Ultra-durable carbon fiber chassis tested against military-grade MIL-STD 810H standards, world-renowned tactile keyboard, and featherlight 1.12kg carry weight.'
  },
  {
    id: 'hp-envy-x360-15',
    title: 'HP Envy x360 15 2-in-1',
    brand: 'hp',
    condition: 'used',
    conditionLabel: 'USA Used (Grade A+)',
    price: 620000,
    category: 'student',
    processor: 'AMD Ryzen 7 7730U (8-Cores, 16-Threads, up to 4.5GHz)',
    ram: 16,
    storage: '512GB NVMe M.2 SSD',
    display: '15.6" FHD (1920x1080) Multitouch Edge-to-Edge Glass',
    gpu: 'AMD Radeon Graphics',
    batteryHealth: '89% Certified Health',
    weight: '1.82 kg',
    featured: false,
    image: 'https://images.unsplash.com/photo-1589652717521-10c0d092dea9?auto=format&fit=crop&w=700&q=80',
    tags: ['Ryzen 7 8-Core', 'Touchscreen x360', 'Bang & Olufsen'],
    description: 'Sleek all-metal convertible laptop ideal for tech students, content streaming, and digital creators. 8-core Ryzen 7 delivers fluid multitasking and impressive battery autonomy.'
  },
  {
    id: 'dell-latitude-7420',
    title: 'Dell Latitude 7420 Business Flagship',
    brand: 'dell',
    condition: 'used',
    conditionLabel: 'USA Used (Grade A+)',
    price: 440000,
    category: 'business',
    processor: 'Intel Core i7-1185G7 (11th Gen vPro, up to 4.8GHz)',
    ram: 16,
    storage: '512GB PCIe NVMe SSD',
    display: '14.0" FHD (1920x1080) ComfortView Plus Non-Glare',
    gpu: 'Intel Iris Xe Graphics',
    batteryHealth: '88% Certified Health',
    weight: '1.22 kg',
    featured: false,
    image: 'https://images.unsplash.com/photo-1593642702821-c8da6771f0c6?auto=format&fit=crop&w=700&q=80',
    tags: ['Best Seller ₦440k', 'Core i7 vPro', 'Lightweight', 'Thunderbolt 4'],
    description: 'Our #1 corporate bulk best-seller. Known for extraordinary motherboard reliability, quiet thermals, all-day battery life, and crisp 1080p display with privacy shutter.'
  },
  {
    id: 'asus-rog-zephyrus-g14',
    title: 'ASUS ROG Zephyrus G14 Gaming / AI',
    brand: 'asus',
    condition: 'used',
    conditionLabel: 'USA Used (Grade A+)',
    price: 1890000,
    category: 'gaming',
    processor: 'AMD Ryzen 9 6900HS (8-Cores, 16-Threads, 4.9GHz)',
    ram: 32,
    storage: '1TB PCIe 4.0 NVMe SSD',
    display: '14.0" QHD+ (2560x1600) 120Hz ROG Nebula Display',
    gpu: 'AMD Radeon RX 6800S (8GB GDDR6 Dedicated)',
    batteryHealth: '90% Certified Health',
    weight: '1.65 kg',
    featured: true,
    image: 'https://images.unsplash.com/photo-1603302576837-37561b2e2302?auto=format&fit=crop&w=700&q=80',
    tags: ['Ryzen 9', '32GB RAM', '8GB GPU', '120Hz QHD+'],
    description: 'Compact 14-inch gaming and AI computing beast. Liquid metal cooling, gorgeous ROG Nebula 120Hz display, and heavy-duty 8GB dedicated GPU capable of running AAA titles and rendering 4K edits effortlessly.'
  },
  {
    id: 'macbook-air-m2',
    title: 'Apple MacBook Air 13.6" (M2 Chip)',
    brand: 'apple',
    condition: 'used',
    conditionLabel: 'USA Used (Grade A+)',
    price: 1050000,
    category: 'programming',
    processor: 'Apple M2 Chip (8-Core CPU, 8-Core GPU)',
    ram: 8,
    storage: '256GB SSD',
    display: '13.6" Liquid Retina Display with True Tone (500 nits)',
    gpu: 'Apple 8-Core Integrated GPU',
    batteryHealth: '96% Certified Health',
    weight: '1.24 kg',
    featured: false,
    image: 'https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?auto=format&fit=crop&w=700&q=80',
    tags: ['M2 Chip', 'Midnight Finish', 'Liquid Retina', 'Fanless Silent'],
    description: 'Modern redesigned MacBook Air in pristine Midnight finish. Fanless whisper-silent design, MagSafe 3 quick charge, 1080p FaceTime HD camera, and remarkable 18-hour battery longevity.'
  },
  {
    id: 'hp-pavilion-15-i5',
    title: 'HP Pavilion 15-eg Series',
    brand: 'hp',
    condition: 'used',
    conditionLabel: 'USA Used (Grade A+)',
    price: 385000,
    category: 'student',
    processor: 'Intel Core i5-1235U (12th Gen 10-Cores, up to 4.4GHz)',
    ram: 16,
    storage: '512GB NVMe SSD',
    display: '15.6" Full HD (1920x1080) Micro-Edge IPS',
    gpu: 'Intel Iris Xe Graphics',
    batteryHealth: '87% Certified Health',
    weight: '1.74 kg',
    featured: false,
    image: 'https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?auto=format&fit=crop&w=700&q=80',
    tags: ['Budget King ₦385k', '12th Gen i5', '16GB RAM', 'Full Numpad'],
    description: 'The perfect balance of high-spec performance and budget affordability. 10-core 12th Gen i5 with 16GB RAM ensures snappy multitasking for coding students, virtual assistants, and office managers.'
  },
  {
    id: 'dell-precision-7550',
    title: 'Dell Precision 7550 Heavy Workstation',
    brand: 'dell',
    condition: 'used',
    conditionLabel: 'USA Used (Grade A+)',
    price: 980000,
    category: 'programming',
    processor: 'Intel Core i9-10885H (8-Cores, 16-Threads, up to 5.3GHz)',
    ram: 64,
    storage: '1TB NVMe Gen 3 SSD',
    display: '15.6" UltraSharp FHD (1920x1080) 500 nits',
    gpu: 'NVIDIA Quadro RTX 4000 (8GB GDDR6 Dedicated)',
    batteryHealth: '86% Certified Health',
    weight: '2.45 kg',
    featured: false,
    image: 'https://images.unsplash.com/photo-1541807084-5c52b6b3adef?auto=format&fit=crop&w=700&q=80',
    tags: ['64GB RAM', 'Core i9', 'Quadro RTX 4000 8GB'],
    description: 'Industrial heavy-duty mobile workstation engineered for CAD/SolidWorks, Revit, architecture rendering, and large machine learning datasets with massive 64GB RAM and Quadro workstation GPU.'
  },
  {
    id: 'hp-probook-450-g9',
    title: 'HP ProBook 450 G9 (Brand New)',
    brand: 'hp',
    condition: 'new',
    conditionLabel: 'Brand New Sealed',
    price: 465000,
    category: 'business',
    processor: 'Intel Core i5-1235U (12th Gen, up to 4.4GHz)',
    ram: 16,
    storage: '512GB PCIe NVMe SSD',
    display: '15.6" Diagonal FHD IPS Anti-Glare (1920x1080)',
    gpu: 'Intel Iris Xe Graphics',
    batteryHealth: '100% Brand New Boxed',
    weight: '1.74 kg',
    featured: false,
    image: 'https://images.unsplash.com/photo-1516387938699-a93567ec168e?auto=format&fit=crop&w=700&q=80',
    tags: ['Brand New Sealed', 'HP Warranty', 'Aluminum Deck'],
    description: 'Factory sealed HP ProBook 450 G9 in box. Modern aluminum keyboard deck, commercial security firmware (HP Wolf Security), and reliable performance for corporate deployments.'
  },
  {
    id: 'thinkpad-t14s-gen3',
    title: 'Lenovo ThinkPad T14s Gen 3',
    brand: 'lenovo',
    condition: 'used',
    conditionLabel: 'USA Used (Grade A+)',
    price: 590000,
    category: 'programming',
    processor: 'AMD Ryzen 7 PRO 6850U (8-Cores, 16-Threads, 4.7GHz)',
    ram: 16,
    storage: '512GB PCIe Gen 4 SSD',
    display: '14.0" WUXGA (1920x1200) Low Power IPS 400 nits',
    gpu: 'AMD Radeon 680M Graphics',
    batteryHealth: '93% Certified Health',
    weight: '1.23 kg',
    featured: false,
    image: 'https://images.unsplash.com/photo-1522199755839-a2bacb67c546?auto=format&fit=crop&w=700&q=80',
    tags: ['Ryzen 7 PRO', 'Radeon 680M', 'Magnesium Alloy'],
    description: 'Enterprise favorite ThinkPad with AMD Ryzen 7 PRO and high-performance Radeon 680M graphics. Phenomenal efficiency, 10+ hour real-world battery runtime, and legendary durability.'
  }
];

// App State
const state = {
  products: [...LAPTOP_INVENTORY],
  filters: {
    condition: 'all',
    brand: 'all',
    ram: 'all',
    category: 'all',
    maxPrice: 2500000,
    searchQuery: '',
    sortBy: 'featured'
  },
  cart: []
};

// Format currency in Nigerian Naira (₦)
function formatNaira(amount) {
  return '₦' + Number(amount).toLocaleString('en-NG');
}

// Generate pre-filled WhatsApp link for direct ordering
function getWhatsAppOrderLink(laptop) {
  const text = `Hello Hedge Computers! I saw the *${laptop.title}* on your website for *${formatNaira(laptop.price)}* (${laptop.conditionLabel}).%0A%0ASpecs: ${laptop.processor}, ${laptop.ram}GB RAM, ${laptop.storage}.%0AIs this unit currently available for pickup at your 12 Oshitelu Street, Ikeja showroom or nationwide delivery?`;
  return `https://wa.me/2349091285828?text=${text}`;
}

// Theme Management (Available Tech Theme System)
function initTheme() {
  const storedTheme = localStorage.getItem('hedge_theme');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  
  if (storedTheme === 'dark' || (!storedTheme && prefersDark)) {
    document.documentElement.classList.add('dark');
  } else {
    document.documentElement.classList.remove('dark');
  }
  updateThemeIcon();

  const toggleBtn = document.getElementById('theme-toggle-btn');
  if (toggleBtn) {
    toggleBtn.addEventListener('click', () => {
      document.documentElement.classList.toggle('dark');
      const isDark = document.documentElement.classList.contains('dark');
      localStorage.setItem('hedge_theme', isDark ? 'dark' : 'light');
      updateThemeIcon();
    });
  }
}

function updateThemeIcon() {
  const isDark = document.documentElement.classList.contains('dark');
  const sunIcon = document.getElementById('theme-icon-sun');
  const moonIcon = document.getElementById('theme-icon-moon');

  if (sunIcon && moonIcon) {
    if (isDark) {
      sunIcon.classList.remove('hidden');
      moonIcon.classList.add('hidden');
    } else {
      sunIcon.classList.add('hidden');
      moonIcon.classList.remove('hidden');
    }
  }
}

// Initialize Application
document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initLagosClock();
  setupEventListeners();
  renderProducts();
  updateBulkEstimator();
  initLucideIcons();
});

function initLucideIcons() {
  if (window.lucide) {
    window.lucide.createIcons();
  }
}

// Live Lagos Clock & Store Open/Closed Check
function initLagosClock() {
  function updateClock() {
    const now = new Date();
    // Lagos is UTC+1 (West Africa Time)
    const utc = now.getTime() + (now.getTimezoneOffset() * 60000);
    const lagosTime = new Date(utc + (3600000 * 1));

    const hours = lagosTime.getHours();
    const minutes = String(lagosTime.getMinutes()).padStart(2, '0');
    const day = lagosTime.getDay();

    const timeString = `${hours % 12 || 12}:${minutes} ${hours >= 12 ? 'PM' : 'AM'}`;
    const lagosTimeEl = document.getElementById('lagos-time');
    if (lagosTimeEl) lagosTimeEl.textContent = timeString;

    let isOpen = false;
    if (day >= 1 && day <= 5) {
      if ((hours > 8 || (hours === 8 && lagosTime.getMinutes() >= 30)) && hours < 18) {
        isOpen = true;
      } else if (hours === 18 && lagosTime.getMinutes() <= 30) {
        isOpen = true;
      }
    } else if (day === 6) {
      if (hours >= 9 && hours < 18) {
        isOpen = true;
      }
    }

    const badge = document.getElementById('store-status-badge');
    if (badge) {
      if (isOpen) {
        badge.innerHTML = `<span class="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span> Store Open (Lagos: <span class="font-mono text-[#1d1d1f] dark:text-white font-semibold">${timeString}</span>)`;
      } else {
        badge.innerHTML = `<span class="w-2 h-2 rounded-full bg-amber-500"></span> Online &amp; Waybills Active (Lagos: <span class="font-mono text-[#1d1d1f] dark:text-white font-semibold">${timeString}</span>)`;
      }
    }
  }

  updateClock();
  setInterval(updateClock, 30000);
}

// Render Products Grid (Exact Available Tech PhoneCard.tsx Layout)
function renderProducts() {
  const grid = document.getElementById('product-grid');
  const noProductsView = document.getElementById('no-products-view');
  const resultsCount = document.getElementById('results-count');

  if (!grid) return;

  // Filter products
  let filtered = state.products.filter(item => {
    if (state.filters.condition !== 'all' && item.condition !== state.filters.condition) {
      return false;
    }
    if (state.filters.brand !== 'all' && item.brand !== state.filters.brand) {
      return false;
    }
    if (state.filters.ram !== 'all' && item.ram !== Number(state.filters.ram)) {
      return false;
    }
    if (state.filters.category !== 'all' && item.category !== state.filters.category) {
      return false;
    }
    if (item.price > state.filters.maxPrice) {
      return false;
    }
    if (state.filters.searchQuery.trim() !== '') {
      const q = state.filters.searchQuery.toLowerCase();
      const matchTitle = item.title.toLowerCase().includes(q);
      const matchBrand = item.brand.toLowerCase().includes(q);
      const matchProcessor = item.processor.toLowerCase().includes(q);
      const matchTags = item.tags.some(t => t.toLowerCase().includes(q));
      const matchDesc = item.description.toLowerCase().includes(q);
      if (!matchTitle && !matchBrand && !matchProcessor && !matchTags && !matchDesc) {
        return false;
      }
    }
    return true;
  });

  // Sort
  if (state.filters.sortBy === 'price-asc') {
    filtered.sort((a, b) => a.price - b.price);
  } else if (state.filters.sortBy === 'price-desc') {
    filtered.sort((a, b) => b.price - a.price);
  } else if (state.filters.sortBy === 'ram-desc') {
    filtered.sort((a, b) => b.ram - a.ram);
  } else {
    filtered.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
  }

  if (resultsCount) {
    resultsCount.textContent = `Showing ${filtered.length} Machines`;
  }

  if (filtered.length === 0) {
    grid.innerHTML = '';
    noProductsView.classList.remove('hidden');
    return;
  }

  noProductsView.classList.add('hidden');

  // Render cards exactly using Available Tech PhoneCard.tsx structure
  grid.innerHTML = filtered.map(item => {
    const isNew = item.condition === 'new';

    return `
      <article class="group relative flex flex-col justify-between overflow-hidden rounded-[28px] border border-black/[0.08] dark:border-white/10 bg-white dark:bg-[#1c1c1e] shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
        
        <!-- Top Image & Badge Container (Available Tech Style) -->
        <div class="relative flex h-60 w-full items-center justify-center bg-zinc-50 dark:bg-zinc-900/40 p-6 overflow-hidden">
          
          <!-- Condition Badge -->
          <div class="absolute top-4 left-4 z-10 flex items-center gap-1.5">
            <span class="inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-[11px] font-semibold tracking-wide backdrop-blur-md ${
              isNew
                ? 'bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border border-emerald-500/20'
                : 'bg-zinc-200/80 text-zinc-800 dark:bg-white/10 dark:text-zinc-200 border border-black/5 dark:border-white/10'
            }">
              ${item.conditionLabel}
            </span>
          </div>

          <!-- Brand Tag -->
          <div class="absolute top-4 right-4 z-10">
            <span class="rounded-full bg-white/80 dark:bg-zinc-900/80 px-2.5 py-0.5 text-[11px] font-medium text-zinc-600 dark:text-zinc-400 border border-black/5 dark:border-white/5">
              ${item.brand.toUpperCase()}
            </span>
          </div>

          <!-- Product Image -->
          <div class="relative flex h-full w-full items-center justify-center cursor-pointer" onclick="openProductQuickView('${item.id}')">
            <img 
              src="${item.image}" 
              alt="${item.title}" 
              loading="lazy" 
              class="max-h-44 w-auto object-contain transition-transform duration-500 group-hover:scale-105 drop-shadow-md"
            >
          </div>

          <!-- In Stock Indicator -->
          <div class="absolute bottom-3 left-4">
            <span class="inline-flex items-center gap-1 text-[11px] text-zinc-500 dark:text-zinc-400">
              <i data-lucide="check-circle-2" class="h-3.5 w-3.5 text-emerald-500"></i>
              In Stock • Ikeja
            </span>
          </div>
        </div>

        <!-- Card Body -->
        <div class="flex flex-1 flex-col justify-between p-6">
          <div>
            <h3 
              class="text-lg font-bold text-[#1d1d1f] dark:text-white transition-colors group-hover:underline cursor-pointer" 
              onclick="openProductQuickView('${item.id}')"
            >
              ${item.title}
            </h3>

            <p class="mt-1 text-xs text-zinc-500 dark:text-zinc-400 line-clamp-1">
              ${item.processor}
            </p>

            <!-- Specs Pills -->
            <div class="mt-4 flex flex-wrap items-center gap-2">
              <span class="rounded-full bg-zinc-100 dark:bg-zinc-800 px-2.5 py-0.5 text-[11px] font-medium text-zinc-700 dark:text-zinc-300 border border-black/[0.04] dark:border-white/5">
                ${item.storage}
              </span>
              <span class="rounded-full bg-zinc-100 dark:bg-zinc-800 px-2.5 py-0.5 text-[11px] font-semibold text-zinc-700 dark:text-zinc-300 border border-black/[0.04] dark:border-white/5">
                ${item.ram}GB RAM
              </span>
              <span class="rounded-full bg-zinc-100 dark:bg-zinc-800 px-2.5 py-0.5 text-[10px] text-zinc-600 dark:text-zinc-400 border border-black/[0.04] dark:border-white/5">
                🔋 ${item.batteryHealth.split(' ')[0]}
              </span>
            </div>
          </div>

          <!-- Card Bottom Area -->
          <div class="mt-6 pt-4 border-t border-black/[0.06] dark:border-white/10">
            
            <div class="flex items-baseline justify-between mb-3">
              <div>
                <div class="text-xl font-bold text-[#1d1d1f] dark:text-white font-mono">${formatNaira(item.price)}</div>
                <span class="text-[10px] text-zinc-400">Daily Market Rate</span>
              </div>
              <button 
                onclick="addToCart('${item.id}')" 
                class="p-2 rounded-full bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 text-[#1d1d1f] dark:text-white transition-colors"
                title="Add to quotation list"
              >
                <i data-lucide="plus" class="w-4 h-4"></i>
              </button>
            </div>

            <!-- Two Action Buttons (Available Tech Style) -->
            <div class="grid grid-cols-2 gap-2">
              <button 
                onclick="openProductQuickView('${item.id}')" 
                class="rounded-full border border-black/10 dark:border-white/15 bg-white dark:bg-zinc-900 hover:bg-zinc-100 dark:hover:bg-zinc-800 py-2.5 text-[#1d1d1f] dark:text-white text-xs font-semibold shadow-sm transition-all"
              >
                Details
              </button>
              <a 
                href="${getWhatsAppOrderLink(item)}" 
                target="_blank" 
                rel="noopener noreferrer"
                class="rounded-full bg-[#1d1d1f] hover:bg-black text-white dark:bg-white dark:text-black dark:hover:bg-zinc-200 py-2.5 text-xs font-semibold shadow-sm transition-all flex items-center justify-center gap-1.5"
              >
                <i data-lucide="message-circle" class="w-3.5 h-3.5 text-emerald-500"></i>
                WhatsApp
              </a>
            </div>

          </div>

        </div>

      </article>
    `;
  }).join('');

  initLucideIcons();
}

// Quick View Modal
function openProductQuickView(productId) {
  const item = state.products.find(p => p.id === productId);
  if (!item) return;

  const container = document.getElementById('modal-content-container');
  const modal = document.getElementById('quick-view-modal');
  const isNew = item.condition === 'new';

  container.innerHTML = `
    <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
      
      <div class="lg:col-span-6 space-y-4">
        <div class="aspect-[16/11] bg-zinc-50 dark:bg-zinc-900/60 rounded-3xl overflow-hidden border border-black/[0.08] dark:border-white/10 relative flex items-center justify-center p-6">
          <img src="${item.image}" alt="${item.title}" class="max-h-60 w-auto object-contain drop-shadow-md">
          <div class="absolute top-4 left-4">
            <span class="rounded-full px-3 py-1 text-xs font-semibold ${isNew ? 'bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border border-emerald-500/20' : 'bg-zinc-200/80 text-zinc-800 dark:bg-white/10 dark:text-zinc-200 border border-black/5 dark:border-white/10'} backdrop-blur-md">
              ${item.conditionLabel}
            </span>
          </div>
          <div class="absolute bottom-4 left-4 right-4 bg-white/90 dark:bg-black/90 backdrop-blur-md p-3 rounded-2xl border border-black/10 dark:border-white/10 flex items-center justify-between text-xs">
            <span class="text-zinc-500">Battery Status:</span>
            <span class="text-emerald-600 dark:text-emerald-400 font-bold">${item.batteryHealth}</span>
          </div>
        </div>

        <!-- 18-Point Diagnostic Checklist Card -->
        <div class="bg-zinc-50 dark:bg-zinc-900/40 border border-black/[0.06] dark:border-white/10 rounded-2xl p-5 space-y-2.5 text-xs">
          <h4 class="font-bold text-[#1d1d1f] dark:text-white flex items-center gap-2 uppercase tracking-wider text-[11px] text-zinc-500">
            <i data-lucide="check-circle-2" class="w-4 h-4 text-brand-crimson"></i>
            Hedge Computers Diagnostic Report
          </h4>
          <div class="grid grid-cols-2 gap-2 text-[11px] text-zinc-600 dark:text-zinc-400 pt-1">
            <span class="flex items-center gap-1.5"><i data-lucide="check" class="w-3.5 h-3.5 text-emerald-500"></i> Motherboard Clean (0 Rework)</span>
            <span class="flex items-center gap-1.5"><i data-lucide="check" class="w-3.5 h-3.5 text-emerald-500"></i> Display Tested (0 Dead Pixels)</span>
            <span class="flex items-center gap-1.5"><i data-lucide="check" class="w-3.5 h-3.5 text-emerald-500"></i> Keyboard &amp; Trackpad 100%</span>
            <span class="flex items-center gap-1.5"><i data-lucide="check" class="w-3.5 h-3.5 text-emerald-500"></i> Thermal Stress Test Passed</span>
            <span class="flex items-center gap-1.5"><i data-lucide="check" class="w-3.5 h-3.5 text-emerald-500"></i> Wi-Fi, Bluetooth &amp; Ports</span>
            <span class="flex items-center gap-1.5"><i data-lucide="check" class="w-3.5 h-3.5 text-emerald-500"></i> Audio Speakers &amp; Web Cam</span>
          </div>
        </div>
      </div>

      <div class="lg:col-span-6 space-y-5">
        <div>
          <span class="text-xs uppercase tracking-wider text-brand-crimson font-bold">${item.brand.toUpperCase()} COMPUTING</span>
          <h2 class="text-2xl sm:text-3xl font-bold text-[#1d1d1f] dark:text-white mt-1 leading-snug">${item.title}</h2>
          <p class="text-zinc-600 dark:text-zinc-400 text-xs mt-2 leading-relaxed">${item.description}</p>
        </div>

        <div class="bg-zinc-50 dark:bg-zinc-900/60 p-4 rounded-2xl border border-black/[0.06] dark:border-white/10 flex items-center justify-between">
          <div>
            <div class="text-2xl font-bold text-[#1d1d1f] dark:text-white font-mono">${formatNaira(item.price)}</div>
            <div class="text-[11px] text-emerald-600 dark:text-emerald-400 font-medium">Warranty: 6 Months Included</div>
          </div>
          <div class="text-right text-[11px] text-zinc-500">
            <span class="block text-[#1d1d1f] dark:text-white font-semibold">Included Accessories:</span>
            <span>Original Charger + Bag + Mouse</span>
          </div>
        </div>

        <div class="border border-black/[0.08] dark:border-white/10 rounded-2xl overflow-hidden divide-y divide-black/[0.06] dark:divide-white/10 text-xs">
          <div class="flex p-3 bg-white dark:bg-[#1c1c1e]">
            <span class="w-32 text-zinc-400 font-medium">Processor</span>
            <span class="text-[#1d1d1f] dark:text-white font-medium">${item.processor}</span>
          </div>
          <div class="flex p-3 bg-zinc-50 dark:bg-zinc-900/40">
            <span class="w-32 text-zinc-400 font-medium">Memory (RAM)</span>
            <span class="text-[#1d1d1f] dark:text-white font-medium">${item.ram}GB High-Speed RAM</span>
          </div>
          <div class="flex p-3 bg-white dark:bg-[#1c1c1e]">
            <span class="w-32 text-zinc-400 font-medium">Storage</span>
            <span class="text-[#1d1d1f] dark:text-white font-medium">${item.storage}</span>
          </div>
          <div class="flex p-3 bg-zinc-50 dark:bg-zinc-900/40">
            <span class="w-32 text-zinc-400 font-medium">Graphics (GPU)</span>
            <span class="text-[#1d1d1f] dark:text-white font-medium">${item.gpu}</span>
          </div>
          <div class="flex p-3 bg-white dark:bg-[#1c1c1e]">
            <span class="w-32 text-zinc-400 font-medium">Display</span>
            <span class="text-[#1d1d1f] dark:text-white font-medium">${item.display}</span>
          </div>
          <div class="flex p-3 bg-zinc-50 dark:bg-zinc-900/40">
            <span class="w-32 text-zinc-400 font-medium">Weight</span>
            <span class="text-[#1d1d1f] dark:text-white font-medium">${item.weight}</span>
          </div>
        </div>

        <div class="space-y-2 pt-2">
          <div class="flex gap-3">
            <a 
              href="${getWhatsAppOrderLink(item)}" 
              target="_blank" 
              rel="noopener noreferrer"
              class="flex-1 py-3 rounded-full bg-[#1d1d1f] hover:bg-black text-white dark:bg-white dark:text-black dark:hover:bg-zinc-200 font-semibold text-xs shadow-sm transition-all flex items-center justify-center gap-2"
            >
              <i data-lucide="message-circle" class="w-4 h-4 text-emerald-500"></i>
              Order via WhatsApp Now
            </a>
            <button 
              onclick="addToCart('${item.id}'); closeProductQuickView();" 
              class="px-5 py-3 rounded-full border border-black/10 dark:border-white/15 bg-white dark:bg-zinc-900 text-[#1d1d1f] dark:text-white text-xs font-semibold shadow-sm transition-colors flex items-center justify-center gap-2"
            >
              <i data-lucide="shopping-bag" class="w-4 h-4"></i>
              Add to Quote
            </button>
          </div>
          <p class="text-center text-[11px] text-zinc-500">
            📍 Store pickup available at 12 Oshitelu St, Computer Village Ikeja. Test in person!
          </p>
        </div>

      </div>

    </div>
  `;

  modal.classList.remove('hidden');
  initLucideIcons();
}

function closeProductQuickView() {
  const modal = document.getElementById('quick-view-modal');
  if (modal) modal.classList.add('hidden');
}

// Cart & Quotation System
function addToCart(productId) {
  const product = state.products.find(p => p.id === productId);
  if (!product) return;

  const existing = state.cart.find(c => c.id === productId);
  if (existing) {
    existing.quantity += 1;
  } else {
    state.cart.push({ ...product, quantity: 1 });
  }

  updateCartUI();
  toggleCartDrawer(true);
}

function removeFromCart(productId) {
  state.cart = state.cart.filter(item => item.id !== productId);
  updateCartUI();
}

function updateCartQuantity(productId, delta) {
  const item = state.cart.find(i => i.id === productId);
  if (!item) return;

  item.quantity += delta;
  if (item.quantity <= 0) {
    removeFromCart(productId);
  } else {
    updateCartUI();
  }
}

function updateCartUI() {
  const counter = document.getElementById('cart-counter');
  const container = document.getElementById('cart-items-container');
  const subtotalEl = document.getElementById('cart-subtotal-price');
  const totalEl = document.getElementById('cart-total-price');
  const checkoutBtn = document.getElementById('cart-checkout-whatsapp');

  const totalQuantity = state.cart.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = state.cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  if (counter) counter.textContent = totalQuantity;
  if (subtotalEl) subtotalEl.textContent = formatNaira(totalPrice);
  if (totalEl) totalEl.textContent = formatNaira(totalPrice);

  if (!container) return;

  if (state.cart.length === 0) {
    container.innerHTML = `
      <div class="text-center py-16 text-zinc-500 space-y-3">
        <i data-lucide="shopping-cart" class="w-12 h-12 mx-auto text-zinc-400"></i>
        <p class="text-sm font-medium text-[#1d1d1f] dark:text-white">Your quotation list is empty</p>
        <p class="text-xs max-w-xs mx-auto">Browse through our inventory to add laptops for personal purchase or bulk order estimations.</p>
        <button onclick="toggleCartDrawer(false)" class="mt-2 px-4 py-2 rounded-full bg-[#1d1d1f] dark:bg-white text-white dark:text-black text-xs font-semibold shadow-sm">
          Browse Laptops
        </button>
      </div>
    `;
  } else {
    container.innerHTML = state.cart.map(item => `
      <div class="bg-zinc-50 dark:bg-zinc-900/60 p-4 rounded-2xl border border-black/[0.06] dark:border-white/10 space-y-3">
        <div class="flex justify-between items-start gap-3">
          <div class="flex items-center gap-3">
            <img src="${item.image}" alt="${item.title}" class="w-12 h-12 object-contain rounded-lg border border-black/5 dark:border-white/5 shrink-0">
            <div>
              <h4 class="text-xs font-bold text-[#1d1d1f] dark:text-white leading-tight">${item.title}</h4>
              <span class="text-[10px] text-zinc-500">${item.ram}GB • ${item.storage}</span>
              <div class="text-xs font-bold text-brand-crimson font-mono mt-0.5">${formatNaira(item.price)}</div>
            </div>
          </div>
          <button onclick="removeFromCart('${item.id}')" class="text-zinc-400 hover:text-red-500 p-1">
            <i data-lucide="trash-2" class="w-4 h-4"></i>
          </button>
        </div>

        <div class="flex items-center justify-between pt-2 border-t border-black/[0.04] dark:border-white/5 text-xs">
          <span class="text-zinc-500 text-[11px]">Quantity:</span>
          <div class="flex items-center gap-2 bg-white dark:bg-[#1c1c1e] px-2 py-1 rounded-full border border-black/10 dark:border-white/10">
            <button onclick="updateCartQuantity('${item.id}', -1)" class="w-5 h-5 flex items-center justify-center text-zinc-500 hover:text-[#1d1d1f] dark:hover:text-white font-bold">-</button>
            <span class="font-mono text-[#1d1d1f] dark:text-white px-2 font-bold">${item.quantity}</span>
            <button onclick="updateCartQuantity('${item.id}', 1)" class="w-5 h-5 flex items-center justify-center text-zinc-500 hover:text-[#1d1d1f] dark:hover:text-white font-bold">+</button>
          </div>
        </div>
      </div>
    `).join('');
  }

  // Set WhatsApp Checkout URL
  if (checkoutBtn) {
    if (state.cart.length === 0) {
      checkoutBtn.disabled = true;
      checkoutBtn.classList.add('opacity-50', 'cursor-not-allowed');
      checkoutBtn.onclick = null;
    } else {
      checkoutBtn.disabled = false;
      checkoutBtn.classList.remove('opacity-50', 'cursor-not-allowed');
      checkoutBtn.onclick = () => {
        let msg = `*NEW ORDER / QUOTE REQUEST - HEDGE COMPUTERS*%0A%0A`;
        state.cart.forEach((item, index) => {
          msg += `${index + 1}. *${item.title}* (${item.conditionLabel})%0A   • Qty: ${item.quantity}%0A   • Specs: ${item.ram}GB RAM / ${item.storage}%0A   • Price: ${formatNaira(item.price * item.quantity)}%0A%0A`;
        });
        msg += `*ESTIMATED TOTAL: ${formatNaira(totalPrice)}*%0A%0A`;
        msg += `Please confirm stock availability and payment/pickup details for 12 Oshitelu Street, Ikeja showroom or nationwide dispatch.`;
        
        window.open(`https://wa.me/2349091285828?text=${msg}`, '_blank');
      };
    }
  }

  initLucideIcons();
}

function toggleCartDrawer(open) {
  const drawer = document.getElementById('cart-drawer');
  if (!drawer) return;
  if (open) {
    drawer.classList.remove('hidden');
    updateCartUI();
  } else {
    drawer.classList.add('hidden');
  }
}

// Print / Export Quotation
function exportQuotationSummary() {
  if (state.cart.length === 0) {
    alert('Please add at least one laptop to your quotation list before printing.');
    return;
  }
  window.print();
}

// Bulk Wholesale Calculator
function updateBulkEstimator() {
  const tierSelect = document.getElementById('bulk-fleet-tier');
  const slider = document.getElementById('bulk-quantity-slider');
  const qtyDisplay = document.getElementById('bulk-quantity-display');
  const discountLabelEl = document.getElementById('bulk-discount-label');
  const savingsEl = document.getElementById('bulk-savings-amount');
  const finalTotalEl = document.getElementById('bulk-final-total');
  const perUnitEl = document.getElementById('bulk-per-unit-rate');
  const whatsappBtn = document.getElementById('send-bulk-quote-btn');

  if (!tierSelect || !slider) return;

  const basePrice = Number(tierSelect.options[tierSelect.selectedIndex].getAttribute('data-price')) || 550000;
  const tierName = tierSelect.options[tierSelect.selectedIndex].text.split('(')[0].trim();
  const quantity = Number(slider.value);

  if (qtyDisplay) qtyDisplay.textContent = `${quantity} Units`;

  let discountRate = 0.05;
  let discountTierText = 'Wholesale Discount (5% Tier):';
  if (quantity >= 16) {
    discountRate = 0.12;
    discountTierText = 'Wholesale Discount (12% VIP Tier):';
  } else if (quantity >= 6) {
    discountRate = 0.08;
    discountTierText = 'Wholesale Discount (8% Corporate Tier):';
  }

  const retailTotal = basePrice * quantity;
  const savings = retailTotal * discountRate;
  const finalTotal = retailTotal - savings;
  const perUnitPrice = finalTotal / quantity;

  if (discountLabelEl) discountLabelEl.textContent = discountTierText;
  if (savingsEl) savingsEl.textContent = `-${formatNaira(savings)}`;
  if (finalTotalEl) finalTotalEl.textContent = formatNaira(finalTotal);
  if (perUnitEl) perUnitEl.textContent = `~${formatNaira(perUnitPrice)} / unit`;

  if (whatsappBtn) {
    whatsappBtn.onclick = () => {
      const msg = `*BULK WHOLESALE PROCUREMENT INQUIRY*%0A%0ACompany/Client Request:%0A• Fleet Category: *${tierName}*%0A• Quantity: *${quantity} Units*%0A• Estimated Wholesale Total: *${formatNaira(finalTotal)}* (~${formatNaira(perUnitPrice)}/unit)%0A%0AWe require an official Proforma Invoice with specification sheets and dispatch timeline to our address. Thank you!`;
      window.open(`https://wa.me/2349091285828?text=${msg}`, '_blank');
    };
  }
}

// Quick filter trigger from brands
function filterByBrandQuick(brand) {
  state.filters.brand = brand;
  const brandButtons = document.querySelectorAll('.brand-filter-btn');
  brandButtons.forEach(btn => {
    if (btn.getAttribute('data-brand') === brand) {
      btn.classList.add('bg-[#1d1d1f]', 'dark:bg-white', 'text-white', 'dark:text-black', 'shadow-sm', 'font-semibold');
      btn.classList.remove('bg-zinc-100', 'dark:bg-zinc-800', 'text-zinc-700', 'dark:text-zinc-300', 'font-medium');
    } else {
      btn.classList.remove('bg-[#1d1d1f]', 'dark:bg-white', 'text-white', 'dark:text-black', 'shadow-sm', 'font-semibold');
      btn.classList.add('bg-zinc-100', 'dark:bg-zinc-800', 'text-zinc-700', 'dark:text-zinc-300', 'font-medium');
    }
  });

  renderProducts();

  const catalog = document.getElementById('catalog');
  if (catalog) catalog.scrollIntoView({ behavior: 'smooth' });
}

function resetAllFilters() {
  state.filters = {
    condition: 'all',
    brand: 'all',
    ram: 'all',
    category: 'all',
    maxPrice: 2500000,
    searchQuery: '',
    sortBy: 'featured'
  };

  document.querySelectorAll('.condition-filter-btn').forEach(btn => {
    if (btn.getAttribute('data-condition') === 'all') {
      btn.classList.add('bg-[#1d1d1f]', 'dark:bg-white', 'text-white', 'dark:text-black', 'shadow-sm', 'font-semibold');
      btn.classList.remove('text-zinc-600', 'dark:text-zinc-400');
    } else {
      btn.classList.remove('bg-[#1d1d1f]', 'dark:bg-white', 'text-white', 'dark:text-black', 'shadow-sm', 'font-semibold');
      btn.classList.add('text-zinc-600', 'dark:text-zinc-400');
    }
  });

  document.querySelectorAll('.brand-filter-btn').forEach(btn => {
    if (btn.getAttribute('data-brand') === 'all') {
      btn.classList.add('bg-[#1d1d1f]', 'dark:bg-white', 'text-white', 'dark:text-black', 'shadow-sm', 'font-semibold');
      btn.classList.remove('bg-zinc-100', 'dark:bg-zinc-800', 'text-zinc-700', 'dark:text-zinc-300');
    } else {
      btn.classList.remove('bg-[#1d1d1f]', 'dark:bg-white', 'text-white', 'dark:text-black', 'shadow-sm', 'font-semibold');
      btn.classList.add('bg-zinc-100', 'dark:bg-zinc-800', 'text-zinc-700', 'dark:text-zinc-300');
    }
  });

  const ramFilter = document.getElementById('ram-filter');
  if (ramFilter) ramFilter.value = 'all';

  const catFilter = document.getElementById('category-filter');
  if (catFilter) catFilter.value = 'all';

  const priceRange = document.getElementById('price-range');
  const priceDisplay = document.getElementById('price-display');
  if (priceRange) priceRange.value = '2500000';
  if (priceDisplay) priceDisplay.textContent = '₦2,500,000';

  const globalSearch = document.getElementById('global-search');
  if (globalSearch) globalSearch.value = '';

  const mobileSearch = document.getElementById('mobile-search');
  if (mobileSearch) mobileSearch.value = '';

  const clearBtn = document.getElementById('clear-search-btn');
  if (clearBtn) clearBtn.classList.add('hidden');

  renderProducts();
}

// Event Listeners Setup
function setupEventListeners() {
  const cartBtn = document.getElementById('cart-btn');
  if (cartBtn) {
    cartBtn.addEventListener('click', () => toggleCartDrawer(true));
  }

  const mobileToggle = document.getElementById('mobile-menu-toggle');
  const mobileMenu = document.getElementById('mobile-menu');
  if (mobileToggle && mobileMenu) {
    mobileToggle.addEventListener('click', () => {
      mobileMenu.classList.toggle('hidden');
    });
  }

  // Condition filter buttons
  const conditionButtons = document.querySelectorAll('.condition-filter-btn');
  conditionButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      conditionButtons.forEach(b => {
        b.classList.remove('bg-[#1d1d1f]', 'dark:bg-white', 'text-white', 'dark:text-black', 'shadow-sm', 'font-semibold');
        b.classList.add('text-zinc-600', 'dark:text-zinc-400');
      });
      btn.classList.add('bg-[#1d1d1f]', 'dark:bg-white', 'text-white', 'dark:text-black', 'shadow-sm', 'font-semibold');
      btn.classList.remove('text-zinc-600', 'dark:text-zinc-400');

      state.filters.condition = btn.getAttribute('data-condition');
      renderProducts();
    });
  });

  // Brand pills
  const brandButtons = document.querySelectorAll('.brand-filter-btn');
  brandButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      brandButtons.forEach(b => {
        b.classList.remove('bg-[#1d1d1f]', 'dark:bg-white', 'text-white', 'dark:text-black', 'shadow-sm', 'font-semibold');
        b.classList.add('bg-zinc-100', 'dark:bg-zinc-800', 'text-zinc-700', 'dark:text-zinc-300');
      });
      btn.classList.add('bg-[#1d1d1f]', 'dark:bg-white', 'text-white', 'dark:text-black', 'shadow-sm', 'font-semibold');
      btn.classList.remove('bg-zinc-100', 'dark:bg-zinc-800', 'text-zinc-700', 'dark:text-zinc-300');

      state.filters.brand = btn.getAttribute('data-brand');
      renderProducts();
    });
  });

  const ramFilter = document.getElementById('ram-filter');
  if (ramFilter) {
    ramFilter.addEventListener('change', (e) => {
      state.filters.ram = e.target.value;
      renderProducts();
    });
  }

  const categoryFilter = document.getElementById('category-filter');
  if (categoryFilter) {
    categoryFilter.addEventListener('change', (e) => {
      state.filters.category = e.target.value;
      renderProducts();
    });
  }

  const priceRange = document.getElementById('price-range');
  const priceDisplay = document.getElementById('price-display');
  if (priceRange && priceDisplay) {
    priceRange.addEventListener('input', (e) => {
      const val = Number(e.target.value);
      state.filters.maxPrice = val;
      priceDisplay.textContent = formatNaira(val);
      renderProducts();
    });
  }

  const sortSelect = document.getElementById('sort-select');
  if (sortSelect) {
    sortSelect.addEventListener('change', (e) => {
      state.filters.sortBy = e.target.value;
      renderProducts();
    });
  }

  const resetBtn = document.getElementById('reset-filters-btn');
  if (resetBtn) {
    resetBtn.addEventListener('click', resetAllFilters);
  }

  const globalSearch = document.getElementById('global-search');
  const clearSearchBtn = document.getElementById('clear-search-btn');
  if (globalSearch) {
    globalSearch.addEventListener('input', (e) => {
      state.filters.searchQuery = e.target.value;
      if (clearSearchBtn) {
        if (e.target.value.length > 0) {
          clearSearchBtn.classList.remove('hidden');
        } else {
          clearSearchBtn.classList.add('hidden');
        }
      }
      renderProducts();
    });
  }

  if (clearSearchBtn && globalSearch) {
    clearSearchBtn.addEventListener('click', () => {
      globalSearch.value = '';
      state.filters.searchQuery = '';
      clearSearchBtn.classList.add('hidden');
      renderProducts();
    });
  }

  const mobileSearch = document.getElementById('mobile-search');
  if (mobileSearch) {
    mobileSearch.addEventListener('input', (e) => {
      state.filters.searchQuery = e.target.value;
      renderProducts();
    });
  }

  const tierSelect = document.getElementById('bulk-fleet-tier');
  const bulkSlider = document.getElementById('bulk-quantity-slider');
  if (tierSelect) {
    tierSelect.addEventListener('change', updateBulkEstimator);
  }
  if (bulkSlider) {
    bulkSlider.addEventListener('input', updateBulkEstimator);
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeProductQuickView();
      toggleCartDrawer(false);
    }
  });
}
