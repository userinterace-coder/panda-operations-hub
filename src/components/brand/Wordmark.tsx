import logoAsset from "@/assets/panda-techs-logo.png.asset.json";
import { cn } from "@/lib/utils";

export function Wordmark({ className, inverse = false }: { className?: string; inverse?: boolean }) {
  return (
    <span className={cn("inline-flex items-center gap-2.5", className)} aria-label="PANDATECHS ENTERPRISES">
      <img
        src={logoAsset.url}
        alt=""
        width={48}
        height={48}
        className="h-11 w-11 shrink-0 rounded-full object-cover shadow-[0_0_0_1px_color-mix(in_oklab,var(--brand)_45%,transparent)]"
      />
      <span className="flex flex-col leading-none">
        <span className={cn("font-display text-[1.05em] font-bold tracking-tight", inverse ? "text-inverse-foreground" : "text-foreground")}>
          PANDA<span className="text-brand">TECHS</span>
        </span>
        <span className={cn("mt-1 font-display text-[0.48em] font-medium uppercase tracking-[0.3em]", inverse ? "text-inverse-muted" : "text-muted-foreground")}>
          Enterprises
        </span>
      </span>
    </span>
  );
}
