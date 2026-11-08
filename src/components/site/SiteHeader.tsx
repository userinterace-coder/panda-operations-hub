import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowRight, Menu, Search, ShoppingBag } from "lucide-react";

import { Wordmark } from "@/components/brand/Wordmark";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { useAuth } from "@/lib/auth/auth-context";
import { cartSummary, useCart } from "@/lib/cart";
import { cn } from "@/lib/utils";

export const SITE_NAV = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/services", label: "Services" },
  { to: "/solutions", label: "Solutions" },
  { to: "/products", label: "Products" },
  { to: "/shop", label: "Shop" },
  { to: "/portfolio", label: "Portfolio" },
  { to: "/developers", label: "Developers" },
  { to: "/insights", label: "Insights" },
  { to: "/contact", label: "Contact" },
] as const;

export function SiteHeader({ tone = "light" }: { tone?: "light" | "ink" }) {
  const { status } = useAuth();
  const lines = useCart();
  const { count } = cartSummary(lines);
  const [open, setOpen] = useState(false);
  const ink = tone === "ink";

  return (
    <header className={cn("sticky top-0 z-40 border-b backdrop-blur-xl", ink ? "border-inverse-border bg-inverse/95 text-inverse-foreground" : "bg-background/95")}>
      <div className="mx-auto flex h-[76px] max-w-[1440px] items-center gap-4 px-4 sm:px-6 lg:px-8">
        <Link to="/" className="shrink-0 text-lg" aria-label="PANDATECHS ENTERPRISES home">
          <Wordmark inverse={ink} />
        </Link>
        <nav className="mx-auto hidden items-center gap-0.5 xl:flex" aria-label="Main">
          {SITE_NAV.map((n) => (
            <Link key={n.to} to={n.to} activeOptions={n.to === "/" ? { exact: true } : undefined} className={cn("relative rounded-md px-2 py-2 text-xs font-medium transition-colors 2xl:px-2.5 2xl:text-[13px]", ink ? "text-inverse-muted hover:text-inverse-foreground" : "text-muted-foreground hover:text-foreground")}
              activeProps={{ className: ink ? "text-brand after:absolute after:inset-x-2.5 after:-bottom-[18px] after:h-0.5 after:bg-brand" : "text-brand-strong font-semibold" }}>
              {n.label}
            </Link>
          ))}
        </nav>
        <div className="ml-auto flex items-center gap-2 xl:ml-0">
          <Link to="/insights" className={cn("hidden h-10 w-10 items-center justify-center rounded-full border transition-colors md:inline-flex", ink ? "border-inverse-border text-inverse-foreground hover:bg-inverse-subtle" : "hover:bg-muted")} aria-label="Search insights">
            <Search className="h-4 w-4" />
          </Link>
          <Link to="/shop" search={{ cart: true }} className={cn("relative inline-flex h-10 w-10 items-center justify-center rounded-full transition-colors", ink ? "hover:bg-inverse-subtle" : "hover:bg-muted")} aria-label={`Basket, ${count} items`}>
            <ShoppingBag className="h-4 w-4" />
            {count > 0 && <span className="absolute -right-0.5 -top-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-brand px-1 font-mono text-[10px] font-semibold text-brand-foreground">{count}</span>}
          </Link>
          <Button asChild variant={ink ? "outline-inverse" : "outline"} size="sm" className="hidden h-10 rounded-full px-5 sm:inline-flex">
            <Link to={status === "authenticated" ? "/app" : "/login"}>{status === "authenticated" ? "Workspace" : "Login"}</Link>
          </Button>
          <Button asChild variant="brand" size="sm" className="hidden h-10 rounded-full px-5 lg:inline-flex">
            <Link to="/contact">Get Started <ArrowRight /></Link>
          </Button>
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className={cn("xl:hidden", ink && "hover:bg-inverse-subtle")} aria-label="Open menu">
                <Menu />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-full max-w-sm p-0">
              <SheetHeader className="border-b p-5 text-left">
                <SheetTitle><Wordmark /></SheetTitle>
              </SheetHeader>
              <nav className="flex flex-col p-3" aria-label="Mobile">
                {[...SITE_NAV, { to: "/support", label: "Support" }].map((n, i) => (
                  <Link key={n.to} to={n.to} onClick={() => setOpen(false)} className="flex items-baseline gap-4 rounded-md px-3 py-3 font-display text-lg font-medium hover:bg-muted">
                    <span className="font-mono text-xs text-brand-strong">{String(i + 1).padStart(2, "0")}</span>
                    {n.label}
                  </Link>
                ))}
              </nav>
              <div className="mt-auto grid gap-2 border-t p-5">
                <Button asChild variant="brand" className="rounded-full" onClick={() => setOpen(false)}><Link to="/contact">Get Started</Link></Button>
                <Button asChild variant="outline" className="rounded-full" onClick={() => setOpen(false)}><Link to={status === "authenticated" ? "/app" : "/login"}>{status === "authenticated" ? "Open workspace" : "Login"}</Link></Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
