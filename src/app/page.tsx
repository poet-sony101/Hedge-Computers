import Navbar from "@/components/layout/Navbar";
import Hero from "@/components/home/Hero";
import LaptopFinder from "@/components/home/LaptopFinder";
import FeaturedPhones from "@/components/home/FeaturedPhones";
import WhyChooseUs from "@/components/home/WhyChooseUs";
import CTA from "@/components/home/CTA";
import Footer from "@/components/layout/Footer";
import { getAllPhones } from "@/services/phoneService";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function Home() {
  const products = await getAllPhones();
  const spotlight = products.find((p) => p.featured) || products[0] || null;

  return (
    <>
      <Navbar />
      <main className="min-h-screen">
        <Hero spotlightProduct={spotlight} />
        <LaptopFinder />
        <FeaturedPhones />
        <WhyChooseUs />
        <CTA />
      </main>
      <Footer />
    </>
  );
}