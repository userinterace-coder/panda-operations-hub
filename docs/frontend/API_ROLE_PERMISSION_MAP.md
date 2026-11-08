# API Role & Permission Map

Source: `CheckRole` middleware arguments in `routes/api.php`, controller-level `hasRole`/`hasAnyRole` checks, and `database/seeders/RolesAndPermissionsSeeder.php`.

**Frontend visibility is not authorization.** The backend must enforce every rule below; the frontend only hides what a role cannot use.

## Role source of truth

- `users.role` (string column) is returned by `/auth/login`, `/auth/register`, `/auth/me` as `user.role`. The frontend uses this value.
- `user.roles` / `user.permissions` arrays are only present when the `roles` relation is eager-loaded; `/auth/me` does not load it (G-22).
- Spatie roles are seeded with guard `api`; the `User` model lacks the `HasRoles` trait, so role checks fail at runtime (G-04).

## Backend roles (seeded)

| Backend role | Master-spec personas mapped to it | Route groups gated to this role (CheckRole) |
|---|---|---|
| `super_admin` | Super Admin | analytics-summary, blog-posts, cms/articles, cms/case-studies, cms/content-approvals, cms/divisions, cms/faqs, cms/insights, cms/media, cms/navigations, cms/packages, cms/pages, cms/portfolios, cms/product-categories, cms/products, cms/services, cms/solutions, cms/testimonials, crm/customers, crm/enquiries, crm/lead-sources, crm/leads, crm/opportunities, crm/quotations, developer/applications, developer/membership-plans, developer/memberships, developer/profiles, developer/skills, developer/verification-checks, expense-categories, expenses, financial-reports, inventory, invoices, job-categories, jobs, knowledge-base-categories, marketing-campaigns, newsletter-subscribers, newsletters, notification-templates, orders, payments, payouts, permissions, projects, proposals, reports, roles, seo-audits, seo-contents, sla-breaches, sla-policies, social-posts, support-tickets, users |
| `administrator` | Administrator | analytics-summary, blog-posts, cms/articles, cms/case-studies, cms/content-approvals, cms/divisions, cms/faqs, cms/insights, cms/media, cms/navigations, cms/packages, cms/pages, cms/portfolios, cms/product-categories, cms/products, cms/services, cms/solutions, cms/testimonials, crm/customers, crm/enquiries, crm/lead-sources, crm/leads, crm/opportunities, crm/quotations, developer/applications, developer/membership-plans, developer/memberships, developer/profiles, developer/skills, developer/verification-checks, expense-categories, expenses, financial-reports, inventory, invoices, job-categories, jobs, knowledge-base-categories, marketing-campaigns, newsletter-subscribers, newsletters, notification-templates, orders, payments, payouts, permissions, projects, proposals, reports, roles, seo-audits, seo-contents, sla-breaches, sla-policies, social-posts, support-tickets, users |
| `customer` | Customer, Partner Organization Owner | — (only ungated authenticated routes) |
| `developer` | Developer Applicant, Approved Pending-Payment Applicant, Active Developer, Senior Developer (distinguished only by `status`) | — (only ungated authenticated routes) |
| `staff` | Team Leader, Organization Member | — (only ungated authenticated routes) |
| `verification_officer` | Verification Officer | developer/applications, developer/profiles, developer/verification-checks |
| `recruitment_manager` | Recruitment Manager | developer/applications, developer/profiles, jobs, proposals |
| `project_manager` | Project Manager | jobs, projects |
| `technical_lead` | Technical Lead | projects |
| `qa_officer` | QA Officer | projects |
| `finance_officer` | Finance Officer | crm/quotations, developer/memberships, expense-categories, expenses, financial-reports, invoices, payments, payouts, reports |
| `marketing_manager` | Marketing Manager | analytics-summary, blog-posts, knowledge-base-categories, marketing-campaigns, newsletter-subscribers, newsletters, notification-templates, reports, seo-audits, seo-contents, social-posts |
| `content_manager` | Content/Catalogue Manager | blog-posts, cms/articles, cms/case-studies, cms/content-approvals, cms/divisions, cms/faqs, cms/insights, cms/media, cms/navigations, cms/packages, cms/pages, cms/portfolios, cms/product-categories, cms/products, cms/services, cms/solutions, cms/testimonials, developer/skills, knowledge-base-categories, seo-audits, seo-contents |
| `support_officer` | Support Officer | crm/enquiries, sla-breaches, sla-policies, support-tickets |
| `sales_officer` | Sales Officer | crm/customers, crm/enquiries, crm/lead-sources, crm/leads, crm/opportunities, crm/quotations, invoices, orders |
| `shop_manager` | Shop/Inventory Manager | expenses, inventory, invoices, orders, payments |

## Spec roles without a distinct backend role

Senior Developer, Team Leader, Partner Organization Owner, Organization Member and the two applicant stages have no dedicated backend role. The frontend shows them the workspace of their backend role (`developer`, `staff`, `customer`). Distinct experiences are blocked by G-23.

## Ungated authenticated routes (controller scopes data by user)

`/orders`, `/invoices`, `/payments`, `/payouts`, `/expenses`, `/blog-posts`, `/newsletter-subscribers`, `/analytics-events`, `/support-tickets` (the second registration overrides the role-gated one), `/support-tickets/{ticket}/messages`, `/notifications`, `/knowledge-base-articles`, `/dashboard-widgets`, `/notification-preferences`, `/jobs`, `/jobs/{job}/invitations`, `/jobs/{job}/proposals`, `/proposals/{proposal}/reviews`, `/crm/dashboard`.

## Frontend navigation matrix

See `src/modules/registry.ts` — each module declares `roles` (who sees it). These are copied from the CheckRole lists above; ungated modules are narrowed to the audiences that make business sense (for example customers see Orders/Invoices/Support but not Payouts/Expenses).
