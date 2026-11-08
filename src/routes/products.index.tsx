import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";

import { ProductCard } from "@/components/site/cards";
import { PageHero, Section, SiteShell } from "@/components/site/SiteShell";
import { EmptyState, ErrorState, LoadingRows } from "@/components/states";
import { Button } from "@/components/ui/button";
import { publicQueries } from "@/lib/api/public";
import { FilterChip } from "./services.index";

export const Route = createFileRoute("/products/")({
  head: () => ({
    meta: [
      { title: "Products — PANDA TECH" },
      { name: "description", content: "Business software, digital products and technology equipment from PANDA TECH." },
      { property: "og:title", content: "Products — PANDA TECH" },
      { property: "og:description", content: "The PANDA TECH product catalogue." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: ProductsPage,
});

function ProductsPage() {
  const [category, setCategory] = useState<number | undefined>();
  const [page, setPage] = useState(1);
  const cats = useQuery(publicQueries.productCategories());
  const q = useQuery(publicQueries.products({ category_id: category, page }));
  return (
    <SiteShell>
      <PageHero index="03" eyebrow="Product catalogue" title="Software, digital products and equipment" lead="Everything listed here is published by our catalogue team, with live availability.">
        <Button asChild variant="brand"><Link to="/shop">Shop equipment</Link></Button>
      </PageHero>
      <Section>
        <div className="mb-8 flex flex-wrap gap-2" role="tablist" aria-label="Categories">
          <FilterChip active={category === undefined} onClick={() => { setCategory(undefined); setPage(1); }}>All</FilterChip>
          {(cats.data ?? []).map((c) => <FilterChip key={c.id} active={category === c.id} onClick={() => { setCategory(c.id); setPage(1); }}>{c.name}</FilterChip>)}
        </div>
        {q.isPending ? <LoadingRows /> : q.error ? <ErrorState error={q.error} onRetry={() => q.refetch()} /> : q.data.items.length === 0 ? (
          <EmptyState title="No products published yet" />
        ) : (
          <>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">{q.data.items.map((p) => <ProductCard key={p.id} product={p} />)}</div>
            <Pager page={page} hasNext={q.data.hasNext} onChange={setPage} />
          </>
        )}
      </Section>
    </SiteShell>
  );
}

export function Pager({ page, hasNext, onChange }: { page: number; hasNext: boolean; onChange: (p: number) => void }) {
  if (page === 1 && !hasNext) return null;
  return (
    <nav className="mt-10 flex items-center justify-between border-t pt-6" aria-label="Pagination">
      <Button variant="outline" size="sm" disabled={page <= 1} onClick={() => onChange(page - 1)}>Previous</Button>
      <span className="font-mono text-xs text-muted-foreground">Page {page}</span>
      <Button variant="outline" size="sm" disabled={!hasNext} onClick={() => onChange(page + 1)}>Next</Button>
    </nav>
  );
}
