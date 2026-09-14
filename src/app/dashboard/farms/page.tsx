import { FarmRegistry } from "@/components/farm-registry";
import { requireSession } from "@/lib/auth";
import { listFarms } from "@/lib/farm-repository";
import { can, type Role } from "@/lib/roles";
export default async function FarmsPage() { const user = await requireSession(); return <FarmRegistry initialFarms={await listFarms(user.organisationId)} canManage={can(user.role as Role, "farm:write")}/>; }
