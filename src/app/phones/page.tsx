import { Suspense } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import PhoneCatalogClient from "./PhoneCatalogClient";
import { getAllPhones } from "@/services/phoneService";

export const metadata = {
  title: "Browse Smartphones | Available Tech",
  description:
    "Explore our verified smartphone catalog from Apple, Samsung, Google, and more. Inquire for today's market price directly on WhatsApp.",
};

export const dynamic = "force-dynamic";

export default async function PhonesPage() {
  const allDevices = await getAllPhones();
  const phones = allDevices.filter((d) => !d.category || d.category === "phone");

  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-28 pb-24">
        <Suspense
          fallback={
            <div className="container-custom py-24 text-center text-zinc-500">
              Loading smartphone catalog...
            </div>
          }
        >
          <PhoneCatalogClient initialPhones={phones} />
        </Suspense>
      </main>
      <Footer />
    </>
  );
}