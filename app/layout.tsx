import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "University Activity Hub",
  description: "Discover campus events through an interactive calendar and 3D spatial map",
};

import { Sidebar } from "@/components/Sidebar";
import { MobileNav } from "@/components/MobileNav";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased font-sans">
        <Sidebar />
        <MobileNav />
        <main className="lg:ml-64">
          {children}
        </main>
      </body>
    </html>
  );
}
