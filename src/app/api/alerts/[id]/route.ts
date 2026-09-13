import { NextResponse } from "next/server";
import { z } from "zod";
import { alerts } from "@/lib/data";
import { CSRF_COOKIE, isOriginAllowed, requireSession } from "@/lib/auth";
import { apiError, correlationId } from "@/lib/api";
import { allowRequest } from "@/lib/rate-limit";
const payload = z.object({ action: z.enum(["acknowledge", "resolve"]), note: z.string().trim().max(500).optional() });
export async function PATCH(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const requestId = correlationId();
  try {
    const session = await requireSession();
    const client = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "local";
    if (!allowRequest(`${session.id}:${client}`)) return apiError(429, "RATE_LIMITED", "Too many alert updates. Try again shortly.");
    if (session.role !== "FARM_MANAGER") return apiError(403, "FORBIDDEN", "You do not have permission to update alerts.");
    if (!isOriginAllowed(request)) return apiError(403, "ORIGIN_REJECTED", "Request origin was rejected.");
    const csrfHeader = request.headers.get("x-csrf-token"); const csrfCookie = request.headers.get("cookie")?.match(/agroos_csrf=([^;]+)/)?.[1];
    if (!csrfHeader || !csrfCookie || csrfHeader !== csrfCookie) return apiError(403, "CSRF_REJECTED", "Request verification failed.");
    const body = payload.safeParse(await request.json()); if (!body.success) return apiError(400, "VALIDATION_ERROR", "Invalid alert update.");
    const { id } = await params; const alert = alerts.find(a => a.id === id); if (!alert) return apiError(404, "NOT_FOUND", "Alert was not found.");
    if (body.data.action === "acknowledge" && alert.status === "OPEN") { alert.status = "ACKNOWLEDGED"; alert.acknowledgedAt = "just now"; }
    if (body.data.action === "resolve" && alert.status !== "RESOLVED") { alert.status = "RESOLVED"; alert.resolvedAt = "just now"; }
    console.info(JSON.stringify({ event: "alert.updated", alertId: alert.id, action: body.data.action, actorId: session.id, tenantId: session.organisationId, requestId }));
    return NextResponse.json({ alert }, { headers: { "X-Request-Id": requestId, "Cache-Control": "no-store" } });
  } catch { return apiError(401, "UNAUTHENTICATED", "Sign in is required."); }
}
