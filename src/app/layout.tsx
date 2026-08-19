import type { Metadata } from "next";
import type { ReactNode } from "react";
import content from "@/content/site-content.json";
import "./globals.css";

export const metadata: Metadata = {
  title: content.metadata.title,
  description: content.metadata.description
};

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
