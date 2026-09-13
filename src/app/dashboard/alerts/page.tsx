import { AlertList } from "@/components/alert-list";
import { alerts } from "@/lib/data";
export default function AlertsPage() { return <><header className="page-header"><div><p className="eyebrow">FARM OPERATIONS</p><h1>Alerts</h1><p className="muted">Review, acknowledge, and resolve conditions that need attention.</p></div></header><AlertList initialAlerts={alerts}/></>; }
