import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { ArrowLeft, ShoppingBag } from "lucide-react";
import { toast } from "sonner";

import { PriceTag } from "@/components/site/cards";
import { Section, SiteShell } from "@/components/site/SiteShell";
import { ErrorState, LoadingRows } from "@/components/states";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { publicQueries } from "@/lib/api/public";
import { cart } from "@/lib/cart";
import { safeHtml } from "@/lib/sanitize";

export const Route = createFileRoute("/products/$slug")({
  head: ({ params }) => {
    const name = params.slug.replace(/-/g, " ");
    return {
      meta: [
        { title: `${name} — Products — PANDA TECH` },
        { name: "description", content: `${name} from the PANDA TECH catalogue.` },
        { property: "og:title", content: `${name} — PANDA TECH` },
        { property: "og:description", content: `Product details for ${name}.` },
        { property: "og:type", content: "product" },
        { name: "twitter:card", content: "summary" },
      ],
    };
  },
  component: ProductDetail,
});

function ProductDetail() {
  const { slug } = Route.useParams();
  const q = useQuery(publicQueries.product(slug));
  return (
    <SiteShell>
      <Section>
        <Link to="/products" className="mb-10 inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"><ArrowLeft className="h-4 w-4" /> Products</Link>
        {q.isPending ? <LoadingRows rows={6} /> : q.error ? <ErrorState error={q.error} onRetry={() => q.refetch()} /> : (
          <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr]">
            <div>
              <p className="eyebrow">{q.data.category ?? "Product"}</p>
              <h1 className="mt-4 text-4xl font-semibold sm:text-5xl">{q.data.name}</h1>
              {q.data.short_description && <p className="mt-5 text-lg text-muted-foreground">{q.data.short_description}</p>}
              <div className="prose-panda mt-10" dangerouslySetInnerHTML={{ __html: safeHtml(q.data.description) }} />
            </div>
            <aside className="h-fit space-y-5 rounded-lg border bg-card p-6 shadow-soft lg:sticky lg:top-24">
              <div className="flex items-center justify-between">
                <PriceTag price={q.data.price} currency={q.data.currency} className="font-display text-3xl font-semibold" />
                {q.data.stock === 0 ? <Badge variant="muted">Out of stock</Badge> : typeof q.data.stock === "number" ? <Badge variant="success">In stock</Badge> : null}
              </div>
              {q.data.sku && <p className="font-mono text-xs text-muted-foreground">SKU {q.data.sku}</p>}
              <Button variant="brand" className="w-full" size="lg" disabled={q.data.stock === 0} onClick={() => { cart.add(q.data); toast.success("Added to your basket"); }}>
                <ShoppingBag /> Add to basket
              </Button>
              <Button asChild variant="outline" className="w-full"><Link to="/contact" search={{ interest: q.data.name }}>Ask a question</Link></Button>
              <p className="text-xs text-muted-foreground">Online payment isn't available yet. Your basket is sent to our team as an order request and we confirm price, stock and delivery with you.</p>
            </aside>
          </div>
        )}
      </Section>
    </SiteShell>
  );
}
