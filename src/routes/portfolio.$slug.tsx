import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { ArrowLeft, ExternalLink } from "lucide-react";

import { Section, SiteShell } from "@/components/site/SiteShell";
import { ErrorState, LoadingRows } from "@/components/states";
import { Button } from "@/components/ui/button";
import { publicQueries } from "@/lib/api/public";
import { formatDate } from "@/lib/format";
import { safeHtml } from "@/lib/sanitize";

export const Route = createFileRoute("/portfolio/$slug")({
  head: ({ params }) => {
    const name = params.slug.replace(/-/g, " ");
    return {
      meta: [
        { title: `${name} — Work — PANDA TECH` },
        { name: "description", content: `PANDA TECH project: ${name}.` },
        { property: "og:title", content: `${name} — PANDA TECH` },
        { property: "og:description", content: `Project details for ${name}.` },
        { property: "og:type", content: "article" },
        { name: "twitter:card", content: "summary_large_image" },
      ],
    };
  },
  component: PortfolioDetail,
});

function PortfolioDetail() {
  const { slug } = Route.useParams();
  const q = useQuery(publicQueries.portfolio(slug));
  return (
    <SiteShell>
      <Section>
        <Link to="/portfolio" className="mb-10 inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"><ArrowLeft className="h-4 w-4" /> All work</Link>
        {q.isPending ? <LoadingRows rows={6} /> : q.error ? <ErrorState error={q.error} onRetry={() => q.refetch()} /> : (
          <>
            <p className="eyebrow">{q.data.client_name ?? "Client project"}{q.data.client_industry ? ` · ${q.data.client_industry}` : ""}</p>
            <h1 className="mt-4 max-w-4xl text-4xl font-semibold sm:text-6xl">{q.data.title}</h1>
            <dl className="mt-10 grid gap-6 border-y py-6 sm:grid-cols-3">
              <div><dt className="eyebrow">Timeline</dt><dd className="mt-1 text-sm">{[formatDate(q.data.start_date), formatDate(q.data.end_date)].filter(Boolean).join(" — ") || "—"}</dd></div>
              <div><dt className="eyebrow">Technologies</dt><dd className="mt-1 font-mono text-sm">{q.data.technologies?.join(", ") || "—"}</dd></div>
              <div><dt className="eyebrow">Live</dt><dd className="mt-1 text-sm">{q.data.live_url ? <Button asChild variant="link" className="h-auto p-0"><a href={q.data.live_url} target="_blank" rel="noopener noreferrer">Visit <ExternalLink className="h-3 w-3" /></a></Button> : "—"}</dd></div>
            </dl>
            {q.data.media?.length ? (
              <div className="mt-10 grid gap-4 md:grid-cols-2">
                {q.data.media.map((m) => <img key={m.id} src={m.url} alt={m.alt ?? q.data.title} loading="lazy" className="w-full rounded-lg border object-cover" />)}
              </div>
            ) : null}
            <div className="prose-panda mt-12 max-w-3xl" dangerouslySetInnerHTML={{ __html: safeHtml(q.data.description) }} />
          </>
        )}
      </Section>
    </SiteShell>
  );
}
