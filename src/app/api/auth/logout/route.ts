import { NextResponse } from "next/server";
import { CSRF_COOKIE, SESSION_COOKIE } from "@/lib/auth";
export async function POST(request: Request) { const response = NextResponse.redirect(new URL("/login", request.url), 303); response.cookies.delete(SESSION_COOKIE); response.cookies.delete(CSRF_COOKIE); return response; }
