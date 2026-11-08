import { useState, type FormEvent } from "react";
import { useMutation } from "@tanstack/react-query";
import { CheckCircle2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ApiError } from "@/lib/api/client";
import { submitEnquiry } from "@/lib/api/public";

/** Sends an enquiry to POST /public/enquiries; shows server validation errors per field. */
export function EnquiryForm({ defaultTopic = "", messageLabel = "How can we help?" }: { defaultTopic?: string; messageLabel?: string }) {
  const [form, setForm] = useState({ name: "", email: "", phone: "", company: "", service_type: defaultTopic, message: "" });
  const m = useMutation({ mutationFn: () => submitEnquiry(form) });
  const fe = m.error instanceof ApiError ? m.error.fieldErrors : {};
  const set = (k: keyof typeof form) => (e: { target: { value: string } }) => setForm((f) => ({ ...f, [k]: e.target.value }));
  const onSubmit = (e: FormEvent) => { e.preventDefault(); m.mutate(); };

  if (m.isSuccess)
    return (
      <div className="rounded-lg border bg-card p-8" role="status">
        <CheckCircle2 className="h-6 w-6 text-brand-strong" />
        <p className="mt-4 font-display text-xl font-semibold">Thank you — your message was received.</p>
        <p className="mt-2 text-sm text-muted-foreground">Our team will get back to you by email.</p>
      </div>
    );

  const field = (k: keyof typeof form, label: string, props: Record<string, unknown> = {}) => (
    <div className="space-y-1.5">
      <Label htmlFor={k}>{label}</Label>
      <Input id={k} value={form[k]} onChange={set(k)} {...props} />
      {fe[k]?.[0] ? <p className="text-xs text-destructive">{fe[k][0]}</p> : null}
    </div>
  );

  return (
    <form onSubmit={onSubmit} className="grid gap-4 rounded-lg border bg-card p-6 sm:grid-cols-2 sm:p-8">
      {field("name", "Full name", { required: true, maxLength: 255, autoComplete: "name" })}
      {field("email", "Email", { required: true, type: "email", autoComplete: "email" })}
      {field("phone", "Phone (optional)", { type: "tel", autoComplete: "tel" })}
      {field("company", "Company (optional)", { autoComplete: "organization" })}
      <div className="sm:col-span-2">{field("service_type", "Topic (optional)")}</div>
      <div className="space-y-1.5 sm:col-span-2">
        <Label htmlFor="message">{messageLabel}</Label>
        <Textarea id="message" required rows={6} value={form.message} onChange={set("message")} />
        {fe["message"]?.[0] ? <p className="text-xs text-destructive">{fe["message"][0]}</p> : null}
      </div>
      {m.error && !Object.keys(fe).length ? <p className="text-sm text-destructive sm:col-span-2">{m.error.message}</p> : null}
      <Button type="submit" variant="brand" disabled={m.isPending} className="sm:col-span-2 sm:justify-self-start">{m.isPending ? "Sending…" : "Send message"}</Button>
    </form>
  );
}
