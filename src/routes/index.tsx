import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { ArrowRight, ArrowUpRight, Quote } from "lucide-react";

import heroImage from "@/assets/hero-geometry.jpg";
import { ArticleCard, PortfolioCard, ProductCard, ServiceCard } from "@/components/site/cards";
import { Section, SiteShell } from "@/components/site/SiteShell";
import { EmptyState, ErrorState, LoadingRows } from "@/components/states";
import { Button } from "@/components/ui/button";
import { CAPABILITIES, DIVISIONS, PRINCIPLES } from "@/content/catalogue";
import { publicQueries } from "@/lib/api/public";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "PANDA TECH — Technology. Innovation. Possibilities." },
      { name: "description", content: "Full-service technology company in Kenya: software & AI, IT infrastructure, cybersecurity, cloud, creative and digital services, and a technology shop." },
      { property: "og:title", content: "PANDA TECH — Technology. Innovation. Possibilities." },
      { property: "og:description", content: "Software, AI, infrastructure, security, creative and digital services — one accountable technology partner in Kenya." },
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
      <DivisionsBand />
      <FeaturedServices />
      <Capabilities />
      <FeaturedWork />
      <Principles />
      <ProductsAndInsights />
      <DeveloperBand />
      <Testimonials />
      <ClosingCta />
    </SiteShell>
  );
}

