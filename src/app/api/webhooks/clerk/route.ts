import { NextResponse } from "next/server";
import { Webhook } from "svix";
import { db } from "@/lib/db";
export async function POST(request: Request) {
  const secret = process.env.CLERK_WEBHOOK_SECRET; if (!secret) return NextResponse.json({ error: "Webhook is not configured." }, { status: 503 });
  const id = request.headers.get("svix-id"), timestamp = request.headers.get("svix-timestamp"), signature = request.headers.get("svix-signature");
  if (!id || !timestamp || !signature) return NextResponse.json({ error: "Missing signature." }, { status: 400 });
  const payload = await request.text(); let event: { type: string; data: Record<string, unknown> };
  try { event = new Webhook(secret).verify(payload, { "svix-id": id, "svix-timestamp": timestamp, "svix-signature": signature }) as typeof event; } catch { return NextResponse.json({ error: "Invalid signature." }, { status: 400 }); }
  const exists = await db.webhookEvent.findUnique({ where: { id } }); if (exists) return NextResponse.json({ received: true, duplicate: true });
  await db.$transaction(async tx => { const data = event.data; if (event.type.startsWith("user.")) { const emailAddresses = data.email_addresses as Array<{ email_address: string }> | undefined; await tx.user.upsert({ where: { clerkId: String(data.id) }, update: { name: `${data.first_name ?? ""} ${data.last_name ?? ""}`.trim() || "AgroOS user", email: emailAddresses?.[0]?.email_address ?? `${data.id}@pending.invalid` }, create: { clerkId: String(data.id), name: `${data.first_name ?? ""} ${data.last_name ?? ""}`.trim() || "AgroOS user", email: emailAddresses?.[0]?.email_address ?? `${data.id}@pending.invalid` } }); } await tx.webhookEvent.create({ data: { id, provider: "clerk", type: event.type, payloadHash: id, processedAt: new Date() } }); });
  return NextResponse.json({ received: true });
}
