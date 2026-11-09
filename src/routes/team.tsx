import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Camera, Check, Code2, Network } from "lucide-react";

import { PageHero, Section, SiteShell } from "@/components/site/SiteShell";
import { Button } from "@/components/ui/button";
import { CAPABILITIES } from "@/content/catalogue";
import { pageHead } from "@/lib/seo";
import labanPhoto from "@/assets/team/laban-panda-khisa.jpg.asset.json";
import stevePhoto from "@/assets/team/steve-mwangi.jpg.asset.json";
import vincentPhoto from "@/assets/team/vincent-wokabi-wanjiru.jpg.asset.json";

const COFOUNDERS = [
  {
    name: "Laban Panda Khisa",
    initials: "LK",
    photo: labanPhoto.url,
    photoPosition: "56% 20%",
    role: "Co-Founder & Full-Stack Engineer",
    bio: "Full-stack engineering across modern frontend and backend systems, with 72 projects spanning secure bank and payment integrations, Laravel and Python backends, and polished digital experiences.",
    specialties: ["72 projects", "Bank & payment integrations", "Laravel & Python", "Frontend & backend"],
    icon: Code2,
  },
  {
    name: "Steve Mwangi",
    initials: "SM",
    photo: stevePhoto.url,
    photoPosition: "55% 15%",
    role: "Co-Founder & Full-Stack Engineer",
    bio: "End-to-end product engineering across frontend and backend development, APIs, payment integrations and scalable business systems built with Laravel, Python and modern web technologies.",
    specialties: ["Full-stack delivery", "APIs & integrations", "Laravel & Python", "Business systems"],
    icon: Network,
  },
  {
    name: "Vincent Wokabi Wanjiru",
    initials: "VW",
    photo: vincentPhoto.url,
    photoPosition: "45% 15%",
    role: "Co-Founder & Technical Specialist",
    bio: "CCTV and hands-on technical delivery, bringing together surveillance, access control, field technicians and practical infrastructure expertise for dependable on-site implementation.",
    specialties: ["CCTV & surveillance", "Access control", "Field technicians", "Technical operations"],
    icon: Camera,
  },
] as const;

export const Route = createFileRoute("/team")({
  head: () => pageHead(
    "Our Team",
    "Meet PANDATECHS ENTERPRISES co-founders Laban Panda Khisa, Steve Mwangi and Vincent Wokabi Wanjiru, and explore the team's full technology capabilities.",
  ),
  component: TeamPage,
});

function TeamPage() {
  return (
    <SiteShell>
      <PageHero
        index="01"
        eyebrow="Our team"
        title={<>The people <span className="text-brand-strong">building what’s next.</span></>}
        lead="Meet the co-founders behind PANDATECHS ENTERPRISES — a multidisciplinary team combining software engineering, payment integrations, technical infrastructure and field delivery."
      >
        <div className="flex flex-wrap gap-3">
          <Button asChild variant="brand"><Link to="/contact">Start a project <ArrowRight /></Link></Button>
          <Button asChild variant="outline"><a href="#capabilities">Explore our capabilities</a></Button>
        </div>
      </PageHero>

      <Section
        index="02"
        eyebrow="Co-founders"
        title="Different strengths. One shared standard."
        lead="Our leadership brings software and on-the-ground technical expertise into one accountable team."
      >
        <div className="grid gap-6 lg:grid-cols-3">
          {COFOUNDERS.map((founder, index) => {
            const Icon = founder.icon;
            return (
              <article key={founder.name} className="group overflow-hidden rounded-2xl border bg-card shadow-soft transition-shadow hover:shadow-elevated">
                <div className="surface-ink relative aspect-[4/5] overflow-hidden">
                  <img
                    src={founder.photo}
                    alt={`${founder.name}, ${founder.role} at PANDATECHS ENTERPRISES`}
                    loading="lazy"
                    className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                    style={{ objectPosition: founder.photoPosition }}
                  />
                  <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-inverse/80 to-transparent" aria-hidden />
                  <p className="absolute left-5 top-5 rounded-full bg-inverse/75 px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.16em] text-inverse-foreground backdrop-blur-sm">
                    {String(index + 1).padStart(2, "0")} / Co-founder
                  </p>
                  <span className="absolute bottom-5 right-5 flex h-12 w-12 items-center justify-center rounded-full bg-brand text-brand-foreground shadow-brand">
                    <Icon className="h-5 w-5" aria-hidden />
                  </span>
                </div>
                <div className="p-6 sm:p-7">
                  <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-brand-strong">{founder.role}</p>
                  <h3 className="mt-3 text-2xl font-semibold">{founder.name}</h3>
                  <p className="mt-4 text-sm leading-7 text-muted-foreground">{founder.bio}</p>
                  <ul className="mt-6 flex flex-wrap gap-2" aria-label={`${founder.name} specialties`}>
                    {founder.specialties.map((specialty) => (
                      <li key={specialty} className="rounded-full border bg-muted/60 px-3 py-1.5 text-xs font-medium text-muted-foreground">{specialty}</li>
                    ))}
                  </ul>
                </div>
              </article>
            );
          })}
        </div>
      </Section>

      <section id="capabilities" className="surface-ink relative scroll-mt-24 overflow-hidden">
        <div className="grid-lines-inverse absolute inset-0 opacity-50" aria-hidden />
        <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
          <div className="mb-10 max-w-3xl sm:mb-14">
            <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-brand">03 — Capability map</p>
            <h2 className="mt-4 text-3xl font-semibold leading-tight text-inverse-foreground sm:text-4xl">One team. Full-spectrum capability.</h2>
            <p className="mt-4 max-w-2xl text-inverse-muted">The full scope of PANDATECHS practice areas. Ask us about anything below, even if a service page is not yet published.</p>
          </div>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {CAPABILITIES.map((capability, index) => (
              <article key={capability.title} className="rounded-xl border border-inverse-border bg-inverse-subtle/35 p-6 backdrop-blur-sm">
                <div className="flex items-start justify-between gap-4">
                  <h3 className="font-display text-lg font-semibold text-inverse-foreground">{capability.title}</h3>
                  <span className="font-mono text-xs text-brand">{String(index + 1).padStart(2, "0")}</span>
                </div>
                <ul className="mt-5 space-y-2.5">
                  {capability.items.map((item) => (
                    <li key={item} className="flex items-start gap-2.5 text-sm leading-5 text-inverse-muted">
                      <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-brand" aria-hidden />
                      {item}
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </div>
      </section>

      <Section className="text-center">
        <div className="mx-auto max-w-3xl">
          <p className="eyebrow-brand">Work with us</p>
          <h2 className="mt-4 text-3xl font-semibold sm:text-4xl">Bring your next challenge to the team.</h2>
          <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">From a new platform to a complete technical installation, tell us what you want to achieve and we’ll help shape the right approach.</p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Button asChild variant="brand"><Link to="/contact">Talk to our team <ArrowRight /></Link></Button>
            <Button asChild variant="outline"><Link to="/services">View all services</Link></Button>
          </div>
        </div>
      </Section>
    </SiteShell>
  );
}
