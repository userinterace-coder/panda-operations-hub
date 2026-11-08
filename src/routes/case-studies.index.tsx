import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";

import { PageHero, Section, SiteShell } from "@/components/site/SiteShell";
import { EmptyState, ErrorState, LoadingRows } from "@/components/states";
import { publicQueries } from "@/lib/api/public";
import { plainText } from "@/lib/format";
import { pageHead } from "@/lib/seo";

export const Route = createFileRoute("/case-studies/")({
  head: () => pageHead("Case studies", "Published Pandatechs case studies: the challenge, the solution and the results."),
  component: CaseStudiesPage,
});

function CaseStudiesPage() {
  const q = useQuery(publicQueries.caseStudies());
  return (
    <SiteShell>
      <PageHero eyebrow="Case studies" title="How we solved real problems" />
      <Section>
        {q.isPending ? <LoadingRows /> : q.isError ? <ErrorState error={q.error} onRetry={() => q.refetch()} /> : q.data.items.length === 0 ? (
          <EmptyState title="No case studies published yet" />
        ) : (
          <div className="grid gap-4 md:grid-cols-2">
            {q.data.items.map((c) => (
              <Link key={c.id} to="/case-studies/$slug" params={{ slug: c.slug }} className="rounded-lg border bg-card p-6 transition-colors hover:border-brand">
                {c.client_name ? <p className="font-mono text-xs text-brand-strong">{c.client_name}</p> : null}
                <h2 className="mt-2 font-display text-xl font-semibold">{c.title}</h2>
                <p className="mt-3 text-sm text-muted-foreground">{plainText(c.description, 200)}</p>
              </Link>
            ))}
          </div>
        )}
      </Section>
    </SiteShell>
  );
}
