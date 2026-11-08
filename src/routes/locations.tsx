import { createFileRoute } from "@tanstack/react-router";

import { CmsPageBody } from "@/components/site/CmsPageBody";
import { PageHero, Section, SiteShell } from "@/components/site/SiteShell";
import { pageHead } from "@/lib/seo";

export const Route = createFileRoute("/locations")({
  head: () => pageHead("Locations & service areas", "Where Pandatechs Enterprises operates and delivers on-site services."),
  component: () => (
    <SiteShell>
      <PageHero eyebrow="Locations" title="Where we work" lead="Office locations and on-site service areas." />
      <Section>
        <CmsPageBody slug="locations" draftTitle="Locations coming soon" draftNote="Office addresses and service areas are published from the content system and will appear here." />
      </Section>
    </SiteShell>
  ),
});
