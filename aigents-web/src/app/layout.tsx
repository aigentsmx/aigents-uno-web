import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "AIGents",
  description: "Best Customer Service. Every time.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
