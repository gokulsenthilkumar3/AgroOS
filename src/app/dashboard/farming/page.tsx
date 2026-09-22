import { farmingTechniques } from "@/lib/data";
import { ArrowRight } from "lucide-react";

export default function FarmingPage() {
  const categories = ["All techniques","Hydroponics","Organic","Water-saving","High-value","Livestock & more"];

  return (
    <>
      <header className="page-header">
        <div>
          <p className="eyebrow">Knowledge library</p>
          <h1>Farming Engine</h1>
          <p className="muted">100+ technique guides, crop protocols, and best practices — offline ready.</p>
        </div>
        <a className="button secondary" href="/dashboard/modules/techniques">My saved guides</a>
      </header>

      {/* Stats strip */}
      <div className="template-summary" style={{ marginBottom: 28 }}>
        <div><strong>100+</strong><span>Technique guides</span></div>
        <div><strong>45</strong><span>Crop protocols</span></div>
        <div><strong>12</strong><span>Farming methods</span></div>
        <div><strong>Offline</strong><span>Access anywhere</span></div>
      </div>

      {/* Category filters */}
      <div className="category-pills" style={{ padding: "0 0 20px" }}>
        {categories.map((c, i) => (
          <button key={c} className={i === 0 ? "active" : ""}>{c}</button>
        ))}
      </div>

      {/* Technique cards */}
      <div className="template-grid">
        {farmingTechniques.map(t => (
          <article key={t.id} className="template-card" style={{ cursor: "pointer" }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <div
                className="template-icon"
                style={{
                  fontSize: 20, fontWeight: "normal",
                  background:
                    t.color === "blue"   ? "linear-gradient(145deg, var(--sky-50), #b8e6f7)" :
                    t.color === "amber"  ? "linear-gradient(145deg, var(--amber-50), #fde68a)" :
                    t.color === "violet" ? "linear-gradient(145deg, var(--violet-50), #ddd6fe)" :
                    "linear-gradient(145deg, var(--brand-50), var(--brand-200))",
                }}
              >
                {t.icon}
              </div>
              <ArrowRight size={14} style={{ color: "var(--text-faint)" }} />
            </div>

            <h3 style={{ margin: "14px 0 3px" }}>{t.name}</h3>
            <p style={{ fontSize: 11.5, color: "var(--text-muted)", lineHeight: 1.55, marginBottom: 10 }}>{t.tagline}</p>

            <div className="tag-row">
              {t.tags.map(tag => <span key={tag}>{tag}</span>)}
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 6, margin: "12px 0" }}>
              {[
                { label: "Difficulty", value: t.difficulty },
                { label: "Water", value: t.water },
                { label: "Yield", value: t.yield },
              ].map(m => (
                <div key={m.label} style={{ padding: "6px 8px", background: "var(--surface-1)", borderRadius: "var(--r-sm)", border: "1px solid var(--border)" }}>
                  <span style={{ display: "block", fontSize: 8.5, fontWeight: 700, color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.4px" }}>{m.label}</span>
                  <strong style={{ display: "block", fontSize: 11, marginTop: 2 }}>{m.value}</strong>
                </div>
              ))}
            </div>

            <p style={{ margin: "8px 0 0", fontSize: 11, color: "var(--text-muted)", lineHeight: 1.55 }}>{t.summary}</p>

            <footer style={{ marginTop: 14, paddingTop: 12, borderTop: "1px solid var(--border)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span style={{ fontSize: 10, color: "var(--text-faint)" }}>
                Crops: {t.crops.slice(0, 2).join(", ")}{t.crops.length > 2 ? ` +${t.crops.length - 2}` : ""}
              </span>
              <a href="/dashboard/modules/techniques" style={{ border: 0, background: "transparent", color: "var(--brand-600)", fontSize: 11, fontWeight: 750, cursor: "pointer" }}>
                Open guide →
              </a>
            </footer>
          </article>
        ))}
      </div>
    </>
  );
}
