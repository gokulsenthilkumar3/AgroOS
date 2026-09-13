import { FarmRegistry } from "@/components/farm-registry";
import { requireSession } from "@/lib/auth";
import { managedFarms } from "@/lib/farms";
import { can, type Role } from "@/lib/roles";
export default async function FarmsPage() { const user = await requireSession(); return <FarmRegistry initialFarms={managedFarms} canManage={can(user.role as Role, "farm:write")}/>; }
