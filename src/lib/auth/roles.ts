import type { ApiUser } from "@/lib/api/types";

/** Roles seeded in database/seeders/RolesAndPermissionsSeeder.php (plus super_admin). */
export const ROLES = [
  "super_admin",
  "administrator",
  "customer",
  "developer",
  "staff",
  "verification_officer",
  "recruitment_manager",
  "project_manager",
  "technical_lead",
  "qa_officer",
  "finance_officer",
  "marketing_manager",
  "content_manager",
  "support_officer",
  "sales_officer",
  "shop_manager",
] as const;
export type Role = (typeof ROLES)[number];

export const ROLE_LABELS: Record<string, string> = {
  super_admin: "Super Admin",
  administrator: "Administrator",
  customer: "Customer",
  developer: "Developer",
  staff: "Staff",
  verification_officer: "Verification Officer",
  recruitment_manager: "Recruitment Manager",
  project_manager: "Project Manager",
  technical_lead: "Technical Lead",
  qa_officer: "QA Officer",
  finance_officer: "Finance Officer",
  marketing_manager: "Marketing Manager",
  content_manager: "Content & Catalogue Manager",
  support_officer: "Support Officer",
  sales_officer: "Sales Officer",
  shop_manager: "Shop & Inventory Manager",
};

export const ADMINS: Role[] = ["super_admin", "administrator"];
export const STAFF_ROLES: Role[] = ROLES.filter((r) => r !== "customer" && r !== "developer");

/** All role names a user holds according to the API (`role` column, plus `roles` when loaded). */
export function userRoles(user: ApiUser | null | undefined): string[] {
  if (!user) return [];
  const set = new Set<string>();
  if (user.role) set.add(user.role);
  (user.roles ?? []).forEach((r) => set.add(r));
  return [...set];
}

/** UI visibility helper only — the backend enforces authorization. */
export function hasAnyRole(user: ApiUser | null | undefined, roles: readonly string[] | "authenticated") {
  if (!user) return false;
  if (roles === "authenticated") return true;
  const mine = userRoles(user);
  return roles.some((r) => mine.includes(r));
}

export function roleLabel(role: string | null | undefined) {
  if (!role) return "—";
  return ROLE_LABELS[role] ?? role.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
}
