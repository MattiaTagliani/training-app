import MainContainer from "@/components/layout/MainContainer";
import PageHeader from "@/components/ui/PageHeader";

export default function CalendarPage() {
  return (
    <MainContainer>
      <PageHeader
        title="Calendar"
        description="View scheduled training sessions and coaching activity."
      />

      <div className="rounded-xl border border-border bg-surface p-6 shadow-sm">
        <p className="text-sm text-muted">
          The training calendar will be implemented in a later milestone.
        </p>
      </div>
    </MainContainer>
  );
}
