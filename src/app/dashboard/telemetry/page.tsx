import { devices, telemetry } from "@/lib/data";
import { Activity, AlertTriangle, CheckCircle, Cpu } from "lucide-react";

export default function TelemetryPage() {
  const metrics = [
    { key: "temperature", label: "Temperature", unit: "°C",    good: [20, 26], icon: "🌡" },
    { key: "humidity",    label: "Humidity",    unit: "%",     good: [60, 80], icon: "💧" },
    { key: "ph",          label: "pH",          unit: "",      good: [5.0, 6.5], icon: "⚗️" },
    { key: "ec",          label: "EC",          unit: " mS/cm",good: [1.8, 2.4], icon: "⚡" },
    { key: "waterLevel",  label: "Water level", unit: "%",     good: [55, 95], icon: "🪣" },
  ];

  return (
    <>
      <header className="page-header">
        <div>
          <p className="eyebrow">IoT & sensors</p>
          <h1>Telemetry Dashboard</h1>
          <p className="muted">Live sensor readings from all connected devices across your zones.</p>
        </div>
        <button className="button secondary">Configure alerts</button>
      </header>

      {/* Device status cards */}
      <div className="metric-grid" style={{ marginBottom: 20 }}>
        {devices.map(d => (
          <article key={d.id} className={`metric ${d.status === "Online" ? "healthy" : "warning"}`}>
            <span style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              {d.name}
              {d.status === "Online"
                ? <CheckCircle size={12} style={{ color: "var(--success-text)" }} />
                : <AlertTriangle size={12} style={{ color: "var(--amber-600)" }} />
              }
            </span>
            <strong style={{ fontSize: 20 }}>{d.zone}</strong>
            <small style={{ display: "flex", alignItems: "center", gap: 4 }}>
              <span className={`status-dot ${d.status === "Online" ? "healthy" : "offline"}`} style={{ animation: "none" }} />
              {d.status}
            </small>
          </article>
        ))}
        <article className="metric">
          <span style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            Total devices <Cpu size={12} />
          </span>
          <strong>{devices.length}</strong>
          <small>{devices.filter(d => d.status === "Online").length} online</small>
        </article>
      </div>

      {/* Live readings per device */}
      {devices.map(d => (
        <section key={d.id} className="panel" style={{ marginBottom: 16 }}>
          <div className="section-heading">
            <div>
              <p className="eyebrow">{d.zone}</p>
              <h2 style={{ display: "flex", alignItems: "center", gap: 8 }}>
                {d.name}
                <span className={`badge ${d.status === "Online" ? "badge-green" : "badge-amber"}`}>
                  {d.status}
                </span>
              </h2>
            </div>
            {d.status === "Online" && (
              <span style={{ fontSize: 10, color: "var(--text-muted)" }}>
                <Activity size={10} style={{ display: "inline", marginRight: 4 }} />
                Updated just now
              </span>
            )}
          </div>

          <div className="reading-grid">
            {metrics.map(m => {
              const val = d[m.key as keyof typeof d] as number;
              const isGood = val >= m.good[0] && val <= m.good[1];
              const isOffline = d.status === "Offline";
              return (
                <div key={m.key} className="reading-card" style={{ borderBottom: `3px solid ${isOffline ? "var(--border)" : isGood ? "var(--brand-400)" : "var(--amber-500)"}` }}>
                  <strong>{m.label}</strong>
                  <span style={{ color: isOffline ? "var(--text-faint)" : isGood ? "var(--text-primary)" : "var(--warning-text)" }}>
                    {isOffline ? "—" : `${val}${m.unit}`}
                  </span>
                  <small>
                    {isOffline ? "No signal" : isGood ? "On target" : "Out of range"}
                  </small>
                </div>
              );
            })}
          </div>
        </section>
      ))}

      {/* 24h temperature chart */}
      <section className="panel">
        <div className="section-heading">
          <div>
            <p className="eyebrow">Last 24 hours</p>
            <h2>Temperature trend</h2>
          </div>
          <span className="legend"><i /> Leafy Greens A</span>
        </div>
        <div className="chart-canvas" role="img" aria-label="Temperature chart over last 24 hours">
          <svg viewBox="0 0 100 100" preserveAspectRatio="none" style={{ height: 160 }}>
            <defs>
              <linearGradient id="tempGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="var(--brand-400)" stopOpacity="0.2" />
                <stop offset="100%" stopColor="var(--brand-400)" stopOpacity="0" />
              </linearGradient>
            </defs>
            {(() => {
              const max = Math.max(...telemetry.map(t => t.temperature));
              const min = Math.min(...telemetry.map(t => t.temperature));
              const pts = telemetry.map((t, i) =>
                `${i * 4.35},${90 - ((t.temperature - min) / (max - min)) * 68}`
              ).join(" ");
              return (
                <>
                  <polygon points={`0,100 ${pts} 100,100`} fill="url(#tempGrad)" />
                  <polyline points={pts} fill="none" stroke="var(--brand-500)" strokeWidth="2" strokeLinecap="round" />
                </>
              );
            })()}
          </svg>
          <div className="chart-labels">
            {["00:00","03:00","06:00","09:00","12:00","15:00","18:00","21:00","Now"].map(t => (
              <span key={t}>{t}</span>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
