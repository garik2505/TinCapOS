import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "TinCap OS",
  description: "Sales workspace prototype for TinCap OS",
  icons: {
    icon: "/icon.svg"
  }
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      <body className="font-sans antialiased">{children}</body>
    </html>
  );
}
