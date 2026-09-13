import { NextResponse } from "next/server";
import { z } from "zod";
import { apiError } from "@/lib/api";
import { isOriginAllowed, requireSession } from "@/lib/auth";
import { managedFarms } from "@/lib/farms";
import { can, type Role } from "@/lib/roles";
const schema = z.object({ name: z.string().trim().min(2).max(80), type: z.enum(["Hydroponics", "Coconut", "Goat dairy", "Poultry", "Mixed farm"]), location: z.string().trim().min(2).max(100), area: z.string().trim().min(1).max(30) });
function verified(request: Request) { const csrf = request.headers.get("x-csrf-token"); const cookie = request.headers.get("cookie")?.match(/agroos_csrf=([^;]+)/)?.[1]; return isOriginAllowed(request) && !!csrf && csrf === cookie; }
export async function GET() { try { await requireSession(); return NextResponse.json({ farms: managedFarms }); } catch { return apiError(401, "UNAUTHENTICATED", "Sign in is required."); } }
export async function POST(request: Request) { try { const user = await requireSession(); if (!can(user.role as Role, "farm:write")) return apiError(403, "FORBIDDEN", "Your role cannot create farms."); if (!verified(request)) return apiError(403, "CSRF_REJECTED", "Request verification failed."); const parsed = schema.safeParse(await request.json()); if (!parsed.success) return apiError(400, "VALIDATION_ERROR", "Provide a valid farm name, type, location, and area."); const farm = { id: crypto.randomUUID(), ...parsed.data, status: "Active" as const, updatedAt: "just now" }; managedFarms.unshift(farm); console.info(JSON.stringify({ event: "farm.created", farmId: farm.id, actorId: user.id })); return NextResponse.json({ farm }, { status: 201 }); } catch { return apiError(401, "UNAUTHENTICATED", "Sign in is required."); } }
