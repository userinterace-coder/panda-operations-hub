import { useEffect, useState } from "react";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Minus, Plus, ShoppingBag, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { z } from "zod";

import { ProductCard } from "@/components/site/cards";
import { PageHero, Section, SiteShell } from "@/components/site/SiteShell";
import { BlockedState, EmptyState, ErrorState, LoadingRows } from "@/components/states";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { ApiError } from "@/lib/api/client";
import { publicQueries, submitEnquiry } from "@/lib/api/public";
import { useAuth } from "@/lib/auth/auth-context";
import { cart, cartSummary, useCart } from "@/lib/cart";
import { formatMoney } from "@/lib/format";
import { FilterChip } from "./services.index";
import { Pager } from "./products.index";

export const Route = createFileRoute("/shop")({
  validateSearch: z.object({ cart: z.boolean().optional() }),
  head: () => ({
    meta: [
      { title: "Technology shop — PANDA TECH" },
      { name: "description", content: "Networking, computers, CCTV, power and accessories from the PANDA TECH technology shop in Kenya." },
      { property: "og:title", content: "Technology shop — PANDA TECH" },
      { property: "og:description", content: "Equipment and accessories from PANDA TECH." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: ShopPage,
});

function ShopPage() {
  const search = Route.useSearch();
  const navigate = useNavigate({ from: "/shop" });
  const [category, setCategory] = useState<number | undefined>();
  const [page, setPage] = useState(1);
  const [term, setTerm] = useState("");
  const [input, setInput] = useState("");
  const cats = useQuery(publicQueries.productCategories());
  const q = useQuery(publicQueries.products({ category_id: category, page, search: term || undefined }));
  const lines = useCart();
  const { count } = cartSummary(lines);
  const open = !!search.cart;
  const setOpen = (v: boolean) => navigate({ search: v ? { cart: true } : {}, replace: true });

  return (
    <SiteShell>
      <PageHero index="04" eyebrow="Technology shop" title="Equipment, configured by people who install it" lead="Routers, switches, fibre, computers, CCTV, power and accessories. Prices and stock come straight from our catalogue.">
        <Button variant="outline" onClick={() => setOpen(true)}><ShoppingBag /> Basket ({count})</Button>
      </PageHero>
      <Section>
        <div className="mb-8 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex flex-wrap gap-2" role="tablist" aria-label="Categories">
            <FilterChip active={category === undefined} onClick={() => { setCategory(undefined); setPage(1); }}>All</FilterChip>
            {(cats.data ?? []).map((c) => <FilterChip key={c.id} active={category === c.id} onClick={() => { setCategory(c.id); setPage(1); }}>{c.name}</FilterChip>)}
          </div>
          <form onSubmit={(e) => { e.preventDefault(); setTerm(input.trim()); setPage(1); }} className="w-full lg:w-72" role="search">
            <Input value={input} onChange={(e) => setInput(e.target.value)} placeholder="Search the shop" aria-label="Search the shop" />
          </form>
        </div>
        {q.isPending ? <LoadingRows /> : q.error ? <ErrorState error={q.error} onRetry={() => q.refetch()} /> : q.data.items.length === 0 ? (
          <EmptyState title="No products found" />
        ) : (
          <>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">{q.data.items.map((p) => <ProductCard key={p.id} product={p} shop />)}</div>
            <Pager page={page} hasNext={q.data.hasNext} onChange={setPage} />
          </>
        )}
      </Section>
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent className="flex w-full flex-col gap-0 p-0 sm:max-w-md">
          <SheetHeader className="border-b p-5 text-left"><SheetTitle>Your basket</SheetTitle></SheetHeader>
          <BasketBody onDone={() => setOpen(false)} />
        </SheetContent>
      </Sheet>
    </SiteShell>
  );
}

function BasketBody({ onDone }: { onDone: () => void }) {
  const lines = useCart();
  const { user } = useAuth();
  const s = cartSummary(lines);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [notes, setNotes] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  useEffect(() => {
    if (user) { setName((n) => n || user.name); setEmail((e) => e || user.email); setPhone((p) => p || user.phone || ""); }
  }, [user]);

  const send = useMutation({
    mutationFn: () => {
      const message = [
        "Order request from the technology shop:",
        ...lines.map((l) => `- ${l.qty} × ${l.name}${l.sku ? ` (SKU ${l.sku})` : ""}${l.price !== null ? ` @ ${formatMoney(l.price, l.currency)}` : " (price on request)"}`),
        s.indicative ? `Indicative total at listed prices: ${formatMoney(s.indicative, s.currency)}` : "",
        notes ? `Notes: ${notes}` : "",
      ].filter(Boolean).join("\n");
      return submitEnquiry({ name, email, phone, service_type: "Technology shop", message });
    },
    onSuccess: () => {
      cart.clear();
      toast.success("Order request sent. Our team will confirm price, stock and delivery with you.");
      onDone();
    },
    onError: (e) => {
      if (e instanceof ApiError && e.kind === "validation") setErrors(Object.fromEntries(Object.entries(e.fieldErrors).map(([k, v]) => [k, v[0]])));
      toast.error(e instanceof ApiError ? e.message : "Could not send your request.");
    },
  });

  if (!lines.length) return <div className="p-5"><EmptyState title="Your basket is empty" action={<Button asChild variant="outline" size="sm" onClick={onDone}><Link to="/shop">Browse products</Link></Button>} /></div>;

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const errs: Record<string, string> = {};
    if (!name.trim()) errs.name = "Name is required.";
    if (!z.string().email().safeParse(email).success) errs.email = "Enter a valid email address.";
    setErrors(errs);
    if (!Object.keys(errs).length) send.mutate();
  };

  return (
    <div className="flex min-h-0 flex-1 flex-col">
      <ul className="flex-1 divide-y overflow-y-auto">
        {lines.map((l) => (
          <li key={l.id} className="flex gap-4 p-5">
            <div className="min-w-0 flex-1">
              <p className="truncate font-medium">{l.name}</p>
              <p className="text-sm text-muted-foreground">{l.price !== null ? formatMoney(l.price, l.currency) : "Price on request"}</p>
              <div className="mt-3 flex items-center gap-1">
                <Button variant="outline" size="icon" className="h-7 w-7" aria-label="Decrease quantity" onClick={() => cart.setQty(l.id, l.qty - 1)}><Minus /></Button>
                <span className="w-8 text-center font-mono text-sm">{l.qty}</span>
                <Button variant="outline" size="icon" className="h-7 w-7" aria-label="Increase quantity" onClick={() => cart.setQty(l.id, l.qty + 1)}><Plus /></Button>
              </div>
            </div>
            <Button variant="ghost" size="icon" aria-label={`Remove ${l.name}`} onClick={() => cart.remove(l.id)}><Trash2 /></Button>
          </li>
        ))}
      </ul>
      <form onSubmit={submit} className="space-y-4 border-t bg-muted/40 p-5">
        <div className="flex items-baseline justify-between">
          <span className="text-sm text-muted-foreground">Indicative total{s.hasUnpriced ? " (excl. items on request)" : ""}</span>
          <span className="font-display text-xl font-semibold">{formatMoney(s.indicative, s.currency)}</span>
        </div>
        <BlockedState title="Online checkout isn't available yet" reason="Your basket is sent as an order request. We'll confirm the final price, stock and delivery before any payment." gaps={["G-16"]} className="p-4 sm:p-4" />
        <div className="grid gap-3">
          <Field id="b-name" label="Name" value={name} onChange={setName} error={errors.name} autoComplete="name" />
          <Field id="b-email" label="Email" type="email" value={email} onChange={setEmail} error={errors.email} autoComplete="email" />
          <Field id="b-phone" label="Phone (optional)" value={phone} onChange={setPhone} error={errors.phone} autoComplete="tel" />
          <Field id="b-notes" label="Delivery notes (optional)" value={notes} onChange={setNotes} />
        </div>
        <Button type="submit" variant="brand" className="w-full" disabled={send.isPending}>{send.isPending ? "Sending…" : "Send order request"}</Button>
      </form>
    </div>
  );
}

function Field({ id, label, value, onChange, error, type = "text", autoComplete }: { id: string; label: string; value: string; onChange: (v: string) => void; error?: string; type?: string; autoComplete?: string }) {
  return (
    <div className="space-y-1.5">
      <Label htmlFor={id}>{label}</Label>
      <Input id={id} type={type} value={value} onChange={(e) => onChange(e.target.value)} aria-invalid={!!error} aria-describedby={error ? `${id}-err` : undefined} autoComplete={autoComplete} />
      {error && <p id={`${id}-err`} className="text-xs text-destructive">{error}</p>}
    </div>
  );
}
