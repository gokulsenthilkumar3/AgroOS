import { communityQA } from "@/lib/data";
import { MessageCircle, Users } from "lucide-react";

export default function CommunityPage() {
  const experts = [
    { name: "Dr. Priya Menon",   role: "Soil scientist · ICAR",      topics: ["Soil health","Organic","Hydroponics"], avatar: "PM" },
    { name: "Suresh Patil",      role: "Agronomist · Maharashtra ADA", topics: ["Crops","Pest management","Drip"],      avatar: "SP" },
    { name: "Dr. Rema Iyer",     role: "Veterinarian · Govt. Dept.",  topics: ["Livestock","Dairy","Poultry"],         avatar: "RI" },
    { name: "Kavya Nair",        role: "Farm economist · NABARD",     topics: ["Finance","Schemes","FPO"],             avatar: "KN" },
  ];

  const tutorials = [
    { title: "Setting up your first NFT hydroponic system", duration: "18 min", views: "12.4K", tag: "Hydroponics" },
    { title: "Reading and acting on EC & pH readings",       duration: "12 min", views: "8.2K",  tag: "IoT & Sensors" },
    { title: "Organic certification: step-by-step guide",    duration: "24 min", views: "6.9K",  tag: "Organic" },
    { title: "Kisan Credit Card: full application walkthrough", duration: "9 min", views: "15.1K", tag: "Finance" },
  ];

  return (
    <>
      <header className="page-header">
        <div>
          <p className="eyebrow">Community & guidance</p>
          <h1>Farmer Network</h1>
          <p className="muted">Expert Q&A, peer knowledge, and video learning — all in one place.</p>
        </div>
        <button className="button primary" style={{ display: "flex", gap: 6 }}>
          <MessageCircle size={14} /> Ask a question
        </button>
      </header>

      <div className="dashboard-grid">
        {/* Q&A feed */}
        <section>
          <div className="section-heading">
            <div>
              <p className="eyebrow">Community Q&A</p>
              <h2>Recent questions</h2>
            </div>
            <button className="button secondary" style={{ fontSize: 11 }}>Ask question</button>
          </div>
          <div style={{ display: "grid", gap: 12 }}>
            {communityQA.map(q => (
              <article
                key={q.id}
                className="panel"
                style={{ margin: 0, cursor: "pointer", transition: "transform 0.18s var(--ease), box-shadow 0.18s" }}
              >
                <div style={{ display: "flex", gap: 12, marginBottom: 12 }}>
                  <div
                    style={{
                      width: 34, height: 34, borderRadius: "50%", flexShrink: 0,
                      display: "grid", placeItems: "center",
                      background: "linear-gradient(135deg, var(--brand-200), var(--brand-400))",
                      color: "var(--brand-900)", fontSize: 10, fontWeight: 800,
                    }}
                  >
                    {q.avatar}
                  </div>
                  <div>
                    <strong style={{ display: "block", fontSize: 12 }}>{q.author}</strong>
                    <span style={{ fontSize: 10, color: "var(--text-muted)" }}>{q.role} · {q.time}</span>
                  </div>
                </div>

                <p style={{ margin: "0 0 10px", fontSize: 13.5, fontWeight: 650, lineHeight: 1.45, color: "var(--text-primary)" }}>
                  {q.question}
                </p>

                <div
                  style={{
                    padding: "10px 12px", borderRadius: "var(--r-md)",
                    background: "var(--success-bg)", borderLeft: "3px solid var(--brand-400)",
                    marginBottom: 12,
                  }}
                >
                  <p style={{ margin: 0, fontSize: 12, color: "var(--text-secondary)", lineHeight: 1.55 }}>
                    💡 {q.topAnswer}
                  </p>
                </div>

                <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                  {q.tags.map(t => (
                    <span key={t} className="badge badge-neutral">{t}</span>
                  ))}
                  <span style={{ marginLeft: "auto", fontSize: 10, color: "var(--text-muted)" }}>
                    <MessageCircle size={10} style={{ display: "inline", marginRight: 3 }} />{q.answers} answers · {q.views} views
                  </span>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* Experts + tutorials sidebar */}
        <div>
          {/* Expert network */}
          <section className="panel" style={{ marginBottom: 16 }}>
            <div className="section-heading">
              <div>
                <p className="eyebrow">Expert network</p>
                <h2>Ask an expert</h2>
              </div>
            </div>
            <div style={{ display: "grid", gap: 10 }}>
              {experts.map(e => (
                <div
                  key={e.name}
                  style={{
                    display: "flex", gap: 10, alignItems: "flex-start",
                    padding: "10px 0", borderBottom: "1px solid var(--border)",
                  }}
                >
                  <div
                    style={{
                      width: 32, height: 32, borderRadius: "50%", flexShrink: 0,
                      display: "grid", placeItems: "center",
                      background: "linear-gradient(135deg, var(--sky-50), #b8e6f7)",
                      color: "var(--sky-700)", fontSize: 10, fontWeight: 800,
                    }}
                  >
                    {e.avatar}
                  </div>
                  <div style={{ flex: 1 }}>
                    <strong style={{ display: "block", fontSize: 12 }}>{e.name}</strong>
                    <span style={{ fontSize: 10, color: "var(--text-muted)" }}>{e.role}</span>
                    <div style={{ display: "flex", gap: 4, marginTop: 6, flexWrap: "wrap" }}>
                      {e.topics.map(t => (
                        <span key={t} style={{ padding: "2px 6px", borderRadius: "var(--r-full)", background: "var(--surface-2)", color: "var(--text-muted)", fontSize: 9, fontWeight: 600 }}>{t}</span>
                      ))}
                    </div>
                  </div>
                  <button className="button ghost" style={{ fontSize: 10, padding: "5px 10px", flexShrink: 0 }}>Ask</button>
                </div>
              ))}
            </div>
          </section>

          {/* Video tutorials */}
          <section className="panel">
            <div className="section-heading">
              <div>
                <p className="eyebrow">Learning</p>
                <h2>Video tutorials</h2>
              </div>
            </div>
            <div style={{ display: "grid", gap: 10 }}>
              {tutorials.map(t => (
                <div
                  key={t.title}
                  style={{
                    display: "flex", gap: 10, cursor: "pointer",
                    padding: "10px 0", borderBottom: "1px solid var(--border)",
                  }}
                >
                  <div
                    style={{
                      width: 44, height: 44, borderRadius: "var(--r-md)", flexShrink: 0,
                      display: "grid", placeItems: "center",
                      background: "linear-gradient(135deg, var(--brand-900), var(--brand-700))",
                      color: "white", fontSize: 18,
                    }}
                  >
                    ▶
                  </div>
                  <div style={{ flex: 1 }}>
                    <strong style={{ display: "block", fontSize: 12, lineHeight: 1.4 }}>{t.title}</strong>
                    <span style={{ fontSize: 10, color: "var(--text-muted)" }}>{t.duration} · {t.views} views</span>
                    <span className="badge badge-neutral" style={{ marginTop: 5, display: "inline-block" }}>{t.tag}</span>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </>
  );
}
