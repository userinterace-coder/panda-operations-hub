import type { LucideIcon } from "lucide-react";
import {
  Activity, BadgeCheck, BarChart3, Bell, BookOpen, Boxes, Briefcase, Building2, CalendarClock, ClipboardCheck, Contact, CreditCard,
  FileBarChart, FileCheck2, FileSignature, FileText, FolderKanban, Gauge, Globe2, HandCoins, HeartHandshake, Image as ImageIcon, Inbox,
  KeyRound, Layers, LayoutGrid, LifeBuoy, ListChecks, Mail, Megaphone, MessageSquareQuote, Navigation, Newspaper, Package,
  PackageSearch, Receipt, ScrollText, Search, Send, Server, Settings, Share2, ShieldCheck, ShoppingCart, Sparkles, Tags,
  Target, Timer, TrendingUp, UserCheck, UserCog, Users, Wallet, Workflow, Wrench,
} from "lucide-react";

import { CONTROLLERS } from "@/lib/api/contract.generated";
import type { Role } from "@/lib/auth/roles";

export type NavGroupKey = "overview" | "sales" | "talent" | "delivery" | "commerce" | "finance" | "marketing" | "content" | "support" | "admin";

export const NAV_GROUPS: { key: NavGroupKey; label: string }[] = [
  { key: "overview", label: "Overview" },
  { key: "sales", label: "Sales & CRM" },
  { key: "talent", label: "Developer network" },
  { key: "delivery", label: "Delivery" },
  { key: "commerce", label: "Shop & inventory" },
  { key: "finance", label: "Finance" },
  { key: "marketing", label: "Marketing & SEO" },
  { key: "content", label: "Website & catalogue" },
  { key: "support", label: "Support" },
  { key: "admin", label: "Administration" },
];

export type ColumnFormat = "text" | "money" | "date" | "datetime" | "status" | "bool" | "mono";
export interface ColumnDef { key: string; label: string; format?: ColumnFormat; currencyKey?: string }

export interface ActionField { name: string; label: string; type: "text" | "textarea" | "number" | "select" | "datetime" | "boolean"; required?: boolean; options?: string[] }
export interface ActionDef {
  key: string;
  label: string;
  method: "PATCH" | "POST";
  /** Path suffix appended to the record URL, e.g. "/approve". */
  suffix: string;
  roles: Role[] | "authenticated";
  confirm: string;
  tone?: "default" | "destructive" | "brand";
  fields?: ActionField[];
  /** Only offer the action when the record is in one of these statuses. */
  whenStatus?: string[];
  statusKey?: string;
}

export interface ChildDef { module: string; label: string }

export type Audience = Role[] | "authenticated";

export interface ModuleDef {
  key: string;
  title: string;
  singular: string;
  group: NavGroupKey;
  icon: LucideIcon;
  description: string;
  /** Controller key in CONTROLLERS (contract.generated.ts). */
  controller?: string;
  /** API path. Child modules use ":parent" as the placeholder for the parent id. */
  path: string;
  status: "available" | "partial" | "blocked";
  gaps: string[];
  /** Who sees this in navigation. Mirrors CheckRole where the route is gated. */
  roles: Audience;
  primary: string;
  columns: ColumnDef[];
  create?: Audience | false;
  edit?: Audience | false;
  remove?: Audience | false;
  /** Fields removed from the generic form — changed only through workflow actions. */
  formExclude?: string[];
  actions?: ActionDef[];
  children?: ChildDef[];
  /** Child modules are only reachable from their parent's detail page. */
  parentModule?: string;
  blockedReason?: string;
  listOnly?: boolean;
}

const A: Role[] = ["super_admin", "administrator"];
const r = (...roles: Role[]): Role[] => [...A, ...roles];
const STATUS = "status";

const blocked = (key: string, title: string, group: NavGroupKey, icon: LucideIcon, roles: Audience, reason: string, gaps: string[], description: string): ModuleDef => ({
  key, title, singular: title, group, icon, description, path: "", status: "blocked", gaps, roles, primary: "id", columns: [], blockedReason: reason,
});

