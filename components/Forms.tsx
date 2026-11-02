"use client";

import { useId, useState, type FormEvent, type ReactNode } from "react";
import type { Dict } from "@/content/en";

type FormLabels = Dict["forms"];
type Kind = "contact" | "volunteer" | "sponsor" | "newsletter";
type Status = "idle" | "sending" | "sent" | "error";

const inputCls =
  "min-h-[44px] w-full rounded-sm border border-line-strong bg-white px-3 text-ink placeholder:text-muted";

function useSubmit(kind: Kind) {
  const [status, setStatus] = useState<Status>("idle");
  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());
    setStatus("sending");
    try {
      const res = await fetch("/api/forms", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ kind, ...data, page: window.location.pathname }),
      });
      if (!res.ok) throw new Error(String(res.status));
      setStatus("sent");
      form.reset();
    } catch {
      setStatus("error");
    }
  }
  return { status, onSubmit };
}

function Field({ label, children, wide }: { label: string; children: (id: string) => ReactNode; wide?: boolean }) {
  const id = useId();
  return (
    <div className={`flex flex-col gap-2 ${wide ? "sm:col-span-2" : ""}`}>
      <label htmlFor={id} className="text-[13px] font-semibold leading-4">
        {label}
      </label>
      {children(id)}
    </div>
  );
}

/** Hidden field bots fill in and people never see. */
function Honeypot() {
  return (
    <div aria-hidden="true" className="absolute left-[-10000px] h-px w-px overflow-hidden">
      <label>
        Website
        <input type="text" name="website" tabIndex={-1} autoComplete="off" />
      </label>
    </div>
  );
}

function Result({ status, f, success }: { status: Status; f: FormLabels; success?: string }) {
  return (
    <div aria-live="polite" className="sm:col-span-2">
      {status === "sent" && (
        <p className="flex items-start gap-2 text-success">
          <svg aria-hidden="true" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="mt-0.5 shrink-0"><polyline points="20 6 9 17 4 12" /></svg>
          {success ?? f.success}
        </p>
      )}
      {status === "error" && (
        <p className="flex items-start gap-2 text-danger">
          <svg aria-hidden="true" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="mt-0.5 shrink-0"><circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" /></svg>
          {f.error}
        </p>
      )}
    </div>
  );
}

function Submit({ status, f, variant = "primary" }: { status: Status; f: FormLabels; variant?: "primary" }) {
  return (
    <div className="sm:col-span-2">
      <button
        type="submit"
        disabled={status === "sending"}
        className={`min-h-[48px] rounded-md px-7 font-semibold text-white disabled:opacity-70 ${variant === "primary" ? "bg-teal hover:bg-teal-strong" : ""}`}
      >
        {status === "sending" ? f.sending : f.send}
      </button>
    </div>
  );
}

export function ContactForm({ f }: { f: FormLabels }) {
  const { status, onSubmit } = useSubmit("contact");
  return (
    <form onSubmit={onSubmit} className="relative grid gap-4 sm:grid-cols-2">
      <Honeypot />
      <Field label={f.name}>{(id) => <input id={id} name="name" required autoComplete="name" className={inputCls} />}</Field>
      <Field label={f.email}>{(id) => <input id={id} name="email" type="email" required autoComplete="email" className={inputCls} />}</Field>
      <Field label={f.phone} wide>{(id) => <input id={id} name="phone" type="tel" autoComplete="tel" className={inputCls} />}</Field>
      <Field label={f.message} wide>{(id) => <textarea id={id} name="message" required rows={5} className={`${inputCls} py-2.5`} />}</Field>
      <Submit status={status} f={f} />
      <Result status={status} f={f} />
    </form>
  );
}

export function VolunteerForm({ f, interests }: { f: FormLabels; interests: string[] }) {
  const { status, onSubmit } = useSubmit("volunteer");
  return (
    <form onSubmit={onSubmit} className="relative grid gap-4 sm:grid-cols-2">
      <Honeypot />
      <Field label={f.name}>{(id) => <input id={id} name="name" required autoComplete="name" className={inputCls} />}</Field>
      <Field label={f.email}>{(id) => <input id={id} name="email" type="email" required autoComplete="email" className={inputCls} />}</Field>
      <Field label={f.phone}>{(id) => <input id={id} name="phone" type="tel" autoComplete="tel" className={inputCls} />}</Field>
      <Field label={f.interest}>
        {(id) => (
          <select id={id} name="interest" className={inputCls}>
            {interests.map((o) => (
              <option key={o}>{o}</option>
            ))}
          </select>
        )}
      </Field>
      <Field label={f.messageOptional} wide>{(id) => <textarea id={id} name="message" rows={4} className={`${inputCls} py-2.5`} />}</Field>
      <Submit status={status} f={f} />
      <Result status={status} f={f} />
    </form>
  );
}

export function SponsorForm({ f, options }: { f: FormLabels; options: string[] }) {
  const { status, onSubmit } = useSubmit("sponsor");
  return (
    <form onSubmit={onSubmit} className="relative grid gap-4 sm:grid-cols-2">
      <Honeypot />
      <Field label={f.name}>{(id) => <input id={id} name="name" required autoComplete="name" className={inputCls} />}</Field>
      <Field label={f.organization}>{(id) => <input id={id} name="organization" required autoComplete="organization" className={inputCls} />}</Field>
      <Field label={f.email}>{(id) => <input id={id} name="email" type="email" required autoComplete="email" className={inputCls} />}</Field>
      <Field label={f.interest}>
        {(id) => (
          <select id={id} name="interest" className={inputCls}>
            {options.map((o) => (
              <option key={o}>{o}</option>
            ))}
          </select>
        )}
      </Field>
      <Field label={f.messageOptional} wide>{(id) => <textarea id={id} name="message" rows={4} className={`${inputCls} py-2.5`} />}</Field>
      <Submit status={status} f={f} />
      <Result status={status} f={f} />
    </form>
  );
}

export function NewsletterForm({ f, label, button, note }: { f: FormLabels; label: string; button: string; note: string }) {
  const { status, onSubmit } = useSubmit("newsletter");
  const id = useId();
  return (
    <form onSubmit={onSubmit} className="relative flex flex-col gap-3">
      <Honeypot />
      <label htmlFor={id} className="text-[13px] font-semibold leading-4">
        {label}
      </label>
      <div className="flex flex-wrap gap-3">
        <input id={id} name="email" type="email" required autoComplete="email" placeholder="you@example.com" className={`${inputCls} min-w-0 flex-1 basis-52`} />
        <button type="submit" disabled={status === "sending"} className="min-h-[44px] rounded-md bg-teal px-5 font-semibold text-white hover:bg-teal-strong disabled:opacity-70">
          {status === "sending" ? f.sending : button}
        </button>
      </div>
      <p className="text-[14px] leading-5 text-muted">{note}</p>
      <Result status={status} f={f} success={f.newsletterSuccess} />
    </form>
  );
}
