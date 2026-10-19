"use client";

import { useId, useState } from "react";
import { Loader2, Send } from "lucide-react";
import { contact, organisation } from "@/content/site";
import { cn } from "@/lib/cn";

type Status = "idle" | "submitting" | "success" | "error";

const FIELDS = ["name", "organisation", "email", "subject", "message"] as const;
type FieldName = (typeof FIELDS)[number];

/**
 * A real submission path: client validation, server validation, submission states and
 * error handling. Delivery depends on PICSS_ENQUIRY_WEBHOOK being configured; when it
 * is not, the server says so plainly and this form surfaces the direct email route.
 */
export function EnquiryForm() {
  const uid = useId().replace(/:/g, "");
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<Partial<Record<FieldName, string>>>({});
  const [formError, setFormError] = useState<string | null>(null);

  const validateClient = (data: Record<FieldName, string>) => {
    const next: Partial<Record<FieldName, string>> = {};
    if (data.name.trim().length < 2) next.name = "Please enter your name.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(data.email.trim()))
      next.email = "Please enter a valid email address.";
    if (!data.subject.trim()) next.subject = "Please select an enquiry type.";
    if (data.message.trim().length < 20)
      next.message = "Please provide at least 20 characters so we can route your enquiry.";
    return next;
  };

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const raw = new FormData(form);

    const data = Object.fromEntries(
      FIELDS.map((field) => [field, String(raw.get(field) ?? "")]),
    ) as Record<FieldName, string>;

    const clientErrors = validateClient(data);
    setErrors(clientErrors);
    setFormError(null);

    if (Object.keys(clientErrors).length > 0) {
      const first = FIELDS.find((field) => clientErrors[field]);
      if (first) form.querySelector<HTMLElement>(`[name="${first}"]`)?.focus();
      return;
    }

    setStatus("submitting");

    try {
      const response = await fetch("/api/enquiry", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ ...data, website: String(raw.get("website") ?? "") }),
      });

      const payload = (await response.json()) as {
        ok: boolean;
        errors?: Partial<Record<FieldName, string>>;
        error?: string;
      };

      if (payload.ok) {
        setStatus("success");
        form.reset();
        return;
      }

      if (payload.errors) setErrors(payload.errors);
      setFormError(payload.error ?? "Please check the highlighted fields and try again.");
      setStatus("error");
    } catch {
      setFormError(
        `We could not reach the server. Please email ${organisation.email} directly.`,
      );
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div
        role="status"
        className="border border-[color:var(--rule-on-dark-strong)] bg-ink-700/50 p-8"
      >
        <p className="eyebrow text-picss-sky">Enquiry received</p>
        <p className="mt-4 text-[length:var(--step-0)] leading-relaxed text-on-dark">
          Thank you — your enquiry has been sent to the PICSS institutional team.
        </p>
        <button
          type="button"
          onClick={() => setStatus("idle")}
          className="focus-ring link-underline mt-6 text-sm font-medium text-on-dark-muted"
        >
          Send another enquiry
        </button>
      </div>
    );
  }

  const inputClass =
    "focus-ring min-h-12 w-full border-b border-[color:var(--rule-on-dark-strong)] bg-transparent px-0 py-3 text-[length:var(--step-0)] text-on-dark transition-colors duration-300 placeholder:text-on-dark-muted hover:border-[color:var(--rule-on-dark)] focus:border-picss-sky";

  return (
    <form onSubmit={onSubmit} noValidate className="space-y-7">
      {/* Honeypot */}
      <div aria-hidden className="absolute h-px w-px overflow-hidden opacity-0">
        <label htmlFor={`${uid}-website`}>Leave this field empty</label>
        <input id={`${uid}-website`} name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="grid gap-7 sm:grid-cols-2">
        <Field
          uid={uid}
          name="name"
          label="Name"
          required
          autoComplete="name"
          error={errors.name}
          inputClass={inputClass}
        />
        <Field
          uid={uid}
          name="organisation"
          label="Organisation"
          autoComplete="organization"
          error={errors.organisation}
          inputClass={inputClass}
        />
      </div>

      <Field
        uid={uid}
        name="email"
        label="Email"
        type="email"
        required
        autoComplete="email"
        error={errors.email}
        inputClass={inputClass}
      />

      <div>
        <label htmlFor={`${uid}-subject`} className="eyebrow block text-on-dark-muted">
          Enquiry type <span className="text-picss-red">*</span>
        </label>
        <select
          id={`${uid}-subject`}
          name="subject"
          required
          defaultValue=""
          aria-invalid={errors.subject ? true : undefined}
          aria-describedby={errors.subject ? `${uid}-subject-error` : undefined}
          className={cn(inputClass, "appearance-none")}
        >
          <option value="" disabled className="bg-ink-800">
            Select an enquiry type
          </option>
          {contact.enquiryTypes.map((type) => (
            <option key={type} value={type} className="bg-ink-800">
              {type}
            </option>
          ))}
        </select>
        {errors.subject && <FieldError id={`${uid}-subject-error`}>{errors.subject}</FieldError>}
      </div>

      <div>
        <label htmlFor={`${uid}-message`} className="eyebrow block text-on-dark-muted">
          Message <span className="text-picss-red">*</span>
        </label>
        <textarea
          id={`${uid}-message`}
          name="message"
          rows={5}
          required
          aria-invalid={errors.message ? true : undefined}
          aria-describedby={errors.message ? `${uid}-message-error` : undefined}
          className={cn(inputClass, "resize-y")}
        />
        {errors.message && <FieldError id={`${uid}-message-error`}>{errors.message}</FieldError>}
      </div>

      {/* Live region for submission outcome */}
      <div aria-live="polite" className="min-h-0">
        {formError && (
          <p className="border-l-2 border-picss-red py-1 pl-4 text-[length:var(--step--1)] leading-relaxed text-on-dark">
            {formError}{" "}
            <a href={organisation.emailHref} className="focus-ring link-underline text-picss-sky">
              {organisation.email}
            </a>
          </p>
        )}
      </div>

      <button
        type="submit"
        disabled={status === "submitting"}
        className="focus-ring group inline-flex min-h-12 items-center gap-2.5 rounded-[3px] bg-picss-red px-7 text-sm font-medium text-white transition-colors duration-300 hover:bg-picss-red-deep disabled:cursor-wait disabled:opacity-70"
      >
        {status === "submitting" ? (
          <>
            <Loader2 aria-hidden className="size-4 animate-spin" />
            Sending…
          </>
        ) : (
          <>
            Send enquiry
            <Send
              aria-hidden
              className="size-4 transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-0.5"
            />
          </>
        )}
      </button>
    </form>
  );
}

function Field({
  uid,
  name,
  label,
  type = "text",
  required = false,
  autoComplete,
  error,
  inputClass,
}: {
  uid: string;
  name: FieldName;
  label: string;
  type?: string;
  required?: boolean;
  autoComplete?: string;
  error?: string;
  inputClass: string;
}) {
  return (
    <div>
      <label htmlFor={`${uid}-${name}`} className="eyebrow block text-on-dark-muted">
        {label} {required && <span className="text-picss-red">*</span>}
      </label>
      <input
        id={`${uid}-${name}`}
        name={name}
        type={type}
        required={required}
        autoComplete={autoComplete}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? `${uid}-${name}-error` : undefined}
        className={inputClass}
      />
      {error && <FieldError id={`${uid}-${name}-error`}>{error}</FieldError>}
    </div>
  );
}

function FieldError({ id, children }: { id: string; children: React.ReactNode }) {
  return (
    <p id={id} className="mt-2 text-[0.78rem] text-picss-red">
      {children}
    </p>
  );
}
