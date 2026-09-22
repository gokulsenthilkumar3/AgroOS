import { describe,expect,it } from "vitest";import { can,permissionsFor } from "./roles";
describe("role policies",()=>{it("allows owners to delete farms",()=>expect(can("OWNER","farm:delete")).toBe(true));it("denies viewers mutations",()=>expect(can("VIEWER","farm:write")).toBe(false));it("exposes customer order access",()=>expect(permissionsFor("CUSTOMER")).toContain("order:read"))});
