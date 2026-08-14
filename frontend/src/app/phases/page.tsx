import MainContainer from "@/components/layout/MainContainer";
import PageHeader from "@/components/ui/PageHeader";

export default function PhasesPage() {
  return (
    <MainContainer>
      <PageHeader
        title="Phases"
        description="Create and manage training phases for your clients."
      />

      <div className="rounded-xl border border-border bg-surface p-6 shadow-sm">
        <p className="text-sm text-muted">
          Training phase management will be implemented in a later milestone.
        </p>
      </div>
    </MainContainer>
  );
}
