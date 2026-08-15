"use client";

import { useState } from "react";
import type { SubmitEvent } from "react";

interface ClientFormValues {
  firstName: string;
  lastName: string;
  email: string;
}

interface ClientFormProps {
  initialValues?: ClientFormValues;
  submitLabel: string;
  onSubmit: (values: ClientFormValues) => Promise<void>;
}

export default function ClientForm({
  initialValues = {
    firstName: "",
    lastName: "",
    email: "",
  },
  submitLabel,
  onSubmit,
}: ClientFormProps) {
  const [firstName, setFirstName] = useState(initialValues.firstName);
  const [lastName, setLastName] = useState(initialValues.lastName);
  const [email, setEmail] = useState(initialValues.email);

  const [isSubmitting, setIsSubmitting] = useState(false);

  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(event: SubmitEvent<HTMLFormElement>) {
    event.preventDefault();

    try {
      setIsSubmitting(true);
      setError(null);

      await onSubmit({
        firstName,
        lastName,
        email,
      });
    } catch (error) {
      console.error("Failed to submit client form:", error);

      setError("Unable to save the client.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6 rounded-xl border border-border bg-surface p-6 shadow-sm"
    >
      <div>
        <label
          htmlFor="firstName"
          className="mb-1.5 block text-sm font-medium text-foreground"
        >
          First name
        </label>

        <input
          id="firstName"
          type="text"
          value={firstName}
          onChange={(event) => setFirstName(event.target.value)}
          required
          className="w-full rounded-lg border border-border bg-white px-3 py-2.5 text-sm text-foreground outline-none transition-colors focus:border-brand focus:ring-2 focus:ring-brand/10"
        />
      </div>

      <div>
        <label
          htmlFor="lastName"
          className="mb-1.5 block text-sm font-medium text-foreground"
        >
          Last name
        </label>

        <input
          id="lastName"
          type="text"
          value={lastName}
          onChange={(event) => setLastName(event.target.value)}
          required
          className="w-full rounded-lg border border-border bg-white px-3 py-2.5 text-sm text-foreground outline-none transition-colors focus:border-brand focus:ring-2 focus:ring-brand/10"
        />
      </div>

      <div>
        <label
          htmlFor="email"
          className="mb-1.5 block text-sm font-medium text-foreground"
        >
          Email
        </label>

        <input
          id="email"
          type="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          required
          className="w-full rounded-lg border border-border bg-white px-3 py-2.5 text-sm text-foreground outline-none transition-colors focus:border-brand focus:ring-2 focus:ring-brand/10"
        />
      </div>

      {error && (
        <div className="rounded-lg border border-red-200 bg-red-50 p-4">
          <p className="text-sm text-red-700">{error}</p>
        </div>
      )}

      <button
        type="submit"
        disabled={isSubmitting}
        className="rounded-lg bg-brand px-4 py-2.5 text-sm font-medium text-brand-foreground transition-colors hover:bg-brand-hover disabled:cursor-not-allowed disabled:opacity-60"
      >
        {isSubmitting ? "Saving..." : submitLabel}
      </button>
    </form>
  );
}
