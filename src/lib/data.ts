// ─────────────────────────────────────────────────────────────────────────────
// AgroOS — Unified Demo Data Layer
// ─────────────────────────────────────────────────────────────────────────────

export type AlertStatus = "OPEN" | "ACKNOWLEDGED" | "RESOLVED";

export type Alert = {
  id: string;
  title: string;
  detail: string;
  severity: "critical" | "warning";
  status: AlertStatus;
  device: string;
  zone: string;
  createdAt: string;
  acknowledgedAt?: string;
  resolvedAt?: string;
};

// ── Users & Org ───────────────────────────────────────────────────────────────
export const user = {
  id: "user-demo",
  name: "Anika Sharma",
  email: "anika@hydrogrow.demo",
  organisationId: "org-hydrogrow",
  role: "OWNER",
};

export const customer = {
  id: "customer-demo",
  name: "Riya Kapoor",
  email: "riya@agroos.demo",
  organisationId: "org-hydrogrow",
  role: "CUSTOMER",
};

// ── Farm ─────────────────────────────────────────────────────────────────────
export const farm = {
  name: "Green Valley Hydroponics",
  location: "Pune, Maharashtra",
  zones: 3,
  area: "2.4 acres",
  established: "Jan 2022",
};

// ── Devices / IoT ────────────────────────────────────────────────────────────
export const devices = [
  { id: "dev-a", name: "Nutrient Station A", zone: "Leafy Greens A", status: "Online",  temperature: 24.1, humidity: 68, ph: 5.4, ec: 2.6, waterLevel: 78 },
  { id: "dev-b", name: "Climate Monitor B",  zone: "Tomato Bay",     status: "Online",  temperature: 25.4, humidity: 72, ph: 6.1, ec: 2.2, waterLevel: 65 },
  { id: "dev-c", name: "Nutrient Station C", zone: "Herb House",     status: "Offline", temperature: 22.8, humidity: 65, ph: 5.8, ec: 1.9, waterLevel: 54 },
];

// ── Crop Batches ──────────────────────────────────────────────────────────────
export const cropBatches = [
  { crop: "Butterhead Lettuce", zone: "Leafy Greens A", progress: 76, harvest: "18 Sep", status: "On track",      plantedAt: "30 Jul", daysLeft: 4  },
  { crop: "Cherry Tomato",      zone: "Tomato Bay",     progress: 44, harvest: "10 Oct", status: "Watch climate", plantedAt: "12 Aug", daysLeft: 26 },
  { crop: "Genovese Basil",     zone: "Herb House",     progress: 61, harvest: "25 Sep", status: "On track",      plantedAt: "20 Aug", daysLeft: 11 },
];

// ── Alerts ────────────────────────────────────────────────────────────────────
export const alerts: Alert[] = [
  { id: "alert-1", title: "EC above target range",    detail: "EC is 2.6 mS/cm; target is 1.8–2.4.",                severity: "critical", status: "OPEN",         device: "Nutrient Station A", zone: "Leafy Greens A", createdAt: "12 min ago" },
  { id: "alert-2", title: "Device heartbeat missed",  detail: "No reading received in the last 20 minutes.",         severity: "warning",  status: "ACKNOWLEDGED", device: "Nutrient Station C", zone: "Herb House",    createdAt: "29 min ago", acknowledgedAt: "20 min ago" },
  { id: "alert-3", title: "Water level recovered",    detail: "Reservoir returned to a healthy level after refill.", severity: "warning",  status: "RESOLVED",     device: "Climate Monitor B",  zone: "Tomato Bay",    createdAt: "Yesterday",  resolvedAt: "Yesterday" },
];

// ── Telemetry ─────────────────────────────────────────────────────────────────
export const telemetry = Array.from({ length: 24 }, (_, i) => ({
  time: `${String(i).padStart(2, "0")}:00`,
  temperature: 22.4 + Math.sin(i / 3) * 1.6,
  ec: 2.05 + Math.sin(i / 4) * 0.18,
  humidity: 67 + Math.sin(i / 5) * 5,
  ph: 5.8 + Math.sin(i / 6) * 0.3,
}));

