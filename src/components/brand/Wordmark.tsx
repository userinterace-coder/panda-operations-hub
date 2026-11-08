import { cn } from "@/lib/utils";

/**
 * Typeset wordmark. The approved PANDA TECH logo artwork has not been supplied (decision D-23),
 * so no logo symbol is drawn here — replace with the official asset when available.
 */
export function Wordmark({ className, inverse = false }: { className?: string; inverse?: boolean }) {
  return (
    <span className={cn("inline-flex items-center gap-2 font-display font-bold tracking-tight", className)} aria-label="PANDA TECH">
      <span className="text-[1.05em] leading-none">PANDA</span>
      <span className={cn("h-[0.42em] w-[0.42em] rounded-[1px] bg-brand")} aria-hidden />
      <span className={cn("text-[1.05em] leading-none font-medium", inverse ? "text-inverse-muted" : "text-muted-foreground")}>TECH</span>
    </span>
  );
}
