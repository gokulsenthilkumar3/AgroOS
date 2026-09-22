import Link from "next/link";
import { ArrowLeft, ArrowUpRight, CheckCircle2, Plus } from "lucide-react";
import { notFound } from "next/navigation";
import { findSuperModule, superModules } from "@/domain/superapp";
import { ModuleRecords } from "@/components/module-records";

export function generateStaticParams(){ return superModules.map(module => ({ slug: module.slug })); }
export default async function ModulePage({params}:{params:Promise<{slug:string}>}){
  const module = findSuperModule((await params).slug); if(!module) notFound();
  return <>
    <Link href="/dashboard/modules" className="back-link"><ArrowLeft size={14}/> All modules</Link>
    <header className={`page-header module-detail-hero ${module.accent}`}><div><p className="eyebrow">{module.eyebrow}</p><h1>{module.name}</h1><p className="muted">{module.description}</p></div><a href="#records" className="button primary"><Plus size={15}/> Add record</a></header>
    <section className="metric-grid">{module.metrics.map(metric=><article className="metric" key={metric.label}><span>{metric.label}</span><strong>{metric.value}</strong><small>{metric.detail}</small></article>)}</section>
    <div id="records"><ModuleRecords module={module.slug} name={module.name}/></div>
    <section className="module-workspace-grid"><article className="panel"><div className="section-heading"><div><p className="eyebrow">CAPABILITIES</p><h2>Included workflows</h2></div></div><div className="capability-list">{module.features.map(feature=><div key={feature}><CheckCircle2 size={16}/><span><strong>{feature}</strong><small>Configured for this organisation</small></span><a href="#records" aria-label={`Open ${feature}`}><ArrowUpRight size={15}/></a></div>)}</div></article><article className="panel action-panel"><p className="eyebrow">QUICK ACTIONS</p><h2>Move work forward</h2>{module.actions.map(action=><a href="#records" className="workspace-action" key={action}><span>{action}</span><ArrowUpRight size={16}/></a>)}<div className="module-note"><strong>Shared context</strong><p>Actions inherit your active organisation, farm, role and audit policy.</p></div></article></section>
  </>;
}