// ── Farm Portfolio (dashboard KPI) ────────────────────────────────────────────
export const farmPortfolio = [
  { name: "Honey & pollination", value: "18",    label: "active hives",      trend: "+2 this month",        tone: "healthy" },
  { name: "Flower blocks",       value: "0.9 ac", label: "marigold & rose",   trend: "Harvest in 6 days",   tone: "healthy" },
  { name: "Greenhouse",          value: "4",      label: "climate zones",     trend: "All targets met",     tone: "healthy" },
  { name: "Leafy greens",        value: "1,840",  label: "plants growing",    trend: "96% healthy",         tone: "healthy" },
];

export const integratedFarm = [
  { type: "Coconut grove", unit: "Trees",        count: "184",    metric: "86% harvest-ready",  detail: "Next harvest: 22 Sep", tone: "healthy" },
  { type: "Goat herd",    unit: "Animals",       count: "47",     metric: "44 healthy checks",  detail: "3 vaccination reminders", tone: "warning" },
  { type: "Dairy",        unit: "Today's yield", count: "286 L",  metric: "96% quality pass",   detail: "2 collection runs today",  tone: "healthy" },
];

export const farmTypes = [
  "Hydroponics","Coconut","Goat dairy","Poultry","Mixed farm",
  "Bee apiary","Flower farm","Leafy greens","Greenhouse","Orchard","Aquaculture",
] as const;

// ── Eggs / Poultry ────────────────────────────────────────────────────────────
export const eggOrders = [
  { id: "EG-1048", customer: "Meera Iyer",  items: "2 × 12 free-range eggs", total: "₹420",   status: "Ready to dispatch", time: "Today, 10:30" },
  { id: "EG-1047", customer: "Nila Foods",  items: "10 × 30 farm eggs",      total: "₹5,100", status: "Processing",        time: "Today, 09:15" },
  { id: "EG-1046", customer: "Sanjay Patel",items: "1 × 12 free-range eggs", total: "₹210",   status: "Delivered",         time: "Yesterday" },
];

export const coopRequests = [
  { item: "Organic feed mix",  supplier: "Sahyadri Agri",  members: 18, target: "1,200 kg",    committed: 76, closes: "16 Sep" },
  { item: "Coconut saplings",  supplier: "Konkan Nursery", members: 12, target: "600 plants",   committed: 52, closes: "20 Sep" },
];

// ── Cold Chain / Storage ──────────────────────────────────────────────────────
export const storageBookings = [
  { chamber: "Chamber 02", range: "4–8°C",    commodity: "Fresh milk",       quantity: "480 L",       window: "14–16 Sep", status: "Confirmed"        },
  { chamber: "Chamber 01", range: "12–16°C",  commodity: "Tender coconuts",  quantity: "1,200 units", window: "15–18 Sep", status: "Pending approval" },
  { chamber: "Chamber 03", range: "0–4°C",    commodity: "Leafy greens",     quantity: "320 kg",      window: "18–20 Sep", status: "Confirmed"        },
];

// ── News ──────────────────────────────────────────────────────────────────────
export const news = [
  { id: "n1", category: "Market",   title: "Pune wholesale vegetable prices show steady demand",                       summary: "Local mandi reports 8% uptick in leafy greens demand as festive season approaches.",                   source: "AgroOS market brief", time: "2h ago",    tag: "Market" },
  { id: "n2", category: "Weather",  title: "Plan protected cultivation around the coming rainfall window",              summary: "IMD forecast: 40–60mm rainfall expected over Pune district from Sep 17–19. Cover sensitive crops.", source: "Farm advisory",       time: "4h ago",    tag: "Weather" },
  { id: "n3", category: "Practice", title: "Five pollinator-friendly planting practices for flower farms",              summary: "Companion planting with calendula and phacelia can boost pollinator visits by 35%.",                  source: "AgroOS learning",     time: "Yesterday", tag: "Practice" },
  { id: "n4", category: "Dairy",    title: "Cold-chain checklist for morning milk collection",                           summary: "Maintaining milk temperature below 4°C from cow to consumer is non-negotiable. Here's your guide.", source: "Operations guide",    time: "Yesterday", tag: "Operations" },
  { id: "n5", category: "Policy",   title: "PM-KISAN 16th installment: Check your eligibility now",                     summary: "₹6,000 annual support available. Verify your Aadhaar-linked bank account before Oct 1 deadline.",    source: "Govt. scheme desk",   time: "2 days ago", tag: "Policy" },
  { id: "n6", category: "Tech",     title: "Satellite-based crop health monitoring now available for small farmers",     summary: "ICAR and ISRO launch free Sentinel-2 NDVI reports for holdings above 0.5 acres.",                     source: "Tech brief",          time: "2 days ago", tag: "Technology" },
  { id: "n7", category: "Market",   title: "Tomato prices stabilize after flash correction in Nashik",                   summary: "Prices recovered to ₹18–22/kg after supply disruption eases. Buyers return to market.",               source: "Mandi watch",         time: "3 days ago", tag: "Market" },
  { id: "n8", category: "Finance",  title: "Kisan Credit Card limit raised to ₹5 lakh for allied activities",           summary: "RBI circular enables livestock and fishery farmers to access enhanced KCC limits without collateral.",  source: "Finance desk",        time: "3 days ago", tag: "Finance" },
];

