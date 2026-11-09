import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { ArrowRight, ArrowUpRight, CheckCircle2, Cloud, Code2, CreditCard, GraduationCap, Headphones, Landmark, LockKeyhole, Rocket, ShieldCheck, ShoppingCart, Smartphone } from "lucide-react";

import heroImage from "@/assets/panda-techs-hero.jpg";
import paymentIntegrationImage from "@/assets/payment-integration.jpg";
import { AppShowcaseGrid } from "@/components/site/AppShowcase";
import { ArticleCard, PortfolioCard, ProductCard, ServiceCard } from "@/components/site/cards";
import { Section, SiteShell } from "@/components/site/SiteShell";
import { TestimonialShowcase } from "@/components/site/TestimonialShowcase";
import { EmptyState, ErrorState, LoadingRows } from "@/components/states";
import { Button } from "@/components/ui/button";
import { CAPABILITIES, DIVISIONS, PRINCIPLES } from "@/content/catalogue";
import { publicQueries } from "@/lib/api/public";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "PANDATECHS ENTERPRISES — Building a Smarter Digital Future Together" },
      { name: "description", content: "Cutting-edge software, AI solutions and IT services to help your organisation innovate, grow and lead in the digital era." },
      { property: "og:title", content: "PANDATECHS ENTERPRISES — Building a Smarter Digital Future Together" },
      { property: "og:description", content: "Software, AI, cloud, e-commerce, training and IT support from one accountable technology partner in Kenya." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Home,
});

function Home() {
  return (
    <SiteShell headerTone="ink">
      <Hero />
      <QuickServices />
      <FeaturedServices />
      <DivisionsBand />
      <Capabilities />
      <PaymentIntegration />
      <AppsWeBuild />
      <FeaturedWork />
      <Principles />
      <ProductsAndInsights />
      <DeveloperBand />
      <TestimonialShowcase />
      <ClosingCta />
    </SiteShell>
  );
}

