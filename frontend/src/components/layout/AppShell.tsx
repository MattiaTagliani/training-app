import type { ReactNode } from "react";
import Sidebar from "./Sidebar";

interface AppShellProps {
  children: ReactNode;
}

export default function AppShell({ children }: AppShellProps) {
  return (
    <div className="min-h-screen bg-background lg:flex">
      <Sidebar />

      <div className="min-w-0 flex-1">{children}</div>
    </div>
  );
}