// ── Market / Mandi Prices ─────────────────────────────────────────────────────
export const mandiPrices = [
  { commodity: "Tomato",         unit: "per kg",   price: 19,  change: +3,  market: "Pune APMC"    },
  { commodity: "Onion",          unit: "per kg",   price: 28,  change: -2,  market: "Nashik APMC"  },
  { commodity: "Paddy",          unit: "per qtl",  price: 2250,change: +42, market: "Ratnagiri"    },
  { commodity: "Butterhead Lettuce", unit: "per kg",price: 65, change: +8,  market: "Local direct" },
  { commodity: "Basil",          unit: "per kg",   price: 180, change: +15, market: "Local direct" },
  { commodity: "Cherry Tomato",  unit: "per kg",   price: 95,  change: +6,  market: "Export grade" },
  { commodity: "Coconut",        unit: "per piece",price: 25,  change: 0,   market: "Konkan"       },
  { commodity: "Milk (A-grade)", unit: "per L",    price: 44,  change: +1,  market: "MilkFed"      },
];

export const priceHistory = [
  { month: "Apr", tomato: 14, lettuce: 52, basil: 145 },
  { month: "May", tomato: 18, lettuce: 55, basil: 158 },
  { month: "Jun", tomato: 22, lettuce: 60, basil: 162 },
  { month: "Jul", tomato: 16, lettuce: 58, basil: 170 },
  { month: "Aug", tomato: 20, lettuce: 63, basil: 175 },
  { month: "Sep", tomato: 19, lettuce: 65, basil: 180 },
];

// ── Weather ───────────────────────────────────────────────────────────────────
export const weather = {
  current: { temp: 27, feels: 29, condition: "Partly cloudy", humidity: 72, wind: "14 km/h NE", visibility: "8 km", uv: 6, pressure: "1012 hPa" },
  location: "Pune, Maharashtra",
  forecast: [
    { day: "Today",    icon: "⛅", high: 29, low: 21, rain: 10, condition: "Partly cloudy" },
    { day: "Tue",      icon: "🌤", high: 31, low: 22, rain: 5,  condition: "Sunny intervals" },
    { day: "Wed",      icon: "🌧", high: 25, low: 19, rain: 75, condition: "Heavy rain" },
    { day: "Thu",      icon: "🌧", high: 24, low: 18, rain: 80, condition: "Rain" },
    { day: "Fri",      icon: "🌦", high: 26, low: 20, rain: 40, condition: "Showers" },
    { day: "Sat",      icon: "⛅", high: 28, low: 21, rain: 15, condition: "Mostly cloudy" },
    { day: "Sun",      icon: "☀️", high: 30, low: 22, rain: 5,  condition: "Clear" },
  ],
  advisories: [
    { type: "warning", title: "Rainfall advisory", detail: "Heavy rain expected Wed–Thu. Cover tender crops. Avoid outdoor spraying." },
    { type: "info",    title: "Optimal harvest window", detail: "Tue is ideal for harvesting leafy greens — low humidity, clear skies." },
    { type: "success", title: "Temperature on target", detail: "Greenhouse temps within 24–26°C optimal range for next 72 hrs." },
  ],
};

