import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { ArrowUpRight } from "lucide-react";

import { PortfolioCard } from "@/components/site/cards";
import { PageHero, Section, SiteShell } from "@/components/site/SiteShell";
import { EmptyState, ErrorState, LoadingRows } from "@/components/states";
import { publicQueries } from "@/lib/api/public";
import { plainText } from "@/lib/format";
import { Pager } from "./products.index";

export const Route = createFileRoute("/portfolio/")({
  head: () => ({
    meta: [
      { title: "Work & case studies — PANDA TECH" },
      { name: "description", content: "Published PANDA TECH portfolio projects and case studies." },
      { property: "og:title", content: "Work & case studies — PANDA TECH" },
      { property: "og:description", content: "Verified projects and case studies." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: PortfolioPage,
});

function PortfolioPage() {
  const [page, setPage] = useState(1);
  const work = useQuery(publicQueries.portfolios({ page }));
  const cases = useQuery(publicQueries.caseStudies());
  return (
    <SiteShell>
      <PageHero index="05" eyebrow="Work" title="Projects we're allowed to show" lead="Every project here has been approved for publication by the client and our content team." />
      <Section>
        {work.isPending ? <LoadingRows /> : work.error ? <ErrorState error={work.error} onRetry={() => work.refetch()} /> : work.data.items.length === 0 ? (
          <EmptyState title="No projects published yet" />
        ) : (
          <>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">{work.data.items.map((p) => <PortfolioCard key={p.id} item={p} />)}</div>
            <Pager page={page} hasNext={work.data.hasNext} onChange={setPage} />
          </>
        )}
      </Section>
      <div className="border-t bg-muted/50">
        <Section eyebrow="Case studies" title="Challenge, approach, result">
          {cases.isPending ? <LoadingRows rows={3} /> : cases.error ? <ErrorState error={cases.error} compact /> : cases.data.items.length === 0 ? (
            <EmptyState title="No case studies published yet" />
          ) : (
            <div className="divide-y border-y">
              {cases.data.items.map((c) => (
                <Link key={c.id} to="/case-studies/$slug" params={{ slug: c.slug }} className="group grid gap-2 py-6 sm:grid-cols-[1fr_2fr_auto] sm:items-center sm:gap-8">
                  <span className="font-display text-xl font-semibold">{c.title}</span>
                  <span className="text-sm text-muted-foreground">{plainText(c.description || c.challenge, 160)}</span>
                  <ArrowUpRight className="hidden h-5 w-5 text-muted-foreground group-hover:text-foreground sm:block" />
                </Link>
              ))}
            </div>
          )}
        </Section>
      </div>
    </SiteShell>
  );
}
