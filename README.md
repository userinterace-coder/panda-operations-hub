# Panda Tech Operations Hub

now i want you clone t5his repo has laravel but you are not going to run or install laravel here you are going to read its backend api contract fo frontendhttps://github.com/welfarepos-ui/pandatechs03.git# PANDA TECH — MASTER FRONTEND ENGINEERING DIRECTIVE
## Repository Intelligence, Laravel API Reverse Engineering & World-Class Frontend Implementation

**Project:** PANDA TECH  
**Tagline:** Technology. Innovation. Possibilities.  
**Backend repository:** https://github.com/welfarepos-ui/pandatechs03.git  
**Backend:** Laravel 13  
**Frontend:** Independent Lovable-generated React application  
**API standard:** REST JSON, `/api/v1`, OpenAPI 3.1  
**Primary market:** Kenya  
**Currency:** KES  
**Timezone:** Africa/Nairobi

---

# 1. YOUR MISSION

You are acting as a principal frontend architect, senior React/TypeScript engineer, UI/UX director, API integration engineer and enterprise software product designer.

Your assignment is to build the complete PANDA TECH frontend.

This is not a simple corporate website, generic admin dashboard, prototype or collection of static pages.

It is a complete enterprise technology-company operating platform.

The backend already has its own Laravel repository. Your first responsibility is to inspect that repository and understand how its backend works.

You must connect to and inspect:

`https://github.com/welfarepos-ui/pandatechs03.git`

Clone or import the repository through the available GitHub integration.

IMPORTANT RESTRICTIONS:

- DO NOT install Laravel.
- DO NOT install Composer dependencies.
- DO NOT run Laravel migrations.
- DO NOT run Laravel seeders.
- DO NOT start Laravel servers.
- DO NOT modify backend files.
- DO NOT modify database schemas.
- DO NOT change backend business logic.
- DO NOT generate replacement backend APIs.
- DO NOT overwrite or destroy existing frontend work.

The Laravel repository is a READ-ONLY SOURCE OF TRUTH for this frontend assignment.

You may inspect its source files, configuration, routes, controllers, models, requests, resources, middleware, policies, migrations, seeders and API documentation.

Your job is to understand the backend contract and implement a separate frontend that consumes it.

# 2. MANDATORY REPOSITORY RECONNAISSANCE

Do not start designing screens before inspecting the repository.

Read the actual source code, not just the README.

Inspect:

- composer.json and Laravel version requirements.
- routes/api.php and all route files.
- Route service providers and module route registration.
- Controllers.
- Form Requests and validation rules.
- API Resources and response transformations.
- Models and relationships.
- Policies, middleware and permissions.
- Authentication implementation.
- Sanctum configuration.
- Database migrations.
- Enums and status definitions.
- Services and Actions.
- Notifications.
- File upload and download implementation.
- OpenAPI YAML/JSON files.
- API documentation.
- Factories and development seeders.
- Existing tests and endpoint coverage.
- Configuration relevant to CORS, sessions and API authentication.

Discover dynamically registered routes and endpoints rather than assuming everything is registered in one file.

Create a repository intelligence report.

For every endpoint, record:

1. HTTP method.
2. Actual URI.
3. Authentication requirement.
4. Required permissions.
5. Request parameters.
6. Request body.
7. Validation rules.
8. Response structure.
9. Error responses.
10. Pagination and filters.
11. File upload/download requirements.
12. Corresponding frontend screens and actions.

Classify each feature:

- VERIFIED_IMPLEMENTED
- PARTIALLY_IMPLEMENTED
- DOCUMENTED_BUT_UNVERIFIED
- PLANNED_NOT_IMPLEMENTED
- BLOCKED_BY_MISSING_API

Never assume an endpoint exists simply because it appears in the master specification.

# 3. CREATE AN API CONTRACT INTELLIGENCE LAYER

Before building business screens, create:

`docs/frontend/API_REPOSITORY_AUDIT.md`

`docs/frontend/API_ENDPOINT_INVENTORY.md`

`docs/frontend/API_ROLE_PERMISSION_MAP.md`

`docs/frontend/API_GAP_REGISTER.md`

`docs/frontend/FRONTEND_ROUTE_MAP.md`

