import type { Metadata } from "next";
import { Inter as FontSans } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import Header from "@/components/Header/index";
import { Toaster as ToasterSonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "Paalm",
  description: "Wealth Manager App",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${cn(
          "min-h-screen bg-background font-sans antialiased",
          fontSans.variable
        )} bg-dot-black/[0.1]`}
      >
        <Header />
        <main>{children}</main>
        <Toaster />
        <ToasterSonner />
      </body>
    </html>
  );
}
