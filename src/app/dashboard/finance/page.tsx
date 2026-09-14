import { finance } from "@/lib/data";
import { ArrowUpRight, TrendingUp } from "lucide-react";

function fmt(n: number) {
  if (n >= 100000) return `₹${(n / 100000).toFixed(1)}L`;
  if (n >= 1000)   return `₹${(n / 1000).toFixed(0)}K`;
  return `₹${n}`;
}

export default function FinancePage() {
  const { summary, monthly, expenses, schemes } = finance;

  const maxRevenue = Math.max(...monthly.map(m => m.revenue));

  return (
    <>
      <header className="page-header">
        <div>
          <p className="eyebrow">Money & finance</p>
          <h1>Farm P&amp;L</h1>
          <p className="muted">Revenue, expenses, and government scheme opportunities.</p>
        </div>
        <button className="button primary" style={{ display: "flex", gap: 6 }}>
          <TrendingUp size={14} /> Generate report
        </button>
      </header>

      {/* ── Summary KPIs ── */}
      <div className="metric-grid" style={{ marginBottom: 20 }}>
        <article className="metric healthy">
          <span>Total revenue (YTD)</span>
          <strong>{fmt(summary.revenue)}</strong>
          <small>6-month cumulative</small>
        </article>
        <article className="metric">
          <span>Total expenses</span>
          <strong>{fmt(summary.expenses)}</strong>
          <small>All input costs</small>
        </article>
        <article className="metric healthy">
          <span>Net profit</span>
          <strong>{fmt(summary.profit)}</strong>
          <small>After all costs</small>
        </article>
        <article className="metric">
          <span>Profit margin</span>
          <strong>{summary.margin}%</strong>
          <small>Revenue share</small>
        </article>
      </div>

      <div className="dashboard-grid">
        {/* Monthly revenue chart */}
        <section className="panel">
          <div className="section-heading">
            <div>
              <p className="eyebrow">April – September</p>
              <h2>Monthly revenue vs expenses</h2>
            </div>
          </div>
          <div
            style={{
              display: "flex", alignItems: "flex-end", gap: 10,
              height: 180, padding: "12px 0 0",
              borderBottom: "1px solid var(--border)",
              background: "repeating-linear-gradient(to bottom, transparent 0, transparent 43px, var(--surface-2) 44px)",
            }}
          >
            {monthly.map(m => (
              <div key={m.month} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 3 }}>
                {/* Revenue bar */}
                <div
                  style={{
                    width: "60%", borderRadius: "4px 4px 0 0",
                    height: Math.round((m.revenue / maxRevenue) * 140),
                    background: "linear-gradient(to top, var(--brand-700), var(--brand-400))",
                  }}
                />
                {/* Expense bar */}
                <div
                  style={{
                    width: "60%", borderRadius: "4px 4px 0 0",
                    height: Math.round((m.expenses / maxRevenue) * 140),
                    background: "var(--surface-3)", marginTop: -Math.round((m.expenses / maxRevenue) * 140),
                    opacity: 0.6,
                  }}
                />
              </div>
            ))}
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", marginTop: 6 }}>
            {monthly.map(m => (
              <span key={m.month} style={{ flex: 1, textAlign: "center", fontSize: 10, color: "var(--text-muted)" }}>{m.month}</span>
            ))}
          </div>
          <div style={{ display: "flex", gap: 16, marginTop: 12 }}>
            <span style={{ display: "flex", alignItems: "center", gap: 5, fontSize: 11, color: "var(--text-muted)" }}>
              <i style={{ display: "inline-block", width: 10, height: 10, borderRadius: 2, background: "var(--brand-500)" }} /> Revenue
            </span>
            <span style={{ display: "flex", alignItems: "center", gap: 5, fontSize: 11, color: "var(--text-muted)" }}>
              <i style={{ display: "inline-block", width: 10, height: 10, borderRadius: 2, background: "var(--surface-3)", border: "1px solid var(--border)" }} /> Expenses
            </span>
          </div>
        </section>

        {/* Expense breakdown */}
        <section className="panel">
          <div className="section-heading">
            <h2>Expense breakdown</h2>
          </div>
          <div style={{ display: "grid", gap: 10 }}>
            {expenses.map(e => (
              <div key={e.category}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4, fontSize: 12.5 }}>
                  <span style={{ fontWeight: 600 }}>{e.category}</span>
                  <span style={{ color: "var(--text-muted)", fontSize: 11 }}>{fmt(e.amount)} · {e.pct}%</span>
                </div>
                <div className="progress">
                  <i style={{ width: `${e.pct * 3}%`, background: `hsl(${150 - e.pct * 2}, 55%, 45%)` }} />
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* ── Government schemes ── */}
      <section className="panel">
        <div className="section-heading">
          <div>
            <p className="eyebrow">Opportunities</p>
            <h2>Government schemes</h2>
          </div>
          <button className="button secondary" style={{ fontSize: 11 }}>Find more →</button>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))", gap: 12 }}>
          {schemes.map(s => (
            <div
              key={s.name}
              style={{
                padding: "14px 16px",
                border: "1px solid var(--border)",
                borderRadius: "var(--r-lg)",
                background: s.status === "Apply now" ? "var(--warning-bg)" : "var(--surface-1)",
                borderLeft: s.status === "Apply now" ? "4px solid var(--amber-500)" : "1px solid var(--border)",
                transition: "box-shadow 0.15s",
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 8 }}>
                <strong style={{ fontSize: 13, fontWeight: 700 }}>{s.name}</strong>
                <span
                  className={`badge ${s.status === "Enrolled" ? "badge-green" : s.status === "Apply now" ? "badge-amber" : "badge-blue"}`}
                >
                  {s.status}
                </span>
              </div>
              <p style={{ margin: "6px 0 0", fontSize: 12.5, color: "var(--text-secondary)" }}>{s.benefit}</p>
              <p style={{ margin: "4px 0 0", fontSize: 10, color: "var(--text-muted)" }}>Deadline: {s.deadline}</p>
              {s.status !== "Enrolled" && (
                <button className="button primary" style={{ marginTop: 12, fontSize: 11, padding: "6px 12px", display: "flex", alignItems: "center", gap: 5 }}>
                  Apply <ArrowUpRight size={11} />
                </button>
              )}
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
