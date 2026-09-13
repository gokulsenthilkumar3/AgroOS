export type FarmType = "Hydroponics" | "Coconut" | "Goat dairy" | "Poultry" | "Mixed farm";
export type ManagedFarm = { id: string; name: string; type: FarmType; location: string; area: string; status: "Active" | "Planning"; updatedAt: string };
export const managedFarms: ManagedFarm[] = [
  { id: "farm-green-valley", name: "Green Valley Hydroponics", type: "Hydroponics", location: "Pune, Maharashtra", area: "1.8 acres", status: "Active", updatedAt: "Today" },
  { id: "farm-konkan", name: "Konkan Grove", type: "Coconut", location: "Ratnagiri, Maharashtra", area: "6.2 acres", status: "Active", updatedAt: "Yesterday" },
  { id: "farm-dairy", name: "Sahyadri Integrated Farm", type: "Mixed farm", location: "Nashik, Maharashtra", area: "12 acres", status: "Active", updatedAt: "12 Sep" }
];
