import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";

import { PageHero, Section, SiteShell } from "@/components/site/SiteShell";
import { EmptyState, ErrorState, LoadingRows } from "@/components/states";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { publicQueries } from "@/lib/api/public";
import { plainText } from "@/lib/format";
import { pageHead } from "@/lib/seo";

export const Route = createFileRoute("/faqs")({
  head: () => pageHead("FAQs", "Answers to common questions about Pandatechs services, orders and support."),
  component: FaqsPage,
});

function FaqsPage() {
  const q = useQuery(publicQueries.faqs());
  return (
    <SiteShell>
      <PageHero eyebrow="Help" title="Frequently asked questions" />
      <Section>
        {q.isPending ? <LoadingRows /> : q.isError ? <ErrorState error={q.error} onRetry={() => q.refetch()} /> : q.data.length === 0 ? (
          <EmptyState title="No FAQs published yet" />
        ) : (
          <Accordion type="single" collapsible className="max-w-3xl">
            {[...q.data].sort((a, b) => a.order - b.order).map((f) => (
              <AccordionItem key={f.id} value={String(f.id)}>
                <AccordionTrigger className="text-left font-display text-base">{f.question}</AccordionTrigger>
                <AccordionContent className="text-muted-foreground">{plainText(f.answer, 4000)}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        )}
      </Section>
    </SiteShell>
  );
}
