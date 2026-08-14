import MainContainer from "@/components/layout/MainContainer";
import PageHeader from "@/components/ui/PageHeader";

export default function HomePage() {
  return (
    <MainContainer>
      <PageHeader
        title="Dashboard"
        description="Overview of your coaching activity."
      />

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <DashboardCard label="Clients" value="-" />
        <DashboardCard label="Active phases" value="-" />
        <DashboardCard label="Sessions this week" value="-" />
        <DashboardCard label="Pending feedback" value="-" />
      </div>
    </MainContainer>
  );
}

interface DashboardCardProps {
  label: string;
  value: string;
}

function DashboardCard({ label, value }: DashboardCardProps) {
  return (
    <div className="rounded-xl border border-border bg-surface p-5 shadow-sm">
      <p className="text-sm font-medium text-muted">{label}</p>

      <p className="mt-2 text-3xl font-semibold text-brand">{value}</p>
    </div>
  );
}
