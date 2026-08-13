"use client";

import { useEffect, useState } from "react";
import { getUsers } from "@/lib/api/users";
import type { User } from "@/types/user";
import ClientCard from "@/components/clients/ClientCard";

export default function ClientsPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadUsers() {
      try {
        const data = await getUsers();
        setUsers(data);
      } catch {
        setError("Failed to load clients.");
      } finally {
        setLoading(false);
      }
    }

    loadUsers();
  }, []);

  if (loading) {
    return <p>Loading clients...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <section>
      <h1>Clients</h1>

      {users.length === 0 ? (
        <p>No clients found.</p>
      ) : (
        <div>
          {users.map((user) => (
            <ClientCard key={user.userId} client={user} />
          ))}
        </div>
      )}
    </section>
  );
}
