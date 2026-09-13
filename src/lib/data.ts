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

export const eggOrders = [
  { id: "EG-1048", customer: "Meera Iyer", items: "2 × 12 free-range eggs", total: "₹420", status: "Ready to dispatch", time: "Today, 10:30" },
  { id: "EG-1047", customer: "Nila Foods", items: "10 × 30 farm eggs", total: "₹5,100", status: "Processing", time: "Today, 09:15" },
  { id: "EG-1046", customer: "Sanjay Patel", items: "1 × 12 free-range eggs", total: "₹210", status: "Delivered", time: "Yesterday" }
];
export const coopRequests = [
  { item: "Organic feed mix", supplier: "Sahyadri Agri", members: 18, target: "1,200 kg", committed: 76, closes: "16 Sep" },
  { item: "Coconut saplings", supplier: "Konkan Nursery", members: 12, target: "600 plants", committed: 52, closes: "20 Sep" }
];
export const storageBookings = [
  { chamber: "Chamber 02", range: "4–8°C", commodity: "Fresh milk", quantity: "480 L", window: "14–16 Sep", status: "Confirmed" },
  { chamber: "Chamber 01", range: "12–16°C", commodity: "Tender coconuts", quantity: "1,200 units", window: "15–18 Sep", status: "Pending approval" }
];
export const integratedFarm = [
  { type: "Coconut grove", unit: "Trees", count: "184", metric: "86% harvest-ready", detail: "Next harvest window: 22 Sep", tone: "healthy" },
  { type: "Goat herd", unit: "Animals", count: "47", metric: "44 healthy checks", detail: "3 vaccination reminders", tone: "warning" },
  { type: "Dairy", unit: "Today’s yield", count: "286 L", metric: "96% quality pass", detail: "2 collection runs scheduled", tone: "healthy" }
];
