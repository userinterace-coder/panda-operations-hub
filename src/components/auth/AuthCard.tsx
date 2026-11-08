import type { ReactNode } from "react";
import { Link } from "@tanstack/react-router";

import { Wordmark } from "@/components/brand/Wordmark";

export function AuthCard({ title, lead, children, footer }: { title: string; lead?: string; children: ReactNode; footer?: ReactNode }) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-muted px-4 py-12">
      <div className="w-full max-w-md">
        <Link to="/" className="mb-8 inline-block text-xl" aria-label="Home"><Wordmark /></Link>
        <div className="rounded-lg border bg-card p-6 shadow-elevated sm:p-8">
          <h1 className="font-display text-2xl font-semibold">{title}</h1>
          {lead ? <p className="mt-2 text-sm text-muted-foreground">{lead}</p> : null}
          <div className="mt-6">{children}</div>
        </div>
        {footer ? <div className="mt-6 text-center text-sm text-muted-foreground">{footer}</div> : null}
      </div>
    </div>
  );
}
