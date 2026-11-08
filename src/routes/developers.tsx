import { createFileRoute, Link } from "@tanstack/react-router";

import { CmsPageBody } from "@/components/site/CmsPageBody";
import { PageHero, Section, SiteShell } from "@/components/site/SiteShell";
import { Button } from "@/components/ui/button";
import { pageHead } from "@/lib/seo";

export const Route = createFileRoute("/developers")({
  head: () => pageHead("Developer network", "Join the Pandatechs developer network: apply, get verified and take on projects."),
  component: () => (
    <SiteShell>
      <PageHero eyebrow="Developers" title="The Pandatechs developer network" lead="Apply, get verified by our team and collaborate on client projects.">
        <div className="flex flex-wrap gap-3">
          <Button asChild variant="brand"><Link to="/register">Create an account to apply</Link></Button>
          <Button asChild variant="outline"><Link to="/login">I already have an account</Link></Button>
        </div>
      </PageHero>
      <Section>
        <CmsPageBody slug="developers" draftTitle="Programme details coming soon" draftNote="Membership terms and requirements are published from the content system." />
      </Section>
    </SiteShell>
  ),
});
