import { NextResponse } from "next/server";
export function GET() { return NextResponse.json({ status: "ok", service: "hydrogrow-web", timestamp: new Date().toISOString() }, { headers: { "Cache-Control": "no-store" } }); }
