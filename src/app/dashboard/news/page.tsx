import { news, mandiPrices } from "@/lib/data";
import { TrendingDown, TrendingUp } from "lucide-react";

export default function NewsPage() {
  const categories = ["All", "Market", "Weather", "Policy", "Finance", "Technology", "Practice", "Operations"];

  return (
    <>
      <header className="page-header">
        <div>
          <p className="eyebrow">Agri intelligence</p>
          <h1>News & Alerts</h1>
          <p className="muted">Market prices, policy updates, and farm advisories — curated daily.</p>
        </div>
        <button className="button secondary">Manage alerts</button>
      </header>

      {/* ── Live mandi price ticker ── */}
      <section className="panel" style={{ marginBottom: 18 }}>
        <div className="section-heading">
          <div>
            <p className="eyebrow">Real-time</p>
            <h2>Mandi prices today</h2>
          </div>
          <a href="/dashboard/market">All commodities →</a>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(150px, 1fr))", gap: 10 }}>
          {mandiPrices.map(p => (
            <div
              key={p.commodity}
              style={{
                padding: "12px 14px",
                background: "var(--surface-1)",
                border: "1px solid var(--border)",
                borderRadius: "var(--r-lg)",
              }}
            >
              <p style={{ margin: 0, fontSize: 11, fontWeight: 700, color: "var(--text-primary)" }}>{p.commodity}</p>
              <p style={{ margin: "2px 0", fontSize: 10, color: "var(--text-muted)" }}>{p.market}</p>
              <div style={{ display: "flex", alignItems: "baseline", gap: 6, marginTop: 6 }}>
                <strong style={{ fontSize: 18, fontWeight: 900, letterSpacing: -0.5 }}>₹{p.price}</strong>
                <span style={{ fontSize: 9, color: "var(--text-muted)" }}>{p.unit}</span>
              </div>
              <span style={{
                display: "flex", alignItems: "center", gap: 3, marginTop: 4,
                fontSize: 10, fontWeight: 700,
                color: p.change > 0 ? "var(--success-text)" : p.change < 0 ? "var(--danger-text)" : "var(--text-muted)",
              }}>
                {p.change > 0 ? <TrendingUp size={10} /> : p.change < 0 ? <TrendingDown size={10} /> : null}
                {p.change > 0 ? `+₹${p.change}` : p.change < 0 ? `₹${p.change}` : "No change"}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* ── Category filters ── */}
      <div className="category-pills" style={{ padding: "0 0 18px" }}>
        {categories.map((c, i) => (
          <button key={c} className={i === 0 ? "active" : ""}>{c}</button>
        ))}
      </div>

      {/* ── News feed ── */}
      <div className="news-grid">
        {news.map(n => (
          <article key={n.id} className="panel news-card" style={{ margin: 0 }}>
            <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
              <span
                style={{
                  padding: "3px 8px", borderRadius: "var(--r-full)",
                  fontSize: 9.5, fontWeight: 700,
                  background:
                    n.category === "Market"   ? "var(--success-bg)" :
                    n.category === "Weather"  ? "var(--info-bg)" :
                    n.category === "Policy"   ? "var(--violet-50)" :
                    n.category === "Finance"  ? "var(--warning-bg)" :
                    "var(--surface-2)",
                  color:
                    n.category === "Market"   ? "var(--success-text)" :
                    n.category === "Weather"  ? "var(--info-text)" :
                    n.category === "Policy"   ? "#5b21b6" :
                    n.category === "Finance"  ? "var(--warning-text)" :
                    "var(--text-muted)",
                }}
              >
                {n.tag}
              </span>
              <span style={{ fontSize: 10, color: "var(--text-faint)" }}>{n.time}</span>
            </div>
            <h2>{n.title}</h2>
            <p>{n.summary}</p>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: "auto", paddingTop: 12, borderTop: "1px solid var(--border)" }}>
              <span style={{ fontSize: 10, color: "var(--text-muted)" }}>{n.source}</span>
              <button className="inline-action">Read more →</button>
            </div>
          </article>
        ))}
      </div>
    </>
  );
}