function Hero() {
  return (
    <section className="surface-ink relative -mt-16 overflow-hidden pt-16">
      <img src={heroImage} alt="" width={1600} height={1104} className="pointer-events-none absolute inset-y-0 right-0 h-full w-full object-cover object-right opacity-90 md:w-[78%]" />
      <div className="absolute inset-0 bg-gradient-to-r from-inverse via-inverse/80 to-transparent" aria-hidden />
      <div className="relative mx-auto max-w-7xl px-4 pb-20 pt-20 sm:px-6 sm:pb-28 sm:pt-28 lg:px-8">
        <p className="animate-rise font-mono text-[11px] uppercase tracking-[0.16em] text-inverse-muted">
          <span className="text-brand">●</span>&nbsp; Full-service technology company · Kenya
        </p>
        <h1 className="mt-8 max-w-4xl animate-rise font-display text-5xl font-semibold leading-[0.98] tracking-tight sm:text-7xl lg:text-8xl [animation-delay:60ms]">
          Technology.<br />Innovation.<br />Possibilities<span className="text-brand">.</span>
        </h1>
        <p className="mt-8 max-w-xl animate-rise text-lg text-inverse-muted [animation-delay:120ms]">
          We design, build, secure and run the technology businesses depend on — from custom software and AI to networks, cloud and brand.
        </p>
        <div className="mt-10 flex animate-rise flex-wrap gap-3 [animation-delay:180ms]">
          <Button asChild variant="brand" size="lg"><Link to="/contact">Start a project <ArrowUpRight /></Link></Button>
          <Button asChild variant="outline-inverse" size="lg"><Link to="/services">Explore services</Link></Button>
        </div>
      </div>
      <div className="relative border-t border-inverse-border">
        <div className="mx-auto grid max-w-7xl grid-cols-2 divide-x divide-inverse-border px-4 sm:px-6 md:grid-cols-4 lg:px-8">
          {["Software & AI", "IT & Security", "Creative & Digital", "Products & Shop"].map((t, i) => (
            <div key={t} className="py-5 pl-4 first:pl-0">
              <p className="font-mono text-[11px] text-inverse-muted">{String(i + 1).padStart(2, "0")}</p>
              <p className="mt-1 font-display text-sm font-medium sm:text-base">{t}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function DivisionsBand() {
  return (
    <Section index="01" eyebrow="How we're organised" title="Five divisions. One accountable team." lead="Each division is a focused practice. Projects draw on whichever mix of skills the work needs.">
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
    <div className="border-y bg-muted/50">
      <Section index="02" eyebrow="Featured services" title="Where most engagements start" aside={<Button asChild variant="outline"><Link to="/services">All services <ArrowRight /></Link></Button>}>
        {q.isPending ? <LoadingRows rows={3} /> : q.error ? <ErrorState error={q.error} onRetry={() => q.refetch()} /> : q.data.items.length === 0 ? (
          <EmptyState title="No featured services published yet">Featured services appear here when staff mark them as featured and published in the catalogue.</EmptyState>
        ) : (
          <div className="grid gap-px sm:grid-cols-2 lg:grid-cols-3">
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

function FeaturedWork() {
  const q = useQuery(publicQueries.portfolios({ featured: true }));
  return (
    <div className="surface-ink">
      <Section index="04" eyebrow="Selected work" title={<span className="text-inverse-foreground">Verified projects</span>}
        lead={<span className="text-inverse-muted">Only projects that have been approved for publication are shown.</span>}
        aside={<Button asChild variant="outline-inverse"><Link to="/portfolio">All work <ArrowRight /></Link></Button>}>
        {q.isPending ? <LoadingRows rows={2} /> : q.error ? <ErrorState error={q.error} onRetry={() => q.refetch()} className="bg-inverse-subtle" /> : q.data.items.length === 0 ? (
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
    <Section index="05" eyebrow="Why PANDA TECH" title="Built on explicit, honest process">
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
      <Section index="06" eyebrow="Products" title="Software and equipment" aside={<Button asChild variant="outline"><Link to="/shop">Visit the shop <ArrowRight /></Link></Button>}>
        {products.isPending ? <LoadingRows rows={2} /> : products.error ? <ErrorState error={products.error} onRetry={() => products.refetch()} /> : products.data.items.length === 0 ? (
          <EmptyState title="No featured products yet">Products appear here once they are published in the catalogue.</EmptyState>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">{products.data.items.slice(0, 4).map((p) => <ProductCard key={p.id} product={p} />)}</div>
        )}
        <div className="mt-20">
          <div className="mb-8 flex items-end justify-between gap-4">
            <div>
              <p className="eyebrow"><span className="text-brand-strong">07 — </span>Insights</p>
              <h2 className="mt-4 text-3xl font-semibold">Latest thinking</h2>
            </div>
            <Link to="/insights" className="text-sm font-medium hover:text-brand-strong">All insights →</Link>
          </div>
          {articles.isPending ? <LoadingRows rows={2} /> : articles.error ? <ErrorState error={articles.error} compact /> : articles.data.items.length === 0 ? (
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
            <p className="eyebrow-brand">08 — Developer network</p>
            <h2 className="mt-4 max-w-2xl text-3xl font-semibold sm:text-5xl">Engineers who pass review, not just sign-up.</h2>
            <p className="mt-5 max-w-xl text-muted-foreground">Developers and agencies apply, are reviewed and verified, and only then join project teams. Membership is never a promise of jobs or income.</p>
          </div>
          <div className="flex flex-wrap gap-3 lg:justify-end">
            <Button asChild size="lg"><Link to="/developers">How it works <ArrowRight /></Link></Button>
          </div>
        </div>
      </div>
    </Section>
  );
}

function Testimonials() {
  const q = useQuery(publicQueries.testimonials());
  // Only render published testimonials. Nothing is shown when none exist — testimonials are never invented.
  if (q.isPending || q.error || !q.data?.length) return null;
  return (
    <Section eyebrow="Client words" title="In their own words">
      <div className="grid gap-6 md:grid-cols-3">
        {q.data.slice(0, 3).map((t) => (
          <figure key={t.id} className="flex flex-col gap-6 border-l-2 border-brand pl-6">
            <Quote className="h-5 w-5 text-brand-strong" />
            <blockquote className="font-display text-lg leading-snug">{t.content}</blockquote>
            <figcaption className="mt-auto text-sm"><span className="font-medium">{t.name}</span>{(t.role || t.company) && <span className="text-muted-foreground"> · {[t.role, t.company].filter(Boolean).join(", ")}</span>}</figcaption>
          </figure>
        ))}
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
