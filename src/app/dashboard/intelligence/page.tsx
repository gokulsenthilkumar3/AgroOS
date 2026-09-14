"use client";
import { aiSuggestions } from "@/lib/data";
import { Bot, Send, Sparkles } from "lucide-react";
import { useState } from "react";

const sampleChats = [
  {
    role: "ai",
    text: "Hello Anika! I'm your AgroOS AI Farm Advisor. I have full context of your Green Valley Hydroponics farm — 3 zones, current crop batches, sensor readings, and market conditions. How can I help you today?",
  },
  {
    role: "user",
    text: "My EC in Zone A is 2.6, but target is 2.4. What should I do?",
  },
  {
    role: "ai",
    text: "EC at 2.6 mS/cm is 8% above your target range of 1.8–2.4. Here's my recommended action plan:\n\n1. **Immediate**: Flush Zone A reservoir with 20% clean (RO/fresh) water\n2. **Recalibrate**: After 45 mins, re-check EC. Target 2.2 to give headroom\n3. **Root cause**: Check your nutrient concentrate — if you're using a two-part solution, Part B (potassium) may be slightly overdosed\n4. **Monitor**: Set an alert if EC rises above 2.5 again within 24h\n\nShall I create an activity log for this action?",
  },
];

const quickPrompts = [
  "When should I harvest my lettuce?",
  "What's wrong with my tomato leaves?",
  "Best time to sell at Pune mandi today?",
  "Remind me to check pH at 6pm",
  "What government schemes am I eligible for?",
];

