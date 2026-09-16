import { NextRequest, NextResponse } from "next/server";
import { isAdminAuthenticated } from "@/lib/adminAuth";
import { getPhoneById, updatePhone, deletePhone } from "@/services/phoneService";

type RouteParams = {
  params: Promise<{
    id: string;
  }>;
};

export async function GET(
  _req: NextRequest,
  { params }: RouteParams
) {
  const { id } = await params;
  const phone = await getPhoneById(Number(id));
  if (!phone) {
    return NextResponse.json({ error: "Phone not found" }, { status: 404 });
  }
  return NextResponse.json({ phone });
}

export async function PUT(
  req: NextRequest,
  { params }: RouteParams
) {
  const authenticated = await isAdminAuthenticated();
  if (!authenticated) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;

  try {
    const body = await req.json();
    const updated = await updatePhone(Number(id), body);

    if (!updated) {
      return NextResponse.json({ error: "Phone not found" }, { status: 404 });
    }

    return NextResponse.json({ phone: updated });
  } catch {
    return NextResponse.json(
      { error: "Failed to update phone" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  _req: NextRequest,
  { params }: RouteParams
) {
  const authenticated = await isAdminAuthenticated();
  if (!authenticated) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;
  const success = await deletePhone(Number(id));

  if (!success) {
    return NextResponse.json({ error: "Phone not found" }, { status: 404 });
  }

  return NextResponse.json({ success: true });
}
