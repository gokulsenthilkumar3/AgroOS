# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: agroos.spec.ts >> module records complete CRUD lifecycle
- Location: e2e\agroos.spec.ts:4:5

# Error details

```
Error: expect(locator).toBeVisible() failed

Locator: getByText('QA rain plan mobile', { exact: true })
Expected: visible
Timeout: 5000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" getByText('QA rain plan mobile', { exact: true }) with timeout 5000ms
  - waiting for getByText('QA rain plan mobile', { exact: true })

```

```yaml
- complementary:
  - link "AgroOS Connected agriculture":
    - /url: /dashboard
    - img
    - text: AgroOS Connected agriculture
  - navigation "Primary navigation":
    - link "Overview":
      - /url: /dashboard
      - img
      - text: Overview
    - link "All modules":
      - /url: /dashboard/modules
      - img
      - text: All modules
    - link "Farming engine":
      - /url: /dashboard/farming
      - img
      - text: Farming engine
    - link "Farm registry":
      - /url: /dashboard/farms
      - img
      - text: Farm registry
    - link "AI advisor":
      - /url: /dashboard/intelligence
      - img
      - text: AI advisor
    - link "Analytics":
      - /url: /dashboard/analytics
      - img
      - text: Analytics
    - link "IoT & sensors":
      - /url: /dashboard/telemetry
      - img
      - text: IoT & sensors
    - link "Weather":
      - /url: /dashboard/weather
      - img
      - text: Weather
    - link "Marketplace":
      - /url: /dashboard/marketplace
      - img
      - text: Marketplace
    - link "Logistics":
      - /url: /dashboard/cold-chain
      - img
      - text: Logistics
    - link "Finance":
      - /url: /dashboard/finance
      - img
      - text: Finance
    - link "Market prices":
      - /url: /dashboard/market
      - img
      - text: Market prices
    - link "Agri news":
      - /url: /dashboard/news
      - img
      - text: Agri news
    - link "Community":
      - /url: /dashboard/community
      - img
      - text: Community
    - link "Cold chain":
      - /url: /dashboard/cold-chain
      - img
      - text: Cold chain
    - link "Administration":
      - /url: /dashboard/admin
      - img
      - text: Administration
    - link "Settings":
      - /url: /dashboard/settings
      - img
      - text: Settings
- banner:
  - img
  - textbox "Search AgroOS":
    - /placeholder: Search farms, crops, orders…
  - link "Notifications":
    - /url: /dashboard/news
    - img
- main:
  - link "All modules":
    - /url: /dashboard/modules
    - img
    - text: All modules
  - paragraph: HYPERLOCAL
  - heading "Weather & climate" [level=1]
  - paragraph: Forecasts and crop-specific warnings translated into clear farm actions.
  - link "Add record":
    - /url: "#records"
    - img
    - text: Add record
  - article:
    - text: Now
    - strong: 27°C
    - text: Feels like 29°
  - article:
    - text: Rain chance
    - strong: 68%
    - text: After 16:00
  - article:
    - text: Spray window
    - strong: 2 hr
    - text: Before noon
  - paragraph: LIVE WORKSPACE
  - heading "Weather & climate records" [level=2]
  - button "Add record":
    - img
    - text: Add record
  - paragraph: Request verification failed.
  - article:
    - text: ACTIVE
    - strong: QA rain plan updated
    - text: Check rain window before irrigation.
    - button "Edit QA rain plan updated":
      - img
    - button "Archive QA rain plan updated":
      - img
  - article:
    - text: COMPLETED
    - strong: Monsoon spray window — Block A
    - text: Inspect wind and rain risk before the 10:00 spray round.
    - button "Edit Monsoon spray window — Block A":
      - img
    - button "Archive Monsoon spray window — Block A":
      - img
  - paragraph: WEATHER
  - heading "New record" [level=2]
  - button "Close":
    - img
  - text: Title
  - textbox "Title": QA rain plan mobile
  - text: Details
  - textbox "Details": Check rain window before irrigation.
  - text: Status
  - combobox "Status":
    - option "Planned"
    - option "Active" [selected]
    - option "Completed"
  - button "Save record":
    - img
    - text: Save record
  - article:
    - paragraph: CAPABILITIES
    - heading "Included workflows" [level=2]
    - img
    - strong: 14-day forecast
    - text: Configured for this organisation
    - link "Open 14-day forecast":
      - /url: "#records"
      - img
    - img
    - strong: Rain alerts
    - text: Configured for this organisation
    - link "Open Rain alerts":
      - /url: "#records"
      - img
    - img
    - strong: Frost warning
    - text: Configured for this organisation
    - link "Open Frost warning":
      - /url: "#records"
      - img
    - img
    - strong: Crop advisory
    - text: Configured for this organisation
    - link "Open Crop advisory":
      - /url: "#records"
      - img
    - img
    - strong: Spray window
    - text: Configured for this organisation
    - link "Open Spray window":
      - /url: "#records"
      - img
    - img
    - strong: Climate history
    - text: Configured for this organisation
    - link "Open Climate history":
      - /url: "#records"
      - img
  - article:
    - paragraph: QUICK ACTIONS
    - heading "Move work forward" [level=2]
    - link "View forecast":
      - /url: "#records"
      - text: View forecast
      - img
    - link "Set alert":
      - /url: "#records"
      - text: Set alert
      - img
    - link "Open crop advisory":
      - /url: "#records"
      - text: Open crop advisory
      - img
    - strong: Shared context
    - paragraph: Actions inherit your active organisation, farm, role and audit policy.
- alert
```

