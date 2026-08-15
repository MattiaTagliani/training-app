"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import MainContainer from "@/components/layout/MainContainer";
import PageHeader from "@/components/ui/PageHeader";
import { deleteUser, getUser } from "@/lib/api/users";
import type { User } from "@/types/user";

export default function ClientDetailPage() {
  const params = useParams<{ userId: string }>();

  const router = useRouter();

  const userId = params.userId;

  const [client, setClient] = useState<User | null>(null);

  const [isLoading, setIsLoading] = useState(true);

  const [isRemoving, setIsRemoving] = useState(false);

  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadClient() {
      try {
        setIsLoading(true);
        setError(null);

        const user = await getUser(userId);

        setClient(user);
      } catch (error) {
        console.error("Failed to load client:", error);

        setError("Unable to load client.");
      } finally {
        setIsLoading(false);
      }
    }

    loadClient();
  }, [userId]);

  async function handleRemoveClient() {
    const confirmed = window.confirm(
      "Are you sure you want to remove this client from the workspace?",
    );

    if (!confirmed) {
      return;
    }

    try {
      setIsRemoving(true);

      await deleteUser(userId);

      router.push("/clients");
    } catch (error) {
      console.error("Failed to remove client:", error);

      setError("Unable to remove client.");

      setIsRemoving(false);
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

      {isLoading && (
        <div className="rounded-xl border border-border bg-surface p-6 shadow-sm">
          <p className="text-sm text-muted">Loading client...</p>
        </div>
      )}

      {error && (
        <div className="mb-6 rounded-xl border border-red-200 bg-red-50 p-6">
          <p className="text-sm text-red-700">{error}</p>
        </div>
      )}

      {!isLoading && client && (
        <>
          <div className="mb-6 flex flex-col gap-4 sm:mb-8 sm:flex-row sm:items-start sm:justify-between">
            <PageHeader
              title={`${client.firstName} ${client.lastName}`}
              description="Client details"
            />

            <div className="flex gap-2">
              <Link
                href={`/clients/${client.userId}/edit`}
                className="rounded-lg border border-border bg-surface px-4 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-surface-muted"
              >
                Edit
              </Link>

              <button
                type="button"
                onClick={handleRemoveClient}
                disabled={isRemoving}
                className="rounded-lg border border-red-200 bg-red-50 px-4 py-2.5 text-sm font-medium text-red-700 transition-colors hover:bg-red-100 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {isRemoving ? "Deleting..." : "Delete"}
              </button>
            </div>
          </div>

          <div className="rounded-xl border border-border bg-surface p-6 shadow-sm">
            <dl className="space-y-5">
              <div>
                <dt className="text-xs font-semibold uppercase tracking-wider text-muted">
                  First name
                </dt>

                <dd className="mt-1 text-sm text-foreground">
                  {client.firstName}
                </dd>
              </div>

              <div>
                <dt className="text-xs font-semibold uppercase tracking-wider text-muted">
                  Last name
                </dt>

                <dd className="mt-1 text-sm text-foreground">
                  {client.lastName}
                </dd>
              </div>

              <div>
                <dt className="text-xs font-semibold uppercase tracking-wider text-muted">
                  Email
                </dt>

                <dd className="mt-1 break-all text-sm text-foreground">
                  {client.email}
                </dd>
              </div>

              <div>
                <dt className="text-xs font-semibold uppercase tracking-wider text-muted">
                  User ID
                </dt>

                <dd className="mt-1 break-all font-mono text-sm text-muted">
                  {client.userId}
                </dd>
              </div>
            </dl>
          </div>
        </>
      )}
    </MainContainer>
  );
}
