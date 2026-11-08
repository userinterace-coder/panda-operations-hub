import { useEffect } from "react";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { LogOut } from "lucide-react";

import { Wordmark } from "@/components/brand/Wordmark";
import { InlineSpinner } from "@/components/states";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/lib/auth/auth-context";
import { roleLabel, userRoles } from "@/lib/auth/roles";
import { pageHead } from "@/lib/seo";

export const Route = createFileRoute("/app")({
  head: () => pageHead("Workspace", "Your Pandatechs workspace."),
  component: Workspace,
});

function Workspace() {
  const { status, user, logout } = useAuth();
  const navigate = useNavigate();
  useEffect(() => { if (status === "anonymous") void navigate({ to: "/login" }); }, [status, navigate]);
  if (status !== "authenticated" || !user) return <div className="flex min-h-screen items-center justify-center"><InlineSpinner /></div>;
  const roles = userRoles(user);
  return (
    <div className="min-h-screen bg-muted">
      <header className="border-b bg-background">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4">
          <Link to="/"><Wordmark /></Link>
          <Button variant="ghost" size="sm" onClick={async () => { await logout(); await navigate({ to: "/" }); }}><LogOut /> Sign out</Button>
        </div>
      </header>
      <main className="mx-auto max-w-7xl px-4 py-10">
        <p className="eyebrow">Workspace</p>
        <h1 className="mt-3 text-3xl font-semibold">Welcome, {user.name}</h1>
        <p className="mt-2 font-mono text-xs text-muted-foreground">{user.email} · {roles.map(roleLabel).join(", ") || "No role assigned"}</p>
      </main>
    </div>
  );
}
