import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { ArrowLeft, ArrowUpRight } from "lucide-react";

import { PageHero, Section, SiteShell } from "@/components/site/SiteShell";
import { ErrorState, LoadingRows } from "@/components/states";
import { Button } from "@/components/ui/button";
import { publicQueries } from "@/lib/api/public";
import { safeHtml } from "@/lib/sanitize";

export const Route = createFileRoute("/services/$slug")({
  head: ({ params }) => {
    const name = params.slug.replace(/-/g, " ");
    return {
      meta: [
        { title: `${name} — Services — PANDA TECH` },
        { name: "description", content: `PANDA TECH service: ${name}.` },
        { property: "og:title", content: `${name} — PANDA TECH` },
        { property: "og:description", content: `Learn about PANDA TECH's ${name} service.` },
        { property: "og:type", content: "article" },
        { name: "twitter:card", content: "summary" },
      ],
    };
  },
  component: ServiceDetail,
});

function ServiceDetail() {
  const { slug } = Route.useParams();
  const q = useQuery(publicQueries.service(slug));
  return (
    <SiteShell>
      {q.isPending ? <div className="mx-auto max-w-7xl px-4 py-24"><LoadingRows rows={6} /></div> : q.error ? (
        <div className="mx-auto max-w-3xl px-4 py-24"><ErrorState error={q.error} onRetry={() => q.refetch()} /></div>
      ) : (
        <>
          <PageHero eyebrow={q.data.division ?? "Service"} title={q.data.name} lead={q.data.short_description ?? undefined}>
            <div className="flex flex-wrap gap-3">
              <Button asChild variant="brand" size="lg"><Link to="/contact" search={{ interest: q.data.name }}>Request a quote <ArrowUpRight /></Link></Button>
              <Button asChild variant="outline" size="lg"><Link to="/services"><ArrowLeft /> All services</Link></Button>
            </div>
          </PageHero>
          <Section>
            <div className="grid gap-12 lg:grid-cols-[2fr_1fr]">
              <div className="prose-panda" dangerouslySetInnerHTML={{ __html: safeHtml(q.data.description) || "<p>Detailed description coming soon.</p>" }} />
              <aside className="h-fit space-y-4 rounded-lg border p-6">
                <p className="eyebrow">Pricing</p>
                <p className="text-sm text-muted-foreground">This service is quoted against your scope. We only publish prices once they are approved.</p>
                <Button asChild className="w-full"><Link to="/contact" search={{ interest: q.data.name }}>Start a conversation</Link></Button>
              </aside>
            </div>
          </Section>
        </>
      )}
    </SiteShell>
  );
}
