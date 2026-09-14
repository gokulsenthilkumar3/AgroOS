import { Activity, Database, Newspaper, ShieldAlert, Users, Webhook } from "lucide-react";
import { redirect } from "next/navigation";
import { requireSession } from "@/lib/auth";
import { ModuleRecords } from "@/components/module-records";

const areas = [
  [Users, "People & access", "Invitations, memberships, custom roles and farm-level permissions"],
  [Newspaper, "Content moderation", "Approve trusted news, advisories and market updates"],
  [Webhook, "Integrations", "Clerk, payments, messages, feeds, labs, delivery and IoT"],
  [ShieldAlert, "Security centre", "Privileged actions, impersonation approvals and access anomalies"],
  [Database, "Data operations", "Database health, Timescale retention and background jobs"],
  [Activity, "Model operations", "Model versions, evaluation, drift and human feedback"],
] as const;

export default async function AdminPage() {
  const session = await requireSession();
  if (!["PLATFORM_ADMIN", "SUPPORT_AGENT", "OWNER"].includes(session.role)) redirect("/dashboard");
  return <>
    <header className="page-header hero-header"><div><p className="eyebrow">PLATFORM CONTROL</p><h1>Administration</h1><p className="muted">Tenant operations, access governance, content moderation, integrations, and system health.</p></div><button className="button secondary">Export audit log</button></header>
    <section className="metric-grid"><article className="metric"><span>Organisations</span><strong>124</strong><small>+8 this month</small></article><article className="metric"><span>Active users</span><strong>1,842</strong><small>Across 9 roles</small></article><article className="metric warning"><span>Review queue</span><strong>18</strong><small>News and advisories</small></article><article className="metric"><span>System health</span><strong>99.98%</strong><small>Last 30 days</small></article></section>
    <section className="admin-grid">{areas.map(([Icon,title,description]) => <article className="panel admin-card" key={title}><span className="admin-icon"><Icon size={19}/></span><h2>{title}</h2><p>{description}</p><button className="inline-action">Open workspace →</button></article>)}</section>
    <section className="panel"><div className="section-heading"><div><p className="eyebrow">RECENT SECURITY EVENTS</p><h2>Audit stream</h2></div><span className="status-label resolved">All systems normal</span></div><div className="audit-list"><div><span className="status-dot healthy"/><p><strong>Role updated</strong><small>Organisation owner promoted a farm operator · Green Valley · 14:42</small></p></div><div><span className="status-dot healthy"/><p><strong>Clerk webhook verified</strong><small>User profile synchronised · 14:37</small></p></div><div><span className="status-dot warning"/><p><strong>Support access requested</strong><small>Awaiting owner approval · Konkan Grove · 13:18</small></p></div></div></section>
    <ModuleRecords module="administration" name="Administration"/>
  </>;
}
