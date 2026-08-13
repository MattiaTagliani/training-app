import Link from "next/link";

export default function Header() {
  return (
    <header>
      <nav>
        <Link href="/">Training App</Link>

        <div>
          <Link href="/">Dashboard</Link>
          <Link href="/clients">Clients</Link>
          <Link href="/movements">Movements</Link>
          <Link href="/calendar">Calendar</Link>
        </div>
      </nav>
    </header>
  );
}
