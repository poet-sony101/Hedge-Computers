import { cookies } from "next/headers";

export const ADMIN_COOKIE_NAME = "ndt_admin_session";
export const DEFAULT_ADMIN_PASSCODE =
  process.env.ADMIN_PASSCODE || "newdawn2026";

export async function isAdminAuthenticated(): Promise<boolean> {
  const cookieStore = await cookies();
  const session = cookieStore.get(ADMIN_COOKIE_NAME);
  return !!session && session.value === "authenticated";
}
