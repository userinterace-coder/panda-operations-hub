import { useState, type FormEvent } from "react";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";

import { AuthCard } from "@/components/auth/AuthCard";
import { NotConnected } from "@/components/states";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { isApiConfigured } from "@/lib/api/config";
import { useAuth } from "@/lib/auth/auth-context";
import { pageHead } from "@/lib/seo";

export const Route = createFileRoute("/login")({
  head: () => pageHead("Sign in", "Sign in to your Pandatechs workspace."),
  component: LoginPage,
});

function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setBusy(true); setError(null);
    try { await login(email, password); await navigate({ to: "/app" }); }
    catch (err) { setError(err instanceof Error ? err.message : "Sign-in failed."); }
    finally { setBusy(false); }
  };

  return (
    <AuthCard title="Sign in" lead="Access your Pandatechs workspace." footer={<>New here? <Link to="/register" className="text-foreground underline">Create an account</Link></>}>
      {!isApiConfigured ? <NotConnected className="mb-6" /> : null}
      <form onSubmit={onSubmit} className="space-y-4">
        <div className="space-y-1.5"><Label htmlFor="email">Email</Label><Input id="email" type="email" required autoComplete="email" value={email} onChange={(e) => setEmail(e.target.value)} /></div>
        <div className="space-y-1.5">
          <div className="flex items-center justify-between"><Label htmlFor="password">Password</Label><Link to="/forgot-password" className="text-xs text-muted-foreground underline">Forgot password?</Link></div>
          <Input id="password" type="password" required autoComplete="current-password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>
        {error ? <p className="text-sm text-destructive" role="alert">{error}</p> : null}
        <Button type="submit" variant="brand" className="w-full" disabled={busy}>{busy ? "Signing in…" : "Sign in"}</Button>
      </form>
    </AuthCard>
  );
}
