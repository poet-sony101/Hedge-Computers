import {
  ShieldCheck,
  TrendingDown,
  Truck,
  MessageSquareCheck,
} from "lucide-react";

const features = [
  {
    title: "100% Genuine & Tested",
    icon: ShieldCheck,
    description:
      "Every UK-used device passes a rigorous 25-point hardware and battery health inspection before listing. Brand-new phones remain factory-sealed.",
  },
  {
    title: "Daily Market Pricing",
    icon: TrendingDown,
    description:
      "Phone exchange rates shift daily. Instead of inflated static markups, we quote you today's sharpest price in real-time.",
  },
  {
    title: "Nationwide Safe Delivery",
    icon: Truck,
    description:
      "Fast, insured shipping across Lagos and every state in Nigeria. Pick-up at our physical tech hub is also available.",
  },
  {
    title: "Direct WhatsApp Support",
    icon: MessageSquareCheck,
    description:
      "No automated bots. Speak directly with a phone specialist who understands specifications, trade-ins, and recommendations.",
  },
];

export default function WhyChooseUs() {
  return (
    <section className="container-custom py-20">
      <div className="mb-14 text-center max-w-2xl mx-auto">
        <span className="text-xs font-semibold uppercase tracking-wider text-blue-400">
          The New Dawn Standard
        </span>
        <h2 className="text-3xl md:text-4xl font-bold mt-2 text-white">
          Why Discerning Buyers Choose Us
        </h2>
        <p className="mt-3 text-sm text-zinc-400">
          We combine the confidence of a premium showroom with the agility of personalized customer service.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {features.map((feature) => (
          <div
            key={feature.title}
            className="group relative rounded-3xl border border-white/10 bg-zinc-950/40 p-7 transition-all duration-300 hover:border-blue-500/40 hover:bg-zinc-900/40"
          >
            <div className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-500/10 text-blue-400 group-hover:bg-blue-500/20 group-hover:text-blue-300 transition-colors">
              <feature.icon size={24} />
            </div>

            <h3 className="text-lg font-semibold text-white">
              {feature.title}
            </h3>

            <p className="mt-2 text-sm leading-relaxed text-zinc-400">
              {feature.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}