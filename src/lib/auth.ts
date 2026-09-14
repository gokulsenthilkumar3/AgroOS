import { cookies } from "next/headers";
import { customer, user } from "./data";
export const SESSION_COOKIE = "agroos_demo_session";
export const CSRF_COOKIE = "agroos_csrf";
export async function getSession() {
  if (process.env.CLERK_SECRET_KEY && process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY) {
    const [{ auth }, { db }] = await Promise.all([import("@clerk/nextjs/server"), import("./db")]);
    const identity = await auth();
    if (!identity.userId) return null;
    const membership = await db.membership.findFirst({ where: { user: { clerkId: identity.userId }, status: "ACTIVE", ...(identity.orgId ? { organisation: { clerkOrgId: identity.orgId } } : {}) }, include: { user: true } });
    if (!membership) return null;
    return { id: membership.user.id, name: membership.user.name, email: membership.user.email, organisationId: membership.organisationId, role: membership.role };
  }
  const value = (await cookies()).get(SESSION_COOKIE)?.value;
  return value === "demo-farm-manager" ? user : value === "demo-customer" ? customer : null;
}
export async function requireSession() { const session = await getSession(); if (!session) throw new Error("UNAUTHENTICATED"); return session; }
export function isOriginAllowed(request: Request) { const origin = request.headers.get("origin"); const host = request.headers.get("host"); return !origin || (host && new URL(origin).host === host); }
