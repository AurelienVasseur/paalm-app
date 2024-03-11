import type { Metadata } from "next";
import { Inter as FontSans } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import Header from "@/components/Header";
import { createClient } from "@/lib/supabase/server";

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
  const supabase = createClient();

  const { data, error } = await supabase.auth.getUser();

  return (
    <html lang="en">
      <body
        className={`${cn(
          "min-h-screen bg-background font-sans antialiased",
          fontSans.variable
        )} bg-dot-black/[0.1]`}
      >
        <Header user={data?.user} />
        <main>{children}</main>
      </body>
    </html>
  );
}
