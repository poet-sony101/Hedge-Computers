import { notFound, redirect } from "next/navigation";
import { isAdminAuthenticated } from "@/lib/adminAuth";
import { getPhoneById } from "@/services/phoneService";
import EditPhoneClient from "./EditPhoneClient";

type EditPhonePageProps = {
  params: Promise<{
    id: string;
  }>;
};

export const metadata = {
  title: "Edit Device | Admin | Hedge Computers",
};

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function EditPhonePage({ params }: EditPhonePageProps) {
  const authenticated = await isAdminAuthenticated();
  if (!authenticated) {
    redirect("/admin/login");
  }

  const { id } = await params;
  const phone = await getPhoneById(Number(id));

  if (!phone) {
    notFound();
  }

  return <EditPhoneClient key={phone.id} phone={phone} />;
}
