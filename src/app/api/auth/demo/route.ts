import { NextResponse } from "next/server";
import { CSRF_COOKIE, SESSION_COOKIE } from "@/lib/auth";
export async function POST(request: Request) {
  const response = NextResponse.redirect(new URL("/dashboard", request.url), 303);
  const secure = process.env.NODE_ENV === "production";
  response.cookies.set(SESSION_COOKIE, "demo-farm-manager", { httpOnly: true, secure, sameSite: "lax", path: "/", maxAge: 60 * 60 * 8 });
  response.cookies.set(CSRF_COOKIE, crypto.randomUUID(), { httpOnly: false, secure, sameSite: "strict", path: "/", maxAge: 60 * 60 * 8 });
  return response;
}
