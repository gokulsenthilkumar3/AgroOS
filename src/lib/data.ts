export type AlertStatus = "OPEN" | "ACKNOWLEDGED" | "RESOLVED";
export type Alert = { id: string; title: string; detail: string; severity: "critical" | "warning"; status: AlertStatus; device: string; zone: string; createdAt: string; acknowledgedAt?: string; resolvedAt?: string };
export const user = { id: "user-demo", name: "Anika Sharma", email: "anika@hydrogrow.demo", organisationId: "org-hydrogrow", role: "FARM_MANAGER" };
export const farm = { name: "Green Valley Hydroponics", location: "Pune, Maharashtra", zones: 3 };
export const devices = [
  { id: "dev-a", name: "Nutrient Station A", zone: "Leafy Greens A", status: "Online", temperature: 24.1, humidity: 68, ph: 5.4, ec: 2.6, waterLevel: 78 },
  { id: "dev-b", name: "Climate Monitor B", zone: "Tomato Bay", status: "Online", temperature: 25.4, humidity: 72, ph: 6.1, ec: 2.2, waterLevel: 65 },
  { id: "dev-c", name: "Nutrient Station C", zone: "Herb House", status: "Offline", temperature: 22.8, humidity: 65, ph: 5.8, ec: 1.9, waterLevel: 54 }
];
export const cropBatches = [
  { crop: "Butterhead lettuce", zone: "Leafy Greens A", progress: 76, harvest: "18 Sep", status: "On track" },
  { crop: "Cherry tomato", zone: "Tomato Bay", progress: 44, harvest: "10 Oct", status: "Watch climate" },
  { crop: "Genovese basil", zone: "Herb House", progress: 61, harvest: "25 Sep", status: "On track" }
];
export const alerts: Alert[] = [
  { id: "alert-1", title: "EC above target range", detail: "EC is 2.6 mS/cm; target is 1.8–2.4.", severity: "critical", status: "OPEN", device: "Nutrient Station A", zone: "Leafy Greens A", createdAt: "12 min ago" },
  { id: "alert-2", title: "Device heartbeat missed", detail: "No reading received in the last 20 minutes.", severity: "warning", status: "ACKNOWLEDGED", device: "Nutrient Station C", zone: "Herb House", createdAt: "29 min ago", acknowledgedAt: "20 min ago" },
  { id: "alert-3", title: "Water level recovered", detail: "Reservoir returned to a healthy level after refill.", severity: "warning", status: "RESOLVED", device: "Climate Monitor B", zone: "Tomato Bay", createdAt: "Yesterday", resolvedAt: "Yesterday" }
];
export const telemetry = Array.from({ length: 24 }, (_, i) => ({ time: `${String(i).padStart(2, "0")}:00`, temperature: 22.4 + Math.sin(i / 3) * 1.6, ec: 2.05 + Math.sin(i / 4) * .18 }));
