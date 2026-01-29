import type { Metadata } from "next";
import "./globals.css"; // Ensure this file exists or remove this line

export const metadata: Metadata = {
  title: "Tribit AI",
  description: "Your AI Assistant",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body style={{ margin: 0 }}>{children}</body>
    </html>
  );
}