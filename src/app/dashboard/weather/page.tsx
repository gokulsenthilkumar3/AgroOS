import { weather } from "@/lib/data";
import { CloudRain, Droplets, Eye, Thermometer, Wind } from "lucide-react";

export default function WeatherPage() {
  const { current, location, forecast, advisories } = weather;

  return (
    <>
      <header className="page-header">
        <div>
          <p className="eyebrow">Hyperlocal weather</p>
          <h1>Weather & Climate</h1>
          <p className="muted">Crop-specific advisories for {location}</p>
        </div>
        <button className="button secondary">Set alerts</button>
      </header>

      {/* ── Current conditions hero ── */}
      <section
        className="panel"
        style={{
          background: "linear-gradient(135deg, var(--brand-950), #1e6641)",
          border: "none",
          color: "white",
          marginBottom: 18,
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute", top: -60, right: -60,
            width: 200, height: 200, borderRadius: "50%",
            background: "radial-gradient(circle, rgba(39,151,93,0.25), transparent 70%)",
            pointerEvents: "none",
          }}
        />
        <div style={{ display: "grid", gridTemplateColumns: "1fr auto", gap: 24, alignItems: "center" }}>
          <div>
            <p style={{ margin: "0 0 4px", fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: "1.2px", color: "rgba(255,255,255,0.5)" }}>
              {location} · Live
            </p>
            <div style={{ display: "flex", alignItems: "flex-end", gap: 12, margin: "8px 0 16px" }}>
              <span style={{ fontSize: 72, fontWeight: 900, letterSpacing: -4, lineHeight: 1 }}>{current.temp}°</span>
              <div style={{ paddingBottom: 10 }}>
                <p style={{ margin: 0, fontSize: 16, fontWeight: 600, color: "rgba(255,255,255,0.85)" }}>{current.condition}</p>
                <p style={{ margin: 0, fontSize: 12, color: "rgba(255,255,255,0.5)" }}>Feels like {current.feels}°C</p>
              </div>
            </div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 16 }}>
              {[
                { icon: <Droplets size={13} />, label: "Humidity", value: `${current.humidity}%` },
                { icon: <Wind size={13} />,     label: "Wind",     value: current.wind },
                { icon: <Eye size={13} />,      label: "Vis.",     value: current.visibility },
                { icon: <Thermometer size={13} />, label: "Pressure", value: current.pressure },
              ].map(s => (
                <div key={s.label} style={{ display: "flex", alignItems: "center", gap: 6 }}>
                  <span style={{ opacity: 0.55 }}>{s.icon}</span>
                  <span style={{ fontSize: 11, color: "rgba(255,255,255,0.55)", marginRight: 3 }}>{s.label}</span>
                  <strong style={{ fontSize: 12, fontWeight: 650 }}>{s.value}</strong>
                </div>
              ))}
            </div>
          </div>
          <div style={{ textAlign: "center", fontSize: 72 }}>⛅</div>
        </div>
      </section>

      {/* ── 7-day forecast ── */}
      <section className="panel" style={{ marginBottom: 18 }}>
        <div className="section-heading">
          <h2>7-day forecast</h2>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(7,1fr)", gap: 8 }}>
          {forecast.map((f, i) => (
            <div
              key={f.day}
              style={{
                textAlign: "center", padding: "14px 8px",
                background: i === 0 ? "var(--surface-2)" : "var(--surface-1)",
                borderRadius: "var(--r-lg)",
                border: `1px solid ${i === 0 ? "var(--border-strong)" : "var(--border)"}`,
              }}
            >
              <p style={{ margin: 0, fontSize: 10, fontWeight: 700, color: "var(--text-muted)" }}>{f.day}</p>
              <div style={{ fontSize: 28, margin: "8px 0 6px" }}>{f.icon}</div>
              <strong style={{ display: "block", fontSize: 17, fontWeight: 800 }}>{f.high}°</strong>
              <span style={{ display: "block", fontSize: 11, color: "var(--text-muted)" }}>{f.low}°</span>
              <span
                style={{
                  display: "block", marginTop: 8, fontSize: 9.5, fontWeight: 700,
                  color: f.rain > 50 ? "var(--sky-600)" : "var(--text-faint)",
                }}
              >
                <CloudRain size={9} style={{ display: "inline", marginRight: 2 }} />{f.rain}%
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* ── Advisories ── */}
      <section className="panel">
        <div className="section-heading">
          <div>
            <p className="eyebrow">Farm-specific</p>
            <h2>Crop advisories</h2>
          </div>
        </div>
        <div style={{ display: "grid", gap: 10 }}>
          {advisories.map((a, i) => (
            <div
              key={i}
              style={{
                display: "flex", gap: 14, padding: "14px 16px",
                borderRadius: "var(--r-lg)", border: "1px solid var(--border)",
                background:
                  a.type === "warning" ? "var(--warning-bg)" :
                  a.type === "success" ? "var(--success-bg)" :
                  "var(--info-bg)",
                borderLeft: `4px solid ${
                  a.type === "warning" ? "var(--amber-500)" :
                  a.type === "success" ? "var(--brand-500)" :
                  "var(--sky-500)"
                }`,
              }}
            >
              <span style={{ fontSize: 22, flexShrink: 0 }}>
                {a.type === "warning" ? "⚠️" : a.type === "success" ? "✅" : "ℹ️"}
              </span>
              <div>
                <strong style={{ display: "block", fontSize: 13.5, fontWeight: 750 }}>{a.title}</strong>
                <p style={{ margin: "4px 0 0", fontSize: 12, color: "var(--text-secondary)", lineHeight: 1.55 }}>{a.detail}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
