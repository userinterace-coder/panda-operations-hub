import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowUpRight, Menu, ShoppingBag } from "lucide-react";

import { Wordmark } from "@/components/brand/Wordmark";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { useAuth } from "@/lib/auth/auth-context";
import { cartSummary, useCart } from "@/lib/cart";
import { cn } from "@/lib/utils";

export const SITE_NAV = [
  { to: "/services", label: "Services" },
  { to: "/solutions", label: "Solutions" },
  { to: "/products", label: "Products" },
  { to: "/shop", label: "Shop" },
  { to: "/portfolio", label: "Work" },
  { to: "/insights", label: "Insights" },
  { to: "/developers", label: "Developers" },
] as const;

export function SiteHeader({ tone = "light" }: { tone?: "light" | "ink" }) {
  const { status } = useAuth();
  const lines = useCart();
  const { count } = cartSummary(lines);
  const [open, setOpen] = useState(false);
  const ink = tone === "ink";

  return (
    <header className={cn("sticky top-0 z-40 border-b backdrop-blur-md", ink ? "border-inverse-border bg-inverse/85 text-inverse-foreground" : "bg-background/85")}>
      <div className="mx-auto flex h-16 max-w-7xl items-center gap-6 px-4 sm:px-6 lg:px-8">
        <Link to="/" className="shrink-0 text-lg" aria-label="PANDA TECH home">
          <Wordmark inverse={ink} />
        </Link>
        <nav className="hidden flex-1 items-center gap-1 lg:flex" aria-label="Main">
          {SITE_NAV.map((n) => (
            <Link key={n.to} to={n.to} className={cn("rounded-md px-3 py-2 text-sm transition-colors", ink ? "text-inverse-muted hover:text-inverse-foreground" : "text-muted-foreground hover:text-foreground")}
              activeProps={{ className: ink ? "text-inverse-foreground" : "text-foreground font-medium" }}>
              {n.label}
            </Link>
          ))}
        </nav>
        <div className="ml-auto flex items-center gap-2">
          <Link to="/shop" search={{ cart: true }} className={cn("relative inline-flex h-9 w-9 items-center justify-center rounded-md transition-colors", ink ? "hover:bg-inverse-subtle" : "hover:bg-muted")} aria-label={`Basket, ${count} items`}>
            <ShoppingBag className="h-4 w-4" />
            {count > 0 && <span className="absolute -right-0.5 -top-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-brand px-1 font-mono text-[10px] font-semibold text-brand-foreground">{count}</span>}
          </Link>
          <Button asChild variant={ink ? "outline-inverse" : "outline"} size="sm" className="hidden sm:inline-flex">
            <Link to={status === "authenticated" ? "/app" : "/login"}>{status === "authenticated" ? "Open workspace" : "Sign in"}</Link>
          </Button>
          <Button asChild variant="brand" size="sm" className="hidden md:inline-flex">
            <Link to="/contact">Start a project <ArrowUpRight /></Link>
          </Button>
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className={cn("lg:hidden", ink && "hover:bg-inverse-subtle")} aria-label="Open menu">
                <Menu />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-full max-w-sm p-0">
              <SheetHeader className="border-b p-5 text-left">
                <SheetTitle><Wordmark /></SheetTitle>
              </SheetHeader>
              <nav className="flex flex-col p-3" aria-label="Mobile">
                {[...SITE_NAV, { to: "/about", label: "About" }, { to: "/support", label: "Support" }, { to: "/contact", label: "Contact" }].map((n, i) => (
                  <Link key={n.to} to={n.to} onClick={() => setOpen(false)} className="flex items-baseline gap-4 rounded-md px-3 py-3.5 font-display text-xl font-medium hover:bg-muted">
                    <span className="font-mono text-xs text-muted-foreground">{String(i + 1).padStart(2, "0")}</span>
                    {n.label}
                  </Link>
                ))}
              </nav>
              <div className="mt-auto grid gap-2 border-t p-5">
                <Button asChild variant="brand" onClick={() => setOpen(false)}><Link to="/contact">Start a project</Link></Button>
                <Button asChild variant="outline" onClick={() => setOpen(false)}><Link to={status === "authenticated" ? "/app" : "/login"}>{status === "authenticated" ? "Open workspace" : "Sign in"}</Link></Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
