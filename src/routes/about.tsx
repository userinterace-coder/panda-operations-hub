import { createFileRoute } from "@tanstack/react-router";

import { CmsPageBody } from "@/components/site/CmsPageBody";
import { PageHero, Section, SiteShell } from "@/components/site/SiteShell";
import { pageHead } from "@/lib/seo";

export const Route = createFileRoute("/about")({
  head: () => pageHead("About", "Who Pandatechs Enterprises is and how we deliver technology services in Kenya."),
  component: () => (
    <SiteShell>
      <PageHero eyebrow="About" title="Pandatechs Enterprises" lead="A full-service technology company — software, infrastructure, security, creative and digital services." />
      <Section>
        <CmsPageBody slug="about" draftTitle="Company profile coming soon" draftNote="Our company story is published from the content system and will appear here once it goes live." />
      </Section>
    </SiteShell>
  ),
});
