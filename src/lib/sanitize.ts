import DOMPurify from "dompurify";

/** Sanitises CMS HTML before rendering. Returns plain-escaped text during SSR (no DOM available). */
export function safeHtml(html: string | null | undefined): string {
  if (!html) return "";
  if (typeof window === "undefined") return html.replace(/</g, "&lt;").replace(/>/g, "&gt;");
  return DOMPurify.sanitize(html, { USE_PROFILES: { html: true }, FORBID_TAGS: ["style", "form", "iframe"], FORBID_ATTR: ["style"] });
}
