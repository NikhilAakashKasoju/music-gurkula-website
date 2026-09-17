import { redirect } from "next/navigation";
import { getCurrentAdmin } from "@/lib/server/auth";
import LoginForm from "./LoginForm";

export default async function AdminLoginPage() {
  const admin = await getCurrentAdmin();
  if (admin) redirect("/admin/dashboard");

  return (
    <div className="mg-login-shell">
      <div className="mg-login-card">
        <div className="mg-brand">
          <span className="mg-brand-badge">♪</span>
          <span className="mg-brand-name">
            Music <em>Gurukula</em>
          </span>
        </div>
        <h1>Admin dashboard</h1>
        <p className="mg-subtitle">Sign in to view and manage enquiries.</p>

        <LoginForm />
      </div>
    </div>
  );
}
