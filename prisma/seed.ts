import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
async function main() {
  const organisation = await prisma.organisation.upsert({ where: { id: "org-hydrogrow" }, update: {}, create: { id: "org-hydrogrow", name: "Green Valley Hydroponics" } });
  const user = await prisma.user.upsert({ where: { email: "anika@hydrogrow.demo" }, update: {}, create: { id: "user-demo", email: "anika@hydrogrow.demo", name: "Anika Sharma" } });
  await prisma.membership.upsert({ where: { userId_organisationId: { userId: user.id, organisationId: organisation.id } }, update: {}, create: { userId: user.id, organisationId: organisation.id, role: "FARM_MANAGER" } });
  const farm = await prisma.farm.upsert({ where: { id: "farm-green-valley" }, update: {}, create: { id: "farm-green-valley", name: "Green Valley Hydroponics", organisationId: organisation.id } });
  const zone = await prisma.zone.upsert({ where: { id: "zone-leafy-a" }, update: {}, create: { id: "zone-leafy-a", name: "Leafy Greens A", farmId: farm.id } });
  await prisma.cropBatch.upsert({ where: { zoneId: zone.id }, update: {}, create: { zoneId: zone.id, crop: "Butterhead lettuce", plantedAt: new Date("2026-08-01"), expectedHarvest: new Date("2026-09-18") } });
  const device = await prisma.device.upsert({ where: { id: "dev-a" }, update: {}, create: { id: "dev-a", name: "Nutrient Station A", zoneId: zone.id, status: "Online" } });
  const exists = await prisma.telemetryReading.count({ where: { deviceId: device.id } });
  if (!exists) await prisma.telemetryReading.createMany({ data: Array.from({ length: 24 }, (_, hour) => ({ deviceId: device.id, recordedAt: new Date(Date.now() - (23 - hour) * 3600000), temperature: 22.4 + Math.sin(hour / 3) * 1.6, humidity: 68, ph: 5.4, ec: 2.05 + Math.sin(hour / 4) * .18, waterLevel: 78 })) });
  console.log("Demo tenant seeded.");
}
main().finally(() => prisma.$disconnect());