`docs/frontend/UI_TO_API_MAPPING.md`

`docs/frontend/FRONTEND_IMPLEMENTATION_STATUS.md`

The API gap register must identify every frontend feature that cannot yet operate because the backend lacks a verified endpoint or required response field.

Never silently substitute mock data for missing backend functionality.

Where functionality is missing, create an explicit integration boundary and a clear blocked state.

# 4. FRONTEND TECHNOLOGY

Use a modern, maintainable frontend architecture.

Preferred stack:

- React.
- TypeScript.
- Vite.
- Tailwind CSS.
- shadcn/ui where appropriate.
- Lucide icons.
- React Router.
- TanStack Query for API state.
- React Hook Form.
- Zod for client-side form schemas derived from verified API contracts.
- Recharts for charts.
- A centralized typed API client.
- Appropriate accessible component primitives.

Inspect the existing frontend project before introducing dependencies or replacing its architecture.

Use the existing working foundation where possible.

Do not introduce unnecessary dependencies.

# 5. BRAND AND VISUAL DESIGN SYSTEM

Brand:

PANDA TECH

Tagline:

Technology. Innovation. Possibilities.

Palette:

- Black: #111111
- Orange: #FF6B2C
- Charcoal: #242424
- Light grey: #F3F3F3
- Slate: #777777
- White: #FFFFFF

Typography:

- Space Grotesk for headings.
- Inter for body text.
- JetBrains Mono for technical content.

Design requirements:

Build an exceptionally polished, premium enterprise interface.

Avoid generic dashboard templates and repetitive card layouts.

Use:

- Sophisticated visual hierarchy.
- Consistent spacing and alignment.
- Excellent typography.
- Restrained orange accents.
- Elegant borders and shadows.
- Subtle motion.
- Beautiful data tables.
- High-quality chart visualizations.
- Consistent iconography.
- Carefully designed empty states.
- Meaningful confirmation dialogs.
- Responsive navigation.
- Professional status indicators.

Create a reusable design system with centralized tokens.

Do not hardcode brand styling throughout individual components.

Use the approved PANDA TECH logo if available in the existing assets. Never invent a replacement official logo.

# 6. APPLICATION ARCHITECTURE

The platform must have these main experiences:

A. Public corporate website.

B. Customer portal.

C. Developer applicant portal.

D. Active developer workspace.

E. Partner organization workspace.

F. Internal staff workspace.

G. Marketing and SEO workspace.

H. Shop and commerce experience.

I. Super Admin control centre.

All authenticated experiences must use a consistent application foundation while supporting role-specific navigation, dashboard widgets and permissions.

Do not create separate authentication systems.

# 7. PUBLIC CORPORATE WEBSITE

Build a complete, professional PANDA TECH website.

Required pages:

- Home.
- About.
- Services.
- Service categories.
- Individual service details.
- Solutions.
- Product catalogue.
- Individual product details.
- Technology shop.
- Portfolio and case studies.
- Insights and articles.
- Developer network.
- Contact.
- Support.
- FAQs.
- Locations and service areas.
- Privacy policy.
- Terms and conditions.

Homepage should include:

- Strong hero section.
- Clear business positioning.
- Main service divisions.
- Featured solutions.
- Product highlights.
- Verified portfolio projects.
- Why choose PANDA TECH.
- Development and technology capabilities.
- Developer network introduction.
- Useful calls to action.
- Contact and footer sections.

Public content must come from verified public APIs.

Do not invent testimonials, customer logos, completed projects, reviews, office locations, awards or business statistics.

Use appropriate draft placeholders only where the content has not been approved.

Implement SEO-friendly routes, metadata, canonical URLs and structured data where appropriate.

# 8. AUTHENTICATION AND ACCOUNT MANAGEMENT

Implement:

- Registration.
- Login.
- Logout.
- Forgot password.
- Password reset.
- Email verification.
- Profile management.
- Account preferences.
- Session management.
- Notifications.
- Authorized role switching.

Inspect the actual Laravel authentication mechanism before implementing the frontend.

Determine whether the backend uses:

- Sanctum bearer tokens.
- Sanctum stateful cookie authentication.
- Another documented mechanism.

Do not assume bearer authentication.

