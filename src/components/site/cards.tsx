import { Link } from "@tanstack/react-router";
import { ArrowUpRight, Plus } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { Article, PortfolioItem, Product, Service } from "@/lib/api/types";
import { cart } from "@/lib/cart";
import { formatDate, formatMoney, plainText } from "@/lib/format";
import { toast } from "sonner";

export function PriceTag({ price, currency, className }: { price: unknown; currency?: string | null; className?: string }) {
  const p = formatMoney(price, currency);
  return <span className={className}>{p ?? <span className="text-muted-foreground">Price on request</span>}</span>;
}

export function ServiceCard({ service, index }: { service: Service; index?: number }) {
  return (
    <Link to="/services/$slug" params={{ slug: service.slug }}
      className="group relative flex h-full flex-col justify-between gap-8 border bg-card p-6 transition-all duration-300 hover:-translate-y-0.5 hover:border-foreground/25 hover:shadow-soft">
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <span className="font-mono text-xs text-muted-foreground">{index !== undefined ? String(index + 1).padStart(2, "0") : service.division ?? "Service"}</span>
          {service.featured && <Badge variant="brand">Featured</Badge>}
        </div>
        <h3 className="font-display text-xl font-semibold leading-snug">{service.name}</h3>
        <p className="text-sm text-muted-foreground">{service.short_description || plainText(service.description, 140)}</p>
      </div>
      <span className="inline-flex items-center gap-1 text-sm font-medium">
        Explore <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
      </span>
      <span className="signal-bar absolute inset-x-0 top-0 h-0.5 origin-left scale-x-0 transition-transform duration-300 group-hover:scale-x-100" aria-hidden />
    </Link>
  );
}

export function ProductCard({ product, shop = false }: { product: Product; shop?: boolean }) {
  return (
    <div className="group flex h-full flex-col border bg-card transition-all duration-300 hover:border-foreground/25 hover:shadow-soft">
      <Link to="/products/$slug" params={{ slug: product.slug }} className="flex flex-1 flex-col gap-3 p-6">
        <div className="flex items-center justify-between gap-2">
          <span className="truncate font-mono text-xs text-muted-foreground">{product.sku ?? product.category ?? "Product"}</span>
          {product.stock === 0 ? <Badge variant="muted">Out of stock</Badge> : product.featured ? <Badge variant="brand">Featured</Badge> : null}
        </div>
        <h3 className="font-display text-lg font-semibold leading-snug">{product.name}</h3>
        <p className="line-clamp-3 text-sm text-muted-foreground">{product.short_description || plainText(product.description, 140)}</p>
      </Link>
      <div className="flex items-center justify-between gap-3 border-t px-6 py-4">
        <PriceTag price={product.price} currency={product.currency} className="font-display font-semibold" />
        {shop ? (
          <Button size="sm" variant="outline" disabled={product.stock === 0} onClick={() => { cart.add(product); toast.success(`${product.name} added to your basket`); }}>
            <Plus /> Add
          </Button>
        ) : (
          <ArrowUpRight className="h-4 w-4 text-muted-foreground transition-colors group-hover:text-foreground" />
        )}
      </div>
    </div>
  );
}

export function PortfolioCard({ item }: { item: PortfolioItem }) {
  const cover = item.media?.[0];
  return (
    <Link to="/portfolio/$slug" params={{ slug: item.slug }} className="group flex h-full flex-col overflow-hidden border bg-card transition-all duration-300 hover:shadow-elevated">
      <div className="relative aspect-[16/10] overflow-hidden bg-inverse">
        {cover ? (
          <img src={cover.url} alt={cover.alt ?? item.title} loading="lazy" className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]" />
        ) : (
          <div className="grid-lines-inverse flex h-full items-end p-5"><span className="font-mono text-xs text-inverse-muted">{item.client_industry ?? "Project"}</span></div>
        )}
      </div>
      <div className="flex flex-1 flex-col gap-2 p-6">
        <p className="eyebrow">{item.client_name ?? "Client project"}</p>
        <h3 className="font-display text-xl font-semibold">{item.title}</h3>
        <p className="line-clamp-2 text-sm text-muted-foreground">{plainText(item.description, 160)}</p>
        {item.technologies?.length ? (
          <div className="mt-auto flex flex-wrap gap-1.5 pt-3">
            {item.technologies.slice(0, 4).map((t) => <span key={t} className="rounded-sm bg-muted px-2 py-0.5 font-mono text-[11px] text-muted-foreground">{t}</span>)}
          </div>
        ) : null}
      </div>
    </Link>
  );
}

export function ArticleCard({ article }: { article: Article }) {
  return (
    <Link to="/insights/$slug" params={{ slug: article.slug }} className="group flex h-full flex-col gap-4 border-t pt-6">
      <div className="flex items-center gap-3 font-mono text-xs text-muted-foreground">
        {article.category && <span className="text-brand-strong">{article.category}</span>}
        <span>{formatDate(article.published_at) ?? ""}</span>
      </div>
      <h3 className="font-display text-xl font-semibold leading-snug group-hover:underline group-hover:decoration-brand group-hover:underline-offset-4">{article.title}</h3>
      <p className="text-sm text-muted-foreground">{article.excerpt || plainText(article.content, 160)}</p>
    </Link>
  );
}
