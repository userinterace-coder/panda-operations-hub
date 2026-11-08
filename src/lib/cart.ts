import { useSyncExternalStore } from "react";

import type { Product } from "@/lib/api/types";

/**
 * Local shopping basket. This is genuine client state (what the visitor intends to buy), not a fake order.
 * Priced checkout and online payment are blocked by backend gap G-16, so the basket is submitted as an
 * order request through the verified public enquiry endpoint.
 */
export interface CartLine {
  id: number;
  slug: string;
  name: string;
  sku: string | null;
  price: number | null;
  currency: string | null;
  qty: number;
}

const KEY = "pandatech.cart";
const listeners = new Set<() => void>();
let cache: CartLine[] | null = null;
const EMPTY: CartLine[] = [];

function read(): CartLine[] {
  if (typeof window === "undefined") return EMPTY;
  if (cache) return cache;
  try {
    const parsed = JSON.parse(window.localStorage.getItem(KEY) ?? "[]");
    cache = Array.isArray(parsed) ? parsed : [];
  } catch {
    cache = [];
  }
  return cache!;
}

function write(lines: CartLine[]) {
  cache = lines;
  window.localStorage.setItem(KEY, JSON.stringify(lines));
  listeners.forEach((l) => l());
}

export const cart = {
  add(p: Product, qty = 1) {
    const lines = [...read()];
    const i = lines.findIndex((l) => l.id === p.id);
    const price = p.price === null || p.price === undefined || p.price === "" ? null : Number(p.price);
    if (i >= 0) lines[i] = { ...lines[i], qty: lines[i].qty + qty };
    else lines.push({ id: p.id, slug: p.slug, name: p.name, sku: p.sku, price: Number.isFinite(price) ? price : null, currency: p.currency, qty });
    write(lines);
  },
  setQty(id: number, qty: number) {
    write(read().map((l) => (l.id === id ? { ...l, qty: Math.max(1, Math.min(999, qty)) } : l)));
  },
  remove(id: number) {
    write(read().filter((l) => l.id !== id));
  },
  clear() {
    write([]);
  },
};

export function cartSummary(lines: CartLine[]) {
  const count = lines.reduce((s, l) => s + l.qty, 0);
  const priced = lines.filter((l) => l.price !== null);
  const indicative = priced.reduce((s, l) => s + (l.price ?? 0) * l.qty, 0);
  return { count, indicative, hasUnpriced: priced.length !== lines.length, currency: priced[0]?.currency ?? "KES" };
}

export function useCart() {
  return useSyncExternalStore(
    (cb) => {
      listeners.add(cb);
      return () => listeners.delete(cb);
    },
    read,
    () => EMPTY,
  );
}
