import type { ReactNode } from "react";
import { AlertTriangle, Ban, CloudOff, Inbox, Loader2, Lock, PlugZap } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { ApiError } from "@/lib/api/client";
import { cn } from "@/lib/utils";

function Frame({ icon, title, children, tone = "muted", className, action }: { icon: ReactNode; title: string; children?: ReactNode; tone?: "muted" | "brand" | "danger"; className?: string; action?: ReactNode }) {
  return (
    <div className={cn("flex flex-col items-start gap-3 rounded-lg border border-dashed p-6 sm:p-8", tone === "brand" && "border-brand/40 bg-brand-soft/50", tone === "danger" && "border-destructive/30 bg-danger-soft/60", className)} role="status">
      <div className={cn("flex h-9 w-9 items-center justify-center rounded-md border bg-background", tone === "brand" && "text-brand-strong", tone === "danger" && "text-destructive")}>{icon}</div>
      <div className="space-y-1">
        <p className="font-display text-base font-semibold">{title}</p>
        {children ? <div className="max-w-prose text-sm text-muted-foreground">{children}</div> : null}
      </div>
      {action}
    </div>
  );
}

export function LoadingRows({ rows = 5 }: { rows?: number }) {
  return (
    <div className="space-y-2" aria-busy="true" aria-label="Loading">
      {Array.from({ length: rows }).map((_, i) => (
        <Skeleton key={i} className="h-11 w-full" />
      ))}
    </div>
  );
}

export function InlineSpinner({ label = "Loading" }: { label?: string }) {
  return (
    <span className="inline-flex items-center gap-2 text-sm text-muted-foreground">
      <Loader2 className="h-4 w-4 animate-spin" /> {label}
    </span>
  );
}

export function EmptyState({ title = "Nothing here yet", children, action, className }: { title?: string; children?: ReactNode; action?: ReactNode; className?: string }) {
  return <Frame icon={<Inbox className="h-4 w-4" />} title={title} action={action} className={className}>{children}</Frame>;
}

export function BlockedState({ title, reason, gaps, className }: { title: string; reason: string; gaps?: string[]; className?: string }) {
  return (
    <Frame icon={<Ban className="h-4 w-4" />} title={title} tone="brand" className={className}>
      <p>{reason}</p>
      {gaps?.length ? <p className="mt-2 font-mono text-xs text-brand-strong">Blocked by backend gap {gaps.join(" · ")}</p> : null}
    </Frame>
  );
}

/** Renders the right state for any query error. */
export function ErrorState({ error, onRetry, className, compact }: { error: unknown; onRetry?: () => void; className?: string; compact?: boolean }) {
  const e = error instanceof ApiError ? error : null;
  if (e?.kind === "not_configured") return <NotConnected className={className} compact={compact} />;
  if (e?.kind === "forbidden")
    return <Frame icon={<Lock className="h-4 w-4" />} title="Access restricted" className={className}>{e.message}</Frame>;
  const icon = e?.kind === "network" ? <CloudOff className="h-4 w-4" /> : <AlertTriangle className="h-4 w-4" />;
  return (
    <Frame icon={icon} title={e?.kind === "network" ? "Can't reach the server" : "Something went wrong"} tone="danger" className={className}
      action={onRetry ? <Button variant="outline" size="sm" onClick={onRetry}>Try again</Button> : undefined}>
      {e?.message ?? "An unexpected error occurred."}
    </Frame>
  );
}

export function NotConnected({ className, compact }: { className?: string; compact?: boolean }) {
  if (compact)
    return (
      <p className={cn("inline-flex items-center gap-2 rounded-md border border-dashed px-3 py-2 font-mono text-xs text-muted-foreground", className)}>
        <PlugZap className="h-3.5 w-3.5 text-brand-strong" /> Live content loads once the PANDA TECH backend is connected.
      </p>
    );
  return (
    <Frame icon={<PlugZap className="h-4 w-4" />} title="Backend not connected" tone="brand" className={className}>
      This section reads live data from the PANDA TECH API. It will appear automatically once the API address is configured and the backend is running.
    </Frame>
  );
}
