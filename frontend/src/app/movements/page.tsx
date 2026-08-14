import MainContainer from "@/components/layout/MainContainer";
import PageHeader from "@/components/ui/PageHeader";

export default function MovementsPage() {
  return (
    <MainContainer>
      <PageHeader
        title="Movements"
        description="Manage your movement and exercise library."
      />

      <div className="rounded-xl border border-border bg-surface p-6 shadow-sm">
        <p className="text-sm text-muted">
          The movement library will be implemented in a later milestone.
        </p>
      </div>
    </MainContainer>
  );
}