Implement the correct token/session lifecycle, CSRF handling, credential configuration and logout behaviour.

Never place production secrets in frontend source code.

# 9. ROLE-AWARE WORKSPACES

Implement all roles defined in the PANDA TECH master implementation specification.

These include:

Customer, Developer Applicant, Approved Pending-Payment Applicant, Active Developer, Senior Developer, Team Leader, Partner Organization Owner, Organization Member, Recruitment Manager, Verification Officer, Project Manager, Technical Lead, QA Officer, Finance Officer, Marketing Manager, Support Officer, Content/Catalogue Manager, Shop/Inventory Manager, Sales Officer, Administrator and Super Admin.

The actual backend role and permission definitions take precedence over assumed names.

Each workspace must have:

- Appropriate dashboard.
- Authorized sidebar.
- Active navigation.
- Relevant dashboard widgets.
- Quick actions.
- Notifications.
- Search where supported.
- Profile and settings.
- Loading states.
- Error states.
- Empty states.
- Responsive mobile navigation.

Never grant privileges based on a frontend role selector.

# 10. DASHBOARD EXPERIENCE

Create role-specific dashboards using real backend data.

Examples:

Customer:
Active projects, quotation status, orders, unpaid invoices, consultations and support requests.

Developer:
Available jobs, applications, invitations, projects, tasks, deadlines, earnings and membership.

Recruitment:
Application pipeline, review queue, outstanding verification and recruitment statistics.

Project Manager:
Project health, milestones, task distribution, overdue tasks and blockers.

Finance:
Revenue, receivables, expenses, payment reconciliation and developer payouts.

Marketing:
Campaigns, content calendar, SEO performance, leads and conversions.

Super Admin:
Platform overview, users, developers, projects, sales, finance, operations, security and system activity.

The dashboard must adapt to the actual API response.

Never fabricate counts, analytics, revenue or project activity.

# 11. BUSINESS MODULES

Build complete frontend modules for:

1. User management.
2. Roles and permissions.
3. Customer management.
4. CRM and leads.
5. Enquiries and consultations.
6. Quotations and sales.
7. Developer applications.
8. Developer verification.
9. Developer profiles and portfolios.
10. Membership packages and payments.
11. Jobs and invitations.
12. Proposals and selection.
13. Contracts.
14. Projects and teams.
15. Tasks and milestones.
16. Deliverables and revisions.
17. QA and technical reviews.
18. Developer earnings and payouts.
19. Services and packages.
20. Products and categories.
21. Shop, cart and checkout.
22. Inventory and suppliers.
23. Purchase orders.
24. Orders and fulfilment.
25. Invoices and payments.
26. Expenses and finance.
27. Marketing campaigns.
28. Social media management.
29. Content calendar.
30. CMS and publishing.
31. SEO management.
32. Geographic service pages.
33. Google integrations.
34. Notifications.
35. Support tickets.
36. Knowledge base.
37. Reporting.
38. Audit logs.
39. System settings.
40. Security and system health.

Every module must have a clear frontend-to-API mapping.

Do not create generic CRUD for operations that require special business workflows.

For example:

- Payment verification must use an authorized backend action.
- Membership activation must follow backend approval and verified payment.
- Deliverable approval must follow authorized review workflows.
- Job publishing must follow backend permissions.
- Financial records must never be edited through unrestricted generic forms.

# 12. API INTEGRATION ARCHITECTURE

Create one centralized API integration layer.

Requirements:

- Configurable API base URL.
- Typed request and response interfaces.
- Centralized authentication.
- Consistent error handling.
- Request cancellation.
- Query caching and invalidation.
- Pagination.
- Filtering.
- Sorting.
- Search.
- File uploads.
- Authorized file downloads.
- Session expiration handling.
- Retry policies where appropriate.
- Network error recovery.

Use the backend's actual response envelope.

Support the documented success, pagination, validation and authorization responses.

Display useful user-facing validation errors.

Do not expose internal server errors, stack traces or secrets.

All mutations must be connected to real endpoints.

# 13. UI FUNCTIONALITY STANDARD

Every visible interactive control must work.

This includes:

