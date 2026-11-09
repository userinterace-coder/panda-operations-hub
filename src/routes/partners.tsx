import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, BarChart3, BookOpen, CheckCircle2, ChevronRight, CircleDashed, FileText, Handshake, LayoutDashboard, Link2, Network, PackageCheck, Send, ShieldCheck, Users, WalletCards } from "lucide-react";

import { PageHero, Section, SiteShell } from "@/components/site/SiteShell";
import { Button } from "@/components/ui/button";
import { pageHead } from "@/lib/seo";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/partners")({
  head: () => pageHead(
    "Partner Hub",
    "Explore referral, delivery and technology partnerships with PANDATECHS ENTERPRISES, and preview the future partner workspace.",
  ),
  component: PartnersPage,
});

const PARTNERSHIP_TRACKS = [
  {
    icon: Send,
    number: "01",
    title: "Referral partners",
    description: "Introduce organisations that need reliable technology delivery and stay informed as opportunities are reviewed.",
    points: ["Clear referral ownership", "Agreed commercial terms", "Progress visibility"],
  },
  {
    icon: PackageCheck,
    number: "02",
    title: "Delivery partners",
    description: "Bring specialist skills to approved project teams, from software engineering to field installation and support.",
    points: ["Skills and identity review", "Defined project scope", "Quality-checked delivery"],
  },
  {
    icon: Network,
    number: "03",
    title: "Technology partners",
    description: "Connect platforms, products and services that help us build more complete solutions for growing organisations.",
    points: ["Integration discovery", "Technical compatibility review", "Joint solution planning"],
  },
] as const;

const DASHBOARD_TABS = [
  { id: "overview", label: "Overview", icon: LayoutDashboard },
  { id: "referrals", label: "Referrals", icon: Link2 },
  { id: "resources", label: "Resources", icon: BookOpen },
] as const;

type DashboardTab = (typeof DASHBOARD_TABS)[number]["id"];

function PartnersPage() {
  return (
    <SiteShell>
      <PageHero
        index="01"
        eyebrow="Partner Hub"
        title={<>Better together. <span className="text-brand-strong">Built to grow.</span></>}
        lead="A trusted network for people and organisations who want to refer opportunities, deliver great work or connect technology with PANDATECHS ENTERPRISES."
      >
        <div className="flex flex-wrap gap-3">
          <Button asChild variant="brand" size="lg"><Link to="/contact">Become a partner <ArrowRight /></Link></Button>
          <Button asChild variant="outline" size="lg"><a href="#workspace-preview">Preview the workspace</a></Button>
        </div>
      </PageHero>

      <Section index="02" eyebrow="Partnership tracks" title="Choose how we create value together" lead="Every partnership starts with a review and clear terms. Participation never guarantees projects, referrals or income.">
        <div className="grid gap-6 lg:grid-cols-3">
          {PARTNERSHIP_TRACKS.map(({ icon: Icon, ...track }) => (
            <article key={track.title} className="group relative overflow-hidden rounded-2xl border bg-card p-7 shadow-soft transition-all hover:-translate-y-1 hover:shadow-elevated sm:p-8">
              <div className="flex items-start justify-between">
                <span className="flex h-13 w-13 items-center justify-center rounded-2xl bg-info-soft p-3 text-info"><Icon className="h-7 w-7" aria-hidden /></span>
                <span className="font-mono text-xs text-brand-strong">{track.number}</span>
              </div>
              <h3 className="mt-8 text-2xl font-semibold">{track.title}</h3>
              <p className="mt-3 text-sm leading-7 text-muted-foreground">{track.description}</p>
              <ul className="mt-6 space-y-3">
                {track.points.map((point) => <li key={point} className="flex items-center gap-2.5 text-sm"><CheckCircle2 className="h-4 w-4 text-brand-strong" aria-hidden />{point}</li>)}
              </ul>
            </article>
          ))}
        </div>
      </Section>

      <section id="workspace-preview" className="surface-ink relative scroll-mt-24 overflow-hidden">
        <div className="grid-lines-inverse absolute inset-0 opacity-50" aria-hidden />
        <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
          <div className="mb-10 flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
            <div className="max-w-3xl">
              <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-brand">03 — Partner workspace</p>
              <h2 className="mt-4 text-3xl font-semibold text-inverse-foreground sm:text-4xl">Your partnership, clearly organised.</h2>
              <p className="mt-4 text-inverse-muted">Explore the planned dashboard experience. This is an interface preview; live referrals, earnings and account status are not connected yet.</p>
            </div>
            <span className="w-fit rounded-full border border-inverse-border bg-inverse-subtle/50 px-4 py-2 font-mono text-[10px] uppercase tracking-[0.14em] text-inverse-muted">Interactive preview</span>
          </div>
          <PartnerDashboard />
        </div>
      </section>

      <Section index="04" eyebrow="How it works" title="A clear path from introduction to collaboration">
        <div className="grid gap-px overflow-hidden rounded-2xl border bg-border sm:grid-cols-2 lg:grid-cols-4">
          {[
            ["01", "Tell us about you", "Share your skills, network or technology and the kind of partnership you have in mind."],
            ["02", "Review and verification", "We check fit, experience and any information needed for responsible collaboration."],
            ["03", "Agree the terms", "Scope, ownership, confidentiality and commercial terms are made explicit before work begins."],
            ["04", "Start collaborating", "Approved partners access the relevant opportunities, resources and delivery channels."],
          ].map(([number, title, body]) => (
            <article key={number} className="bg-background p-7">
              <span className="font-mono text-xs text-brand-strong">{number}</span>
              <h3 className="mt-7 text-xl font-semibold">{title}</h3>
              <p className="mt-3 text-sm leading-6 text-muted-foreground">{body}</p>
            </article>
          ))}
        </div>
      </Section>

      <Section className="pt-0">
        <div className="relative overflow-hidden rounded-3xl border bg-brand-soft p-8 sm:p-12">
          <div className="grid-lines absolute inset-0 opacity-60" aria-hidden />
          <div className="relative flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
            <div className="max-w-2xl">
              <Handshake className="h-9 w-9 text-brand-strong" aria-hidden />
              <h2 className="mt-5 text-3xl font-semibold sm:text-4xl">Let’s build a partnership with purpose.</h2>
              <p className="mt-3 text-muted-foreground">Tell us what you bring and who you want to help. Our team will review your enquiry and explain the next step.</p>
            </div>
            <Button asChild variant="brand" size="lg" className="shrink-0"><Link to="/contact">Start the conversation <ArrowRight /></Link></Button>
          </div>
        </div>
      </Section>
    </SiteShell>
  );
}

