import { Suspense } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import LaptopCatalogClient from "./LaptopCatalogClient";
import { getAllPhones } from "@/services/phoneService";

export const metadata = {
  title: "Browse Laptops & MacBooks | Hedge Computers",
  description:
    "Explore verified Apple MacBooks, Dell XPS, HP Spectre, and Lenovo ThinkPads. Inquire for today's market price directly on WhatsApp.",
};

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function LaptopsPage() {
  const allDevices = await getAllPhones();
  const laptops = allDevices.filter((d) => d.category === "laptop");

  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-28 pb-24">
        <Suspense
          fallback={
            <div className="container-custom py-24 text-center text-zinc-500">
              Loading laptop catalog...
            </div>
          }
        >
          <LaptopCatalogClient initialLaptops={laptops} />
        </Suspense>
      </main>
      <Footer />
    </>
  );
}
