import { createFileRoute } from "@tanstack/react-router";

import { CmsPageBody } from "@/components/site/CmsPageBody";
import { PageHero, Section, SiteShell } from "@/components/site/SiteShell";
import { pageHead } from "@/lib/seo";

export const Route = createFileRoute("/terms")({
  head: () => pageHead("Terms & conditions", "Terms governing the use of Pandatechs Enterprises services, shop and platform."),
  component: () => (
    <SiteShell>
      <PageHero eyebrow="Legal" title="Terms & conditions" />
      <Section>
        <CmsPageBody slug="terms-and-conditions" draftTitle="Terms pending publication" draftNote="The approved terms are published from the content system. Contact us for a copy in the meantime." />
      </Section>
    </SiteShell>
  ),
});
