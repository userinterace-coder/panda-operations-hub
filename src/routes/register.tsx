import { useState, type FormEvent } from "react";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";

import { AuthCard } from "@/components/auth/AuthCard";
import { NotConnected } from "@/components/states";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ApiError } from "@/lib/api/client";
import { isApiConfigured } from "@/lib/api/config";
import { useAuth } from "@/lib/auth/auth-context";
import { pageHead } from "@/lib/seo";

export const Route = createFileRoute("/register")({
  head: () => pageHead("Create account", "Create a Pandatechs account for orders, support and the developer network."),
  component: RegisterPage,
});

function RegisterPage() {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [f, setF] = useState({ name: "", email: "", phone: "", password: "", password_confirmation: "" });
  const [err, setErr] = useState<ApiError | Error | null>(null);
  const [busy, setBusy] = useState(false);
  const fe = err instanceof ApiError ? err.fieldErrors : {};
  const set = (k: keyof typeof f) => (e: { target: { value: string } }) => setF((x) => ({ ...x, [k]: e.target.value }));

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setBusy(true); setErr(null);
    try { await register({ ...f, phone: f.phone || undefined }); await navigate({ to: "/app" }); }
    catch (x) { setErr(x as Error); }
    finally { setBusy(false); }
  };

  const row = (k: keyof typeof f, label: string, type = "text", ac?: string, required = true) => (
    <div className="space-y-1.5">
      <Label htmlFor={k}>{label}</Label>
      <Input id={k} type={type} required={required} autoComplete={ac} value={f[k]} onChange={set(k)} minLength={k.startsWith("password") ? 8 : undefined} />
      {fe[k]?.[0] ? <p className="text-xs text-destructive">{fe[k][0]}</p> : null}
    </div>
  );

  return (
    <AuthCard title="Create your account" footer={<>Already registered? <Link to="/login" className="text-foreground underline">Sign in</Link></>}>
      {!isApiConfigured ? <NotConnected className="mb-6" /> : null}
      <form onSubmit={onSubmit} className="space-y-4">
        {row("name", "Full name", "text", "name")}
        {row("email", "Email", "email", "email")}
        {row("phone", "Phone (optional)", "tel", "tel", false)}
        {row("password", "Password", "password", "new-password")}
        {row("password_confirmation", "Confirm password", "password", "new-password")}
        {err && !Object.keys(fe).length ? <p className="text-sm text-destructive" role="alert">{err.message}</p> : null}
        <Button type="submit" variant="brand" className="w-full" disabled={busy}>{busy ? "Creating…" : "Create account"}</Button>
      </form>
    </AuthCard>
  );
}
