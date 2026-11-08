/**
 * Approved business direction from PANDA_TECH_MASTER_IMPLEMENTATION_PLAN.md §2.2–2.4.
 * This is positioning copy, not live catalogue data. Bookable services, products, prices and portfolio
 * come only from the public API. No statistics, clients, testimonials or awards are stated here.
 */
export const DIVISIONS = [
  { code: "01", name: "Panda Software & AI", summary: "Custom software, platforms, mobile apps, integrations and applied AI." },
  { code: "02", name: "Panda IT Solutions", summary: "Networks, infrastructure, cybersecurity, cloud, hosting and managed support." },
  { code: "03", name: "Panda Creative & Digital", summary: "Brand identity, design, motion and digital marketing." },
  { code: "04", name: "Panda Digital Services", summary: "Business documentation, digital assistance and training." },
  { code: "05", name: "Panda Products & Innovation", summary: "Business software, digital products and the technology shop." },
] as const;

export const CAPABILITIES = [
  { title: "Software engineering", items: ["Custom business applications", "Web apps and portals", "E-commerce and marketplaces", "Mobile applications", "SaaS platforms", "APIs and integrations", "Legacy modernisation"] },
  { title: "AI and automation", items: ["AI assistants and integrations", "Support automation", "Workflow automation", "Document processing", "Knowledge bases and search", "Analytics and reporting"] },
  { title: "IT, networking & infrastructure", items: ["LAN/WAN and Wi-Fi", "MikroTik and routing", "Structured cabling and fibre", "Servers", "VPN and remote access", "CCTV and access control"] },
  { title: "Cybersecurity", items: ["Security posture assessments", "Authorised vulnerability assessments", "Firewall and endpoint hardening", "Backup and disaster recovery", "Monitoring and incident response"] },
  { title: "Cloud & hosting", items: ["Domains, web and email hosting", "VPS and cloud servers", "Deployments and migrations", "SSL/TLS and monitoring", "Managed hosting"] },
  { title: "Creative & digital", items: ["Logo and brand identity", "Print and signage", "Social media assets", "Presentations and infographics", "Video and motion graphics"] },
  { title: "Digital marketing", items: ["Social media management", "Google and Meta advertising", "SEO and local SEO", "Email marketing", "Conversion optimisation"] },
  { title: "IT support & consultancy", items: ["Device maintenance", "Software installation", "Helpdesk — remote and on-site", "IT audits and procurement advice", "Managed IT support"] },
  { title: "Training", items: ["Digital literacy", "Programming and databases", "Networking and MikroTik", "Cybersecurity awareness", "AI productivity", "Corporate training"] },
] as const;

export const PRINCIPLES = [
  { title: "One accountable partner", body: "Software, infrastructure, security and creative work delivered through one team and one project record." },
  { title: "Verified developer network", body: "Developers join only after application review and verification — membership is never sold as a promise of work." },
  { title: "Honest pricing", body: "Prices are published only when approved. Everything else is quoted against your actual scope." },
  { title: "Explicit workflows", body: "Quotations, deliverables, payments and payouts move through recorded approval steps you can see." },
] as const;

export const ENQUIRY_INTERESTS = [
  "Software engineering",
  "AI and automation",
  "IT, networking & infrastructure",
  "Cybersecurity",
  "Cloud & hosting",
  "Creative & digital",
  "Digital marketing",
  "IT support & consultancy",
  "Digital business services",
  "Training",
  "Technology shop",
  "Other",
] as const;
