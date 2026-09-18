import { redirect } from "next/navigation";
import { isAdminAuthenticated } from "@/lib/adminAuth";
import { getAllPhones } from "@/services/phoneService";
import AdminInventoryClient from "./AdminInventoryClient";

export const metadata = {
  title: "Manage Inventory | Admin | Available Tech",
};

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function AdminPhonesPage() {
  const authenticated = await isAdminAuthenticated();
  if (!authenticated) {
    redirect("/admin/login");
  }

  const phones = await getAllPhones();

  return <AdminInventoryClient initialPhones={phones} />;
}
