import { Badge, type BadgeProps } from "@/components/ui/badge";

const TONES: Record<string, BadgeProps["variant"]> = {};
const set = (variant: BadgeProps["variant"], keys: string[]) => keys.forEach((k) => (TONES[k] = variant));
set("success", ["active", "published", "approved", "completed", "paid", "delivered", "won", "closed_won", "resolved", "accepted", "fulfilled", "selected", "sent", "responded"]);
set("warning", ["pending", "draft", "scheduled", "on_hold", "partial", "waiting_customer", "review", "under_review", "revision_requested", "in_progress", "processing", "planning", "contacted", "proposal", "negotiation", "submitted", "shortlisted", "interviewed"]);
set("destructive", ["failed", "rejected", "cancelled", "suspended", "lost", "closed_lost", "overdue", "blocked", "expired", "bounced", "declined", "withdrawn", "critical", "urgent", "damaged"]);
set("info", ["new", "open", "confirmed", "shipped", "qualified", "reopened", "high", "in"]);
set("muted", ["archived", "inactive", "closed", "unsubscribed", "low", "medium", "deleted", "discontinued", "refunded", "out"]);

export function StatusBadge({ value }: { value: unknown }) {
  if (value === null || value === undefined || value === "") return <span className="text-muted-foreground">—</span>;
  const v = String(value);
  return (
    <Badge variant={TONES[v] ?? "outline"} className="capitalize">
      <span className="h-1.5 w-1.5 rounded-full bg-current opacity-70" aria-hidden />
      {v.replace(/_/g, " ")}
    </Badge>
  );
}