// ── Finance / P&L ─────────────────────────────────────────────────────────────
export const finance = {
  summary: { revenue: 284000, expenses: 126000, profit: 158000, margin: 55.6 },
  monthly: [
    { month: "Apr", revenue: 38000, expenses: 18000 },
    { month: "May", revenue: 42000, expenses: 20000 },
    { month: "Jun", revenue: 51000, expenses: 22000 },
    { month: "Jul", revenue: 44000, expenses: 19000 },
    { month: "Aug", revenue: 56000, expenses: 24000 },
    { month: "Sep", revenue: 53000, expenses: 23000 },
  ],
  expenses: [
    { category: "Seeds & Nutrients",  amount: 34000, pct: 27 },
    { category: "Labour",             amount: 42000, pct: 33 },
    { category: "Electricity & Water",amount: 18000, pct: 14 },
    { category: "Equipment",          amount: 16000, pct: 13 },
    { category: "Packaging",          amount: 10000, pct: 8  },
    { category: "Logistics",          amount: 6000,  pct: 5  },
  ],
  schemes: [
    { name: "PM-KISAN",            benefit: "₹6,000/yr",     status: "Enrolled",   deadline: "Oct 1"  },
    { name: "Kisan Credit Card",   benefit: "Up to ₹5L",     status: "Eligible",   deadline: "Ongoing" },
    { name: "PMFBY Crop Insurance",benefit: "Premium subsidy",status: "Apply now",  deadline: "Sep 30" },
    { name: "Solar Pump Scheme",   benefit: "90% subsidy",    status: "Eligible",   deadline: "Dec 31" },
  ],
};

// ── Farming Techniques ────────────────────────────────────────────────────────
export const farmingTechniques = [
  {
    id: "hydro", name: "Hydroponics", icon: "💧", color: "blue",
    tagline: "Soil-free, water-efficient precision growing",
    crops: ["Lettuce","Basil","Spinach","Tomato","Strawberry"],
    difficulty: "Intermediate", water: "Saves 90%", yield: "+30% vs soil",
    tags: ["No soil","Controlled","Year-round"],
    summary: "Grow plants in nutrient-rich water solutions. Ideal for controlled-environment agriculture.",
  },
  {
    id: "aqua", name: "Aquaponics", icon: "🐟", color: "blue",
    tagline: "Fish & plants in a closed-loop ecosystem",
    crops: ["Tilapia","Lettuce","Herbs","Watercress"],
    difficulty: "Advanced", water: "Saves 95%", yield: "+20% vs hydroponics",
    tags: ["Circular","Fish+Plants","Zero waste"],
    summary: "Combines fish farming with hydroponics. Fish waste fertilizes plants; plants clean the water.",
  },
  {
    id: "organic", name: "Organic Farming", icon: "🌿", color: "green",
    tagline: "Chemical-free, ecosystem-friendly cultivation",
    crops: ["Any crop"],
    difficulty: "Beginner", water: "Standard", yield: "Premiums 20–40%",
    tags: ["Certification","Premium price","Natural"],
    summary: "Grow using natural inputs only. Opens premium markets and qualifies for organic subsidies.",
  },
  {
    id: "drip", name: "Drip Irrigation", icon: "🚿", color: "amber",
    tagline: "Precision water delivery to the root zone",
    crops: ["Sugarcane","Cotton","Vegetables","Orchards"],
    difficulty: "Beginner", water: "Saves 50%", yield: "+15% vs flood",
    tags: ["Water-saving","Scalable","Subsidy eligible"],
    summary: "Deliver water directly to roots through emitter tubes. Reduce evaporation and weed growth.",
  },
  {
    id: "vertical", name: "Vertical Farming", icon: "🏗", color: "violet",
    tagline: "Stack growing layers to multiply output per sq ft",
    crops: ["Leafy greens","Herbs","Microgreens","Strawberry"],
    difficulty: "Advanced", water: "Saves 70%", yield: "10× per sqft",
    tags: ["Urban","High density","LED lighting"],
    summary: "Stack plants vertically under LED lights. Transform warehouses into high-yield farms.",
  },
  {
    id: "polyculture", name: "Polyculture", icon: "🌾", color: "green",
    tagline: "Grow multiple crops together for resilience",
    crops: ["Maize+Beans","Coconut+Pineapple","Paddy+Fish"],
    difficulty: "Intermediate", water: "Standard", yield: "Stable income",
    tags: ["Risk reduction","Biodiversity","Companion"],
    summary: "Grow diverse crops simultaneously. Reduces pest risk, increases biodiversity, stabilizes income.",
  },
  {
    id: "greenhouse", name: "Greenhouse Cultivation", icon: "🏠", color: "amber",
    tagline: "Year-round growing with climate control",
    crops: ["Tomato","Capsicum","Cucumber","Flowers"],
    difficulty: "Intermediate", water: "Saves 40%", yield: "+50% vs open field",
    tags: ["Year-round","Protected","Climate control"],
    summary: "Extend growing seasons and protect crops from weather extremes using glass or poly tunnels.",
  },
  {
    id: "apiculture", name: "Apiculture (Beekeeping)", icon: "🐝", color: "amber",
    tagline: "Honey production & pollination services",
    crops: ["Honey","Beeswax","Pollination"],
    difficulty: "Intermediate", water: "Minimal", yield: "₹80K–2L per hive/yr",
    tags: ["Passive income","Pollination","Subsidy eligible"],
    summary: "Manage honeybee colonies for honey, wax, propolis, and pollination rental services.",
  },
  {
    id: "aquaculture", name: "Aquaculture", icon: "🦐", color: "blue",
    tagline: "Fish & shrimp farming in controlled ponds",
    crops: ["Tilapia","Catfish","Shrimp","Prawn"],
    difficulty: "Advanced", water: "Pond-based", yield: "₹3–8L per acre/yr",
    tags: ["Export-oriented","High value","MPEDA support"],
    summary: "Farm aquatic organisms in controlled environments. High demand, government subsidies available.",
  },
];

