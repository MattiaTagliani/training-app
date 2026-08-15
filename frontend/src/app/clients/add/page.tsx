"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import MainContainer from "@/components/layout/MainContainer";
import PageHeader from "@/components/ui/PageHeader";
import ClientForm from "@/components/clients/ClientForm";
import { createUser } from "@/lib/api/users";

export default function AddClientPage() {
  const router = useRouter();

  async function handleAddClient(values: {
    firstName: string;
    lastName: string;
    email: string;
  }) {
    const createdUser = await createUser(values);

    router.push(`/clients/${createdUser.userId}`);
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
        title="Add client"
        description="Add a client to the current workspace."
      />

      <div className="max-w-2xl">
        <ClientForm submitLabel="Add client" onSubmit={handleAddClient} />
      </div>
    </MainContainer>
  );
}
