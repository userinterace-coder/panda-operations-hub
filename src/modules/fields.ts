import { z } from "zod";

/**
 * Converts Laravel validation rule strings (copied verbatim into contract.generated.ts)
 * into form field definitions and a matching Zod schema. Server-side validation remains authoritative;
 * 422 field errors from the API are mapped back onto these fields.
 */

export type FieldType = "text" | "textarea" | "email" | "url" | "number" | "date" | "datetime" | "select" | "boolean" | "list" | "json" | "file" | "relation" | "password";

export interface FieldDef {
  name: string;
  label: string;
  type: FieldType;
  required: boolean;
  options?: string[];
  max?: number;
  min?: number;
  /** For relation fields: the database table from `exists:table,col`. */
  table?: string;
  integer?: boolean;
}

const LONG_TEXT = /^(description|content|message|notes|internal_notes|answer|excerpt|challenge|solution|results|body|scope|approach|timeline|review_notes|resolution|terms_and_conditions|approval_notes|recommendations|reason|rejection_reason|target_audience|goals|availability)$/;

function parseRule(rule: string) {
  const parts = rule.split("|").map((p) => p.trim());
  const get = (name: string) => parts.find((p) => p === name || p.startsWith(`${name}:`));
  const arg = (name: string) => get(name)?.split(":").slice(1).join(":");
  return { parts, has: (n: string) => !!get(n), arg };
}

export function labelFor(name: string) {
  const base = name.replace(/_id$/, "").replace(/_/g, " ");
  return base.charAt(0).toUpperCase() + base.slice(1);
}

export function fieldsFromRules(rules: Record<string, string>, exclude: string[] = []): FieldDef[] {
  const out: FieldDef[] = [];
  const listKeys = new Set(Object.keys(rules).filter((k) => k.endsWith(".*")).map((k) => k.slice(0, -2)));
  for (const [name, rule] of Object.entries(rules)) {
    if (name.includes(".") || exclude.includes(name)) continue;
    if (["created_by", "updated_by", "password_confirmation"].includes(name)) continue;
    const r = parseRule(rule);
    const f: FieldDef = { name, label: labelFor(name), type: "text", required: r.has("required"), integer: r.has("integer") };
    const max = r.arg("max");
    const min = r.arg("min");
    if (max && !Number.isNaN(Number(max))) f.max = Number(max);
    if (min && !Number.isNaN(Number(min))) f.min = Number(min);
    const inArg = r.arg("in");
    const exists = r.arg("exists");
    if (r.has("file") || r.has("image")) f.type = "file";
    else if (inArg) {
      f.type = "select";
      f.options = inArg.split(",").map((s) => s.trim());
    } else if (exists) {
      f.type = "relation";
      f.table = exists.split(",")[0];
    } else if (r.has("boolean")) f.type = "boolean";
    else if (r.has("integer") || r.has("numeric")) f.type = "number";
    else if (r.has("date")) f.type = /_at$/.test(name) ? "datetime" : "date";
    else if (r.has("email")) f.type = "email";
    else if (r.has("url")) f.type = "url";
    else if (r.has("array") || r.has("json")) f.type = listKeys.has(name) ? "list" : "json";
    else if (name === "password") f.type = "password";
    else if (LONG_TEXT.test(name) || (!max && r.has("string") && /text|content|description/.test(name))) f.type = "textarea";
    out.push(f);
  }
  return out;
}

/** Build a Zod schema that mirrors the Laravel rules on the client. Values come from HTML inputs (strings). */
export function schemaFor(fields: FieldDef[], mode: "create" | "edit") {
  const shape: Record<string, z.ZodTypeAny> = {};
  for (const f of fields) {
    let s: z.ZodTypeAny;
    switch (f.type) {
      case "boolean":
        s = z.boolean();
        break;
      case "file":
        s = mode === "create" && f.required ? z.instanceof(File, { message: `${f.label} is required.` }) : z.any();
        break;
      case "number":
      case "relation": {
        let n = z.string().trim();
        if (f.required) n = n.min(1, `${f.label} is required.`);
        s = n.refine((v) => v === "" || !Number.isNaN(Number(v)), `${f.label} must be a number.`).refine(
          (v) => v === "" || f.min === undefined || f.type === "relation" || Number(v) >= f.min,
          `${f.label} must be at least ${f.min}.`,
        );
        break;
      }
      case "json":
        s = z.string().refine((v) => {
          if (!v.trim()) return !f.required;
          try {
            JSON.parse(v);
            return true;
          } catch {
            return false;
          }
        }, `${f.label} must be valid JSON.`);
        break;
      default: {
        let t = z.string().trim();
        if (f.required) t = t.min(1, `${f.label} is required.`);
        if (f.max && f.type !== "date" && f.type !== "datetime") t = t.max(f.max, `${f.label} must be at most ${f.max} characters.`);
        if (f.type === "email") s = t.refine((v) => v === "" || z.string().email().safeParse(v).success, "Enter a valid email address.");
        else if (f.type === "url") s = t.refine((v) => v === "" || z.string().url().safeParse(v).success, "Enter a valid URL.");
        else s = t;
      }
    }
    shape[f.name] = s;
  }
  return z.object(shape);
}

/** Default form values from an existing record. */
export function initialValues(fields: FieldDef[], record?: Record<string, unknown>) {
  const v: Record<string, unknown> = {};
  for (const f of fields) {
    const raw = record?.[f.name];
    if (f.type === "boolean") v[f.name] = Boolean(raw);
    else if (f.type === "file") v[f.name] = undefined;
    else if (f.type === "list") v[f.name] = Array.isArray(raw) ? raw.join(", ") : raw ? String(raw) : "";
    else if (f.type === "json") v[f.name] = raw ? JSON.stringify(raw, null, 2) : "";
    else if (f.type === "date") v[f.name] = typeof raw === "string" ? raw.slice(0, 10) : "";
    else if (f.type === "datetime") v[f.name] = typeof raw === "string" ? raw.slice(0, 16) : "";
    else v[f.name] = raw === null || raw === undefined ? "" : String(raw);
  }
  return v;
}

/** Convert form values to the JSON payload Laravel expects. Empty optional values are sent as null. */
export function toPayload(fields: FieldDef[], values: Record<string, unknown>) {
  const out: Record<string, unknown> = {};
  let file: { name: string; file: File } | null = null;
  for (const f of fields) {
    const v = values[f.name];
    if (f.type === "file") {
      if (v instanceof File) file = { name: f.name, file: v };
      continue;
    }
    if (f.type === "boolean") out[f.name] = Boolean(v);
    else if (f.type === "number" || f.type === "relation") out[f.name] = v === "" || v === undefined ? null : Number(v);
    else if (f.type === "list") out[f.name] = String(v ?? "").split(",").map((s) => s.trim()).filter(Boolean);
    else if (f.type === "json") out[f.name] = String(v ?? "").trim() ? JSON.parse(String(v)) : null;
    else out[f.name] = v === "" ? null : v;
  }
  return { body: out, file };
}
