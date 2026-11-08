import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { Check } from "lucide-react";

import { PriceTag } from "@/components/site/cards";
import { PageHero, Section, SiteShell } from "@/components/site/SiteShell";
import { EmptyState, ErrorState, LoadingRows } from "@/components/states";
import { Button } from "@/components/ui/button";
import { publicQueries } from "@/lib/api/public";
import { plainText } from "@/lib/format";

export const Route = createFileRoute("/solutions")({
  head: () => ({
    meta: [
      { title: "Solutions & packages — PANDA TECH" },
      { name: "description", content: "Packaged PANDA TECH solutions for businesses in Kenya, with published package options." },
      { property: "og:title", content: "Solutions & packages — PANDA TECH" },
      { property: "og:description", content: "Packaged solutions and their published package options." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: SolutionsPage,
});

function SolutionsPage() {
  const q = useQuery(publicQueries.solutions());
  return (
    <SiteShell>
      <PageHero index="02" eyebrow="Solutions" title="Packaged solutions for common business needs" lead="Each solution bundles services into clear packages. Packages without an approved price are quoted on request." />
      <Section>
        {q.isPending ? <LoadingRows /> : q.error ? <ErrorState error={q.error} onRetry={() => q.refetch()} /> : q.data.length === 0 ? (
          <EmptyState title="No solutions published yet" />
        ) : (
          <div className="space-y-20">
            {q.data.map((s, i) => (
              <article key={s.id} className="grid gap-10 border-t pt-10 lg:grid-cols-[1fr_2fr]">
                <div>
                  <p className="font-mono text-xs text-brand-strong">{String(i + 1).padStart(2, "0")}</p>
                  <h2 className="mt-3 text-3xl font-semibold">{s.name}</h2>
                  <p className="mt-4 text-muted-foreground">{s.short_description || plainText(s.description, 260)}</p>
                </div>
                {s.packages?.length ? (
                  <div className="grid gap-4 sm:grid-cols-2">
                    {s.packages.map((p) => (
                      <div key={p.id} className="flex flex-col rounded-lg border bg-card p-6">
                        <h3 className="font-display text-lg font-semibold">{p.name}</h3>
                        <PriceTag price={p.price} currency={p.currency} className="mt-2 font-display text-2xl font-semibold" />
                        <p className="mt-3 text-sm text-muted-foreground">{plainText(p.description, 160)}</p>
                        {p.features?.length ? (
                          <ul className="mt-4 space-y-2 text-sm">{p.features.map((f) => <li key={f} className="flex gap-2"><Check className="mt-0.5 h-4 w-4 shrink-0 text-brand-strong" />{f}</li>)}</ul>
                        ) : null}
                        <Button asChild variant="outline" className="mt-6"><Link to="/contact" search={{ interest: `${s.name} — ${p.name}` }}>Enquire</Link></Button>
                      </div>
                    ))}
                  </div>
                ) : <EmptyState title="Packages coming soon">Ask us for a tailored quote in the meantime.</EmptyState>}
              </article>
            ))}
          </div>
        )}
      </Section>
    </SiteShell>
  );
}