export const MODULES: ModuleDef[] = [
  // ───────────── Sales & CRM
  { key: "customers", title: "Customers", singular: "Customer", group: "sales", icon: Building2, controller: "CustomerController", path: "/crm/customers", status: "partial", gaps: ["G-04", "G-06"],
    description: "Business and individual customer accounts.", roles: r("sales_officer"), primary: "company_name",
    columns: [{ key: "company_name", label: "Company" }, { key: "email", label: "Email" }, { key: "customer_type", label: "Type", format: "status" }, { key: "city", label: "City" }, { key: "status", label: "Status", format: "status" }, { key: "created_at", label: "Created", format: "date" }],
    create: r("sales_officer"), edit: r("sales_officer"), remove: A, children: [{ module: "customer-contacts", label: "Contacts" }] },
  { key: "customer-contacts", title: "Contacts", singular: "Contact", group: "sales", icon: Contact, controller: "CustomerContactController", path: "/crm/customers/:parent/contacts", status: "partial", gaps: ["G-04"], parentModule: "customers",
    description: "People at a customer account.", roles: r("sales_officer"), primary: "first_name",
    columns: [{ key: "first_name", label: "First name" }, { key: "last_name", label: "Last name" }, { key: "email", label: "Email" }, { key: "role", label: "Role" }, { key: "is_primary", label: "Primary", format: "bool" }],
    create: r("sales_officer"), edit: r("sales_officer"), remove: r("sales_officer") },
  { key: "leads", title: "Leads", singular: "Lead", group: "sales", icon: Target, controller: "LeadController", path: "/crm/leads", status: "partial", gaps: ["G-04", "G-06"],
    description: "Prospects moving through the sales pipeline.", roles: r("sales_officer"), primary: "company",
    columns: [{ key: "first_name", label: "First name" }, { key: "last_name", label: "Last name" }, { key: "company", label: "Company" }, { key: "status", label: "Stage", format: "status" }, { key: "value", label: "Value", format: "money" }, { key: "expected_close_date", label: "Close date", format: "date" }],
    create: r("sales_officer"), edit: r("sales_officer"), remove: A },
  { key: "lead-sources", title: "Lead sources", singular: "Lead source", group: "sales", icon: Share2, controller: "LeadSourceController", path: "/crm/lead-sources", status: "partial", gaps: ["G-04"],
    description: "Where leads come from.", roles: r("sales_officer"), primary: "name",
    columns: [{ key: "name", label: "Name" }, { key: "slug", label: "Slug", format: "mono" }, { key: "status", label: "Status", format: "status" }], create: r("sales_officer"), edit: r("sales_officer"), remove: A },
  { key: "enquiries", title: "Enquiries", singular: "Enquiry", group: "sales", icon: Inbox, controller: "EnquiryController", path: "/crm/enquiries", status: "partial", gaps: ["G-04", "G-06", "G-15"],
    description: "Website enquiries and consultation requests.", roles: r("sales_officer", "support_officer"), primary: "name",
    columns: [{ key: "name", label: "Name" }, { key: "company", label: "Company" }, { key: "service_type", label: "Interest" }, { key: "priority", label: "Priority", format: "status" }, { key: "status", label: "Status", format: "status" }, { key: "created_at", label: "Received", format: "date" }],
    create: r("sales_officer", "support_officer"), edit: r("sales_officer", "support_officer"), remove: A },
  { key: "opportunities", title: "Opportunities", singular: "Opportunity", group: "sales", icon: TrendingUp, controller: "OpportunityController", path: "/crm/opportunities", status: "partial", gaps: ["G-04", "G-06"],
    description: "Qualified deals with value and probability.", roles: r("sales_officer"), primary: "title",
    columns: [{ key: "title", label: "Title" }, { key: "customer", label: "Customer" }, { key: "stage", label: "Stage", format: "status" }, { key: "value", label: "Value", format: "money" }, { key: "probability", label: "Prob. %" }, { key: "status", label: "Status", format: "status" }],
    create: r("sales_officer"), edit: r("sales_officer"), remove: A },
  { key: "quotations", title: "Quotations", singular: "Quotation", group: "sales", icon: FileSignature, controller: "QuotationController", path: "/crm/quotations", status: "partial", gaps: ["G-04", "G-06"],
    description: "Priced proposals sent to customers. Approval and sending are separate authorised steps.", roles: r("sales_officer", "finance_officer"), primary: "title",
    columns: [{ key: "reference", label: "Ref", format: "mono" }, { key: "title", label: "Title" }, { key: "customer", label: "Customer" }, { key: "total", label: "Total", format: "money" }, { key: "status", label: "Status", format: "status" }, { key: "valid_until", label: "Valid until", format: "date" }],
    create: r("sales_officer"), edit: r("sales_officer"), remove: A, formExclude: [STATUS],
    actions: [
      { key: "approve", label: "Approve", method: "PATCH", suffix: "/approve", roles: r("finance_officer"), confirm: "Approve this quotation? Approved quotations can be sent to the customer.", tone: "brand", whenStatus: ["draft", "sent"] },
      { key: "send", label: "Mark as sent", method: "PATCH", suffix: "/send", roles: r("sales_officer"), confirm: "Mark this quotation as sent to the customer?", whenStatus: ["draft", "approved"] },
    ] },

  // ───────────── Developer network (backend controllers missing — G-10)
  blocked("developer-applications", "Applications", "talent", UserCheck, r("recruitment_manager", "verification_officer", "developer"), "The developer application controllers (DeveloperApplicationController, ApplicationDecisionController, ApplicationDocumentController, ApplicationReviewController) are referenced by routes but do not exist in the backend.", ["G-10", "G-02"], "Developer applications, documents, reviews and decisions."),
  blocked("verification", "Verification", "talent", ShieldCheck, r("verification_officer"), "VerificationCheckController and VerificationEventController do not exist in the backend.", ["G-10"], "Identity, reference and skills verification checks."),
  blocked("developer-profiles", "Developer profiles", "talent", UserCog, r("recruitment_manager", "verification_officer", "developer"), "DeveloperProfileController and its experience, certification, reference, portfolio and assessment controllers do not exist; there are no developer profile tables.", ["G-10", "G-02"], "Profiles, portfolios, experience, certifications and assessments."),
  blocked("memberships", "Memberships", "talent", BadgeCheck, r("finance_officer", "developer"), "MembershipController, MembershipPlanController and MembershipInvoiceController do not exist. Membership activation must follow approval and verified payment, so it cannot be offered.", ["G-10"], "Membership plans, invoices and activation after verified payment."),
  blocked("developer-skills", "Skills catalogue", "talent", Sparkles, r("content_manager"), "SkillController does not exist in the backend.", ["G-10"], "Skills used on developer profiles and jobs."),
  { key: "jobs", title: "Jobs", singular: "Job", group: "talent", icon: Briefcase, controller: "JobController", path: "/jobs", status: "partial", gaps: ["G-04", "G-06", "G-03"],
    description: "Job marketplace. Publishing and closing require recruitment authority.", roles: "authenticated", primary: "title",
    columns: [{ key: "reference", label: "Ref", format: "mono" }, { key: "title", label: "Title" }, { key: "category", label: "Category" }, { key: "experience_level", label: "Level", format: "status" }, { key: "budget_max", label: "Budget (max)", format: "money" }, { key: "status", label: "Status", format: "status" }],
    create: r("recruitment_manager", "project_manager"), edit: r("recruitment_manager", "project_manager"), remove: A, formExclude: [STATUS],
    children: [{ module: "job-proposals", label: "Proposals" }, { module: "job-invitations", label: "Invitations" }, { module: "job-shortlists", label: "Shortlist" }],
    actions: [
      { key: "publish", label: "Publish", method: "PATCH", suffix: "/publish", roles: r("recruitment_manager"), confirm: "Publish this job so eligible developers can see it?", tone: "brand", whenStatus: ["draft", "pending_approval", "approved"] },
      { key: "close", label: "Close", method: "PATCH", suffix: "/close", roles: r("recruitment_manager"), confirm: "Close this job? No further proposals will be accepted.", tone: "destructive" },
    ] },
  { key: "job-proposals", title: "Proposals", singular: "Proposal", group: "talent", icon: FileText, controller: "ProposalController", path: "/jobs/:parent/proposals", status: "partial", gaps: ["G-04", "G-06"], parentModule: "jobs",
    description: "Developer proposals for a job.", roles: "authenticated", primary: "developer",
    columns: [{ key: "developer", label: "Developer" }, { key: "proposed_compensation", label: "Compensation", format: "money" }, { key: "timeline", label: "Timeline" }, { key: "status", label: "Status", format: "status" }, { key: "submitted_at", label: "Submitted", format: "date" }],
    create: ["developer", ...A], edit: ["developer", ...A], remove: A, formExclude: [STATUS],
    actions: [
      { key: "withdraw", label: "Withdraw", method: "POST", suffix: "/withdraw", roles: ["developer", ...A], confirm: "Withdraw this proposal? This cannot be undone.", tone: "destructive", whenStatus: ["draft", "submitted", "under_review"] },
    ] },
  { key: "job-invitations", title: "Invitations", singular: "Invitation", group: "talent", icon: Send, controller: "JobInvitationController", path: "/jobs/:parent/invitations", status: "partial", gaps: ["G-04", "G-24"], parentModule: "jobs",
    description: "Direct invitations to developers.", roles: "authenticated", primary: "developer",
    columns: [{ key: "developer", label: "Developer" }, { key: "inviter", label: "Invited by" }, { key: "status", label: "Status", format: "status" }, { key: "responded_at", label: "Responded", format: "date" }],
    create: r("recruitment_manager", "project_manager"), edit: false, remove: r("recruitment_manager"), formExclude: [STATUS, "responded_at"],
    actions: [
      { key: "respond", label: "Respond", method: "PATCH", suffix: "/respond", roles: ["developer", ...A], confirm: "Send your response to this invitation.", whenStatus: ["pending"], fields: [{ name: "status", label: "Response", type: "select", required: true, options: ["accepted", "declined"] }] },
    ] },
  { key: "job-shortlists", title: "Shortlist", singular: "Shortlist entry", group: "talent", icon: ListChecks, controller: "DeveloperShortlistController", path: "/jobs/:parent/shortlists", status: "partial", gaps: ["G-04"], parentModule: "jobs",
    description: "Shortlisted developers for a job.", roles: r("recruitment_manager", "project_manager"), primary: "developer",
    columns: [{ key: "developer", label: "Developer" }, { key: "shortlister", label: "Shortlisted by" }, { key: "status", label: "Status", format: "status" }, { key: "notes", label: "Notes" }],
    create: r("recruitment_manager", "project_manager"), edit: r("recruitment_manager", "project_manager"), remove: r("recruitment_manager") },
  { key: "job-categories", title: "Job categories", singular: "Job category", group: "talent", icon: Tags, controller: "JobCategoryController", path: "/job-categories", status: "partial", gaps: ["G-04"],
    description: "Categories for the job marketplace.", roles: A, primary: "name",
    columns: [{ key: "name", label: "Name" }, { key: "slug", label: "Slug", format: "mono" }, { key: "order", label: "Order" }, { key: "status", label: "Status", format: "status" }], create: A, edit: A, remove: A },
  blocked("contracts", "Contracts", "talent", ScrollText, r("project_manager", "finance_officer", "customer", "developer"), "No contract endpoints exist in the backend (permissions are seeded but no routes or controllers).", ["G-18"], "Engagement contracts, signatures and amendments."),

  // ───────────── Delivery
  { key: "projects", title: "Projects", singular: "Project", group: "delivery", icon: FolderKanban, controller: "ProjectController", path: "/projects", status: "partial", gaps: ["G-04", "G-06", "G-13"],
    description: "Client projects with teams, tasks, milestones and deliverables.", roles: r("project_manager", "technical_lead", "qa_officer"), primary: "name",
    columns: [{ key: "name", label: "Project" }, { key: "client", label: "Client" }, { key: "project_manager", label: "PM" }, { key: "priority", label: "Priority", format: "status" }, { key: "progress_percentage", label: "Progress %" }, { key: "status", label: "Status", format: "status" }, { key: "end_date", label: "Due", format: "date" }],
    create: r("project_manager"), edit: r("project_manager"), remove: A, formExclude: [STATUS],
    children: [{ module: "project-tasks", label: "Tasks" }, { module: "project-milestones", label: "Milestones" }, { module: "project-deliverables", label: "Deliverables" }, { module: "project-teams", label: "Team" }, { module: "project-time", label: "Time" }],
    actions: [
      { key: "activate", label: "Activate", method: "PATCH", suffix: "/activate", roles: r("project_manager"), confirm: "Activate this project and start delivery?", tone: "brand", whenStatus: ["planning", "on_hold"] },
      { key: "complete", label: "Complete", method: "PATCH", suffix: "/complete", roles: r("project_manager"), confirm: "Mark this project as completed?", whenStatus: ["active"] },
    ] },
  { key: "project-tasks", title: "Tasks", singular: "Task", group: "delivery", icon: ListChecks, controller: "TaskController", path: "/projects/:parent/tasks", status: "partial", gaps: ["G-04", "G-06"], parentModule: "projects",
    description: "Project tasks.", roles: r("project_manager", "technical_lead"), primary: "title",
    columns: [{ key: "title", label: "Task" }, { key: "assignee", label: "Assignee" }, { key: "priority", label: "Priority", format: "status" }, { key: "status", label: "Status", format: "status" }, { key: "due_date", label: "Due", format: "date" }, { key: "total_hours", label: "Hours" }],
    create: r("project_manager", "technical_lead"), edit: r("project_manager", "technical_lead"), remove: r("project_manager") },
  { key: "project-milestones", title: "Milestones", singular: "Milestone", group: "delivery", icon: Gauge, controller: "MilestoneController", path: "/projects/:parent/milestones", status: "partial", gaps: ["G-04"], parentModule: "projects",
    description: "Delivery milestones.", roles: r("project_manager"), primary: "title",
    columns: [{ key: "title", label: "Milestone" }, { key: "due_date", label: "Due", format: "date" }, { key: "budget_allocated", label: "Budget", format: "money" }, { key: "status", label: "Status", format: "status" }],
    create: r("project_manager"), edit: r("project_manager"), remove: r("project_manager"), formExclude: [STATUS],
    actions: [{ key: "complete", label: "Complete", method: "PATCH", suffix: "/complete", roles: r("project_manager"), confirm: "Mark this milestone as completed?", tone: "brand", whenStatus: ["pending", "in_progress", "delayed"] }] },
  { key: "project-deliverables", title: "Deliverables", singular: "Deliverable", group: "delivery", icon: FileCheck2, controller: "DeliverableController", path: "/projects/:parent/deliverables", status: "partial", gaps: ["G-04", "G-06"], parentModule: "projects",
    description: "Submitted work awaiting QA and technical review.", roles: r("project_manager", "qa_officer", "technical_lead"), primary: "title",
    columns: [{ key: "title", label: "Deliverable" }, { key: "submitter", label: "Submitted by" }, { key: "version", label: "v" }, { key: "status", label: "Status", format: "status" }, { key: "submitted_at", label: "Submitted", format: "date" }],
    create: r("project_manager"), edit: r("project_manager"), remove: r("project_manager"), formExclude: [STATUS, "reviewed_by", "reviewed_at", "approved_at", "review_notes", "rejection_reason"],
    actions: [{ key: "review", label: "Review", method: "PATCH", suffix: "/review", roles: r("project_manager", "qa_officer", "technical_lead"), confirm: "Record your review decision for this deliverable.", tone: "brand", whenStatus: ["submitted", "under_review"],
      fields: [{ name: "status", label: "Decision", type: "select", required: true, options: ["approved", "rejected", "revision_requested"] }, { name: "review_notes", label: "Review notes", type: "textarea" }] }] },
  { key: "project-teams", title: "Team", singular: "Team member", group: "delivery", icon: Users, controller: "ProjectTeamController", path: "/projects/:parent/teams", status: "partial", gaps: ["G-04"], parentModule: "projects",
    description: "People assigned to the project.", roles: r("project_manager"), primary: "name",
    columns: [{ key: "name", label: "Name" }, { key: "email", label: "Email" }, { key: "role", label: "Role", format: "status" }, { key: "is_lead", label: "Lead", format: "bool" }, { key: "joined_at", label: "Joined", format: "date" }],
    create: r("project_manager"), edit: r("project_manager"), remove: r("project_manager") },
  { key: "project-time", title: "Time entries", singular: "Time entry", group: "delivery", icon: Timer, controller: "TimeEntryController", path: "/projects/:parent/time-entries", status: "partial", gaps: ["G-04", "G-06"], parentModule: "projects",
    description: "Logged hours.", roles: r("project_manager"), primary: "description",
    columns: [{ key: "date", label: "Date", format: "date" }, { key: "user", label: "Person" }, { key: "task_title", label: "Task" }, { key: "hours", label: "Hours" }, { key: "billable", label: "Billable", format: "bool" }, { key: "total_amount", label: "Amount", format: "money" }],
    create: r("project_manager"), edit: r("project_manager"), remove: r("project_manager") },

  // ───────────── Commerce
  { key: "orders", title: "Orders", singular: "Order", group: "commerce", icon: ShoppingCart, controller: "OrderController", path: "/orders", status: "partial", gaps: ["G-04", "G-06", "G-16", "G-20"],
    description: "Shop and manual orders. Fulfilment moves through confirm → ship → deliver.", roles: r("shop_manager", "sales_officer", "finance_officer", "customer"), primary: "order_number",
    columns: [{ key: "order_number", label: "Order", format: "mono" }, { key: "customer", label: "Customer" }, { key: "total", label: "Total", format: "money" }, { key: "payment_status", label: "Payment", format: "status" }, { key: "status", label: "Status", format: "status" }, { key: "created_at", label: "Placed", format: "date" }],
    create: r("shop_manager", "sales_officer"), edit: r("shop_manager", "sales_officer"), remove: A, formExclude: [STATUS, "payment_status", "fulfillment_status"],
    children: [{ module: "order-items", label: "Items" }],
    actions: [
      { key: "confirm", label: "Confirm", method: "PATCH", suffix: "/confirm", roles: r("shop_manager", "sales_officer"), confirm: "Confirm this order?", tone: "brand", whenStatus: ["pending"] },
      { key: "ship", label: "Mark shipped", method: "PATCH", suffix: "/ship", roles: r("shop_manager", "sales_officer"), confirm: "Mark this order as shipped?", whenStatus: ["confirmed", "processing"] },
      { key: "deliver", label: "Mark delivered", method: "PATCH", suffix: "/deliver", roles: r("shop_manager", "sales_officer"), confirm: "Mark this order as delivered?", whenStatus: ["shipped"] },
      { key: "cancel", label: "Cancel order", method: "PATCH", suffix: "/cancel", roles: "authenticated", confirm: "Cancel this order? This cannot be undone.", tone: "destructive", whenStatus: ["pending", "confirmed"] },
    ] },
  { key: "order-items", title: "Order items", singular: "Order item", group: "commerce", icon: Package, controller: "OrderItemController", path: "/orders/:parent/items", status: "partial", gaps: ["G-04"], parentModule: "orders",
    description: "Line items on an order.", roles: "authenticated", primary: "product_name",
    columns: [{ key: "product_name", label: "Item" }, { key: "sku", label: "SKU", format: "mono" }, { key: "quantity", label: "Qty" }, { key: "unit_price", label: "Unit", format: "money" }, { key: "total_price", label: "Total", format: "money" }, { key: "status", label: "Status", format: "status" }],
    create: r("shop_manager", "sales_officer"), edit: r("shop_manager", "sales_officer"), remove: r("shop_manager") },
  { key: "inventory", title: "Inventory", singular: "Inventory item", group: "commerce", icon: Boxes, controller: "InventoryController", path: "/inventory", status: "partial", gaps: ["G-04", "G-06"],
    description: "Stock on hand. Quantities change only through recorded stock adjustments.", roles: r("shop_manager"), primary: "name",
    columns: [{ key: "sku", label: "SKU", format: "mono" }, { key: "name", label: "Item" }, { key: "quantity_on_hand", label: "On hand" }, { key: "quantity_available", label: "Available" }, { key: "reorder_level", label: "Reorder at" }, { key: "status", label: "Status", format: "status" }],
    create: r("shop_manager"), edit: r("shop_manager"), remove: A, formExclude: ["quantity_on_hand", "quantity_reserved", "quantity_available"],
    children: [{ module: "stock-movements", label: "Stock movements" }],
    actions: [{ key: "adjust", label: "Adjust stock", method: "PATCH", suffix: "/adjust-stock", roles: r("shop_manager"), confirm: "Record a stock movement. The reason is kept in the audit trail.", tone: "brand",
      fields: [{ name: "movement_type", label: "Movement type", type: "select", required: true, options: ["in", "out", "adjustment", "return", "damaged", "expired"] }, { name: "quantity", label: "Quantity", type: "number", required: true }, { name: "reason", label: "Reason", type: "text", required: true }, { name: "notes", label: "Notes", type: "textarea" }] }] },
  { key: "stock-movements", title: "Stock movements", singular: "Stock movement", group: "commerce", icon: Activity, controller: "StockMovementController", path: "/inventory/:parent/stock-movements", status: "partial", gaps: ["G-04", "G-24"], parentModule: "inventory", listOnly: true,
    description: "Audit trail of stock changes.", roles: r("shop_manager"), primary: "reason",
    columns: [{ key: "movement_type", label: "Type", format: "status" }, { key: "quantity", label: "Qty" }, { key: "previous_quantity", label: "Before" }, { key: "new_quantity", label: "After" }, { key: "reason", label: "Reason" }, { key: "created_at", label: "When", format: "datetime" }],
    create: false, edit: false, remove: false },
  blocked("suppliers", "Suppliers & purchase orders", "commerce", PackageSearch, r("shop_manager"), "No supplier or purchase-order endpoints exist in the backend.", ["G-19"], "Supplier records and purchase orders."),

  // ───────────── Finance
  { key: "invoices", title: "Invoices", singular: "Invoice", group: "finance", icon: Receipt, controller: "InvoiceController", path: "/invoices", status: "partial", gaps: ["G-04", "G-06"],
    description: "Customer invoices. Sending and marking paid are authorised finance actions.", roles: r("finance_officer", "shop_manager", "sales_officer", "customer", "developer"), primary: "invoice_number",
    columns: [{ key: "invoice_number", label: "Invoice", format: "mono" }, { key: "customer", label: "Customer" }, { key: "total", label: "Total", format: "money" }, { key: "due_date", label: "Due", format: "date" }, { key: "status", label: "Status", format: "status" }],
    create: r("finance_officer", "shop_manager", "sales_officer"), edit: r("finance_officer"), remove: A, formExclude: [STATUS, "paid_at", "payment_reference"],
    children: [{ module: "invoice-items", label: "Items" }],
    actions: [
      { key: "send", label: "Send", method: "PATCH", suffix: "/send", roles: r("finance_officer", "shop_manager", "sales_officer"), confirm: "Mark this invoice as sent to the customer?", whenStatus: ["draft"] },
      { key: "mark-paid", label: "Record payment", method: "PATCH", suffix: "/mark-paid", roles: r("finance_officer", "shop_manager"), confirm: "Record a verified payment against this invoice. Only do this after the funds are confirmed.", tone: "brand", whenStatus: ["sent", "partial", "overdue"],
        fields: [{ name: "amount", label: "Amount received", type: "number", required: true }, { name: "payment_reference", label: "Payment reference (e.g. M-Pesa code)", type: "text" }] },
    ] },
  { key: "invoice-items", title: "Invoice items", singular: "Invoice item", group: "finance", icon: Receipt, controller: "InvoiceItemController", path: "/invoices/:parent/items", status: "partial", gaps: ["G-04"], parentModule: "invoices",
    description: "Invoice lines.", roles: "authenticated", primary: "description",
    columns: [{ key: "description", label: "Description" }, { key: "quantity", label: "Qty" }, { key: "unit_price", label: "Unit", format: "money" }, { key: "tax_amount", label: "Tax", format: "money" }, { key: "total_price", label: "Total", format: "money" }],
    create: r("finance_officer"), edit: r("finance_officer"), remove: r("finance_officer") },
  { key: "payments", title: "Payments", singular: "Payment", group: "finance", icon: CreditCard, controller: "PaymentController", path: "/payments", status: "partial", gaps: ["G-04", "G-06", "G-16"],
    description: "Recorded payments. Status changes only through verification actions — never by editing.", roles: r("finance_officer", "shop_manager", "customer"), primary: "transaction_reference",
    columns: [{ key: "transaction_reference", label: "Reference", format: "mono" }, { key: "customer", label: "Customer" }, { key: "amount", label: "Amount", format: "money" }, { key: "payment_method", label: "Method", format: "status" }, { key: "status", label: "Status", format: "status" }, { key: "paid_at", label: "Paid", format: "date" }],
    create: r("finance_officer", "shop_manager"), edit: false, remove: false, formExclude: [STATUS, "paid_at", "callback_data"],
    actions: [
      { key: "complete", label: "Verify & complete", method: "PATCH", suffix: "/complete", roles: r("finance_officer", "shop_manager"), confirm: "Confirm the funds were received and mark this payment completed?", tone: "brand", whenStatus: ["pending"] },
      { key: "fail", label: "Mark failed", method: "PATCH", suffix: "/fail", roles: r("finance_officer", "shop_manager"), confirm: "Mark this payment as failed?", tone: "destructive", whenStatus: ["pending"] },
      { key: "refund", label: "Refund", method: "PATCH", suffix: "/refund", roles: r("finance_officer"), confirm: "Record a refund for this payment?", tone: "destructive", whenStatus: ["completed"] },
    ] },
  { key: "payouts", title: "Developer payouts", singular: "Payout", group: "finance", icon: HandCoins, controller: "PayoutController", path: "/payouts", status: "partial", gaps: ["G-04", "G-06"],
    description: "Developer earnings payouts: approve, then pay.", roles: r("finance_officer", "developer"), primary: "transaction_reference",
    columns: [{ key: "developer", label: "Developer" }, { key: "amount", label: "Amount", format: "money" }, { key: "payment_method", label: "Method", format: "status" }, { key: "period_end", label: "Period end", format: "date" }, { key: "status", label: "Status", format: "status" }],
    create: r("finance_officer"), edit: false, remove: false, formExclude: [STATUS, "paid_at", "approved_at", "approver_id"],
    actions: [
      { key: "approve", label: "Approve", method: "PATCH", suffix: "/approve", roles: r("finance_officer"), confirm: "Approve this payout?", tone: "brand", whenStatus: ["pending"] },
      { key: "pay", label: "Mark paid", method: "PATCH", suffix: "/pay", roles: r("finance_officer"), confirm: "Confirm this payout has been sent to the developer?", whenStatus: ["approved"] },
    ] },
  { key: "expenses", title: "Expenses", singular: "Expense", group: "finance", icon: Wallet, controller: "ExpenseController", path: "/expenses", status: "partial", gaps: ["G-04", "G-06"],
    description: "Submitted expenses with approval and payment.", roles: r("finance_officer", "shop_manager"), primary: "title",
    columns: [{ key: "title", label: "Expense" }, { key: "category", label: "Category" }, { key: "amount", label: "Amount", format: "money" }, { key: "expense_date", label: "Date", format: "date" }, { key: "status", label: "Status", format: "status" }],
    create: r("finance_officer", "shop_manager"), edit: r("finance_officer"), remove: A, formExclude: [STATUS, "approved_at", "paid_at", "payment_reference"],
    actions: [
      { key: "approve", label: "Approve", method: "PATCH", suffix: "/approve", roles: r("finance_officer", "shop_manager"), confirm: "Approve this expense?", tone: "brand", whenStatus: ["pending"] },
      { key: "reject", label: "Reject", method: "PATCH", suffix: "/reject", roles: r("finance_officer", "shop_manager"), confirm: "Reject this expense?", tone: "destructive", whenStatus: ["pending"] },
      { key: "pay", label: "Mark paid", method: "PATCH", suffix: "/pay", roles: r("finance_officer"), confirm: "Record that this expense has been paid.", whenStatus: ["approved"], fields: [{ name: "payment_reference", label: "Payment reference", type: "text" }] },
    ] },
  { key: "expense-categories", title: "Expense categories", singular: "Expense category", group: "finance", icon: Tags, controller: "ExpenseCategoryController", path: "/expense-categories", status: "partial", gaps: ["G-04"],
    description: "Expense classification.", roles: r("finance_officer"), primary: "name",
    columns: [{ key: "name", label: "Name" }, { key: "expenses_count", label: "Expenses" }, { key: "status", label: "Status", format: "status" }], create: r("finance_officer"), edit: r("finance_officer"), remove: A },
  { key: "financial-reports", title: "Financial reports", singular: "Financial report", group: "finance", icon: FileBarChart, controller: "FinancialReportController", path: "/financial-reports", status: "partial", gaps: ["G-04", "G-06", "G-24"],
    description: "Generated period reports.", roles: r("finance_officer"), primary: "report_period",
    columns: [{ key: "report_type", label: "Type", format: "status" }, { key: "report_period", label: "Period" }, { key: "period_start", label: "From", format: "date" }, { key: "period_end", label: "To", format: "date" }, { key: "generated_at", label: "Generated", format: "date" }],
    create: r("finance_officer"), edit: false, remove: A },

  // ───────────── Marketing
  { key: "campaigns", title: "Campaigns", singular: "Campaign", group: "marketing", icon: Megaphone, controller: "MarketingCampaignController", path: "/marketing-campaigns", status: "partial", gaps: ["G-04", "G-06"],
    description: "Marketing campaigns across channels.", roles: r("marketing_manager"), primary: "name",
    columns: [{ key: "name", label: "Campaign" }, { key: "type", label: "Type", format: "status" }, { key: "start_date", label: "Start", format: "date" }, { key: "end_date", label: "End", format: "date" }, { key: "budget", label: "Budget", format: "money" }, { key: "status", label: "Status", format: "status" }],
    create: r("marketing_manager"), edit: r("marketing_manager"), remove: A, formExclude: [STATUS],
    actions: [
      { key: "activate", label: "Activate", method: "PATCH", suffix: "/activate", roles: r("marketing_manager"), confirm: "Activate this campaign?", tone: "brand", whenStatus: ["draft", "paused"] },
      { key: "pause", label: "Pause", method: "PATCH", suffix: "/pause", roles: r("marketing_manager"), confirm: "Pause this campaign?", whenStatus: ["active"] },
    ] },
  { key: "social-posts", title: "Social posts", singular: "Social post", group: "marketing", icon: Share2, controller: "SocialPostController", path: "/social-posts", status: "partial", gaps: ["G-04", "G-06", "G-19"],
    description: "Scheduled and published social content. Publishing records status only — no social accounts are connected.", roles: r("marketing_manager"), primary: "content",
    columns: [{ key: "platform", label: "Platform", format: "status" }, { key: "content", label: "Content" }, { key: "scheduled_at", label: "Scheduled", format: "datetime" }, { key: "total_engagement", label: "Engagement" }, { key: "status", label: "Status", format: "status" }],
    create: r("marketing_manager"), edit: r("marketing_manager"), remove: A, formExclude: [STATUS, "published_at"],
    actions: [{ key: "publish", label: "Mark published", method: "PATCH", suffix: "/publish", roles: r("marketing_manager"), confirm: "Mark this post as published?", tone: "brand", whenStatus: ["draft", "scheduled"] }] },
  { key: "blog-posts", title: "Blog posts", singular: "Blog post", group: "marketing", icon: Newspaper, controller: "BlogPostController", path: "/blog-posts", status: "partial", gaps: ["G-04", "G-06"],
    description: "Long-form blog content.", roles: r("marketing_manager", "content_manager"), primary: "title",
    columns: [{ key: "title", label: "Title" }, { key: "author", label: "Author" }, { key: "category", label: "Category" }, { key: "views_count", label: "Views" }, { key: "status", label: "Status", format: "status" }, { key: "published_at", label: "Published", format: "date" }],
    create: r("marketing_manager", "content_manager"), edit: r("marketing_manager", "content_manager"), remove: A, formExclude: [STATUS, "published_at", "views_count"],
    actions: [{ key: "publish", label: "Publish", method: "PATCH", suffix: "/publish", roles: r("marketing_manager", "content_manager"), confirm: "Publish this post?", tone: "brand", whenStatus: ["draft"] }] },
  { key: "newsletters", title: "Newsletters", singular: "Newsletter", group: "marketing", icon: Mail, controller: "NewsletterController", path: "/newsletters", status: "partial", gaps: ["G-04", "G-06"],
    description: "Email newsletters.", roles: r("marketing_manager"), primary: "subject",
    columns: [{ key: "name", label: "Name" }, { key: "subject", label: "Subject" }, { key: "scheduled_at", label: "Scheduled", format: "datetime" }, { key: "open_rate", label: "Open rate" }, { key: "status", label: "Status", format: "status" }],
    create: r("marketing_manager"), edit: r("marketing_manager"), remove: A, formExclude: [STATUS, "sent_at", "recipients_count", "open_count", "click_count", "unsubscribe_count", "bounce_count"],
    actions: [
      { key: "schedule", label: "Schedule", method: "PATCH", suffix: "/schedule", roles: r("marketing_manager"), confirm: "Choose when this newsletter should go out.", whenStatus: ["draft"], fields: [{ name: "scheduled_at", label: "Send at", type: "datetime", required: true }] },
      { key: "send", label: "Send now", method: "PATCH", suffix: "/send", roles: r("marketing_manager"), confirm: "Send this newsletter to all active subscribers now?", tone: "brand", whenStatus: ["draft", "scheduled"] },
    ] },
  { key: "subscribers", title: "Subscribers", singular: "Subscriber", group: "marketing", icon: Users, controller: "NewsletterSubscriberController", path: "/newsletter-subscribers", status: "partial", gaps: ["G-04", "G-06"],
    description: "Newsletter audience.", roles: r("marketing_manager"), primary: "email",
    columns: [{ key: "email", label: "Email" }, { key: "name", label: "Name" }, { key: "source", label: "Source" }, { key: "subscribed_at", label: "Subscribed", format: "date" }, { key: "status", label: "Status", format: "status" }],
    create: r("marketing_manager"), edit: r("marketing_manager"), remove: A, formExclude: [STATUS, "unsubscribed_at"],
    actions: [
      { key: "unsubscribe", label: "Unsubscribe", method: "PATCH", suffix: "/unsubscribe", roles: r("marketing_manager"), confirm: "Unsubscribe this address?", tone: "destructive", whenStatus: ["active"] },
      { key: "resubscribe", label: "Resubscribe", method: "PATCH", suffix: "/resubscribe", roles: r("marketing_manager"), confirm: "Resubscribe this address? Only do this with the person's consent.", whenStatus: ["unsubscribed"] },
    ] },
  { key: "seo-contents", title: "SEO content", singular: "SEO entry", group: "marketing", icon: Search, controller: "SeoContentController", path: "/seo-contents", status: "partial", gaps: ["G-04", "G-06"],
    description: "Metadata, keywords and canonical URLs per page.", roles: r("marketing_manager", "content_manager"), primary: "page_title",
    columns: [{ key: "page_url", label: "URL", format: "mono" }, { key: "page_type", label: "Type", format: "status" }, { key: "focus_keyword", label: "Keyword" }, { key: "content_score", label: "Score" }, { key: "status", label: "Status", format: "status" }],
    create: r("marketing_manager", "content_manager"), edit: r("marketing_manager", "content_manager"), remove: A, formExclude: [STATUS, "published_at"],
    actions: [{ key: "publish", label: "Publish", method: "PATCH", suffix: "/publish", roles: r("marketing_manager", "content_manager"), confirm: "Publish this SEO entry?", tone: "brand", whenStatus: ["draft"] }] },
  { key: "seo-audits", title: "SEO audits", singular: "SEO audit", group: "marketing", icon: ClipboardCheck, controller: "SeoAuditController", path: "/seo-audits", status: "partial", gaps: ["G-04", "G-06", "G-24"],
    description: "Recorded page audits and scores.", roles: r("marketing_manager", "content_manager"), primary: "page_url",
    columns: [{ key: "page_url", label: "URL", format: "mono" }, { key: "audit_date", label: "Date", format: "date" }, { key: "score", label: "Score" }, { key: "load_time", label: "Load (s)" }],
    create: r("marketing_manager", "content_manager"), edit: false, remove: A },
  { key: "analytics-events", title: "Analytics events", singular: "Event", group: "marketing", icon: BarChart3, controller: "AnalyticsController", path: "/analytics-events", status: "partial", gaps: ["G-04", "G-06", "G-24"],
    description: "Tracked site events.", roles: r("marketing_manager"), primary: "event_name", listOnly: true,
    columns: [{ key: "event_name", label: "Event", format: "mono" }, { key: "event_category", label: "Category" }, { key: "page_url", label: "Page" }, { key: "device_type", label: "Device" }, { key: "occurred_at", label: "When", format: "datetime" }],
    create: false, edit: false, remove: A },
  blocked("content-calendar", "Content calendar", "marketing", CalendarClock, r("marketing_manager", "content_manager"), "No content-calendar endpoint exists. Scheduled social posts and newsletters are available in their own modules.", ["G-19"], "Unified editorial calendar."),
  blocked("google", "Google integrations", "marketing", Globe2, r("marketing_manager"), "No Google Analytics, Search Console or Business Profile integration endpoints exist (decision D-19 open).", ["G-19"], "Google Analytics, Search Console and Business Profile."),
  blocked("locations", "Service areas", "marketing", Navigation, r("marketing_manager", "content_manager"), "No geographic service-page or location endpoints exist (decision D-22 open).", ["G-19"], "Geographic service pages for local SEO."),

  // ───────────── Website & catalogue (CMS)
  ...cms("cms-pages", "Pages", "Page", FileText, "PageController", "/cms/pages", "title", [{ key: "title", label: "Title" }, { key: "slug", label: "Slug", format: "mono" }, { key: "status", label: "Status", format: "status" }, { key: "published_at", label: "Published", format: "date" }]),
  ...cms("cms-navigation", "Navigation", "Menu item", Navigation, "NavigationController", "/cms/navigations", "title", [{ key: "title", label: "Title" }, { key: "url", label: "URL", format: "mono" }, { key: "order", label: "Order" }, { key: "status", label: "Status", format: "status" }]),
  { key: "cms-media", title: "Media library", singular: "Media file", group: "content", icon: ImageIcon, controller: "MediaController", path: "/cms/media", status: "partial", gaps: ["G-04", "G-06", "G-24"],
    description: "Uploaded images and documents (max 10 MB).", roles: r("content_manager"), primary: "original_name",
    columns: [{ key: "original_name", label: "File" }, { key: "mime_type", label: "Type", format: "mono" }, { key: "size", label: "Bytes" }, { key: "alt", label: "Alt text" }, { key: "created_at", label: "Uploaded", format: "date" }],
    create: r("content_manager"), edit: false, remove: A },
  ...cms("cms-divisions", "Divisions", "Division", Layers, "DivisionController", "/cms/divisions", "name", [{ key: "name", label: "Division" }, { key: "slug", label: "Slug", format: "mono" }, { key: "order", label: "Order" }, { key: "status", label: "Status", format: "status" }]),
  ...cms("cms-services", "Services", "Service", Wrench, "ServiceController", "/cms/services", "name", [{ key: "name", label: "Service" }, { key: "division", label: "Division" }, { key: "featured", label: "Featured", format: "bool" }, { key: "status", label: "Status", format: "status" }]),
  ...cms("cms-solutions", "Solutions", "Solution", Workflow, "SolutionController", "/cms/solutions", "name", [{ key: "name", label: "Solution" }, { key: "featured", label: "Featured", format: "bool" }, { key: "status", label: "Status", format: "status" }]),
  ...cms("cms-packages", "Packages", "Package", Package, "PackageController", "/cms/packages", "name", [{ key: "name", label: "Package" }, { key: "solution", label: "Solution" }, { key: "price", label: "Price", format: "money" }, { key: "status", label: "Status", format: "status" }]),
  ...cms("cms-product-categories", "Product categories", "Product category", Tags, "ProductCategoryController", "/cms/product-categories", "name", [{ key: "name", label: "Category" }, { key: "slug", label: "Slug", format: "mono" }, { key: "status", label: "Status", format: "status" }]),
  ...cms("cms-products", "Products", "Product", Package, "ProductController", "/cms/products", "name", [{ key: "name", label: "Product" }, { key: "sku", label: "SKU", format: "mono" }, { key: "category", label: "Category" }, { key: "price", label: "Price", format: "money" }, { key: "stock", label: "Stock" }, { key: "status", label: "Status", format: "status" }], ["shop_manager"]),
  ...cms("cms-portfolios", "Portfolio", "Portfolio project", LayoutGrid, "PortfolioController", "/cms/portfolios", "title", [{ key: "title", label: "Project" }, { key: "client_name", label: "Client" }, { key: "featured", label: "Featured", format: "bool" }, { key: "status", label: "Status", format: "status" }]),
  ...cms("cms-case-studies", "Case studies", "Case study", BookOpen, "CaseStudyController", "/cms/case-studies", "title", [{ key: "title", label: "Title" }, { key: "client_name", label: "Client" }, { key: "featured", label: "Featured", format: "bool" }, { key: "status", label: "Status", format: "status" }]),
  ...cms("cms-articles", "Articles", "Article", Newspaper, "ArticleController", "/cms/articles", "title", [{ key: "title", label: "Title" }, { key: "category", label: "Category" }, { key: "author", label: "Author" }, { key: "status", label: "Status", format: "status" }, { key: "published_at", label: "Published", format: "date" }]),
  blocked("cms-insights", "Insights", "content", Sparkles, r("content_manager"), "InsightController exists but is not imported in routes/api.php, so every /insights route fails.", ["G-14"], "Short-form insights."),
  ...cms("cms-faqs", "FAQs", "FAQ", MessageSquareQuote, "FaqController", "/cms/faqs", "question", [{ key: "question", label: "Question" }, { key: "category", label: "Category" }, { key: "order", label: "Order" }, { key: "status", label: "Status", format: "status" }]),
  ...cms("cms-testimonials", "Testimonials", "Testimonial", HeartHandshake, "TestimonialController", "/cms/testimonials", "name", [{ key: "name", label: "Name" }, { key: "company", label: "Company" }, { key: "rating", label: "Rating" }, { key: "status", label: "Status", format: "status" }]),
  { key: "content-approvals", title: "Content approvals", singular: "Approval", group: "content", icon: FileCheck2, controller: "ContentApprovalController", path: "/cms/content-approvals", status: "partial", gaps: ["G-04", "G-06", "G-24"],
    description: "Approval records for publishable content.", roles: r("content_manager"), primary: "approvable_type",
    columns: [{ key: "approvable_type", label: "Content type", format: "mono" }, { key: "approvable_id", label: "ID" }, { key: "status", label: "Status", format: "status" }, { key: "approved_at", label: "Decided", format: "date" }],
    create: r("content_manager"), edit: r("content_manager"), remove: false },

  // ───────────── Support
  { key: "support-tickets", title: "Support tickets", singular: "Ticket", group: "support", icon: LifeBuoy, controller: "SupportTicketController", path: "/support-tickets", status: "partial", gaps: ["G-04", "G-06"],
    description: "Customer support requests with SLA tracking.", roles: "authenticated", primary: "subject",
    columns: [{ key: "ticket_number", label: "Ticket", format: "mono" }, { key: "subject", label: "Subject" }, { key: "priority", label: "Priority", format: "status" }, { key: "assigned_staff", label: "Assignee" }, { key: "status", label: "Status", format: "status" }, { key: "created_at", label: "Opened", format: "date" }],
    create: "authenticated", edit: r("support_officer"), remove: A, formExclude: [STATUS, "assigned_to", "resolved_at", "closed_at", "sla_due_at", "first_response_at", "resolution", "customer_id", "organization_id"],
    children: [{ module: "ticket-messages", label: "Conversation" }],
    actions: [
      { key: "assign", label: "Assign", method: "PATCH", suffix: "/assign", roles: r("support_officer"), confirm: "Assign this ticket to a staff member (user ID).", fields: [{ name: "assigned_to", label: "Staff user ID", type: "number", required: true }] },
      { key: "resolve", label: "Resolve", method: "PATCH", suffix: "/resolve", roles: r("support_officer"), confirm: "Resolve this ticket. Describe the resolution for the customer.", tone: "brand", whenStatus: ["open", "in_progress", "waiting_customer", "reopened"], fields: [{ name: "resolution", label: "Resolution", type: "textarea", required: true }] },
      { key: "close", label: "Close", method: "PATCH", suffix: "/close", roles: r("support_officer"), confirm: "Close this ticket?", whenStatus: ["resolved"] },
    ] },
  { key: "ticket-messages", title: "Messages", singular: "Message", group: "support", icon: Mail, controller: "SupportMessageController", path: "/support-tickets/:parent/messages", status: "partial", gaps: ["G-04"], parentModule: "support-tickets",
    description: "Ticket conversation.", roles: "authenticated", primary: "message",
    columns: [{ key: "sender", label: "From" }, { key: "message", label: "Message" }, { key: "is_internal", label: "Internal", format: "bool" }, { key: "created_at", label: "Sent", format: "datetime" }],
    create: "authenticated", edit: false, remove: A, formExclude: ["ticket_id", "sender_id", "sender_type"] },
  { key: "kb-articles", title: "Knowledge base", singular: "Article", group: "support", icon: BookOpen, controller: "KnowledgeBaseArticleController", path: "/knowledge-base-articles", status: "partial", gaps: ["G-04", "G-06"],
    description: "Help articles for customers and staff.", roles: "authenticated", primary: "title",
    columns: [{ key: "title", label: "Article" }, { key: "category", label: "Category" }, { key: "views_count", label: "Views" }, { key: "helpful_count", label: "Helpful" }, { key: "status", label: "Status", format: "status" }],
    create: r("support_officer", "content_manager"), edit: r("support_officer", "content_manager"), remove: A, formExclude: ["views_count", "helpful_count", "not_helpful_count"],
    actions: [
      { key: "helpful", label: "This helped", method: "PATCH", suffix: "/helpful", roles: "authenticated", confirm: "Was this article helpful?", fields: [{ name: "helpful", label: "Helpful", type: "boolean" }] },
    ] },
  { key: "kb-categories", title: "KB categories", singular: "KB category", group: "support", icon: Tags, controller: "KnowledgeBaseCategoryController", path: "/knowledge-base-categories", status: "partial", gaps: ["G-04"],
    description: "Knowledge base structure.", roles: r("support_officer", "content_manager"), primary: "name",
    columns: [{ key: "name", label: "Category" }, { key: "articles_count", label: "Articles" }, { key: "order", label: "Order" }, { key: "status", label: "Status", format: "status" }], create: r("support_officer", "content_manager"), edit: r("support_officer", "content_manager"), remove: A },
  { key: "sla-policies", title: "SLA policies", singular: "SLA policy", group: "support", icon: Timer, controller: "SlaPolicyController", path: "/sla-policies", status: "partial", gaps: ["G-04"],
    description: "Response and resolution targets by priority.", roles: r("support_officer"), primary: "name",
    columns: [{ key: "name", label: "Policy" }, { key: "priority", label: "Priority", format: "status" }, { key: "first_response_hours", label: "Response (h)" }, { key: "resolution_hours", label: "Resolution (h)" }, { key: "is_active", label: "Active", format: "bool" }], create: r("support_officer"), edit: r("support_officer"), remove: A },
  { key: "sla-breaches", title: "SLA breaches", singular: "SLA breach", group: "support", icon: Activity, controller: "SlaBreachController", path: "/sla-breaches", status: "partial", gaps: ["G-04", "G-06"],
    description: "Recorded SLA breaches.", roles: r("support_officer"), primary: "breach_type",
    columns: [{ key: "ticket", label: "Ticket" }, { key: "breach_type", label: "Type", format: "status" }, { key: "breached_at", label: "Breached", format: "datetime" }, { key: "penalty_amount", label: "Penalty", format: "money" }], create: r("support_officer"), edit: r("support_officer"), remove: A },
  { key: "reports", title: "Reports", singular: "Report", group: "support", icon: FileBarChart, controller: "ReportController", path: "/reports", status: "partial", gaps: ["G-04", "G-06", "G-21"],
    description: "Operational, sales, finance and marketing reports.", roles: r("finance_officer", "marketing_manager"), primary: "name",
    columns: [{ key: "name", label: "Report" }, { key: "type", label: "Type", format: "status" }, { key: "format", label: "Format", format: "mono" }, { key: "generated_at", label: "Generated", format: "date" }],
    create: r("finance_officer", "marketing_manager"), edit: r("finance_officer", "marketing_manager"), remove: A },
  { key: "notification-templates", title: "Notification templates", singular: "Template", group: "support", icon: Bell, controller: "NotificationTemplateController", path: "/notification-templates", status: "partial", gaps: ["G-04"],
    description: "Email and SMS templates.", roles: A, primary: "name",
    columns: [{ key: "name", label: "Template" }, { key: "type", label: "Type" }, { key: "channel", label: "Channel", format: "status" }, { key: "is_active", label: "Active", format: "bool" }], create: A, edit: A, remove: A },

  // ───────────── Administration
  blocked("users", "Users", "admin", Users, A, "UserController does not exist, so listing users, changing roles/status and profile updates are unavailable.", ["G-09", "G-02"], "User accounts, roles and account status."),
  { key: "roles", title: "Roles & permissions", singular: "Role", group: "admin", icon: KeyRound, controller: "RoleController", path: "/roles", status: "partial", gaps: ["G-04"],
    description: "Roles and their permissions (guard: api). System roles cannot be deleted.", roles: A, primary: "name",
    columns: [{ key: "name", label: "Role", format: "mono" }, { key: "guard_name", label: "Guard", format: "mono" }, { key: "permissions", label: "Permissions" }, { key: "created_at", label: "Created", format: "date" }],
    create: A, edit: A, remove: A },
  { key: "dashboard-widgets", title: "Dashboard widgets", singular: "Widget", group: "admin", icon: LayoutGrid, controller: "DashboardWidgetController", path: "/dashboard-widgets", status: "partial", gaps: ["G-04"],
    description: "Saved dashboard widget configurations.", roles: A, primary: "name",
    columns: [{ key: "name", label: "Widget" }, { key: "type", label: "Type", format: "status" }, { key: "width", label: "W" }, { key: "height", label: "H" }, { key: "is_visible", label: "Visible", format: "bool" }], create: A, edit: A, remove: A },
  blocked("audit-logs", "Audit logs", "admin", ScrollText, A, "No audit log endpoint exists in the backend.", ["G-19"], "Who did what, and when."),
  blocked("settings", "System settings", "admin", Settings, ["super_admin"], "No system settings endpoint exists in the backend.", ["G-19"], "Platform-wide configuration."),
  blocked("integrations", "Integrations", "admin", Server, ["super_admin"], "No integrations or webhooks endpoints exist in the backend (payment providers decision D-12 open).", ["G-19"], "M-Pesa, email, SMS and webhook configuration."),
];

