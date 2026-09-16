import Navbar from "@/components/layout/Navbar";
import Hero from "@/components/home/Hero";
import Brands from "@/components/home/Brands";
import FeaturedPhones from "@/components/home/FeaturedPhones";
import WhyChooseUs from "@/components/home/WhyChooseUs";
import CTA from "@/components/home/CTA";
import Footer from "@/components/layout/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen">
        <Hero />
        <Brands />
        <FeaturedPhones />
        <WhyChooseUs />
        <CTA />
      </main>
      <Footer />
    </>
  );
}