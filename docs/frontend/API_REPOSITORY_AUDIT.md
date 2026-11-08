# PANDA TECH — Backend Repository Audit (Stage 0)

**Repository:** https://github.com/welfarepos-ui/pandatechs03.git (default branch, shallow clone, read-only)
**Backend root:** `pandatech-backend/`
**Method:** static source analysis only. Laravel, Composer, migrations, seeders and servers were **not** installed or run. No backend file was modified.
**Audit date:** 2026-11-08 (Africa/Nairobi)

## 1. Stack

| Item | Finding | Source |
|---|---|---|
| Framework | Laravel `^13.0`, PHP `^8.2` | `composer.json` |
| Auth | Laravel Sanctum `^4.0` — **personal access tokens (Bearer)** | `AuthController`, `config/auth.php` |
| RBAC | `spatie/laravel-permission ^6.15` (seeded with guard `api`) + a `users.role` string column | migrations, seeders |
| API prefix | `/api/v1` (Laravel `api` prefix + `Route::prefix('v1')`) | `bootstrap/app.php`, `routes/api.php` |
| Bootstrap | Laravel 11+ style `bootstrap/app.php`; a legacy `RouteServiceProvider` also exists but is not registered | `bootstrap/` |
| CORS | `supports_credentials: true`; origins localhost, `*.pandatech.co.ke`, `*.lovable.dev` | `config/cors.php` |
| OpenAPI | `docs/api/openapi.yaml` — skeleton, 33 paths, several with wrong prefixes; tracker marks full coverage as Phase 11 (not started) | `docs/api/` |
| Tests | 12 feature test files exist; they were not run | `tests/Feature` |

## 2. Authentication mechanism (decides the frontend lifecycle)

- `POST /auth/register` and `POST /auth/login` return `{ success, message, data: { user, token } }` where `token` is a Sanctum **plain-text bearer token**.
- Login revokes all previous tokens (one active session per user).
- `GET /auth/me` returns `{ data: UserResource }`; `POST /auth/refresh` rotates the token; `POST /auth/logout` revokes the current token.
- No `/sanctum/csrf-cookie` flow is used by any controller; there is no `config/sanctum.php` stateful domain list. **Cookie/stateful auth is not implemented.**
- **Frontend decision:** send `Authorization: Bearer <token>` + `Accept: application/json` on authenticated calls. No CSRF token is needed for bearer requests. The token is kept in `localStorage` (key `pandatech.session`) so sessions survive reloads; it is never sent to `/public/*` routes (see G-08), and is cleared on logout, on any 401, and on password reset.

## 3. Response envelopes (both must be handled)

| Case | Shape | Produced by |
|---|---|---|
| Success | `{ success: true, message, data }` | `Controller::success()` |
| Controller error | `{ success: false, message, errors? }` | `Controller::error()` |
| Role denied | `{ success: false, message: "Forbidden - insufficient role permissions", required_roles, user_roles }` (403) | `CheckRole` |
| Validation (422) | Laravel default `{ message, errors: { field: [msg] } }` | FormRequest — custom `App\Exceptions\Handler` is **not wired** in Laravel 11+ bootstrap (G-05) |
| Unauthenticated (401) | Laravel default `{ message: "Unauthenticated." }` | Sanctum |
| Lists | `data` is a **plain array**; pagination meta is lost (G-06) | `success(Resource::collection($paginator))` |

## 4. Module coverage summary

516 endpoint registrations (apiResource expanded) were extracted.

| Classification | Count | Meaning |
|---|---|---|
| VERIFIED_IMPLEMENTED | 29 | Controller, method, request and resource exist; no known defect on the code path (source-verified, not runtime-verified). Health, auth, public CMS. |
| PARTIALLY_IMPLEMENTED | 367 | Code exists but every request passes through the broken role resolution (G-04) and/or list pagination loss (G-06). |
| BLOCKED_BY_MISSING_API | 120 | Route points at a controller/method/request class that does not exist. |

### Modules with controllers present
CMS (pages, navigation, media, divisions, services, product categories, products, solutions, packages, portfolios, case studies, articles, FAQs, testimonials, content approvals), CRM (customers, contacts, lead sources, leads, enquiries, opportunities, quotations, CRM dashboard), Jobs (categories, jobs, invitations, proposals, reviews, shortlists), Projects (projects, teams, tasks, deliverables, milestones, time entries), Commerce/Finance (inventory, stock movements, orders, order items, invoices, invoice items, payments, payouts, expenses, expense categories, financial reports), Marketing (campaigns, social posts, SEO contents, blog posts, newsletters, subscribers, analytics events/summary, SEO audits), Support (tickets, messages, SLA policies, SLA breaches, notifications, notification templates, KB categories/articles, reports, dashboard widgets, notification preferences).

### Modules referenced by routes but missing in source (22 controllers)
`UserController`, root `DashboardController`, `DeveloperApplicationController`, `ApplicationDecisionController`, `ApplicationDocumentController`, `ApplicationReviewController`, `DeveloperProfileController`, `DeveloperExperienceController`, `DeveloperCertificationController`, `DeveloperReferenceController`, `DeveloperPortfolioController`, `PortfolioMediaController`, `DeveloperAssessmentController`, `DeveloperAssessmentSubmissionController`, `SkillController`, `VerificationCheckController`, `VerificationEventController`, `MembershipController`, `MembershipInvoiceController`, `MembershipPlanController`, `DeveloperDashboardController`; plus `InsightController` exists but is not imported in `routes/api.php`.

### Spec modules with no backend at all
Contracts, purchase orders, suppliers, cart/priced checkout, payment gateway (M-Pesa/card), audit logs, system settings, security/system health (beyond `/health`), Google integrations, social account management, content calendar, geographic service pages/locations, organizations/partner workspaces, user sessions list.

## 5. Critical environment blockers (backend cannot currently boot or migrate)

These are reported to the backend team; the frontend does not work around them.

1. **G-01** `composer.json` PSR-4 keys are double-escaped (`"App\\\\"`), so the `App\` namespace will not autoload.
2. **G-02** There is no `create_users_table` migration (only an `ALTER users`), and no `organizations`, `developer_profiles`, `skills` or membership tables.
3. **G-03** Two migrations both create a table named `jobs` (queue jobs and marketplace jobs).
4. **G-04** `User` does not use Spatie `HasRoles`; `User::roles()` points at a non-existent `role_user` pivot and `hasAnyRole()`/`getAllPermissions()` are undefined, so `CheckRole`, controller role checks and `UserResource.permissions` fail at runtime.

Until these are fixed, **no endpoint can be exercised against a live backend**. All frontend integration is therefore "IMPLEMENTED — BACKEND INTEGRATION PENDING".

## 6. Artefacts

- `API_ENDPOINT_INVENTORY.md` — every endpoint with auth, roles, validation, filters, response fields, status, gaps and frontend screen.
- `API_ROLE_PERMISSION_MAP.md` — roles, persona mapping and gates.
- `API_GAP_REGISTER.md` — every blocker with frontend impact.
- `src/lib/api/contract.generated.ts` — machine-readable contract used by the frontend forms and filters.
