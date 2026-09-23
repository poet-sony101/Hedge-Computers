import { NextRequest, NextResponse } from "next/server";
import { isAdminAuthenticated } from "@/lib/adminAuth";
import { getPhoneById, updatePhone, deletePhone } from "@/services/phoneService";

export const dynamic = "force-dynamic";
export const revalidate = 0;

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
  const slug = req.nextUrl.searchParams.get("slug") || undefined;

  try {
    const body = await req.json();
    const result = await updatePhone(Number(id), body, slug);

    if (!result.success) {
      return NextResponse.json(
        { error: result.error || "Failed to update phone" },
        { status: 400 }
      );
    }

    return NextResponse.json({ phone: result.phone });
  } catch {
    return NextResponse.json(
      { error: "Failed to update phone" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: RouteParams
) {
  const authenticated = await isAdminAuthenticated();
  if (!authenticated) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;
  const slug = req.nextUrl.searchParams.get("slug") || undefined;
  const result = await deletePhone(Number(id), slug);

  if (!result.success) {
    return NextResponse.json(
      { error: result.error || "Failed to delete phone" },
      { status: 400 }
    );
  }

  return NextResponse.json({ success: true });
}
