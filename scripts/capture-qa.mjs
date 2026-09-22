import { chromium } from "@playwright/test";

const browser = await chromium.launch({ channel: "chrome" });
const page = await browser.newPage({ viewport: { width: 1440, height: 1000 } });
await page.context().addCookies([{ name: "agroos_demo_session", value: "demo-farm-manager", domain: "localhost", path: "/", httpOnly: true, sameSite: "Lax" }]);
await page.goto("http://localhost:3000/dashboard", { waitUntil: "domcontentloaded" });
await page.screenshot({ path: ".gstack/qa-reports/screenshots/dashboard-final.png", fullPage: true });
await page.goto("http://localhost:3000/dashboard/marketplace", { waitUntil: "domcontentloaded" });
await page.screenshot({ path: ".gstack/qa-reports/screenshots/marketplace-final.png", fullPage: true });
await browser.close();
