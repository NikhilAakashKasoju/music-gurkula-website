"use client";

import { useState, type FormEvent } from "react";
import { ArrowRight, Loader2 } from "lucide-react";
import { PROGRAMS } from "@/lib/programs";
import { submitEnquiry } from "@/lib/api";
import { cn } from "@/lib/utils";

interface EnquiryFormProps {
  /** Fixed program slug when this form lives on a program page. Omit for the general form. */
  programSlug?: string;
  eyebrow: string;
  heading: string;
  subheading?: string;
  submitLabel?: string;
  footnote?: React.ReactNode;
  /** Where this instance of the form is embedded, for the admin dashboard's "source" column. */
  source: string;
  className?: string;
}

const inputClasses =
  "w-full rounded-lg border border-white/15 bg-white/10 px-4 py-3 text-sm text-cream placeholder:text-cream/50 outline-none transition focus:border-begonia-400 focus:bg-white/15";

export default function EnquiryForm({
  programSlug,
  eyebrow,
  heading,
  subheading,
  submitLabel = "Send inquiry",
  footnote,
  source,
  className,
}: EnquiryFormProps) {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">(
    "idle"
  );
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);

    const name = String(data.get("name") || "").trim();
    const phone = String(data.get("phone") || "").trim();

    if (!name || !phone) {
      setStatus("error");
      setErrorMessage("Please share your name and a phone/WhatsApp number.");
      return;
    }

    setStatus("loading");
    setErrorMessage("");

    const result = await submitEnquiry({
      name,
      phone,
      email: String(data.get("email") || "").trim() || undefined,
      program_of_interest: programSlug || String(data.get("program") || "general"),
      preferred_timing: String(data.get("timing") || "").trim() || undefined,
      message: String(data.get("message") || "").trim() || undefined,
      source,
    });

    if (result.ok) {
      setStatus("success");
      setSuccessMessage(result.message);
      form.reset();
    } else {
      setStatus("error");
      setErrorMessage(result.message);
    }
  }

  return (
    <div
      className={cn(
        "rounded-3xl bg-lavender-900 p-6 shadow-xl shadow-lavender-950/30 sm:p-8",
        className
      )}
    >
      <div className="mb-6 flex items-start justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-begonia-400">
            {eyebrow}
          </p>
          <h3 className="mt-2 font-display text-2xl text-cream sm:text-3xl">
            {heading}
          </h3>
          {subheading && (
            <p className="mt-2 text-sm text-cream/70">{subheading}</p>
          )}
        </div>
      </div>

      {status === "success" ? (
        <div className="rounded-lg border border-lavender-400/30 bg-lavender-800/60 p-5 text-sm text-cream">
          {successMessage}
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-3">
          <div className="grid gap-3 sm:grid-cols-2">
            <input
              name="name"
              type="text"
              placeholder="Your name"
              className={inputClasses}
              required
            />
            <input
              name="phone"
              type="tel"
              placeholder="Phone / WhatsApp"
              className={inputClasses}
              required
            />
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            <input
              name="email"
              type="email"
              placeholder="Email address"
              className={inputClasses}
            />
            {programSlug ? (
              <input
                name="timing"
                type="text"
                placeholder="Preferred timing"
                className={inputClasses}
              />
            ) : (
              <select
                name="program"
                defaultValue=""
                className={cn(inputClasses, "text-cream/90")}
                required
              >
                <option value="" disabled>
                  Program of interest
                </option>
                {PROGRAMS.map((p) => (
                  <option key={p.slug} value={p.slug} className="text-ink">
                    {p.name}
                  </option>
                ))}
                <option value="general" className="text-ink">
                  Not sure yet
                </option>
              </select>
            )}
          </div>

          {programSlug && (
            <input type="hidden" name="program" value={programSlug} />
          )}

          {!programSlug && (
            <input
              name="timing"
              type="text"
              placeholder="Preferred timing"
              className={inputClasses}
            />
          )}

          <textarea
            name="message"
            rows={3}
            placeholder={
              programSlug
                ? "A note about the student (optional)"
                : "Tell us a little about the student"
            }
            className={cn(inputClasses, "resize-none")}
          />

          {status === "error" && (
            <p className="text-sm text-begonia-400">{errorMessage}</p>
          )}

          <button
            type="submit"
            disabled={status === "loading"}
            className="flex w-full items-center justify-center gap-2 rounded-full bg-begonia-500 px-6 py-3 text-sm font-semibold text-lavender-950 transition hover:bg-begonia-400 disabled:cursor-not-allowed disabled:opacity-70"
          >
            {status === "loading" ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Sending…
              </>
            ) : (
              <>
                {submitLabel}
                <ArrowRight className="h-4 w-4" />
              </>
            )}
          </button>
        </form>
      )}

      {footnote && (
        <div className="mt-4 text-xs text-cream/60">{footnote}</div>
      )}
    </div>
  );
}
