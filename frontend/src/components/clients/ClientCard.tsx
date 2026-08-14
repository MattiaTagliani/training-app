import type { User } from "@/types/user";

interface ClientCardProps {
  client: User;
}

export default function ClientCard({ client }: ClientCardProps) {
  return (
    <article className="rounded-xl border border-border bg-surface p-5 shadow-sm transition-shadow hover:shadow-md">
      <h2 className="font-semibold text-foreground">
        {client.firstName} {client.lastName}
      </h2>

      <p className="mt-1 text-sm text-muted">{client.email}</p>
    </article>
  );
}
