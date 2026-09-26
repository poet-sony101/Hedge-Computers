import { ShieldCheck, Cpu, Video, Truck, CheckCircle2, Award } from "lucide-react";

const features = [
  {
    icon: Cpu,
    title: "25-Point Motherboard Testing",
    description:
      "Every machine undergoes rigorous hardware diagnostics: thermal stress testing, clean BIOS check, port testing, and zero board-level repairs.",
    badge: "Hardware Certified",
  },
  {
    icon: ShieldCheck,
    title: "Genuine Battery Health Guarantee",
    description:
      "No reset battery counters or swollen cells. We verify OEM cycle counts and deliver USA-Used laptops with 90%+ real battery life.",
    badge: "Original OEM",
  },
  {
    icon: Video,
    title: "Live Video Call Verification",
    description:
      "Not in Ikeja? Request a live video call to inspect the exact laptop, display pixels, serial number, and cosmetics before we dispatch.",
    badge: "Zero Surprises",
  },
  {
    icon: Truck,
    title: "Direct Computer Village Pricing",
    description:
      "Headquartered at 12 Oshitelu Street. Get true wholesale and retail rates with same-day Lagos delivery and nationwide express waybill.",
    badge: "12 Oshitelu St",
  },
];

export default function WhyChooseUs() {
  return (
    <section className="container-custom py-20">
      <div className="mb-14 text-center max-w-2xl mx-auto">
        <span className="text-xs font-bold uppercase tracking-wider text-red-600 dark:text-red-500">
          The Hedge Computers Standard
        </span>
        <h2 className="text-3xl sm:text-4xl font-black mt-2 text-zinc-950 dark:text-white tracking-tight">
          Why Discerning Engineers &amp; Buyers Choose Us
        </h2>
        <p className="mt-3 text-xs sm:text-sm text-zinc-600 dark:text-zinc-400">
          We eliminate the uncertainty of buying used and new computers in Nigeria through rigorous engineering standards and direct showroom accountability.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {features.map((feature) => {
          const Icon = feature.icon;
          return (
            <div
              key={feature.title}
              className="group relative rounded-[28px] border border-black/10 dark:border-white/10 bg-white dark:bg-[#121216] p-7 transition-all duration-300 shadow-sm hover:shadow-xl hover:border-red-500/40 hover:-translate-y-1"
            >
              <div className="flex items-center justify-between mb-5">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-red-500/10 text-red-600 border border-red-500/20 group-hover:scale-105 transition-transform">
                  <Icon className="h-6 w-6" />
                </div>
                <span className="text-[10px] font-bold text-red-600 dark:text-red-400 bg-red-500/10 px-2 py-0.5 rounded-full border border-red-500/20">
                  {feature.badge}
                </span>
              </div>
              <h3 className="text-lg font-black text-zinc-950 dark:text-white mb-2 group-hover:text-red-600 dark:group-hover:text-red-500 transition-colors">
                {feature.title}
              </h3>
              <p className="text-xs leading-relaxed text-zinc-600 dark:text-zinc-400 font-medium">
                {feature.description}
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
}