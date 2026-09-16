import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import RequestPhoneClient from "./RequestPhoneClient";

export const metadata = {
  title: "Request a Phone | New Dawn Technologies",
  description:
    "Can't find the smartphone you're looking for in our catalog? Submit a custom request and let New Dawn Technologies source it for you at today's best price.",
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
