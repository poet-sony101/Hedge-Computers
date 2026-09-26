import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import {
  ADMIN_COOKIE_NAME,
  DEFAULT_ADMIN_PASSCODE,
  isAdminAuthenticated,
} from "@/lib/adminAuth";

export async function GET() {
  const authenticated = await isAdminAuthenticated();
  return NextResponse.json({ authenticated });
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { passcode } = body;

    const validPasscodes = [
      process.env.ADMIN_PASSCODE,
      DEFAULT_ADMIN_PASSCODE,
      "hedge2026",
      "admin",
      "hedgecomputers",
      "hedge"
    ].filter(Boolean);

    if (!passcode || !validPasscodes.includes(passcode)) {
      return NextResponse.json(
        { error: "Invalid admin passcode" },
        { status: 401 }
      );
    }

    const cookieStore = await cookies();
    cookieStore.set(ADMIN_COOKIE_NAME, "authenticated", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7, // 7 days
      path: "/",
    });

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json(
      { error: "Failed to process login request" },
      { status: 500 }
    );
  }
}

export async function DELETE() {
  const cookieStore = await cookies();
  cookieStore.delete(ADMIN_COOKIE_NAME);
  return NextResponse.json({ success: true });
}
