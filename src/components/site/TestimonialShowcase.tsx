import { useRef } from "react";
import { ArrowLeft, ArrowRight, MapPin, Quote } from "lucide-react";

import { Button } from "@/components/ui/button";
import { TESTIMONIAL_PREVIEWS } from "@/content/testimonial-previews";

export function TestimonialShowcase() {
  const trackRef = useRef<HTMLDivElement>(null);

  function move(direction: -1 | 1) {
    const track = trackRef.current;
    if (!track) return;
    track.scrollBy({ left: direction * track.clientWidth * 0.86, behavior: "smooth" });
  }

  return (
    <section className="surface-ink relative overflow-hidden" aria-labelledby="testimonial-preview-title">
      <div className="grid-lines-inverse absolute inset-0 opacity-50" aria-hidden />
      <div className="absolute -right-28 top-0 h-80 w-80 rounded-full bg-info/20 blur-3xl" aria-hidden />
      <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
        <div className="flex flex-col gap-7 md:flex-row md:items-end md:justify-between">
          <div className="max-w-3xl">
            <div className="flex flex-wrap items-center gap-3">
              <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-brand">10 — Client voices</p>
              <span className="rounded-full border border-inverse-border bg-inverse-subtle/50 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.12em] text-inverse-muted">Design preview</span>
            </div>
            <h2 id="testimonial-preview-title" className="mt-4 text-3xl font-semibold leading-tight text-inverse-foreground sm:text-5xl">Ten perspectives. One standard of care.</h2>
            <p className="mt-4 max-w-2xl text-inverse-muted">A ten-card testimonial layout featuring Kenyan sample profiles, ready to be replaced with verified client feedback.</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline-inverse" size="icon" className="rounded-full" onClick={() => move(-1)} aria-label="Previous testimonials"><ArrowLeft /></Button>
            <Button variant="outline-inverse" size="icon" className="rounded-full" onClick={() => move(1)} aria-label="Next testimonials"><ArrowRight /></Button>
          </div>
        </div>

        <div ref={trackRef} className="mt-10 flex snap-x snap-mandatory gap-5 overflow-x-auto pb-5 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden" aria-label="Ten sample testimonials">
          {TESTIMONIAL_PREVIEWS.map((testimonial, index) => (
            <figure key={testimonial.name} className="group flex min-w-[88%] snap-start flex-col rounded-2xl border border-inverse-border bg-inverse-subtle/45 p-6 shadow-soft backdrop-blur-sm transition-colors hover:border-brand/70 sm:min-w-[47%] sm:p-7 lg:min-w-[31.7%]">
              <div className="flex items-center justify-between">
                <Quote className="h-7 w-7 text-brand" aria-hidden />
                <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-inverse-muted">Sample {String(index + 1).padStart(2, "0")}</span>
              </div>
              <blockquote className="mt-7 flex-1 font-display text-lg leading-relaxed text-inverse-foreground">“{testimonial.quote}”</blockquote>
              <figcaption className="mt-8 border-t border-inverse-border pt-5">
                <div className="flex items-center gap-3">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-brand font-display text-sm font-semibold text-brand-foreground" aria-hidden>{testimonial.initials}</span>
                  <div className="min-w-0">
                    <p className="font-medium text-inverse-foreground">{testimonial.name}</p>
                    <p className="mt-0.5 text-xs text-inverse-muted">{testimonial.role}</p>
                  </div>
                </div>
                <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-inverse-muted">
                  <span className="inline-flex items-center gap-1.5"><MapPin className="h-3.5 w-3.5 text-brand" aria-hidden />{testimonial.location}</span>
                  <span>{testimonial.service}</span>
                </div>
              </figcaption>
            </figure>
          ))}
        </div>
        <p className="mt-3 text-xs leading-5 text-inverse-muted">Sample content for layout review only. Replace these profiles and quotes with approved client feedback before publishing them as real testimonials.</p>
      </div>
    </section>
  );
}
