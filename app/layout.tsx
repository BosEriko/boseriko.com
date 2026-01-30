import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "boseriko.com — Bos Eriko's Portfolio",
  description: "My random creations.",
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
