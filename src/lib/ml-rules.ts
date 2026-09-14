export type AdvisoryInput = { kind: "health" | "yield" | "price"; temperature?: number; humidity?: number; incidents?: number; trend?: number; demandIndex?: number };
export function evaluateAdvisory(input: AdvisoryInput) {
  const reasons: string[] = []; let score = 0.18;
  if ((input.temperature ?? 25) > 34) { score += .25; reasons.push("Temperature exceeds the preferred operating range."); }
  if ((input.humidity ?? 60) > 82) { score += .2; reasons.push("High humidity increases disease pressure."); }
  if ((input.incidents ?? 0) > 2) { score += .2; reasons.push("Recent health incidents raise near-term risk."); }
  if ((input.trend ?? 0) < -5) { score += .15; reasons.push("Production is trending below its recent baseline."); }
  if (input.kind === "price" && (input.demandIndex ?? 1) > 1.1) { score += .12; reasons.push("Demand index is above its seasonal baseline."); }
  score = Math.min(score, .95);
  return { score, confidence: reasons.length ? .72 : .56, level: score >= .65 ? "high" : score >= .4 ? "medium" : "low", reasons: reasons.length ? reasons : ["Current values remain near the configured baseline."], modelKey: `rules-${input.kind}`, modelVersion: "1.0.0", advisoryOnly: true };
}
