import { Link } from "@tanstack/react-router";

import { Wordmark } from "@/components/brand/Wordmark";

const COLUMNS = [
  { title: "Company", links: [{ to: "/about", label: "About" }, { to: "/portfolio", label: "Work" }, { to: "/insights", label: "Insights" }, { to: "/developers", label: "Developer network" }] },
  { title: "Offer", links: [{ to: "/services", label: "Services" }, { to: "/solutions", label: "Solutions" }, { to: "/products", label: "Products" }, { to: "/shop", label: "Technology shop" }] },
  { title: "Help", links: [{ to: "/support", label: "Support" }, { to: "/faqs", label: "FAQs" }, { to: "/contact", label: "Contact" }, { to: "/locations", label: "Service areas" }] },
  { title: "Legal", links: [{ to: "/privacy", label: "Privacy policy" }, { to: "/terms", label: "Terms & conditions" }] },
] as const;

export function SiteFooter() {
  return (
    <footer className="surface-ink relative overflow-hidden">
      <div className="grid-lines-inverse absolute inset-0 opacity-60" aria-hidden />
      <div className="relative mx-auto max-w-7xl px-4 pb-10 pt-16 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_2fr]">
          <div className="space-y-5">
            <Wordmark inverse className="text-2xl" />
            <p className="max-w-sm font-display text-2xl leading-snug text-inverse-foreground">Technology. Innovation. Possibilities.</p>
            <p className="max-w-sm text-sm text-inverse-muted">A full-service technology company serving Kenya — software, AI, infrastructure, security, creative and digital services.</p>
          </div>
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-4">
            {COLUMNS.map((c) => (
              <div key={c.title}>
                <p className="mb-4 font-mono text-[11px] uppercase tracking-[0.14em] text-inverse-muted">{c.title}</p>
                <ul className="space-y-2.5">
                  {c.links.map((l) => (
                    <li key={l.to}>
                      <Link to={l.to} className="text-sm text-inverse-foreground/85 transition-colors hover:text-brand">{l.label}</Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
        <div className="mt-16 flex flex-col gap-3 border-t border-inverse-border pt-6 text-xs text-inverse-muted sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} PANDA TECH. All rights reserved.</p>
          <p className="font-mono">Nairobi · Africa/Nairobi · KES</p>
        </div>
      </div>
    </footer>
  );
}
