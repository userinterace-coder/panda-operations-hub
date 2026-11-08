import { APP_CURRENCY, APP_LOCALE, APP_TIMEZONE } from "@/lib/api/config";

export function formatMoney(value: unknown, currency?: string | null) {
  if (value === null || value === undefined || value === "") return null;
  const n = Number(value);
  if (!Number.isFinite(n)) return null;
  try {
    return new Intl.NumberFormat(APP_LOCALE, { style: "currency", currency: currency || APP_CURRENCY, maximumFractionDigits: 2 }).format(n);
  } catch {
    return `${currency || APP_CURRENCY} ${n.toLocaleString(APP_LOCALE)}`;
  }
}

export function formatDate(value: unknown, withTime = false) {
  if (!value || typeof value !== "string") return null;
  const d = new Date(value);
  if (Number.isNaN(d.getTime())) return value;
  return new Intl.DateTimeFormat(APP_LOCALE, {
    timeZone: APP_TIMEZONE,
    day: "numeric",
    month: "short",
    year: "numeric",
    ...(withTime ? { hour: "2-digit", minute: "2-digit" } : {}),
  }).format(d);
}

export function humanize(key: string) {
  return key
    .replace(/_id$/, "")
    .replace(/_/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase());
}

/** Render any API value as display text. */
export function displayValue(value: unknown): string {
  if (value === null || value === undefined || value === "") return "—";
  if (typeof value === "boolean") return value ? "Yes" : "No";
  if (Array.isArray(value)) return value.length ? value.map((v) => (typeof v === "object" ? JSON.stringify(v) : String(v))).join(", ") : "—";
  if (typeof value === "object") return JSON.stringify(value);
  if (typeof value === "string" && /^\d{4}-\d{2}-\d{2}T/.test(value)) return formatDate(value, true) ?? value;
  return String(value);
}

/** Strip HTML from CMS content for previews. */
export function plainText(html: string | null | undefined, max = 180) {
  if (!html) return "";
  const t = html.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
  return t.length > max ? `${t.slice(0, max).trimEnd()}…` : t;
}
