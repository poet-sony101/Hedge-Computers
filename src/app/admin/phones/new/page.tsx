import { redirect } from "next/navigation";
import { isAdminAuthenticated } from "@/lib/adminAuth";
import NewPhoneClient from "./NewPhoneClient";

export const metadata = {
  title: "Add Device | Admin | Hedge Computers",
};

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function NewPhonePage() {
  const authenticated = await isAdminAuthenticated();
  if (!authenticated) {
    redirect("/admin/login");
  }

  return <NewPhoneClient />;
}