# Test source

```ts
  1  | import { test,expect } from "@playwright/test";
  2  | test.beforeEach(async({page,context,baseURL})=>{const url=new URL(baseURL!);await context.addCookies([{name:"agroos_demo_session",value:"demo-farm-manager",domain:url.hostname,path:"/",httpOnly:true,sameSite:"Lax"}]);await page.goto("/dashboard");await expect(page).toHaveURL(/dashboard/)});
  3  | test("navigation and command palette work",async({page})=>{await page.goto("/dashboard/crops");await expect(page.getByRole("heading",{name:"From planting to harvest"})).toBeVisible();await page.keyboard.press("Control+k");await expect(page.getByRole("dialog",{name:"Command palette"})).toBeVisible();await page.getByPlaceholder("Jump to a workspace…").fill("Weather");await page.getByRole("dialog",{name:"Command palette"}).getByRole("button",{name:/Weather/}).click();await expect(page).toHaveURL(/weather/,{timeout:30_000})});
> 4  | test("module records complete CRUD lifecycle",async({page},testInfo)=>{const title=`QA rain plan ${testInfo.project.name}`,updated=`${title} updated`;await page.goto("/dashboard/modules/weather");await page.getByRole("button",{name:"Add record"}).first().click();await page.getByRole("textbox",{name:"Title"}).fill(title);await page.getByRole("textbox",{name:"Details"}).fill("Check rain window before irrigation.");await page.getByRole("button",{name:"Save record"}).click();await expect(page.getByText(title,{exact:true})).toBeVisible();await page.getByRole("button",{name:`Edit ${title}`}).click();await page.getByRole("textbox",{name:"Title"}).fill(updated);await page.getByRole("button",{name:"Save record"}).click();await expect(page.getByText(updated,{exact:true})).toBeVisible();page.once("dialog",dialog=>dialog.accept());await page.getByRole("button",{name:`Archive ${updated}`}).click();await expect(page.getByText(updated,{exact:true})).toBeHidden()});
     |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              ^ Error: expect(locator).toBeVisible() failed
  5  | test("marketplace search and cart work",async({page})=>{await page.goto("/dashboard/marketplace");await page.getByLabel("Search marketplace").fill("honey");const product=page.getByRole("article").filter({has:page.getByRole("heading",{name:"Raw forest honey"})});await expect(product).toBeVisible();await product.getByRole("button",{name:"Add",exact:true}).click();await expect(page.getByRole("button",{name:/Cart · 1/})).toBeVisible()});
  6  | test("all primary workspaces render without server errors",async({page})=>{test.setTimeout(120_000);const routes=["/dashboard","/dashboard/modules","/dashboard/farming","/dashboard/farms","/dashboard/crops","/dashboard/intelligence","/dashboard/analytics","/dashboard/telemetry","/dashboard/weather","/dashboard/marketplace","/dashboard/cold-chain","/dashboard/finance","/dashboard/market","/dashboard/news","/dashboard/community","/dashboard/admin","/dashboard/settings"];for(const route of routes){const response=await page.goto(route,{waitUntil:"domcontentloaded"});expect(response?.status(),`${route} should render`).toBeLessThan(400);await expect(page.locator("main.content")).toBeVisible()}});
  7  | test("customer login is isolated from administration",async({page,context})=>{await context.clearCookies();await page.goto("/login");await page.getByRole("button",{name:"Enter as customer"}).click();await expect(page).toHaveURL(/dashboard/);await page.goto("/dashboard/admin");await expect(page).toHaveURL(/\/dashboard$/);await expect(page.getByRole("link",{name:"Administration"})).toHaveCount(0)});
  8  | test("authenticated exports and data APIs respond",async({page})=>{for(const path of ["/api/v1/weather","/api/v1/news","/api/v1/finance","/api/v1/market-prices","/api/v1/export?type=dashboard"]){const response=await page.request.get(path);expect(response.status(),path).toBe(200)}});
  9  | test("dashboard assets load under the content security policy",async({page})=>{const failures:string[]=[];page.on("requestfailed",request=>failures.push(`${request.failure()?.errorText}: ${request.url()}`));page.on("response",response=>{if(response.url().includes("/_next/")&&response.status()>=400)failures.push(`${response.status()}: ${response.url()}`)});const response=await page.goto("/dashboard",{waitUntil:"networkidle"});const csp=response?.headers()["content-security-policy"]??"";expect(csp).toContain("style-src 'self' 'unsafe-inline' https://fonts.googleapis.com");expect(csp).toContain("font-src 'self' https://fonts.gstatic.com");expect(failures).toEqual([])});
  10 | 
```