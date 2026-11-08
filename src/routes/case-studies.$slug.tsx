import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { ArrowLeft } from "lucide-react";

import { Section, SiteShell } from "@/components/site/SiteShell";
import { ErrorState, LoadingRows } from "@/components/states";
import { publicQueries } from "@/lib/api/public";
import { safeHtml } from "@/lib/sanitize";

export const Route = createFileRoute("/case-studies/$slug")({
  head: ({ params }) => {
    const name = params.slug.replace(/-/g, " ");
    return {
      meta: [
        { title: `${name} — Case study — PANDA TECH` },
        { name: "description", content: `PANDA TECH case study: ${name}.` },
        { property: "og:title", content: `${name} — PANDA TECH case study` },
        { property: "og:description", content: `Challenge, solution and results: ${name}.` },
        { property: "og:type", content: "article" },
        { name: "twitter:card", content: "summary" },
      ],
    };
  },
  component: CaseStudyDetail,
});

function CaseStudyDetail() {
  const { slug } = Route.useParams();
  const q = useQuery(publicQueries.caseStudy(slug));
  return (
    <SiteShell>
      <Section>
        <Link to="/portfolio" className="mb-10 inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"><ArrowLeft className="h-4 w-4" /> Work</Link>
        {q.isPending ? <LoadingRows rows={6} /> : q.error ? <ErrorState error={q.error} onRetry={() => q.refetch()} /> : (
          <article>
            <p className="eyebrow">Case study{q.data.client_name ? ` · ${q.data.client_name}` : ""}</p>
            <h1 className="mt-4 max-w-4xl text-4xl font-semibold sm:text-6xl">{q.data.title}</h1>
            {q.data.description && <div className="prose-panda mt-8 max-w-3xl text-lg" dangerouslySetInnerHTML={{ __html: safeHtml(q.data.description) }} />}
            <div className="mt-14 grid gap-px border bg-border md:grid-cols-3">
              {([["01", "Challenge", q.data.challenge], ["02", "Solution", q.data.solution], ["03", "Results", q.data.results]] as const).map(([n, t, body]) => (
                <section key={t} className="bg-background p-6 sm:p-8">
                  <p className="font-mono text-xs text-brand-strong">{n}</p>
                  <h2 className="mt-4 text-xl font-semibold">{t}</h2>
                  <div className="prose-panda mt-3 text-sm" dangerouslySetInnerHTML={{ __html: safeHtml(body) || "<p>—</p>" }} />
                </section>
              ))}
            </div>
          </article>
        )}
      </Section>
    </SiteShell>
  );
}
