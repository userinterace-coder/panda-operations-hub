import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { Search } from "lucide-react";

import { ServiceCard } from "@/components/site/cards";
import { PageHero, Section, SiteShell } from "@/components/site/SiteShell";
import { EmptyState, ErrorState, LoadingRows } from "@/components/states";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CAPABILITIES } from "@/content/catalogue";
import { publicQueries } from "@/lib/api/public";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/services/")({
  head: () => ({
    meta: [
      { title: "Services — PANDA TECH" },
      { name: "description", content: "Software engineering, AI, networking, cybersecurity, cloud, creative, digital marketing, IT support and training services from PANDA TECH." },
      { property: "og:title", content: "Services — PANDA TECH" },
      { property: "og:description", content: "Every PANDA TECH service, organised by division." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: ServicesPage,
});

function ServicesPage() {
  const [division, setDivision] = useState<number | undefined>();
  const [search, setSearch] = useState("");
  const [term, setTerm] = useState("");
  const divisions = useQuery(publicQueries.divisions());
  const services = useQuery(publicQueries.services({ division_id: division, search: term || undefined }));

  return (
    <SiteShell>
      <PageHero index="01" eyebrow="Services" title="Services across every layer of your technology" lead="Browse published services by division. Every engagement is scoped and quoted against your real requirements." />
      <Section>
        <div className="mb-8 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex flex-wrap gap-2" role="tablist" aria-label="Divisions">
            <FilterChip active={division === undefined} onClick={() => setDivision(undefined)}>All</FilterChip>
            {(divisions.data ?? []).map((d) => <FilterChip key={d.id} active={division === d.id} onClick={() => setDivision(d.id)}>{d.name}</FilterChip>)}
          </div>
          <form className="relative w-full lg:w-80" onSubmit={(e) => { e.preventDefault(); setTerm(search.trim()); }} role="search">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search services" className="pl-9" aria-label="Search services" />
          </form>
        </div>
        {services.isPending ? <LoadingRows /> : services.error ? <ErrorState error={services.error} onRetry={() => services.refetch()} /> : services.data.items.length === 0 ? (
          <EmptyState title={term ? `No services match “${term}”` : "No services published yet"}>Services appear here once published by the catalogue team.</EmptyState>
        ) : (
          <div className="grid gap-px sm:grid-cols-2 lg:grid-cols-3">{services.data.items.map((s, i) => <ServiceCard key={s.id} service={s} index={i} />)}</div>
        )}
      </Section>
      <div className="border-t bg-muted/50">
        <Section eyebrow="Capability map" title="What we cover" lead="The full scope of PANDA TECH practice areas. Ask us about anything below, even if a service page is not yet published.">
          <div className="grid gap-px border bg-border md:grid-cols-3">
            {CAPABILITIES.map((c) => (
              <div key={c.title} className="bg-background p-6">
                <h3 className="font-display font-semibold">{c.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{c.items.join(" · ")}</p>
              </div>
            ))}
          </div>
          <Button asChild variant="brand" className="mt-8"><Link to="/contact">Ask about a service</Link></Button>
        </Section>
      </div>
    </SiteShell>
  );
}

export function FilterChip({ active, onClick, children }: { active: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button type="button" role="tab" aria-selected={active} onClick={onClick}
      className={cn("rounded-full border px-3.5 py-1.5 text-sm transition-colors", active ? "border-foreground bg-foreground text-background" : "hover:border-foreground/40")}>
      {children}
    </button>
  );
}