export default function IntelligencePage() {
  const [messages, setMessages] = useState(sampleChats);
  const [input, setInput] = useState("");

  function handleSend() {
    if (!input.trim()) return;
    setMessages(m => [
      ...m,
      { role: "user", text: input },
      { role: "ai", text: "I'm processing your query about: \"" + input + "\". In a live deployment, I'd use real-time farm data, current sensor readings, and weather forecasts to give you a precise recommendation. For now, check your device dashboard and the weather advisory panel." },
    ]);
    setInput("");
  }

  return (
    <>
      <header className="page-header">
        <div>
          <p className="eyebrow">AI-powered</p>
          <h1>Farm Intelligence</h1>
          <p className="muted">Your AI advisor with full context of your farm — sensors, crops, markets, and weather.</p>
        </div>
        <button className="button secondary">History</button>
      </header>

      <div className="module-workspace-grid">
        {/* Chat panel */}
        <section className="panel" style={{ display: "flex", flexDirection: "column", minHeight: 600, padding: 0, overflow: "hidden" }}>
          {/* Header */}
          <div
            style={{
              display: "flex", alignItems: "center", gap: 12, padding: "16px 20px",
              borderBottom: "1px solid var(--border)",
              background: "linear-gradient(135deg, var(--brand-950), #1e6641)",
              color: "white",
            }}
          >
            <div style={{ width: 36, height: 36, borderRadius: 10, background: "rgba(255,255,255,0.15)", display: "grid", placeItems: "center" }}>
              <Bot size={18} />
            </div>
            <div>
              <strong style={{ display: "block", fontSize: 14 }}>AgroOS AI Advisor</strong>
              <span style={{ fontSize: 10, color: "rgba(255,255,255,0.55)" }}>Trained on your farm data · Powered by Gemini</span>
            </div>
            <span
              style={{
                marginLeft: "auto", display: "flex", alignItems: "center", gap: 5,
                padding: "4px 10px", borderRadius: "var(--r-full)",
                background: "rgba(39,151,93,0.3)", color: "#6ee8a2",
                fontSize: 10, fontWeight: 700,
              }}
            >
              <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#6ee8a2", display: "inline-block" }} />
              Live
            </span>
          </div>

          {/* Messages */}
          <div style={{ flex: 1, overflowY: "auto", padding: "20px 20px 12px", display: "flex", flexDirection: "column", gap: 14 }}>
            {messages.map((m, i) => (
              <div
                key={i}
                style={{
                  display: "flex",
                  justifyContent: m.role === "user" ? "flex-end" : "flex-start",
                  gap: 10,
                }}
              >
                {m.role === "ai" && (
                  <div style={{ width: 28, height: 28, borderRadius: 8, background: "linear-gradient(135deg, var(--brand-700), var(--brand-950))", display: "grid", placeItems: "center", flexShrink: 0, color: "white", marginTop: 2 }}>
                    <Bot size={14} />
                  </div>
                )}
                <div
                  style={{
                    maxWidth: "75%",
                    padding: "11px 14px",
                    borderRadius: m.role === "user" ? "14px 14px 4px 14px" : "14px 14px 14px 4px",
                    background: m.role === "user" ? "var(--brand-800)" : "var(--surface-1)",
                    color: m.role === "user" ? "white" : "var(--text-primary)",
                    border: m.role === "ai" ? "1px solid var(--border)" : "none",
                    fontSize: 13,
                    lineHeight: 1.58,
                    whiteSpace: "pre-wrap",
                  }}
                >
                  {m.text}
                </div>
              </div>
            ))}
          </div>

          {/* Quick prompts */}
          <div style={{ padding: "0 20px 12px", display: "flex", gap: 6, overflowX: "auto" }}>
            {quickPrompts.map(p => (
              <button
                key={p}
                onClick={() => setInput(p)}
                style={{
                  padding: "5px 10px", border: "1px solid var(--border-strong)",
                  borderRadius: "var(--r-full)", background: "var(--surface-1)",
                  color: "var(--text-secondary)", fontSize: 10.5, fontWeight: 600,
                  whiteSpace: "nowrap", cursor: "pointer", flexShrink: 0,
                  transition: "all 0.15s",
                }}
              >
                {p}
              </button>
            ))}
          </div>

          {/* Input */}
          <div style={{ padding: "12px 16px", borderTop: "1px solid var(--border)", display: "flex", gap: 8 }}>
            <input
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => e.key === "Enter" && handleSend()}
              placeholder="Ask about your crops, sensors, weather, markets…"
              style={{
                flex: 1, padding: "11px 14px", border: "1px solid var(--border-strong)",
                borderRadius: "var(--r-md)", background: "var(--surface-1)",
                fontSize: 13, color: "var(--text-primary)",
              }}
            />
            <button
              onClick={handleSend}
              className="button primary"
              style={{ padding: "10px 14px", display: "flex", gap: 6, alignItems: "center" }}
            >
              <Send size={14} /> Send
            </button>
          </div>
        </section>

        {/* Sidebar */}
        <div>
          {/* Farm context */}
          <section className="panel" style={{ marginBottom: 14 }}>
            <div className="section-heading"><h2>Farm context</h2></div>
            <div style={{ display: "grid", gap: 8 }}>
              {[
                { label: "EC Zone A",    value: "2.6 mS/cm",  status: "critical" },
                { label: "pH Zone A",    value: "5.4",        status: "healthy" },
                { label: "Temp",         value: "24.1°C",     status: "healthy" },
                { label: "Next harvest", value: "4 days",     status: "healthy" },
                { label: "Open alerts",  value: "2 active",   status: "warning" },
              ].map(r => (
                <div key={r.label} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "8px 0", borderBottom: "1px solid var(--border)", fontSize: 12.5 }}>
                  <span style={{ color: "var(--text-muted)" }}>{r.label}</span>
                  <span style={{ display: "flex", alignItems: "center", gap: 5, fontWeight: 650 }}>
                    <span className={`status-dot ${r.status}`} style={{ animation: "none" }} />
                    {r.value}
                  </span>
                </div>
              ))}
            </div>
          </section>

          {/* AI suggestions */}
          <section className="panel">
            <div className="section-heading">
              <div>
                <p className="eyebrow">Today's insights</p>
                <h2>AI recommendations</h2>
              </div>
            </div>
            <div style={{ display: "grid", gap: 8 }}>
              {aiSuggestions.map((s, i) => (
                <div
                  key={i}
                  onClick={() => setInput(s.text.split(".")[0] + "?")}
                  style={{
                    display: "flex", gap: 10, padding: "10px 12px",
                    background: "var(--surface-1)", border: "1px solid var(--border)",
                    borderRadius: "var(--r-lg)", cursor: "pointer", transition: "background 0.15s",
                  }}
                >
                  <span style={{ fontSize: 18, flexShrink: 0 }}>{s.icon}</span>
                  <p style={{ margin: 0, fontSize: 11.5, color: "var(--text-secondary)", lineHeight: 1.5 }}>{s.text}</p>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </>
  );
}
