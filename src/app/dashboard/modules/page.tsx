import Link from "next/link";
import { ArrowUpRight, CheckCircle2, CloudOff, Languages, Sparkles } from "lucide-react";
import { superModules } from "@/domain/superapp";

export default function ModulesPage(){
  return <>
    <header className="page-header super-hero"><div><p className="eyebrow">AGROOS SUPER APP</p><h1>Everything your farm needs.<br/>One calm workspace.</h1><p className="muted">From soil to shelf, each module shares the same farms, people, inventory and audit history.</p></div><div className="hero-orbit"><Sparkles size={24}/><strong>12</strong><span>connected modules</span></div></header>
    <div className="capability-strip"><span><CloudOff size={15}/> Offline-ready field drafts</span><span><Languages size={15}/> English · हिन्दी · தமிழ்</span><span><CheckCircle2 size={15}/> Tenant-safe by design</span></div>
    <section className="super-module-grid">{superModules.map((module,index)=><Link href={`/dashboard/modules/${module.slug}`} className={`super-module-card ${module.accent}`} key={module.slug}><span className="module-index">{String(index+1).padStart(2,"0")}</span><div><p className="eyebrow">{module.eyebrow}</p><h2>{module.name}</h2><p>{module.description}</p><div className="module-feature-row">{module.features.slice(0,3).map(feature=><span key={feature}>{feature}</span>)}</div></div><ArrowUpRight className="module-arrow" size={18}/></Link>)}</section>
  </>;
}