function cms(key: string, title: string, singular: string, icon: LucideIcon, controller: string, path: string, primary: string, columns: ColumnDef[], extraRoles: Role[] = []): ModuleDef[] {
  return [{
    key, title, singular, group: "content", icon, controller, path, status: "partial", gaps: ["G-04", "G-06"],
    description: `Manage ${title.toLowerCase()} shown on the public website. Only "published" items appear publicly.`,
    roles: r("content_manager", ...extraRoles), primary, columns, create: r("content_manager", ...extraRoles), edit: r("content_manager", ...extraRoles), remove: A,
  }];
}

export const MODULE_MAP: Record<string, ModuleDef> = Object.fromEntries(MODULES.map((m) => [m.key, m]));

/** Database table (from `exists:table,col`) → module that can list it, for relation pickers. */
export const TABLE_MODULE: Record<string, string> = {
  customers: "customers", lead_sources: "lead-sources", leads: "leads", opportunities: "opportunities", divisions: "cms-divisions",
  product_categories: "cms-product-categories", products: "cms-products", solutions: "cms-solutions", pages: "cms-pages", navigations: "cms-navigation",
  job_categories: "job-categories", jobs: "jobs", projects: "projects", marketing_campaigns: "campaigns", expense_categories: "expense-categories",
  knowledge_base_categories: "kb-categories", orders: "orders", invoices: "invoices", inventory_items: "inventory", support_tickets: "support-tickets",
};

export function apiPathFor(mod: ModuleDef, parentId?: string | number) {
  return mod.path.replace(":parent", String(parentId ?? ""));
}

export function contractFor(mod: ModuleDef) {
  return mod.controller ? CONTROLLERS[mod.controller] : undefined;
}
