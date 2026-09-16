import { redirect } from "next/navigation";
import { isAdminAuthenticated } from "@/lib/adminAuth";
import NewPhoneClient from "./NewPhoneClient";

export const metadata = {
  title: "Add New Phone | Admin | New Dawn Technologies",
};

export default async function NewPhonePage() {
  const authenticated = await isAdminAuthenticated();
  if (!authenticated) {
    redirect("/admin/login");
  }

  return <NewPhoneClient />;
}
