import { redirect } from "next/navigation";
import { getSession } from "@/lib/auth";
import Link from "next/link";
const links = [["/dashboard", "Overview"], ["/dashboard/telemetry", "Telemetry"], ["/dashboard/crops", "Crop batches"], ["/dashboard/alerts", "Alerts"]];
export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const session = await getSession(); if (!session) redirect("/login");
  return <div className="app-shell"><aside className="sidebar"><Link className="brand" href="/dashboard"><span>✦</span>HydroGrow</Link><nav aria-label="Main navigation">{links.map(([href, label]) => <Link key={href} href={href}>{label}</Link>)}</nav><div className="account"><span className="avatar">AS</span><div><strong>{session.name}</strong><small>Farm manager</small></div><form action="/api/auth/logout" method="post"><button className="text-button" type="submit">Sign out</button></form></div></aside><main className="content">{children}</main></div>;
}
