import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import RequestPhoneClient from "./RequestPhoneClient";

export const metadata = {
  title: "Request a Device | Available Tech",
  description:
    "Can't find the smartphone, MacBook, or workstation you're looking for? Submit a custom request and let Available Tech source it for you at today's best price.",
};

export default function RequestPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-28 pb-24">
        <RequestPhoneClient />
      </main>
      <Footer />
    </>
  );
}
