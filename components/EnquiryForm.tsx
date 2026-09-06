"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";

type Status = "idle" | "sending" | "sent" | "error";

const divisions = [
  "Ceramic Tiles",
  "Industrial & Turnkey",
  "Agricultural",
  "Chemicals",
  "Consumer Plastics & Clocks",
  "Other",
];

const fieldClass =
  "mt-2 w-full rounded-sm border border-brand-line bg-brand-paper px-4 py-3 text-sm text-brand-ink placeholder:text-brand-muted/70";

const labelClass = "block text-xs font-semibold tracking-[0.14em] text-brand-muted uppercase";

export function EnquiryForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("sending");
    setError(null);

    const form = event.currentTarget;
    const payload = Object.fromEntries(new FormData(form));

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const body = (await response.json().catch(() => null)) as { error?: string } | null;
        throw new Error(body?.error ?? "Your enquiry could not be sent.");
      }

      form.reset();
      setStatus("sent");
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : "Your enquiry could not be sent.");
      setStatus("error");
    }
  }

  if (status === "sent") {
    return (
      <div
        role="status"
        className="border-brand-teal bg-brand-tint rounded-sm border p-8 text-sm leading-relaxed"
      >
        <p className="text-brand-teal-dark font-semibold">Thank you — your enquiry is with us.</p>
        <p className="text-brand-muted mt-2">
          A member of the trade desk will respond shortly. If your requirement is urgent, please
          call the number listed on this page.
        </p>
        <button
          type="button"
          onClick={() => setStatus("idle")}
          className="text-brand-teal-dark mt-5 text-sm font-semibold underline"
        >
          Send another enquiry
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6" noValidate={false}>
      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          <label className={labelClass} htmlFor="name">
            Name
          </label>
          <input id="name" name="name" required autoComplete="name" className={fieldClass} />
        </div>
        <div>
          <label className={labelClass} htmlFor="company">
            Company
          </label>
          <input id="company" name="company" autoComplete="organization" className={fieldClass} />
        </div>
        <div>
          <label className={labelClass} htmlFor="email">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            autoComplete="email"
            className={fieldClass}
          />
        </div>
        <div>
          <label className={labelClass} htmlFor="country">
            Country
          </label>
          <input id="country" name="country" autoComplete="country-name" className={fieldClass} />
        </div>
      </div>

      <div>
        <label className={labelClass} htmlFor="division">
          Enquiry about
        </label>
        <select id="division" name="division" className={fieldClass} defaultValue={divisions[0]}>
          {divisions.map((division) => (
            <option key={division}>{division}</option>
          ))}
        </select>
      </div>

      <div>
        <label className={labelClass} htmlFor="message">
          Requirement
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={6}
          placeholder="Product and grade, quantity, destination port, Incoterm and target delivery window."
          className={fieldClass}
        />
      </div>

      {/* Honeypot: hidden from people, tempting to bots. */}
      <div aria-hidden className="hidden">
        <label htmlFor="website">Website</label>
        <input id="website" name="website" tabIndex={-1} autoComplete="off" />
      </div>

      {error && (
        <p role="alert" className="text-sm text-red-700">
          {error}
        </p>
      )}

      <Button type="submit" disabled={status === "sending"}>
        {status === "sending" ? "Sending…" : "Send enquiry"}
      </Button>
    </form>
  );
}
