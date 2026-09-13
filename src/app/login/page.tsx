import { redirect } from "next/navigation";
import { getSession } from "@/lib/auth";
export default async function LoginPage() {
  if (await getSession()) redirect("/dashboard");
  return <main className="login-shell"><section className="login-card"><p className="eyebrow">AGROOS / HYDROGROW</p><h1>Grow with a clearer view.</h1><p className="muted">A secure operations workspace for your hydroponic farm.</p><form action="/api/auth/demo" method="post"><button className="button primary" type="submit">Enter demo farm</button></form><p className="fine-print">Demo access: Anika Sharma · Farm Manager<br/>For evaluation only — not production authentication.</p></section></main>;
}