function Hero() {
  return (
    <section className="surface-ink relative overflow-hidden">
      <img src={heroImage} alt="A technology professional holding a tablet outside a modern office" width={1600} height={1008} fetchPriority="high" className="pointer-events-none absolute inset-0 h-full w-full object-cover object-[62%_top] sm:object-[center_top]" />
      <div className="absolute inset-0 bg-gradient-to-r from-inverse via-inverse/85 to-inverse/10" aria-hidden />
      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-inverse/70 to-transparent" aria-hidden />
      <div className="relative mx-auto max-w-[1440px] px-4 pb-32 pt-16 sm:px-6 sm:pb-36 sm:pt-20 lg:px-8 lg:pb-32 lg:pt-24">
        <p className="animate-rise font-display text-lg font-medium text-brand sm:text-xl [animation-delay:40ms]">
          Technology. Innovation. Possibilities.
        </p>
        <h1 className="mt-5 max-w-5xl animate-rise font-display text-[2.85rem] font-bold leading-[1.04] tracking-[-0.045em] text-inverse-foreground sm:text-6xl lg:text-[4.35rem] [animation-delay:90ms]">
          Building a Smarter<br /><span className="text-brand">Digital Future Together</span>
        </h1>
        <p className="mt-6 max-w-xl animate-rise text-lg leading-relaxed text-inverse-foreground/90 [animation-delay:140ms]">
          Cutting-edge software, AI solutions and IT services to help you innovate, grow and lead in the digital era.
        </p>
        <div className="mt-8 flex animate-rise flex-wrap gap-4 [animation-delay:190ms]">
          <Button asChild variant="brand" size="lg" className="h-12 rounded-full px-7"><Link to="/services">Explore Our Services <ArrowRight /></Link></Button>
          <Button asChild variant="outline-inverse" size="lg" className="h-12 rounded-full border-inverse-foreground/70 px-7"><Link to="/about">Our Company <ArrowUpRight /></Link></Button>
        </div>
        <div className="mt-12 flex animate-rise flex-wrap gap-x-10 gap-y-5 [animation-delay:240ms]">
          {[
            { icon: Rocket, title: "Innovative", subtitle: "Solutions" },
            { icon: ShieldCheck, title: "Trusted", subtitle: "Partner" },
            { icon: Headphones, title: "24/7", subtitle: "Support" },
          ].map(({ icon: Icon, title, subtitle }) => (
            <div key={subtitle} className="flex items-center gap-3 border-l border-inverse-border pl-5 first:border-l-0 first:pl-0">
              <Icon className="h-8 w-8 stroke-[1.5] text-brand" aria-hidden />
              <p className="text-sm leading-snug text-inverse-foreground">{title}<br /><span className="text-inverse-muted">{subtitle}</span></p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

const QUICK_SERVICES = [
  { title: "Software & AI", description: "Custom solutions and smart automation.", icon: Code2, iconClass: "text-info" },
  { title: "Cloud & Hosting", description: "Secure, scalable and reliable cloud services.", icon: Cloud, iconClass: "text-success" },
  { title: "E-Commerce", description: "Build and grow your online business.", icon: ShoppingCart, iconClass: "text-brand" },
  { title: "Training", description: "Build skills for the digital economy.", icon: GraduationCap, iconClass: "text-primary" },
  { title: "IT Support", description: "Expert support when you need it.", icon: Headphones, iconClass: "text-success" },
] as const;

function QuickServices() {
  return (
    <div className="relative z-10 mx-auto -mt-20 max-w-[1440px] px-4 sm:px-6 lg:px-8">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
        {QUICK_SERVICES.map(({ title, description, icon: Icon, iconClass }) => (
          <Link key={title} to="/services" className="group relative flex min-h-36 items-center gap-3 rounded-2xl border bg-card p-4 shadow-elevated transition-all duration-300 hover:-translate-y-1 hover:border-brand/40">
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-muted"><Icon className={`h-7 w-7 ${iconClass}`} strokeWidth={1.7} aria-hidden /></span>
            <span className="min-w-0 flex-1">
              <span className="block font-display text-[17px] font-semibold">{title}</span>
              <span className="mt-1 block pr-3 text-sm leading-snug text-muted-foreground">{description}</span>
            </span>
            <ArrowRight className="absolute bottom-3 right-3 h-3.5 w-3.5 text-muted-foreground transition-transform group-hover:translate-x-1 group-hover:text-brand" aria-hidden />
          </Link>
        ))}
      </div>
    </div>
  );
}

function DivisionsBand() {
  return (
    <Section index="02" eyebrow="How we're organised" title="Five divisions. One accountable team." lead="Each division is a focused practice. Projects draw on whichever mix of skills the work needs.">
      <div className="divide-y border-y">
        {DIVISIONS.map((d) => (
          <Link key={d.code} to="/services" className="group grid grid-cols-[3rem_1fr_auto] items-center gap-4 py-6 transition-colors hover:bg-muted/60 sm:grid-cols-[5rem_1.2fr_2fr_auto] sm:px-2">
            <span className="font-mono text-sm text-muted-foreground group-hover:text-brand-strong">{d.code}</span>
            <span className="font-display text-xl font-semibold sm:text-2xl">{d.name}</span>
            <span className="col-span-3 -mt-2 text-sm text-muted-foreground sm:col-span-1 sm:mt-0">{d.summary}</span>
            <ArrowRight className="hidden h-5 w-5 text-muted-foreground transition-all group-hover:translate-x-1 group-hover:text-foreground sm:block" />
          </Link>
        ))}
      </div>
    </Section>
  );
}

function FeaturedServices() {
  const q = useQuery(publicQueries.services({ featured: true }));
  return (
    <div className="bg-background pt-6">
      <Section index="01" eyebrow="Our Comprehensive Solutions" title="End-to-End Technology for Your Success" lead="From strategy to support, we provide complete technology solutions tailored to your needs." aside={<Button asChild className="rounded-full"><Link to="/services">View All Services <ArrowRight /></Link></Button>}>
        {q.isPending ? <LoadingRows rows={3} /> : q.isError ? <ErrorState error={q.error} onRetry={() => q.refetch()} /> : q.data.items.length === 0 ? (
          <EmptyState title="No featured services published yet">Featured services appear here when staff mark them as featured and published in the catalogue.</EmptyState>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 [&_a]:rounded-2xl">
            {q.data.items.slice(0, 6).map((s, i) => <ServiceCard key={s.id} service={s} index={i} />)}
          </div>
        )}
      </Section>
    </div>
  );
}

function Capabilities() {
  return (
    <Section index="03" eyebrow="Capabilities" title="The full stack of a modern business" lead="From the cable in the wall to the AI assistant on your website.">
      <div className="grid gap-x-10 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
        {CAPABILITIES.map((c, i) => (
          <div key={c.title}>
            <div className="flex items-baseline gap-3 border-b pb-3">
              <span className="font-mono text-xs text-brand-strong">{String(i + 1).padStart(2, "0")}</span>
              <h3 className="font-display text-lg font-semibold">{c.title}</h3>
            </div>
            <ul className="mt-4 space-y-2">
              {c.items.map((it) => <li key={it} className="flex gap-2 text-sm text-muted-foreground"><span className="mt-2 h-px w-3 shrink-0 bg-foreground/30" />{it}</li>)}
            </ul>
          </div>
        ))}
      </div>
    </Section>
  );
}

const PAYMENT_FEATURES = [
  { icon: Smartphone, title: "Mobile money", body: "Customer payment prompts, confirmation callbacks and mobile-first checkout flows." },
  { icon: CreditCard, title: "Cards & bank payments", body: "Secure payment journeys designed around your customers and finance processes." },
  { icon: Landmark, title: "APIs & webhooks", body: "Reliable connections between your platform, payment providers and business systems." },
  { icon: LockKeyhole, title: "Reconciliation & control", body: "Clear transaction records, exception handling and reporting built into the workflow." },
] as const;

function PaymentIntegration() {
  return (
    <section className="relative overflow-hidden border-y bg-info-soft/35">
      <div className="grid-lines absolute inset-0 opacity-50 [mask-image:linear-gradient(to_right,black,transparent_75%)]" aria-hidden />
      <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-4 py-16 sm:px-6 sm:py-24 lg:grid-cols-[0.92fr_1.08fr] lg:gap-16 lg:px-8">
        <div>
          <p className="eyebrow"><span className="text-brand-strong">04 — </span>Payment integration</p>
          <h2 className="mt-4 text-3xl font-semibold leading-tight sm:text-5xl">Every payment.<br /><span className="text-brand-strong">One seamless flow.</span></h2>
          <p className="mt-5 max-w-xl text-lg leading-relaxed text-muted-foreground">From the customer’s phone to your finance dashboard, we design secure payment journeys that feel effortless and stay accountable.</p>
          <div className="mt-8 grid gap-5 sm:grid-cols-2">
            {PAYMENT_FEATURES.map(({ icon: Icon, title, body }) => (
              <div key={title} className="flex gap-3">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-card text-info shadow-soft"><Icon className="h-5 w-5" aria-hidden /></span>
                <div><h3 className="font-display text-base font-semibold">{title}</h3><p className="mt-1 text-xs leading-5 text-muted-foreground">{body}</p></div>
              </div>
            ))}
          </div>
          <Button asChild variant="brand" size="lg" className="mt-9 rounded-full px-6"><Link to="/contact">Discuss your payment flow <ArrowRight /></Link></Button>
        </div>
        <div className="relative">
          <div className="absolute -inset-5 rounded-[2rem] bg-info/10 blur-2xl" aria-hidden />
          <div className="relative overflow-hidden rounded-3xl border bg-inverse shadow-elevated">
            <img src={paymentIntegrationImage} alt="A smartphone, payment card and secure banking connections illustrating integrated digital payments" width={1200} height={1008} loading="lazy" className="aspect-[6/5] h-full w-full object-cover" />
          </div>
          <div className="absolute -bottom-5 left-4 right-4 flex items-center gap-3 rounded-2xl border bg-card/95 p-4 shadow-elevated backdrop-blur sm:left-auto sm:right-6 sm:w-[290px]">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-success-soft text-success"><CheckCircle2 className="h-5 w-5" aria-hidden /></span>
            <div><p className="font-display text-sm font-semibold">Secure by design</p><p className="mt-0.5 text-xs text-muted-foreground">Callbacks · Reconciliation · APIs</p></div>
          </div>
        </div>
      </div>
    </section>
  );
}

function AppsWeBuild() {
  return (
    <div className="surface-ink relative overflow-hidden border-b border-inverse-border">
      <div className="absolute -left-40 top-20 h-96 w-96 rounded-full bg-info/20 blur-3xl" aria-hidden />
      <div className="absolute -right-32 bottom-10 h-80 w-80 rounded-full bg-brand/15 blur-3xl" aria-hidden />
      <Section index="05" eyebrow="Apps we build"
        title={<span className="text-inverse-foreground">Wallets, POS and apps that <span className="text-brand">move your business</span></span>}
        lead={<span className="text-inverse-muted">From the shop counter to your customer's pocket — we design, build and support the digital products Kenyan businesses run on.</span>}
        aside={<Button asChild variant="brand" className="rounded-full"><Link to="/contact">Start your app <ArrowRight /></Link></Button>}
        className="relative">
        <AppShowcaseGrid />
      </Section>
    </div>
  );
}

function FeaturedWork() {
  const q = useQuery(publicQueries.portfolios({ featured: true }));
  return (
    <div className="surface-ink">
      <Section index="06" eyebrow="Selected work" title={<span className="text-inverse-foreground">Verified projects</span>}
        lead={<span className="text-inverse-muted">Only projects that have been approved for publication are shown.</span>}
        aside={<Button asChild variant="outline-inverse"><Link to="/portfolio">All work <ArrowRight /></Link></Button>}>
        {q.isPending ? <LoadingRows rows={2} /> : q.isError ? <ErrorState error={q.error} onRetry={() => q.refetch()} className="bg-inverse-subtle" /> : q.data.items.length === 0 ? (
          <p className="rounded-lg border border-dashed border-inverse-border p-8 text-sm text-inverse-muted">No portfolio projects have been published yet.</p>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 [&_a]:border-inverse-border">
            {q.data.items.slice(0, 3).map((p) => <PortfolioCard key={p.id} item={p} />)}
          </div>
        )}
      </Section>
    </div>
  );
}

function Principles() {
  return (
    <Section index="07" eyebrow="Why PANDATECHS" title="Built on explicit, honest process">
      <div className="grid gap-px border bg-border sm:grid-cols-2 lg:grid-cols-4">
        {PRINCIPLES.map((p, i) => (
          <div key={p.title} className="bg-background p-6 sm:p-8">
            <span className="font-mono text-xs text-brand-strong">{String(i + 1).padStart(2, "0")}</span>
            <h3 className="mt-6 font-display text-lg font-semibold">{p.title}</h3>
            <p className="mt-2 text-sm text-muted-foreground">{p.body}</p>
          </div>
        ))}
      </div>
    </Section>
  );
}

function ProductsAndInsights() {
  const products = useQuery(publicQueries.products({ featured: true }));
  const articles = useQuery(publicQueries.articles({}));
  return (
    <div className="border-t bg-muted/50">
      <Section index="08" eyebrow="Products" title="Software and equipment" aside={<Button asChild variant="outline"><Link to="/shop">Visit the shop <ArrowRight /></Link></Button>}>
        {products.isPending ? <LoadingRows rows={2} /> : products.isError ? <ErrorState error={products.error} onRetry={() => products.refetch()} /> : products.data.items.length === 0 ? (
          <EmptyState title="No featured products yet">Products appear here once they are published in the catalogue.</EmptyState>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">{products.data.items.slice(0, 4).map((p) => <ProductCard key={p.id} product={p} />)}</div>
        )}
        <div className="mt-20">
          <div className="mb-8 flex items-end justify-between gap-4">
            <div>
              <p className="eyebrow"><span className="text-brand-strong">09 — </span>Insights</p>
              <h2 className="mt-4 text-3xl font-semibold">Latest thinking</h2>
            </div>
            <Link to="/insights" className="text-sm font-medium hover:text-brand-strong">All insights →</Link>
          </div>
          {articles.isPending ? <LoadingRows rows={2} /> : articles.isError ? <ErrorState error={articles.error} compact /> : articles.data.items.length === 0 ? (
            <EmptyState title="No articles published yet" />
          ) : (
            <div className="grid gap-8 md:grid-cols-3">{articles.data.items.slice(0, 3).map((a) => <ArticleCard key={a.id} article={a} />)}</div>
          )}
        </div>
      </Section>
    </div>
  );
}

function DeveloperBand() {
  return (
    <Section>
      <div className="relative overflow-hidden rounded-xl border bg-card p-8 sm:p-14">
        <div className="grid-lines absolute inset-0 opacity-70 [mask-image:radial-gradient(ellipse_at_right,black,transparent_70%)]" aria-hidden />
        <div className="relative grid gap-10 lg:grid-cols-[1.4fr_1fr] lg:items-end">
          <div>
            <p className="eyebrow-brand">10 — Developer network</p>
            <h2 className="mt-4 max-w-2xl text-3xl font-semibold sm:text-5xl">Engineers who pass review, not just sign-up.</h2>
            <p className="mt-5 max-w-xl text-muted-foreground">Developers and agencies apply, are reviewed and verified, and only then join project teams. Membership is never a promise of jobs or income.</p>
          </div>
          <div className="flex flex-wrap gap-3 lg:justify-end">
            <Button asChild size="lg"><Link to="/developers">How it works <ArrowRight /></Link></Button>
            <Button asChild variant="outline" size="lg"><Link to="/partners">Partner with us</Link></Button>
          </div>
        </div>
      </div>
    </Section>
  );
}

function ClosingCta() {
  return (
    <section className="border-t">
      <div className="mx-auto flex max-w-7xl flex-col items-start gap-8 px-4 py-20 sm:px-6 md:flex-row md:items-center md:justify-between lg:px-8">
        <h2 className="max-w-2xl text-3xl font-semibold sm:text-5xl">Have something to build, fix or secure?</h2>
        <div className="flex flex-wrap gap-3">
          <Button asChild variant="brand" size="lg"><Link to="/contact">Talk to us <ArrowUpRight /></Link></Button>
          <Button asChild variant="outline" size="lg"><Link to="/support">Get support</Link></Button>
        </div>
      </div>
    </section>
  );
}
