"use client";
import { useState, useTransition } from "react";
import type { Alert } from "@/lib/data";
export function AlertList({ initialAlerts }: { initialAlerts: Alert[] }) {
  const [alerts, setAlerts] = useState(initialAlerts); const [pending, startTransition] = useTransition(); const [message, setMessage] = useState("");
  const update = (id: string, action: "acknowledge" | "resolve") => startTransition(async () => {
    const csrf = document.cookie.split("; ").find(v => v.startsWith("agroos_csrf="))?.split("=")[1];
    const res = await fetch(`/api/alerts/${id}`, { method: "PATCH", headers: { "Content-Type": "application/json", "X-CSRF-Token": csrf ?? "" }, body: JSON.stringify({ action }) });
    if (!res.ok) { setMessage("We could not update this alert. Please try again."); return; }
    const updated = await res.json(); setAlerts(current => current.map(a => a.id === id ? updated.alert : a)); setMessage(`Alert ${action === "acknowledge" ? "acknowledged" : "resolved"}.`);
  });
  return <section className="panel"><div className="section-heading"><div><p className="eyebrow">ATTENTION REQUIRED</p><h2>Farm alerts</h2></div><span className="pill">{alerts.filter(a => a.status !== "RESOLVED").length} active</span></div><p className="sr-only" aria-live="polite">{message}</p><div className="alert-stack">{alerts.map(alert => <article className={`alert ${alert.severity}`} key={alert.id}><div><span className={`status-dot ${alert.severity}`} aria-hidden="true"/><strong>{alert.title}</strong><p>{alert.detail}</p><small>{alert.zone} · {alert.device} · {alert.createdAt}</small></div><div className="alert-actions"><span className={`status-label ${alert.status.toLowerCase()}`}>{alert.status.replace("_", " ")}</span>{alert.status === "OPEN" && <button disabled={pending} className="button secondary" onClick={() => update(alert.id, "acknowledge")}>Acknowledge</button>}{alert.status !== "RESOLVED" && <button disabled={pending} className="button primary" onClick={() => update(alert.id, "resolve")}>Resolve</button>}</div></article>)}</div></section>;
}