- Buttons.
- Forms.
- Navigation links.
- Sidebar items.
- Search fields.
- Filters.
- Sort controls.
- Pagination.
- Dropdowns.
- Tabs.
- Modals.
- Drawers.
- File uploads.
- Downloads.
- Notifications.
- Status actions.
- Approval actions.
- Confirmation dialogs.

If an action has no verified backend implementation, clearly mark it unavailable or pending integration.

Never create a button that merely displays a success notification without performing its intended operation.

Never fake payment success.

Never fake file uploads.

Never fake account activation.

Never use hardcoded dashboard statistics in production.

# 14. SECURITY AND ACCESSIBILITY

Enforce frontend visibility based on backend-provided permissions.

Remember that frontend visibility is not authorization.

The backend remains responsible for enforcing every protected operation.

Additional requirements:

- No exposed API secrets.
- No direct database access.
- No sensitive information in browser storage unless justified and secured.
- Safe file previews.
- Accessible form labels.
- Keyboard navigation.
- Proper contrast.
- Accessible dialogs.
- Responsive layouts.
- Safe error messages.

# 15. RESPONSIVE EXPERIENCE

Build for:

- Desktop.
- Laptop.
- Tablet.
- Mobile.

No horizontal overflow.

Mobile navigation must be purpose-built, not merely a compressed desktop sidebar.

Tables should have useful mobile alternatives.

Forms must remain easy to complete on small screens.

Dashboard charts must adapt to available space.

# 16. TESTING

Test the complete frontend.

Required tests:

- Application builds successfully.
- All routes render.
- Authentication flows work against available API environments.
- Role-specific navigation is correct.
- Unauthorized navigation is hidden.
- API errors are handled.
- Forms validate correctly.
- Pagination and filtering work.
- File uploads are handled correctly.
- Responsive layouts work.
- No broken internal links.
- No dead buttons.
- No console errors.
- No unhandled promise rejections.
- No unintended horizontal overflow.
- No fabricated success states.

Use Playwright or an equivalent browser-testing tool where available.

Do not claim a backend workflow is tested if the backend was not available.

Distinguish frontend tests, mocked API tests and real backend integration tests.

# 17. IMPLEMENTATION ORDER

Work in controlled stages.

Stage 0: Repository reconnaissance and API audit.

Stage 1: Existing frontend assessment and design system.

Stage 2: API client and authentication.

Stage 3: Application shell and role-aware navigation.

Stage 4: Public corporate website.

Stage 5: Customer portal.

Stage 6: Developer application and developer workspace.

Stage 7: Partner organization workspace.

Stage 8: Staff workspaces.

Stage 9: Super Admin control centre.

Stage 10: Commerce and finance.

Stage 11: Marketing, CMS and SEO.

Stage 12: Notifications, support and reporting.

Stage 13: Full responsive and functional testing.

Do not skip stages or declare completion just because screens have been generated.

# 18. FINAL ACCEPTANCE STANDARD

The final result must be a complete, premium, responsive frontend connected to the verified Laravel API contract.

Deliver:

- Complete frontend source code.
- Reusable design system.
- All implemented frontend routes.
- Role-specific experiences.
- Centralized API client.
- Authentication implementation.
- API endpoint mapping.
- API gap register.
- Frontend testing results.
- Responsive testing results.
- Known limitations.
- Integration instructions.
- Final completion report.

Every requirement must have a recorded status:

IMPLEMENTED AND TESTED

IMPLEMENTED — BACKEND INTEGRATION PENDING

BLOCKED BY MISSING BACKEND API

NOT IMPLEMENTED

No requirement may silently disappear.

Do not mark the project 100% complete while critical screens, workflows, API integrations or tests remain outstanding.

---

# FINAL DIRECTIVE

Build PANDA TECH as an exceptional enterprise software product.

The frontend must be beautiful, intelligent, consistent, responsive and genuinely functional.

The Laravel backend is the authority.

The master implementation plan defines the business direction.

The actual Laravel source defines the available technical contract.

The frontend must bridge the two without inventing functionality or modifying the backend.

Your priority is not generating the maximum number of screens.

Your priority is delivering the maximum amount of verified, working functionality with exceptional design quality.

PANDA TECH — Technology. Innovation. Possibilities.

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/c32e2d38-4acf-4e8c-81f6-f9d513268608).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
