import type { ReactNode } from "react";

import { cn } from "@/lib/utils";
import { SiteFooter } from "./SiteFooter";
import { SiteHeader } from "./SiteHeader";

export function SiteShell({ children, headerTone }: { children: ReactNode; headerTone?: "light" | "ink" }) {
  return (
    <div className="flex min-h-screen flex-col">
      <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-md focus:bg-background focus:px-3 focus:py-2 focus:shadow-elevated">Skip to content</a>
      <SiteHeader tone={headerTone} />
      <main id="main" className="flex-1">{children}</main>
      <SiteFooter />
    </div>
  );
}

/** Standard inner-page hero: mono index, display headline, lead. */
export function PageHero({ index, eyebrow, title, lead, children, className }: { index?: string; eyebrow: string; title: ReactNode; lead?: ReactNode; children?: ReactNode; className?: string }) {
  return (
    <section className={cn("relative overflow-hidden border-b", className)}>
      <div className="grid-lines absolute inset-0 [mask-image:linear-gradient(to_bottom,black,transparent)]" aria-hidden />
      <div className="relative mx-auto max-w-7xl px-4 pb-14 pt-16 sm:px-6 sm:pb-20 sm:pt-24 lg:px-8">
        <p className="eyebrow animate-rise">{index ? <span className="text-brand-strong">{index} — </span> : null}{eyebrow}</p>
        <h1 className="mt-5 max-w-4xl animate-rise text-4xl font-semibold leading-[1.05] sm:text-6xl">{title}</h1>
        {lead ? <p className="mt-6 max-w-2xl animate-rise text-lg text-muted-foreground [animation-delay:80ms]">{lead}</p> : null}
        {children ? <div className="mt-8 animate-rise [animation-delay:140ms]">{children}</div> : null}
      </div>
    </section>
  );
}

export function Section({ id, index, eyebrow, title, lead, children, className, aside }: { id?: string; index?: string; eyebrow?: string; title?: ReactNode; lead?: ReactNode; children: ReactNode; className?: string; aside?: ReactNode }) {
  return (
    <section id={id} className={cn("mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8", className)}>
      {(eyebrow || title) && (
        <div className="mb-10 flex flex-col gap-6 sm:mb-14 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl">
            {eyebrow ? <p className="eyebrow">{index ? <span className="text-brand-strong">{index} — </span> : null}{eyebrow}</p> : null}
            {title ? <h2 className="mt-4 text-3xl font-semibold leading-tight sm:text-4xl">{title}</h2> : null}
            {lead ? <p className="mt-4 text-muted-foreground">{lead}</p> : null}
          </div>
          {aside}
        </div>
      )}
      {children}
    </section>
  );
}
