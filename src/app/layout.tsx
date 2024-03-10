import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Tempero & Amor",
  description: "Restaurante Tempero & Amor",
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
        <main className="flex flex-col">
          <Toaster />
          {children}
        </main>
      </body>
    </html>
  );
}
