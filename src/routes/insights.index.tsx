import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";

import { ArticleCard } from "@/components/site/cards";
import { PageHero, Section, SiteShell } from "@/components/site/SiteShell";
import { EmptyState, ErrorState, LoadingRows } from "@/components/states";
import { Input } from "@/components/ui/input";
import { publicQueries } from "@/lib/api/public";
import { Pager } from "./products.index";

export const Route = createFileRoute("/insights/")({
  head: () => ({
    meta: [
      { title: "Insights — PANDA TECH" },
      { name: "description", content: "Articles and insights on software, AI, infrastructure, security and digital business from PANDA TECH." },
      { property: "og:title", content: "Insights — PANDA TECH" },
      { property: "og:description", content: "Articles from the PANDA TECH team." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: InsightsPage,
});

function InsightsPage() {
  const [page, setPage] = useState(1);
  const [input, setInput] = useState("");
  const [term, setTerm] = useState("");
  const q = useQuery(publicQueries.articles({ page, search: term || undefined }));
  return (
    <SiteShell>
      <PageHero index="06" eyebrow="Insights" title="Notes from the work" lead="Practical writing on building, running and securing technology in Kenya.">
        <form onSubmit={(e) => { e.preventDefault(); setTerm(input.trim()); setPage(1); }} className="max-w-sm" role="search">
          <Input value={input} onChange={(e) => setInput(e.target.value)} placeholder="Search articles" aria-label="Search articles" />
        </form>
      </PageHero>
      <Section>
        {q.isPending ? <LoadingRows /> : q.error ? <ErrorState error={q.error} onRetry={() => q.refetch()} /> : q.data.items.length === 0 ? (
          <EmptyState title={term ? `No articles match “${term}”` : "No articles published yet"} />
        ) : (
          <>
            <div className="grid gap-x-8 gap-y-12 md:grid-cols-2 lg:grid-cols-3">{q.data.items.map((a) => <ArticleCard key={a.id} article={a} />)}</div>
            <Pager page={page} hasNext={q.data.hasNext} onChange={setPage} />
          </>
        )}
        <p className="mt-12 font-mono text-xs text-muted-foreground">Short-form “Insights” posts are not available yet (backend gap G-14). Articles are shown above.</p>
      </Section>
    </SiteShell>
  );
}
