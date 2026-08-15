"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import MainContainer from "@/components/layout/MainContainer";
import PageHeader from "@/components/ui/PageHeader";
import ClientForm from "@/components/clients/ClientForm";
import { getUser, updateUser } from "@/lib/api/users";
import type { User } from "@/types/user";

export default function EditClientPage() {
  const params = useParams<{ userId: string }>();

  const router = useRouter();

  const userId = params.userId;

  const [client, setClient] = useState<User | null>(null);

  const [isLoading, setIsLoading] = useState(true);

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

  async function handleUpdateClient(values: {
    firstName: string;
    lastName: string;
    email: string;
  }) {
    await updateUser(userId, values);

    router.push(`/clients/${userId}`);
  }

  return (
    <MainContainer>
      <div className="mb-4">
        <Link
          href={`/clients/${userId}`}
          className="text-sm font-medium text-brand hover:underline"
        >
          Back to client
        </Link>
      </div>

      <PageHeader
        title="Edit client"
        description="Update client account information."
      />

      {isLoading && (
        <div className="rounded-xl border border-border bg-surface p-6 shadow-sm">
          <p className="text-sm text-muted">Loading client...</p>
        </div>
      )}

      {error && (
        <div className="rounded-xl border border-red-200 bg-red-50 p-6">
          <p className="text-sm text-red-700">{error}</p>
        </div>
      )}

      {!isLoading && !error && client && (
        <div className="max-w-2xl">
          <ClientForm
            initialValues={{
              firstName: client.firstName,
              lastName: client.lastName,
              email: client.email,
            }}
            submitLabel="Save changes"
            onSubmit={handleUpdateClient}
          />
        </div>
      )}
    </MainContainer>
  );
}
