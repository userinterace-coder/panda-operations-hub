import { createFileRoute, Link } from "@tanstack/react-router";

import { EnquiryForm } from "@/components/site/EnquiryForm";
import { PageHero, Section, SiteShell } from "@/components/site/SiteShell";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/lib/auth/auth-context";
import { pageHead } from "@/lib/seo";

export const Route = createFileRoute("/support")({
  head: () => pageHead("Support", "Get help with a Pandatechs product, order or service."),
  component: SupportPage,
});

function SupportPage() {
  const { status } = useAuth();
  return (
    <SiteShell>
      <PageHero eyebrow="Support" title="How can we help?" lead="Customers can track tickets in their workspace. Anyone can send us a support message below.">
        <div className="flex flex-wrap gap-3">
          <Button asChild variant="brand"><Link to={status === "authenticated" ? "/app" : "/login"}>{status === "authenticated" ? "Open my workspace" : "Sign in to track tickets"}</Link></Button>
          <Button asChild variant="outline"><Link to="/faqs">Read FAQs</Link></Button>
        </div>
      </PageHero>
      <Section eyebrow="Message" title="Send a support request">
        <EnquiryForm defaultTopic="Support" messageLabel="Describe the issue" />
      </Section>
    </SiteShell>
  );
}
