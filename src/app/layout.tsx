import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

import Header from "@/components/custom/header";
import Footer from "@/components/custom/footer";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { Toaster } from "@/components/ui/toaster";

const inter = Inter({ subsets: ["latin"] });

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Seu restaurante",
    description: "Facilita sua vida na cozinha",
  };
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { isAuthenticated } = getKindeServerSession();
  const isAuthed = await isAuthenticated();

  if (!isAuthed) {
    return (
      <html lang="pt-br">
        <body className={inter.className}>
          <Header isAuthenticated={false} />
          {children}
          <Footer />
        </body>
      </html>
    );
  }

  return (
    <html lang="pt-br">
      <body className={inter.className}>
        <Header isAuthenticated={isAuthed} />
        {children}
        <Footer />
        <Toaster />
      </body>
    </html>
  );
}
