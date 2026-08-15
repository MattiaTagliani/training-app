"use client";

import { useState } from "react";
import type { SubmitEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import MainContainer from "@/components/layout/MainContainer";
import PageHeader from "@/components/ui/PageHeader";
import { restoreUser } from "@/lib/api/users";

export default function RestoreClientPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");

  const [isSubmitting, setIsSubmitting] = useState(false);

  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(event: SubmitEvent<HTMLFormElement>) {
    event.preventDefault();

    try {
      setIsSubmitting(true);
      setError(null);

      const restoredUser = await restoreUser({
        email,
      });

      router.push(`/clients/${restoredUser.userId}`);
    } catch (error) {
      console.error("Failed to restore client:", error);

      setError("Unable to restore client.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <MainContainer>
      <div className="mb-4">
        <Link
          href="/clients"
          className="text-sm font-medium text-brand hover:underline"
        >
          Back to clients
        </Link>
      </div>

      <PageHeader
        title="Restore client"
        description="Restore a previously removed client."
      />

      <form
        onSubmit={handleSubmit}
        className="max-w-2xl space-y-6 rounded-xl border border-border bg-surface p-6 shadow-sm"
      >
        <div>
          <label
            htmlFor="restoreEmail"
            className="mb-1.5 block text-sm font-medium text-foreground"
          >
            Email
          </label>

          <input
            id="restoreEmail"
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
          {isSubmitting ? "Restoring..." : "Restore client"}
        </button>
      </form>
    </MainContainer>
  );
}
