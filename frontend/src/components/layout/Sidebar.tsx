"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import WorkspaceSwitcher from "./WorkspaceSwitcher";

const navigation = [
  {
    label: "Dashboard",
    href: "/",
  },
  {
    label: "Clients",
    href: "/clients",
  },
  {
    label: "Calendar",
    href: "/calendar",
  },
  {
    label: "Phases",
    href: "/phases",
  },
  {
    label: "Movements",
    href: "/movements",
  },
];

const temporaryWorkspaces = [
  {
    id: "personal",
    name: "Personal",
  },
  {
    id: "circus-school-a",
    name: "Circus School A",
  },
  {
    id: "circus-school-b",
    name: "Circus School B",
  },
];

export default function Sidebar() {
  const pathname = usePathname();

  const [selectedWorkspaceId, setSelectedWorkspaceId] = useState("all");

  const isActive = (href: string) => {
    if (href === "/") {
      return pathname === "/";
    }

    return pathname.startsWith(href);
  };

  return (
    <>
      {/* Desktop sidebar */}
      <aside className="hidden min-h-screen w-64 shrink-0 bg-brand text-brand-foreground lg:block">
        <div className="flex h-16 items-center border-b border-white/10 px-6">
          <Link href="/" className="text-xl font-bold tracking-tight">
            Training App
          </Link>
        </div>

        <div className="border-b border-white/10 p-4">
          <WorkspaceSwitcher
            workspaces={temporaryWorkspaces}
            selectedWorkspaceId={selectedWorkspaceId}
            onWorkspaceChange={setSelectedWorkspaceId}
          />
        </div>

        <nav className="p-4">
          <ul className="space-y-1">
            {navigation.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={[
                    "block rounded-lg px-4 py-2.5 text-sm font-medium transition-colors",
                    isActive(item.href)
                      ? "bg-white/15 text-white"
                      : "text-brand-foreground/75 hover:bg-white/10 hover:text-white",
                  ].join(" ")}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </aside>

      {/* Mobile header */}
      <header className="sticky top-0 z-20 bg-brand text-brand-foreground lg:hidden">
        <div className="flex h-14 items-center border-b border-white/10 px-4">
          <Link href="/" className="text-lg font-bold tracking-tight">
            Training App
          </Link>
        </div>

        <div className="border-b border-white/10 px-4 py-3">
          <WorkspaceSwitcher
            workspaces={temporaryWorkspaces}
            selectedWorkspaceId={selectedWorkspaceId}
            onWorkspaceChange={setSelectedWorkspaceId}
          />
        </div>

        <nav className="overflow-x-auto px-3 py-3">
          <ul className="flex min-w-max gap-2">
            {navigation.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={[
                    "block rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                    isActive(item.href)
                      ? "bg-white/15 text-white"
                      : "text-brand-foreground/75 hover:bg-white/10 hover:text-white",
                  ].join(" ")}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </header>
    </>
  );
}
