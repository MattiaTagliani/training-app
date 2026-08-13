import type { Metadata } from "next";
import Header from "@/components/layout/Header";
import MainContainer from "@/components/layout/MainContainer";
import "./globals.css";

export const metadata: Metadata = {
  title: "Training App",
  description: "Training management platform for coaches and clients",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Header />

        <MainContainer>{children}</MainContainer>
      </body>
    </html>
  );
}
