import { cookies } from "next/headers";
import { user } from "./data";
export const SESSION_COOKIE = "agroos_demo_session";
export const CSRF_COOKIE = "agroos_csrf";
export async function getSession() { return (await cookies()).get(SESSION_COOKIE)?.value === "demo-farm-manager" ? user : null; }
export async function requireSession() { const session = await getSession(); if (!session) throw new Error("UNAUTHENTICATED"); return session; }
export function isOriginAllowed(request: Request) { const origin = request.headers.get("origin"); const host = request.headers.get("host"); return !origin || (host && new URL(origin).host === host); }
