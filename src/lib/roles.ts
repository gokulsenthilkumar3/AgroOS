export const roles = ["OWNER", "FARM_MANAGER", "OPERATOR", "VIEWER"] as const;
export type Role = (typeof roles)[number];
const permissions: Record<Role, string[]> = {
  OWNER: ["farm:read", "farm:write", "farm:delete", "team:manage", "billing:manage"],
  FARM_MANAGER: ["farm:read", "farm:write", "team:manage"],
  OPERATOR: ["farm:read", "farm:write"],
  VIEWER: ["farm:read"]
};
export function can(role: Role, permission: string) { return permissions[role]?.includes(permission) ?? false; }
export function permissionsFor(role: Role) { return permissions[role] ?? []; }
