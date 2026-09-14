import { redirect } from "next/navigation";
import { SignIn } from "@clerk/nextjs";
import { getSession } from "@/lib/auth";
export default async function LoginPage() {
  if (await getSession()) redirect("/dashboard");
  if (process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY) return <main className="login-shell"><section className="login-card clerk-card"><p className="eyebrow">AGROOS / SECURE ACCESS</p><h1>Welcome to your farm workspace.</h1><SignIn routing="hash" /></section></main>;
  return <main className="login-shell"><section className="login-card"><p className="eyebrow">AGROOS / CONNECTED AGRICULTURE</p><h1>Grow, buy, and plan with clarity.</h1><p className="muted">One calm workspace for farms, customers, produce, and trusted agricultural information.</p><div className="login-actions"><form action="/api/auth/demo" method="post"><button className="button primary" type="submit">Enter as farm manager</button></form><form action="/api/auth/demo" method="post"><input type="hidden" name="role" value="customer"/><button className="button secondary" type="submit">Enter as customer</button></form></div><p className="fine-print">Demo access only. Farm manager: Anika Sharma · Customer: Riya Kapoor.</p></section></main>;
}
