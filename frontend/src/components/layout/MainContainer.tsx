import type { ReactNode } from "react";

interface MainContainerProps {
  children: ReactNode;
}

export default function MainContainer({ children }: MainContainerProps) {
  return <main className="main-container">{children}</main>;
}
