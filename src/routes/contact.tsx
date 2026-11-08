import { createFileRoute, Link } from "@tanstack/react-router";

import { EnquiryForm } from "@/components/site/EnquiryForm";
import { PageHero, Section, SiteShell } from "@/components/site/SiteShell";
import { pageHead } from "@/lib/seo";

export const Route = createFileRoute("/contact")({
  validateSearch: (s: Record<string, unknown>): { interest?: string } => (typeof s.interest === "string" ? { interest: s.interest } : {}),
  head: () => pageHead("Contact", "Start a project or ask a question — contact Pandatechs Enterprises."),
  component: ContactPage,
});

function ContactPage() {
  const { interest } = Route.useSearch();
  return (
    <SiteShell>
      <PageHero eyebrow="Contact" title="Start a conversation" lead="Tell us what you need. We reply by email." />
      <Section className="grid gap-12 lg:grid-cols-[2fr_1fr]">
        <EnquiryForm defaultTopic={interest ?? ""} />
        <aside className="space-y-4 text-sm text-muted-foreground">
          <p>Website: <a className="text-foreground underline" href="https://pandatechs.co.ke" target="_blank" rel="noreferrer">pandatechs.co.ke</a></p>
          <p>Looking for an office? See <Link to="/locations" className="text-foreground underline">locations</Link>.</p>
          <p>Existing customer? <Link to="/support" className="text-foreground underline">Get support</Link>.</p>
        </aside>
      </Section>
    </SiteShell>
  );
}
