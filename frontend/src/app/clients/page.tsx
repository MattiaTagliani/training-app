"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import MainContainer from "@/components/layout/MainContainer";
import PageHeader from "@/components/ui/PageHeader";
import ClientCard from "@/components/clients/ClientCard";
import { getUsers } from "@/lib/api/users";
import type { User } from "@/types/user";

export default function ClientsPage() {
  const [clients, setClients] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadClients() {
      try {
        setIsLoading(true);
        setError(null);

        const users = await getUsers();

        setClients(users);
      } catch (error) {
        console.error("Failed to load clients:", error);

        setError("Unable to load clients.");
      } finally {
        setIsLoading(false);
      }
    }

    loadClients();
  }, []);

  return (
    <MainContainer>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <PageHeader
          title="Clients"
          description="Manage the athletes and clients in the current workspace."
        />

        <div className="flex shrink-0 gap-2">
          <Link
            href="/clients/restore"
            className="rounded-lg bg-brand px-4 py-2.5 text-sm font-medium text-brand-foreground transition-colors hover:bg-brand-hover"
          >
            Restore client
          </Link>

          <Link
            href="/clients/add"
            className="rounded-lg bg-brand px-4 py-2.5 text-sm font-medium text-brand-foreground transition-colors hover:bg-brand-hover"
          >
            Add client
          </Link>
        </div>
      </div>

      {isLoading && (
        <div className="rounded-xl border border-border bg-surface p-6 shadow-sm">
          <p className="text-sm text-muted">Loading clients...</p>
        </div>
      )}

      {error && (
        <div className="rounded-xl border border-red-200 bg-red-50 p-6">
          <p className="text-sm text-red-700">{error}</p>
        </div>
      )}

      {!isLoading && !error && clients.length === 0 && (
        <div className="rounded-xl border border-border bg-surface p-6 shadow-sm">
          <p className="text-sm text-muted">No clients found.</p>
        </div>
      )}

      {!isLoading && !error && clients.length > 0 && (
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {clients.map((client) => (
            <ClientCard key={client.userId} client={client} />
          ))}
        </div>
      )}
    </MainContainer>
  );
}
