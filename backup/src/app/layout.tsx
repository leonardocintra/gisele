import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import { ClerkProvider } from "@clerk/nextjs";
import { ptBR } from "@clerk/localizations";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Nourriture",
  description: "Gerencie cardapios on line",
  authors: [
    {
      name: "Leonardo Nascimento Cintra",
      url: "https://github.com/leonardocintra/gisele",
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br">
      <body className={inter.className}>
        <main>
          <ClerkProvider localization={ptBR}>
            <Toaster />
            {children}
          </ClerkProvider>
        </main>
      </body>
    </html>
  );
}
