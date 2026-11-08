/** Builds a route head() with unique title/description and social tags. */
export function pageHead(title: string, description: string) {
  const full = `${title} — Pandatechs Enterprises`;
  return {
    meta: [
      { title: full },
      { name: "description", content: description },
      { property: "og:title", content: full },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  };
}
