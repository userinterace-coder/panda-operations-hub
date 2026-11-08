/** Shapes copied from Laravel API Resources (app/Http/Http/Resources). */

export interface ApiUser {
  id: number;
  name: string;
  email: string;
  role: string;
  status: "pending" | "active" | "suspended" | string;
  phone: string | null;
  avatar: string | null;
  timezone: string | null;
  locale: string | null;
  email_verified_at?: string | null;
  organization_id?: number | null;
  roles?: string[];
  permissions?: string[];
  created_at: string;
  updated_at: string;
}

export interface AuthPayload {
  user: ApiUser;
  token: string;
}

export type ApiRecord = Record<string, unknown> & { id: number | string };

export interface Service {
  id: number; name: string; slug: string; description: string | null; short_description: string | null;
  division_id: number | null; division?: string; icon: string | null; status: string; featured: boolean; order: number;
  meta_title: string | null; meta_description: string | null;
}
export interface Division { id: number; name: string; slug: string; description: string | null; status: string; order: number; services?: Service[] }
export interface Product {
  id: number; name: string; slug: string; description: string | null; short_description: string | null;
  product_category_id: number | null; category?: string; sku: string | null; price: string | number | null; currency: string | null;
  status: string; featured: boolean; stock: number | null; meta_title: string | null; meta_description: string | null;
}
export interface ProductCategory { id: number; name: string; slug: string; description: string | null; parent_id: number | null; children?: ProductCategory[] }
export interface Package { id: number; name: string; slug: string; description: string | null; solution_id: number | null; solution?: string; price: string | number | null; currency: string | null; features: string[] | null }
export interface Solution { id: number; name: string; slug: string; description: string | null; short_description: string | null; featured: boolean; packages?: Package[] }
export interface PortfolioItem {
  id: number; title: string; slug: string; description: string | null; client_name: string | null; client_industry: string | null;
  technologies: string[] | null; featured: boolean; start_date: string | null; end_date: string | null; live_url: string | null;
  media?: { id: number; url: string; alt: string | null; sort_order: number }[];
}
export interface CaseStudy { id: number; title: string; slug: string; description: string | null; challenge: string | null; solution: string | null; results: string | null; client_name: string | null; featured: boolean }
export interface Article { id: number; title: string; slug: string; content: string | null; excerpt: string | null; category: string | null; author?: string; published_at: string | null; featured: boolean; meta_title: string | null; meta_description: string | null }
export interface Faq { id: number; question: string; answer: string; category: string | null; order: number }
export interface Testimonial { id: number; name: string; role: string | null; company: string | null; content: string; rating: number | null; avatar: string | null }
export interface CmsPage { id: number; title: string; slug: string; content: string | null; excerpt: string | null; published_at: string | null; meta_title: string | null; meta_description: string | null }
export interface NavItem { id: number; name: string | null; title: string | null; url: string | null; order: number; children?: NavItem[] }
