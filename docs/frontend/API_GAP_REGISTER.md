# API Gap Register

Every frontend feature that cannot fully operate because the backend lacks a verified endpoint, field or behaviour. The frontend shows an explicit **blocked** or **pending integration** state for each; no gap is papered over with mock data.

Severity: **Critical** (backend cannot run) · **High** (whole module blocked) · **Medium** (feature degraded) · **Low** (cosmetic / data quality).

| ID | Severity | Gap | Evidence | Frontend impact & handling |
|---|---|---|---|---|
| G-01 | Critical | PSR-4 autoload keys double-escaped | `composer.json` `"App\\\\": "app/"` | Backend cannot boot → all integration pending. |
| G-02 | Critical | No `users`, `organizations`, developer, skill, membership table migrations | `database/migrations` | Auth and every user-linked module cannot persist. |
| G-03 | Critical | Duplicate `jobs` table name | `100005_create_jobs_table`, `500002_create_jobs_table` | Migrations fail; job marketplace cannot persist. |
| G-04 | Critical | Role resolution broken (`HasRoles` missing, `role_user` pivot absent, `hasAnyRole` undefined) | `app/Models/User.php`, `CheckRole.php`, 16 controllers | All role-gated endpoints return 500. Frontend navigation uses `user.role`; actions still call real endpoints and surface the backend error. |
| G-05 | Medium | Custom JSON exception handler not registered | `bootstrap/app.php` `withExceptions` empty | Frontend parses both the custom `{success,message,errors}` and Laravel default `{message,errors}` envelopes. |
| G-06 | Medium | Pagination meta dropped (`success(Resource::collection($paginator))`) | all `index` methods | No total counts or page numbers. Frontend pages with `?page=N`; "Next" is enabled only when a full page (20) was returned. |
| G-07 | High | CORS does not allow `*.lovable.app` (preview and published domains) | `config/cors.php` | Browser calls from the Lovable preview are blocked until the origin is added. |
| G-08 | High | Public CMS controllers call undefined `hasAnyRole` when a token is present | `ServiceController::index` etc. | Frontend never attaches the bearer token to `/public/*` calls. |
| G-09 | High | `UserController` and root `DashboardController` missing | routes `/users`, `/profile`, `/dashboard`, `/dashboard/switch-role` | User management, profile update, unified dashboard and **role switching** are blocked. Dashboard is composed from module endpoints instead. |
| G-10 | High | Entire developer network missing (21 controllers) | routes `/developer/*` | Developer application, verification, profiles, portfolios, assessments, memberships, membership payments and developer dashboard are blocked. |
| G-11 | High | `ForgotPasswordRequest` / `ResetPasswordRequest` classes missing | `PasswordResetController` | Forgot/reset password forms are built and call the real endpoints; they will fail until the classes exist. |
| G-12 | Medium | Verification resend uses an unnamed route and only logs the URL | `EmailVerificationController::resend` | Resend button calls the endpoint; users receive no email until mail is implemented. |
| G-13 | Medium | `GET /projects/dashboard` is shadowed by `GET /projects/{project}` | route order | Project dashboard widget blocked. |
| G-14 | Medium | `InsightController` not imported in routes | `routes/api.php` | Public Insights feed and Insights CMS blocked; Insights page shows Articles only. |
| G-15 | Medium | Public enquiry accepts `status`, `priority`, `assigned_to` from anonymous users | `EnquiryRequest` | Frontend sends only contact fields. Backend should restrict. |
| G-16 | High | No server-priced checkout or payment gateway; `POST /orders` accepts client-sent totals and `payment_status` | `OrderRequest` | Shop checkout and online payment are **blocked**. Cart is local; "Request this order" sends a real enquiry. Payments are never shown as successful by the frontend. |
| G-17 | Medium | Products/packages lack price type, effective dates, tax treatment, approval | `ProductResource`, `PackageResource` | Prices are shown only as returned (`price` + `currency`); missing price shows "Price on request". |
| G-18 | High | No contracts endpoints (permissions exist only in seeder) | — | Contracts module blocked. |
| G-19 | High | No audit logs, system settings, integrations, security/system health, purchase orders, suppliers, social accounts, content calendar, locations, organizations, sessions | — | Corresponding Super Admin / staff screens show a blocked state. |
| G-20 | Medium | `OrderController::index` compares `customer_id` (customers table) with the user id | `OrderController` | Customer "My orders" may return wrong/empty data. |
| G-21 | Medium | No authorized file download endpoints; `PATCH /reports/{id}/download` returns metadata only | `ReportController` | Downloads open the URL the API returns; nothing is generated client-side. |
| G-22 | Low | `/auth/me` does not load `roles`/`permissions` | `AuthController::me` | Frontend relies on the single `role` string. |
| G-23 | Medium | Spec personas (Senior Developer, Team Leader, Partner Owner, Org Member, applicant stages) have no distinct backend roles | `TestUsersSeeder` | These users see the workspace of their backend role. |
| G-24 | Medium | Routes registered via `apiResource` without the method (`MediaController@update`, `ContentApprovalController@destroy`, `JobInvitationController@update`, `StockMovementController@store/update/destroy`, `FinancialReportController@update`, `AnalyticsController@update`, `SeoAuditController@update`, `NotificationController@update`) | controllers | Those actions are not offered. |
| G-25 | Low | `OpenAPI` spec is a skeleton with wrong path prefixes | `docs/api/openapi.yaml` | Source code, not OpenAPI, was used as the contract. |
| G-26 | Medium | No backend environment URL was provided | — | API base URL is configurable (`VITE_PANDATECH_API_URL`); without it the app shows "Backend not connected". |
