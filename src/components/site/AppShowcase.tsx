import { Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";

import dashboardImage from "@/assets/showcase-business-dashboard.jpg";
import ecommerceImage from "@/assets/showcase-ecommerce-app.jpg";
import posImage from "@/assets/showcase-pos-system.jpg";
import walletImage from "@/assets/showcase-wallet-app.jpg";
import { cn } from "@/lib/utils";

export const APP_SHOWCASE = [
  {
    key: "wallet",
    title: "Mobile wallet apps",
    body: "Balances, send & receive, mobile money top-ups and contactless payments in a secure app your customers love.",
    tags: ["iOS & Android", "Mobile money", "Contactless"],
    image: walletImage,
    alt: "Two smartphones showing a dark navy mobile wallet app with a payment card, send and receive buttons and spending chart",
    width: 1200,
    height: 1200,
    layout: "lg:row-span-2",
    aspect: "aspect-[4/5] sm:aspect-square lg:aspect-auto",
  },
  {
    key: "dashboard",
    title: "Business dashboards & ERP",
    body: "Sales, stock, staff and finance in one live view — on laptop, tablet and phone.",
    tags: ["Web app", "Reports", "Multi-branch"],
    image: dashboardImage,
    alt: "Laptop, tablet and smartphone displaying a business analytics dashboard with charts and KPI cards",
    width: 1408,
    height: 912,
    layout: "lg:col-span-2",
    aspect: "aspect-[4/5] sm:aspect-[16/10] lg:aspect-[2/1]",
  },
  {
    key: "pos",
    title: "POS systems",
    body: "Fast checkout, receipts, stock sync and M-Pesa or card payments at the counter.",
    tags: ["Retail", "Restaurants", "Inventory"],
    image: posImage,
    alt: "A cashier using a touchscreen point-of-sale system while a customer taps a phone on a card terminal",
    width: 1200,
    height: 912,
    layout: "",
    aspect: "aspect-[4/5] sm:aspect-[4/3]",
  },
  {
    key: "ecommerce",
    title: "E-commerce & delivery apps",
    body: "Online stores with carts, checkout and live delivery tracking.",
    tags: ["Online store", "Checkout", "Tracking"],
    image: ecommerceImage,
    alt: "A smartphone showing a shopping app surrounded by a shopping bag, delivery scooter, parcel and location pin",
    width: 1200,
    height: 1200,
    layout: "",
    aspect: "aspect-[4/5] sm:aspect-[4/3]",
  },
] as const;

export function AppShowcaseGrid({ className }: { className?: string }) {
  return (
    <div className={cn("grid gap-5 sm:grid-cols-2 lg:grid-cols-3", className)}>
      {APP_SHOWCASE.map((app) => (
        <Link
          key={app.key}
          to="/contact"
          search={{ interest: app.title }}
          className={cn("group relative isolate overflow-hidden rounded-3xl border border-inverse-border bg-inverse shadow-elevated", app.layout)}
        >
          <div className={cn("relative h-full w-full", app.aspect)}>
            <img
              src={app.image}
              alt={app.alt}
              width={app.width}
              height={app.height}
              loading="lazy"
              className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.05]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-inverse via-inverse/50 via-30% to-transparent to-65%" aria-hidden />
            <div className="absolute inset-x-0 bottom-0 p-5 sm:p-6">
              <div className="flex flex-wrap gap-1.5">
                {app.tags.map((t) => (
                  <span key={t} className="rounded-full border border-inverse-foreground/20 bg-inverse/60 px-2.5 py-1 text-[11px] font-medium text-inverse-foreground backdrop-blur-sm">{t}</span>
                ))}
              </div>
              <div className="mt-3 flex items-end justify-between gap-4">
                <div>
                  <h3 className="font-display text-xl font-semibold text-inverse-foreground sm:text-2xl">{app.title}</h3>
                  <p className="mt-1.5 max-w-md text-sm leading-relaxed text-inverse-foreground/80">{app.body}</p>
                </div>
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-brand text-brand-foreground transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1">
                  <ArrowUpRight className="h-5 w-5" aria-hidden />
                </span>
              </div>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}

/** Compact horizontal strip of the same artwork, for inner pages. */
export function AppShowcaseStrip() {
  return (
    <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
      {APP_SHOWCASE.map((app) => (
        <figure key={app.key} className="group relative overflow-hidden rounded-2xl border bg-inverse shadow-soft">
          <img src={app.image} alt={app.alt} width={app.width} height={app.height} loading="lazy" className="aspect-[4/3] h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.05]" />
          <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-inverse/90 to-transparent p-3 pt-10 font-display text-sm font-semibold text-inverse-foreground sm:p-4 sm:pt-12 sm:text-base">{app.title}</figcaption>
        </figure>
      ))}
    </div>
  );
}
