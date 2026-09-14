export const roles = ["PLATFORM_ADMIN", "SUPPORT_AGENT", "OWNER", "MANAGER", "FARM_MANAGER", "SPECIALIST", "OPERATOR", "ACCOUNTANT", "CUSTOMER", "VIEWER"] as const;
export type Role = (typeof roles)[number];
const permissions: Record<Role, string[]> = {
  PLATFORM_ADMIN: ["platform:manage", "support:impersonate", "content:moderate", "audit:read"],
  SUPPORT_AGENT: ["support:read", "support:impersonate", "audit:read"],
  OWNER: ["farm:read", "farm:write", "farm:delete", "team:manage", "billing:manage"],
  MANAGER: ["farm:read", "farm:write", "team:manage", "inventory:write", "orders:manage"],
  FARM_MANAGER: ["farm:read", "farm:write", "team:manage"],
  SPECIALIST: ["farm:read", "health:write", "advisory:write"],
  OPERATOR: ["farm:read", "farm:write"],
  ACCOUNTANT: ["farm:read", "finance:read", "billing:manage"],
  VIEWER: ["farm:read"], CUSTOMER: ["farm:read", "market:read", "order:read"]
};
export function can(role: Role, permission: string) { return permissions[role]?.includes(permission) ?? false; }
export function permissionsFor(role: Role) { return permissions[role] ?? []; }