// ── Community Q&A ─────────────────────────────────────────────────────────────
export const communityQA = [
  {
    id: "q1", author: "Rajesh K.", avatar: "RK", role: "Farmer · Nashik",
    question: "My tomato leaves are curling inward with yellow edges. EC was fine at 2.2. What could it be?",
    answers: 4, views: 142, time: "2h ago", tags: ["Tomato","Hydroponics","Nutrients"],
    topAnswer: "This looks like magnesium deficiency or thrips damage. Check the undersides of leaves for tiny insects. If clear, flush and add Cal-Mag at 5ml/10L.",
  },
  {
    id: "q2", author: "Priya M.", avatar: "PM", role: "Agronomist · Pune",
    question: "Best cover crop for coconut grove inter-rows during monsoon to fix nitrogen?",
    answers: 7, views: 89, time: "5h ago", tags: ["Coconut","Cover crop","Nitrogen"],
    topAnswer: "Cluster bean (Guar) or sunn hemp are excellent — fast growing, fix 80–120 kg N/ha, and easy to incorporate as green manure.",
  },
  {
    id: "q3", author: "Sita N.", avatar: "SN", role: "Dairy farmer · Sangli",
    question: "What is the right mastitis detection protocol for a 50-head herd without expensive equipment?",
    answers: 3, views: 61, time: "1 day ago", tags: ["Dairy","Animal health","Mastitis"],
    topAnswer: "California Mastitis Test (CMT) strips cost ₹300 for 50 tests. Check all 4 quarters every morning milking. Isolate and treat any CMT-positive quarters immediately.",
  },
];

// ── AI Advisor Sample Responses ───────────────────────────────────────────────
export const aiSuggestions = [
  { icon: "🌡", text: "EC in Zone A is trending above target. Flush with clean water for 20 mins then re-dose nutrients." },
  { icon: "🌧", text: "Heavy rain forecast Wed–Thu. Move compost piles indoors and ensure drainage channels are clear." },
  { icon: "📈", text: "Tomato prices are up 12% at Pune APMC. Consider scheduling next harvest batch for Tue market." },
  { icon: "🔬", text: "Your basil is at 61% growth. Prune top 2 nodes now to encourage bushier growth before harvest." },
];

// ── Livestock ─────────────────────────────────────────────────────────────────
export const livestock = [
  { id: "gv-001", name: "GV-001", breed: "Sahiwal", age: "3.5 yr", weight: "368 kg", status: "Healthy", production: "14.2 L/day", lastCheck: "Today" },
  { id: "gv-002", name: "GV-002", breed: "HF cross", age: "5 yr",   weight: "412 kg", status: "Healthy", production: "18.6 L/day", lastCheck: "Today" },
  { id: "gv-003", name: "GV-003", breed: "Jersey",   age: "2.5 yr", weight: "295 kg", status: "Watch",   production: "11.8 L/day", lastCheck: "Yesterday" },
];

export const livestockEvents = [
  { animal: "GV-003", type: "Vaccination reminder", detail: "FMD booster due",             due: "Today",    priority: "high"   },
  { animal: "GV-001", type: "Routine deworming",     detail: "Quarterly deworming cycle",   due: "Sep 20",   priority: "medium" },
  { animal: "GV-002", type: "Pregnancy check",       detail: "Confirm AI success",           due: "Sep 22",   priority: "high"   },
];
