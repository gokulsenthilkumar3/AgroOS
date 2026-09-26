# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: agroos.spec.ts >> customer login is isolated from administration
- Location: e2e\agroos.spec.ts:7:5

# Error details

```
Error: expect(page).toHaveURL(expected) failed

Expected pattern: /dashboard/
Received string:  "http://127.0.0.1:3000/login"
Timeout: 5000ms

Call log:
  - Expect "toHaveURL" with timeout 5000ms
    13 × locator resolved to <html lang="en" data-scroll-behavior="smooth">…</html>
       - unexpected value "http://127.0.0.1:3000/login"

```

```yaml
- main:
  - paragraph: AGROOS / CONNECTED AGRICULTURE
  - heading "Grow, buy, and plan with clarity." [level=1]
  - paragraph: One calm workspace for farms, customers, produce, and trusted agricultural information.
  - button "Enter as farm manager"
  - button "Enter as customer"
  - paragraph: "Demo access only. Farm manager: Anika Sharma · Customer: Riya Kapoor."
- alert
```

# Test source

```ts
  1  | import { test,expect } from "@playwright/test";
  2  | test.beforeEach(async({page,context,baseURL})=>{const url=new URL(baseURL!);await context.addCookies([{name:"agroos_demo_session",value:"demo-farm-manager",domain:url.hostname,path:"/",httpOnly:true,sameSite:"Lax"}]);await page.goto("/dashboard");await expect(page).toHaveURL(/dashboard/)});
  3  | test("navigation and command palette work",async({page})=>{await page.goto("/dashboard/crops");await expect(page.getByRole("heading",{name:"From planting to harvest"})).toBeVisible();await page.keyboard.press("Control+k");await expect(page.getByRole("dialog",{name:"Command palette"})).toBeVisible();await page.getByPlaceholder("Jump to a workspace…").fill("Weather");await page.getByRole("dialog",{name:"Command palette"}).getByRole("button",{name:/Weather/}).click();await expect(page).toHaveURL(/weather/,{timeout:30_000})});
  4  | test("module records complete CRUD lifecycle",async({page},testInfo)=>{const title=`QA rain plan ${testInfo.project.name}`,updated=`${title} updated`;await page.goto("/dashboard/modules/weather");await page.getByRole("button",{name:"Add record"}).first().click();await page.getByRole("textbox",{name:"Title"}).fill(title);await page.getByRole("textbox",{name:"Details"}).fill("Check rain window before irrigation.");await page.getByRole("button",{name:"Save record"}).click();await expect(page.getByText(title,{exact:true})).toBeVisible();await page.getByRole("button",{name:`Edit ${title}`}).click();await page.getByRole("textbox",{name:"Title"}).fill(updated);await page.getByRole("button",{name:"Save record"}).click();await expect(page.getByText(updated,{exact:true})).toBeVisible();page.once("dialog",dialog=>dialog.accept());await page.getByRole("button",{name:`Archive ${updated}`}).click();await expect(page.getByText(updated,{exact:true})).toBeHidden()});
  5  | test("marketplace search and cart work",async({page})=>{await page.goto("/dashboard/marketplace");await page.getByLabel("Search marketplace").fill("honey");const product=page.getByRole("article").filter({has:page.getByRole("heading",{name:"Raw forest honey"})});await expect(product).toBeVisible();await product.getByRole("button",{name:"Add",exact:true}).click();await expect(page.getByRole("button",{name:/Cart · 1/})).toBeVisible()});
  6  | test("all primary workspaces render without server errors",async({page})=>{test.setTimeout(120_000);const routes=["/dashboard","/dashboard/modules","/dashboard/farming","/dashboard/farms","/dashboard/crops","/dashboard/intelligence","/dashboard/analytics","/dashboard/telemetry","/dashboard/weather","/dashboard/marketplace","/dashboard/cold-chain","/dashboard/finance","/dashboard/market","/dashboard/news","/dashboard/community","/dashboard/admin","/dashboard/settings"];for(const route of routes){const response=await page.goto(route,{waitUntil:"domcontentloaded"});expect(response?.status(),`${route} should render`).toBeLessThan(400);await expect(page.locator("main.content")).toBeVisible()}});
> 7  | test("customer login is isolated from administration",async({page,context})=>{await context.clearCookies();await page.goto("/login");await page.getByRole("button",{name:"Enter as customer"}).click();await expect(page).toHaveURL(/dashboard/);await page.goto("/dashboard/admin");await expect(page).toHaveURL(/\/dashboard$/);await expect(page.getByRole("link",{name:"Administration"})).toHaveCount(0)});
     |                                                                                                                                                                                                                           ^ Error: expect(page).toHaveURL(expected) failed
  8  | test("authenticated exports and data APIs respond",async({page})=>{for(const path of ["/api/v1/weather","/api/v1/news","/api/v1/finance","/api/v1/market-prices","/api/v1/export?type=dashboard"]){const response=await page.request.get(path);expect(response.status(),path).toBe(200)}});
  9  | test("dashboard assets load under the content security policy",async({page})=>{const failures:string[]=[];page.on("requestfailed",request=>failures.push(`${request.failure()?.errorText}: ${request.url()}`));page.on("response",response=>{if(response.url().includes("/_next/")&&response.status()>=400)failures.push(`${response.status()}: ${response.url()}`)});const response=await page.goto("/dashboard",{waitUntil:"networkidle"});const csp=response?.headers()["content-security-policy"]??"";expect(csp).toContain("style-src 'self' 'unsafe-inline' https://fonts.googleapis.com");expect(csp).toContain("font-src 'self' https://fonts.gstatic.com");expect(failures).toEqual([])});
  10 | 
```