import { NextResponse } from "next/server";
import { requireSession } from "@/lib/auth";

const quote = (value: string) => `"${value.replaceAll('"', '""')}"`;

export async function GET(request: Request) {
  try {
    const session = await requireSession();
    const type = new URL(request.url).searchParams.get("type") === "audit" ? "audit" : "dashboard";
    const rows = type === "audit"
      ? [["event", "actor", "organisation", "timestamp"], ["Export requested", session.email, session.organisationId, new Date().toISOString()]]
      : [["metric", "value", "organisation"], ["Growing zones", "3", session.organisationId], ["Connected devices", "2 / 3", session.organisationId], ["Active alerts", "2", session.organisationId]];
    const csv = rows.map((row) => row.map(quote).join(",")).join("\r\n");
    return new NextResponse(csv, { headers: { "Content-Type": "text/csv; charset=utf-8", "Content-Disposition": `attachment; filename="agroos-${type}.csv"`, "Cache-Control": "private, no-store" } });
  } catch {
    return NextResponse.json({ error: { code: "UNAUTHENTICATED", message: "Sign in is required." } }, { status: 401 });
  }
}
