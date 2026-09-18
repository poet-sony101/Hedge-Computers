import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { getPhoneBySlug, getAllPhones } from "@/services/phoneService";
import PhoneDetailClient from "./PhoneDetailClient";

type PhoneDetailsProps = {
  params: Promise<{
    slug: string;
  }>;
};

export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: PhoneDetailsProps): Promise<Metadata> {
  const { slug } = await params;
  const phone = await getPhoneBySlug(slug);

  if (!phone) {
    return {
      title: "Device Not Found | Available Tech",
    };
  }

  return {
    title: `${phone.name} (${phone.storage}, ${phone.condition}) | Available Tech`,
    description: `Inspect detailed specifications and request today's best market price for the ${phone.name} directly on WhatsApp. 100% verified authentic by Available Tech.`,
  };
}

export default async function PhoneDetails({ params }: PhoneDetailsProps) {
  const { slug } = await params;
  const phone = await getPhoneBySlug(slug);

  if (!phone) {
    notFound();
  }

  const allPhones = await getAllPhones();

  // Related phones: same brand first, or other featured
  const relatedPhones = allPhones
    .filter((p) => p.slug !== slug && (p.brand === phone.brand || p.featured))
    .slice(0, 3);

  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-28 pb-28">
        <PhoneDetailClient phone={phone} relatedPhones={relatedPhones} />
      </main>
      <Footer />
    </>
  );
}