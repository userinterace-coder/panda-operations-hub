import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { ArrowLeft } from "lucide-react";

import { Section, SiteShell } from "@/components/site/SiteShell";
import { ErrorState, LoadingRows } from "@/components/states";
import { publicQueries } from "@/lib/api/public";
import { formatDate } from "@/lib/format";
import { safeHtml } from "@/lib/sanitize";

export const Route = createFileRoute("/insights/$slug")({
  head: ({ params }) => {
    const name = params.slug.replace(/-/g, " ");
    return {
      meta: [
        { title: `${name} — Insights — PANDA TECH` },
        { name: "description", content: `Article from PANDA TECH: ${name}.` },
        { property: "og:title", content: `${name} — PANDA TECH` },
        { property: "og:description", content: `Read “${name}” on PANDA TECH Insights.` },
        { property: "og:type", content: "article" },
        { name: "twitter:card", content: "summary" },
      ],
    };
  },
  component: ArticleDetail,
});

function ArticleDetail() {
  const { slug } = Route.useParams();
  const q = useQuery(publicQueries.article(slug));
  return (
    <SiteShell>
      <Section className="max-w-3xl">
        <Link to="/insights" className="mb-10 inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"><ArrowLeft className="h-4 w-4" /> Insights</Link>
        {q.isPending ? <LoadingRows rows={8} /> : q.error ? <ErrorState error={q.error} onRetry={() => q.refetch()} /> : (
          <article>
            <p className="flex flex-wrap gap-3 font-mono text-xs text-muted-foreground">
              {q.data.category && <span className="text-brand-strong">{q.data.category}</span>}
              {q.data.published_at && <time dateTime={q.data.published_at}>{formatDate(q.data.published_at)}</time>}
              {q.data.author && <span>By {q.data.author}</span>}
            </p>
            <h1 className="mt-5 text-4xl font-semibold leading-tight sm:text-5xl">{q.data.title}</h1>
            {q.data.excerpt && <p className="mt-6 text-lg text-muted-foreground">{q.data.excerpt}</p>}
            <div className="prose-panda mt-10 border-t pt-10" dangerouslySetInnerHTML={{ __html: safeHtml(q.data.content) }} />
          </article>
        )}
      </Section>
    </SiteShell>
  );
}
