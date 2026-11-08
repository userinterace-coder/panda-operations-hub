import { createFileRoute } from "@tanstack/react-router";

import { CmsPageBody } from "@/components/site/CmsPageBody";
import { PageHero, Section, SiteShell } from "@/components/site/SiteShell";
import { pageHead } from "@/lib/seo";

export const Route = createFileRoute("/privacy")({
  head: () => pageHead("Privacy policy", "How Pandatechs Enterprises collects, uses and protects personal data."),
  component: () => (
    <SiteShell>
      <PageHero eyebrow="Legal" title="Privacy policy" />
      <Section>
        <CmsPageBody slug="privacy-policy" draftTitle="Privacy policy pending publication" draftNote="The approved privacy policy is published from the content system. Contact us for a copy in the meantime." />
      </Section>
    </SiteShell>
  ),
});
