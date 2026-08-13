import type { User } from "@/types/user";

interface ClientCardProps {
  client: User;
}

export default function ClientCard({ client }: ClientCardProps) {
  return (
    <article>
      <h2>
        {client.firstName} {client.lastName}
      </h2>

      <p>{client.email}</p>
    </article>
  );
}
