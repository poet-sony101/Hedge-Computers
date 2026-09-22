import { Suspense } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ProductCatalogClient from "./ProductCatalogClient";
import { getAllPhones } from "@/services/phoneService";

export const metadata = {
  title: "Products Catalog | Available Tech",
  description:
    "Explore our complete catalog of smartphones, MacBooks, laptops, gadgets, and accessories. Inquire for today's market price directly on WhatsApp.",
};

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function ProductsPage() {
  const allProducts = await getAllPhones();

  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-28 pb-24">
        <Suspense
          fallback={
            <div className="container-custom py-24 text-center text-zinc-500">
              Loading technology catalog...
            </div>
          }
        >
          <ProductCatalogClient initialProducts={allProducts} />
        </Suspense>
      </main>
      <Footer />
    </>
  );
}
