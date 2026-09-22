import { AlertList } from "@/components/alert-list";
import {
  alerts, aiSuggestions, cropBatches, devices,
  farm, farmPortfolio, mandiPrices, telemetry, weather,
} from "@/lib/data";
import { Activity, AlertTriangle, ArrowUpRight, Bot, Cloud, Cpu, Leaf, TrendingUp, Zap } from "lucide-react";

function Metric({
  label, value, detail, tone = "", icon,
}: {
  label: string; value: string; detail: string; tone?: string; icon?: React.ReactNode;
}) {
  return (
    <article className={`metric ${tone}`}>
      <span style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        {label}
        {icon && <span style={{ opacity: 0.5 }}>{icon}</span>}
      </span>
      <strong>{value}</strong>
      <small>{detail}</small>
    </article>
  );
}

function MiniSpark({ values }: { values: number[] }) {
  const max = Math.max(...values);
  const min = Math.min(...values);
  const w = 80; const h = 30;
  const pts = values.map((v, i) =>
    `${(i / (values.length - 1)) * w},${h - ((v - min) / (max - min || 1)) * h}`
  ).join(" ");
  return (
    <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`} style={{ overflow: "visible" }}>
      <polyline points={pts} fill="none" stroke="var(--brand-400)" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

export default function DashboardPage() {
  const max = Math.max(...telemetry.map(t => t.temperature));
  const min = Math.min(...telemetry.map(t => t.temperature));
  const points = telemetry.map((t, i) =>
    `${i * 4.35},${90 - ((t.temperature - min) / (max - min)) * 68}`
  ).join(" ");

  const temps = telemetry.map(t => t.temperature);
  const openAlerts = alerts.filter(a => a.status !== "RESOLVED").length;

  return (
    <>
      {/* ── Page header ── */}
      <header className="page-header">
        <div>
          <p className="eyebrow">{farm.location.toUpperCase()} · {new Date().toLocaleDateString("en-IN", { weekday: "long", day: "numeric", month: "long" })}</p>
          <h1>Good morning, Anika.</h1>
          <p className="muted">
            Here's how <strong>{farm.name}</strong> is performing today across all systems.
          </p>
        </div>
        <a className="button secondary" href="/api/v1/export?type=dashboard" style={{ gap: 6, display: "flex", alignItems: "center" }}>
          <TrendingUp size={14} /> Export report
        </a>
      </header>

      {/* ── KPI metrics ── */}
      <div className="metric-grid">
        <Metric label="Growing zones"     value="3"     detail="All zones reporting"        icon={<Leaf size={13} />} />
        <Metric label="Connected devices" value="2 / 3" detail="1 device needs attention"   tone="warning" icon={<Cpu size={13} />} />
        <Metric label="Active alerts"     value={String(openAlerts)} detail="1 critical condition" tone="critical" icon={<AlertTriangle size={13} />} />
        <Metric label="Next harvest"      value="4 days" detail="Butterhead lettuce"        icon={<Activity size={13} />} />
      </div>

      {/* ── Dashboard grid row 1 ── */}
      <div className="dashboard-grid">
        {/* Climate chart */}
        <article className="panel chart-panel">
          <div className="section-heading">
            <div>
              <p className="eyebrow">Last 24 hours</p>
              <h2>Climate trend</h2>
            </div>
            <span className="legend"><i /> Temperature °C</span>
          </div>
          <div
            className="chart-canvas"
            role="img"
            aria-label={`Temperature ranged from ${min.toFixed(1)}°C to ${max.toFixed(1)}°C over the last 24 hours`}
          >
            <svg viewBox="0 0 100 100" preserveAspectRatio="none" style={{ height: 160 }}>
              <defs>
                <linearGradient id="chartGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="var(--brand-400)" stopOpacity="0.25" />
                  <stop offset="100%" stopColor="var(--brand-400)" stopOpacity="0" />
                </linearGradient>
              </defs>
              <polyline
                className="fill-area"
                points={`0,100 ${points} 100,100`}
              />
              <polyline points={points} />
            </svg>
            <div className="chart-labels">
              <span>00:00</span><span>06:00</span><span>12:00</span><span>18:00</span><span>Now</span>
            </div>
          </div>
        </article>

        {/* Device health */}
        <article className="panel device-panel">
          <div className="section-heading">
            <div>
              <p className="eyebrow">Live status</p>
              <h2>Device health</h2>
            </div>
            <a href="/dashboard/telemetry">View IoT →</a>
          </div>
          {devices.map(d => (
            <div className="device-row" key={d.id}>
              <span className={`status-dot ${d.status === "Online" ? "healthy" : "offline"}`} />
              <div>
                <strong>{d.name}</strong>
                <small>{d.zone}</small>
              </div>
              <span
                style={{
                  fontSize: 11,
                  fontWeight: 650,
                  color: d.status === "Online" ? "var(--success-text)" : "var(--text-muted)",
                }}
              >
                {d.status}
              </span>
            </div>
          ))}

          {/* Quick readings for first online device */}
          <div style={{ marginTop: 14, padding: "12px 0", borderTop: "1px solid var(--border)" }}>
            <p style={{ fontSize: 10, fontWeight: 700, color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.6px", marginBottom: 8 }}>
              Leafy Greens A — live
            </p>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 6 }}>
              {[
                { label: "Temp", value: "24.1°C" },
                { label: "pH", value: "5.4" },
                { label: "EC", value: "2.6 mS" },
              ].map(r => (
                <div key={r.label} style={{ padding: "8px 10px", background: "var(--surface-1)", borderRadius: 8, border: "1px solid var(--border)" }}>
                  <span style={{ fontSize: 9, fontWeight: 700, color: "var(--text-muted)", textTransform: "uppercase" }}>{r.label}</span>
                  <strong style={{ display: "block", fontSize: 16, fontWeight: 800, letterSpacing: "-0.5px", marginTop: 2 }}>{r.value}</strong>
                </div>
              ))}
            </div>
          </div>
        </article>
      </div>

      {/* ── Farm portfolio ── */}
      <section className="panel">
        <div className="section-heading">
          <div>
            <p className="eyebrow">Integrated farm</p>
            <h2>Portfolio performance</h2>
          </div>
          <a href="/dashboard/farms">Manage farms</a>
        </div>
        <div className="crop-grid">
          {farmPortfolio.map(item => (
            <article className="crop-card" key={item.name}>
              <strong>{item.name}</strong>
              <div className="metric-value">{item.value}</div>
              <small>{item.label}</small>
              <b className="healthy-text">{item.trend}</b>
            </article>
          ))}
        </div>
      </section>

      {/* ── Crop batches ── */}
      <section className="panel">
        <div className="section-heading">
          <div>
            <p className="eyebrow">Current cycles</p>
            <h2>Crop batches</h2>
          </div>
          <a href="/dashboard/crops">View all</a>
        </div>
        <div className="crop-grid">
          {cropBatches.map(c => (
            <article className="crop-card" key={c.crop}>
              <div>
                <strong>{c.crop}</strong>
                <span>{c.zone}</span>
              </div>
              <div className="progress">
                <i style={{ width: `${c.progress}%` }} />
              </div>
              <small>{c.progress}% complete · harvest {c.harvest}</small>
              <b className={c.status === "On track" ? "healthy-text" : "warning-text"}>{c.status}</b>
            </article>
          ))}
        </div>
      </section>

      {/* ── Row 3: AI suggestions + Market prices ── */}
      <div className="dashboard-grid">
        {/* AI advisor quick actions */}
        <article className="panel">
          <div className="section-heading">
            <div>
              <p className="eyebrow">AI advisor</p>
              <h2>Smart recommendations</h2>
            </div>
            <a href="/dashboard/intelligence">Ask AI →</a>
          </div>
          <div style={{ display: "grid", gap: 8 }}>
            {aiSuggestions.map((s, i) => (
              <div
                key={i}
                style={{
                  display: "flex", gap: 12, padding: "11px 13px",
                  background: "var(--surface-1)", border: "1px solid var(--border)",
                  borderRadius: "var(--r-lg)",
                  transition: "background 0.15s",
                  cursor: "pointer",
                }}
              >
                <span style={{ fontSize: 20, flexShrink: 0 }}>{s.icon}</span>
                <p style={{ margin: 0, fontSize: 12.5, color: "var(--text-secondary)", lineHeight: 1.55 }}>{s.text}</p>
              </div>
            ))}
          </div>
        </article>

        {/* Market prices */}
        <article className="panel">
          <div className="section-heading">
            <div>
              <p className="eyebrow">Live market</p>
              <h2>Mandi prices</h2>
            </div>
            <a href="/dashboard/market">All prices →</a>
          </div>
          <div style={{ display: "grid", gap: 0 }}>
            {mandiPrices.slice(0, 5).map(p => (
              <div
                key={p.commodity}
                style={{
                  display: "flex", alignItems: "center", justifyContent: "space-between",
                  padding: "10px 0", borderBottom: "1px solid var(--border)",
                  fontSize: 12.5,
                }}
              >
                <div>
                  <strong style={{ display: "block" }}>{p.commodity}</strong>
                  <small style={{ color: "var(--text-muted)", fontSize: 10 }}>{p.market} · {p.unit}</small>
                </div>
                <div style={{ textAlign: "right" }}>
                  <strong>₹{p.price}</strong>
                  <span
                    style={{
                      display: "block", fontSize: 10, fontWeight: 700,
                      color: p.change > 0 ? "var(--success-text)" : p.change < 0 ? "var(--danger-text)" : "var(--text-muted)",
                    }}
                  >
                    {p.change > 0 ? `↑ +₹${p.change}` : p.change < 0 ? `↓ ₹${p.change}` : "Unchanged"}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </article>
      </div>

      {/* ── Weather strip ── */}
      <section className="panel" style={{ marginBottom: 20 }}>
        <div className="section-heading">
          <div>
            <p className="eyebrow">{weather.location}</p>
            <h2>7-day forecast</h2>
          </div>
          <a href="/dashboard/weather">Full advisory →</a>
        </div>
        <div style={{ display: "flex", gap: 8, overflowX: "auto", paddingBottom: 4 }}>
          {weather.forecast.map((f, i) => (
            <div
              key={f.day}
              style={{
                flex: "0 0 90px", textAlign: "center", padding: "12px 8px",
                background: i === 0 ? "var(--brand-900)" : "var(--surface-1)",
                color: i === 0 ? "white" : "var(--text-primary)",
                borderRadius: "var(--r-lg)", border: "1px solid var(--border)",
              }}
            >
              <p style={{ margin: 0, fontSize: 10, fontWeight: 700, opacity: i === 0 ? 0.65 : 1, color: i === 0 ? "white" : "var(--text-muted)" }}>{f.day}</p>
              <div style={{ fontSize: 26, margin: "6px 0 4px" }}>{f.icon}</div>
              <strong style={{ fontSize: 16, fontWeight: 800 }}>{f.high}°</strong>
              <span style={{ display: "block", fontSize: 10, opacity: 0.6 }}>{f.low}°</span>
              <span style={{
                display: "block", marginTop: 6, fontSize: 9, fontWeight: 700,
                color: f.rain > 50 ? (i === 0 ? "#93c5fd" : "var(--sky-600)") : (i === 0 ? "rgba(255,255,255,0.5)" : "var(--text-faint)"),
              }}>
                💧 {f.rain}%
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* ── Alerts ── */}
      <AlertList initialAlerts={alerts} />
    </>
  );
}
