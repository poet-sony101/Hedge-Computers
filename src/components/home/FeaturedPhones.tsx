import Link from "next/link";
import { ArrowRight } from "lucide-react";
import PhoneCard from "../phone/PhoneCard";
import { getAllPhones } from "@/services/phoneService";

export default async function FeaturedPhones() {
  const products = await getAllPhones();
  const featuredList = products.filter((p) => p.featured);
  const displayList = featuredList.length > 0 ? featuredList.slice(0, 6) : products.slice(0, 6);

  return (
    <section className="container-custom py-20">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
        <div>
          <span className="text-xs font-semibold uppercase tracking-wider text-blue-400">
            Spotlight Collection
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mt-1 text-white">
            Featured Technology
          </h2>
          <p className="mt-2 text-sm text-zinc-400">
            Hand-picked flagship smartphones, MacBooks, and smart wearables available for immediate inquiry.
          </p>
        </div>

        <Link
          href="/products"
          className="mt-4 md:mt-0 inline-flex items-center gap-2 text-sm font-semibold text-blue-400 hover:text-blue-300 transition-colors"
        >
          <span>View all {products.length} products</span>
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {displayList.map((product) => (
          <PhoneCard key={product.id} phone={product} />
        ))}
      </div>
    </section>
  );
}