function PartnerDashboard() {
  const [activeTab, setActiveTab] = useState<DashboardTab>("overview");

  return (
    <div className="overflow-hidden rounded-2xl border border-inverse-border bg-background text-foreground shadow-elevated">
      <div className="flex items-center justify-between border-b px-5 py-4 sm:px-6">
        <div className="flex items-center gap-3">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary text-primary-foreground"><Handshake className="h-4 w-4" aria-hidden /></span>
          <div><p className="font-display text-sm font-semibold">PANDATECHS Partner Hub</p><p className="text-xs text-muted-foreground">Workspace preview</p></div>
        </div>
        <span className="rounded-full bg-warning-soft px-3 py-1.5 font-mono text-[10px] font-medium uppercase tracking-[0.1em] text-warning">Preview mode</span>
      </div>
      <div className="grid min-h-[480px] md:grid-cols-[210px_1fr]">
        <aside className="border-b bg-muted/60 p-4 md:border-b-0 md:border-r">
          <nav className="flex gap-2 overflow-x-auto md:flex-col" aria-label="Partner dashboard preview">
            {DASHBOARD_TABS.map(({ id, label, icon: Icon }) => (
              <button key={id} type="button" onClick={() => setActiveTab(id)} aria-pressed={activeTab === id} className={cn("flex shrink-0 items-center gap-3 rounded-lg px-3 py-2.5 text-left text-sm font-medium transition-colors md:w-full", activeTab === id ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:bg-background hover:text-foreground")}>
                <Icon className="h-4 w-4" aria-hidden />{label}
              </button>
            ))}
          </nav>
          <div className="mt-6 hidden rounded-xl border bg-background p-4 md:block">
            <ShieldCheck className="h-5 w-5 text-brand-strong" aria-hidden />
            <p className="mt-3 text-xs font-medium">Trust before access</p>
            <p className="mt-1 text-xs leading-5 text-muted-foreground">Live tools become available only after review and approval.</p>
          </div>
        </aside>
        <div className="p-5 sm:p-7">
          {activeTab === "overview" ? <DashboardOverview onApply={() => setActiveTab("referrals")} /> : null}
          {activeTab === "referrals" ? <DashboardReferrals /> : null}
          {activeTab === "resources" ? <DashboardResources /> : null}
        </div>
      </div>
    </div>
  );
}

function DashboardOverview({ onApply }: { onApply: () => void }) {
  return (
    <div>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div><p className="eyebrow">Overview</p><h3 className="mt-2 text-2xl font-semibold">Welcome to your partner workspace</h3></div>
        <Button variant="brand" size="sm" onClick={onApply}>View referrals <ChevronRight /></Button>
      </div>
      <div className="mt-6 grid gap-4 sm:grid-cols-3">
        {[
          { label: "Partner status", value: "Not connected", icon: Users },
          { label: "Active referrals", value: "—", icon: BarChart3 },
          { label: "Partner earnings", value: "—", icon: WalletCards },
        ].map(({ label, value, icon: Icon }) => (
          <div key={label} className="rounded-xl border bg-card p-4">
            <div className="flex items-center justify-between"><p className="text-xs text-muted-foreground">{label}</p><Icon className="h-4 w-4 text-brand-strong" aria-hidden /></div>
            <p className="mt-4 font-display text-xl font-semibold">{value}</p>
            <p className="mt-1 text-[11px] text-muted-foreground">Live data available after activation</p>
          </div>
        ))}
      </div>
      <div className="mt-6 rounded-xl border p-5">
        <p className="font-display font-semibold">Partner onboarding</p>
        <div className="mt-5 space-y-4">
          {["Submit your partnership enquiry", "Complete profile review", "Agree partnership terms", "Activate partner tools"].map((step, index) => (
            <div key={step} className="flex items-center gap-3">
              {index === 0 ? <CircleDashed className="h-5 w-5 shrink-0 text-brand-strong" aria-hidden /> : <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full border font-mono text-[9px] text-muted-foreground">{index + 1}</span>}
              <span className="text-sm">{step}</span>
              {index === 0 ? <span className="ml-auto rounded-full bg-brand-soft px-2.5 py-1 text-[10px] font-medium text-brand-strong">Start here</span> : null}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function DashboardReferrals() {
  return (
    <div>
      <p className="eyebrow">Referrals</p>
      <h3 className="mt-2 text-2xl font-semibold">Track every introduction clearly</h3>
      <div className="mt-8 flex min-h-72 flex-col items-center justify-center rounded-xl border border-dashed bg-muted/40 p-8 text-center">
        <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-info-soft text-info"><Link2 className="h-6 w-6" aria-hidden /></span>
        <h4 className="mt-5 font-display text-lg font-semibold">No live referrals in preview mode</h4>
        <p className="mt-2 max-w-md text-sm leading-6 text-muted-foreground">Once partner accounts are connected, approved referrals and their latest status will appear here.</p>
        <Button asChild variant="outline" className="mt-6"><Link to="/contact">Send a partnership enquiry <ArrowRight /></Link></Button>
      </div>
    </div>
  );
}

function DashboardResources() {
  return (
    <div>
      <p className="eyebrow">Resources</p>
      <h3 className="mt-2 text-2xl font-semibold">Useful information, easy to find</h3>
      <div className="mt-7 grid gap-4 sm:grid-cols-2">
        {[
          { title: "Capability map", body: "Explore the full range of software, infrastructure and technical capabilities.", to: "/team", icon: FileText },
          { title: "Service catalogue", body: "See the solutions available for customer conversations and project planning.", to: "/services", icon: BookOpen },
          { title: "Developer network", body: "Learn how engineers and agencies are reviewed for project collaboration.", to: "/developers", icon: Users },
          { title: "Company profile", body: "Understand our approach, principles and accountable delivery model.", to: "/about", icon: ShieldCheck },
        ].map(({ title, body, to, icon: Icon }) => (
          <Link key={title} to={to} className="group rounded-xl border bg-card p-5 transition-colors hover:border-brand/60">
            <Icon className="h-5 w-5 text-brand-strong" aria-hidden />
            <p className="mt-4 font-display font-semibold">{title}</p>
            <p className="mt-2 text-xs leading-5 text-muted-foreground">{body}</p>
            <span className="mt-4 inline-flex items-center gap-1 text-xs font-medium text-brand-strong">Open resource <ChevronRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" /></span>
          </Link>
        ))}
      </div>
    </div>
  );
}
