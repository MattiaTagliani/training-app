import Link from "next/link";
import type { User } from "@/types/user";

interface ClientCardProps {
  client: User;
}

export default function ClientCard({ client }: ClientCardProps) {
  return (
    <article className="rounded-xl border border-border bg-surface p-5 shadow-sm transition-shadow hover:shadow-md">
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <h2 className="font-semibold text-foreground">
            {client.firstName} {client.lastName}
          </h2>

          <p className="mt-1 truncate text-sm text-muted">{client.email}</p>
        </div>

        <Link
          href={`/clients/${client.userId}`}
          className="shrink-0 rounded-lg bg-brand-soft px-3 py-2 text-sm font-medium text-brand transition-colors hover:bg-border"
        >
          View
        </Link>
      </div>
    </article>
  );
}
