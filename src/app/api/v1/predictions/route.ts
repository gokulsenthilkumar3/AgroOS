import { NextResponse } from "next/server";
import { z } from "zod";
import { requireSession } from "@/lib/auth";
import { apiError, correlationId } from "@/lib/api";
import { evaluateAdvisory } from "@/lib/ml-rules";
const inputSchema = z.object({ kind: z.enum(["health", "yield", "price"]), temperature: z.number().min(-20).max(70).optional(), humidity: z.number().min(0).max(100).optional(), incidents: z.number().int().min(0).max(100).optional(), trend: z.number().min(-100).max(100).optional(), demandIndex: z.number().min(0).max(10).optional() });
export async function POST(request: Request) { const requestId = correlationId(); try { const session = await requireSession(); const parsed = inputSchema.safeParse(await request.json()); if (!parsed.success) return apiError(400, "VALIDATION_ERROR", "Prediction inputs are invalid."); const prediction = evaluateAdvisory(parsed.data); return NextResponse.json({ data: { ...prediction, organisationId: session.organisationId, generatedAt: new Date().toISOString() }, meta: { requestId } }, { headers: { "Cache-Control": "no-store", "X-Request-Id": requestId } }); } catch { return apiError(401, "UNAUTHENTICATED", "Sign in is required."); } }
