import { queryOptions } from "@tanstack/react-query";

import { apiList, apiRequest, shouldRetry } from "./client";
import type { Article, CaseStudy, CmsPage, Division, Faq, NavItem, Package, PortfolioItem, Product, ProductCategory, Service, Solution, Testimonial } from "./types";

/** Query options for the verified public endpoints (routes/api.php → Route::prefix('public')). Never sent with a token. */
const base = { staleTime: 5 * 60_000, retry: shouldRetry } as const;

export const publicQueries = {
  services: (q: { featured?: boolean; division_id?: number; search?: string } = {}) =>
    queryOptions({ ...base, queryKey: ["public", "services", q], queryFn: ({ signal }) => apiList<Service>("/public/services", { ...q, featured: q.featured ? 1 : undefined }, signal) }),
  service: (slug: string) => queryOptions({ ...base, queryKey: ["public", "service", slug], queryFn: async ({ signal }) => (await apiRequest<Service>({ path: `/public/services/${encodeURIComponent(slug)}`, signal })).data }),
  divisions: () => queryOptions({ ...base, queryKey: ["public", "divisions"], queryFn: async ({ signal }) => (await apiRequest<Division[]>({ path: "/public/divisions", signal })).data ?? [] }),
  products: (q: { featured?: boolean; category_id?: number; search?: string; page?: number } = {}) =>
    queryOptions({ ...base, queryKey: ["public", "products", q], queryFn: ({ signal }) => apiList<Product>("/public/products", { ...q, featured: q.featured ? 1 : undefined }, signal) }),
  product: (slug: string) => queryOptions({ ...base, queryKey: ["public", "product", slug], queryFn: async ({ signal }) => (await apiRequest<Product>({ path: `/public/products/${encodeURIComponent(slug)}`, signal })).data }),
  productCategories: () => queryOptions({ ...base, queryKey: ["public", "product-categories"], queryFn: async ({ signal }) => (await apiRequest<ProductCategory[]>({ path: "/public/product-categories", signal })).data ?? [] }),
  solutions: (q: { featured?: boolean } = {}) => queryOptions({ ...base, queryKey: ["public", "solutions", q], queryFn: async ({ signal }) => (await apiRequest<Solution[]>({ path: "/public/solutions", query: { featured: q.featured ? 1 : undefined }, signal })).data ?? [] }),
  packages: () => queryOptions({ ...base, queryKey: ["public", "packages"], queryFn: async ({ signal }) => (await apiRequest<Package[]>({ path: "/public/packages", signal })).data ?? [] }),
  portfolios: (q: { featured?: boolean; search?: string; page?: number } = {}) =>
    queryOptions({ ...base, queryKey: ["public", "portfolios", q], queryFn: ({ signal }) => apiList<PortfolioItem>("/public/portfolios", { ...q, featured: q.featured ? 1 : undefined }, signal) }),
  portfolio: (slug: string) => queryOptions({ ...base, queryKey: ["public", "portfolio", slug], queryFn: async ({ signal }) => (await apiRequest<PortfolioItem>({ path: `/public/portfolios/${encodeURIComponent(slug)}`, signal })).data }),
  caseStudies: (q: { featured?: boolean } = {}) => queryOptions({ ...base, queryKey: ["public", "case-studies", q], queryFn: ({ signal }) => apiList<CaseStudy>("/public/case-studies", { featured: q.featured ? 1 : undefined }, signal) }),
  caseStudy: (slug: string) => queryOptions({ ...base, queryKey: ["public", "case-study", slug], queryFn: async ({ signal }) => (await apiRequest<CaseStudy>({ path: `/public/case-studies/${encodeURIComponent(slug)}`, signal })).data }),
  articles: (q: { category?: string; search?: string; page?: number; featured?: boolean } = {}) =>
    queryOptions({ ...base, queryKey: ["public", "articles", q], queryFn: ({ signal }) => apiList<Article>("/public/articles", { ...q, featured: q.featured ? 1 : undefined }, signal) }),
  article: (slug: string) => queryOptions({ ...base, queryKey: ["public", "article", slug], queryFn: async ({ signal }) => (await apiRequest<Article>({ path: `/public/articles/${encodeURIComponent(slug)}`, signal })).data }),
  faqs: (category?: string) => queryOptions({ ...base, queryKey: ["public", "faqs", category], queryFn: async ({ signal }) => (await apiRequest<Faq[]>({ path: "/public/faqs", query: { category }, signal })).data ?? [] }),
  testimonials: () => queryOptions({ ...base, queryKey: ["public", "testimonials"], queryFn: async ({ signal }) => (await apiRequest<Testimonial[]>({ path: "/public/testimonials", query: { featured: 1 }, signal })).data ?? [] }),
  page: (slug: string) => queryOptions({ ...base, queryKey: ["public", "page", slug], queryFn: async ({ signal }) => (await apiRequest<CmsPage>({ path: `/public/pages/${encodeURIComponent(slug)}`, signal })).data }),
  navigation: () => queryOptions({ ...base, queryKey: ["public", "navigation"], queryFn: async ({ signal }) => (await apiRequest<NavItem[]>({ path: "/public/navigation", signal })).data ?? [] }),
};

export interface EnquiryInput {
  name: string;
  email: string;
  phone?: string;
  company?: string;
  service_type?: string;
  message: string;
  consultation_requested?: boolean;
  consultation_date?: string;
}

/** POST /public/enquiries — only contact fields are sent (status/assignment are staff-controlled, gap G-15). */
export function submitEnquiry(input: EnquiryInput) {
  const { name, email, phone, company, service_type, message, consultation_requested, consultation_date } = input;
  return apiRequest({ method: "POST", path: "/public/enquiries", body: { name, email, phone: phone || null, company: company || null, service_type: service_type || null, message, consultation_requested: !!consultation_requested, consultation_date: consultation_date || null } });
}
