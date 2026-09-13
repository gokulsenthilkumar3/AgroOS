import { NextResponse } from "next/server";
import { requireSession } from "@/lib/auth";
import { alerts, cropBatches, devices, farm } from "@/lib/data";
import { apiError, correlationId } from "@/lib/api";
export async function GET() { const requestId = correlationId(); try { const session = await requireSession(); return NextResponse.json({ farm, devices, cropBatches, activeAlerts: alerts.filter(a => a.status !== "RESOLVED"), organisationId: session.organisationId }, { headers: { "X-Request-Id": requestId, "Cache-Control": "private, max-age=30" } }); } catch { return apiError(401, "UNAUTHENTICATED", "Sign in is required."); } }
