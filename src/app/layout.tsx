import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import {
  getGlobalPageData,
  getGlobalPageMetadata,
} from "@/data/strapi/loaders";
import Header from "@/components/custom/header";
import Footer from "@/components/custom/footer";

const inter = Inter({ subsets: ["latin"] });

export async function generateMetadata(): Promise<Metadata> {
  const metadata = await getGlobalPageMetadata();

  return {
    title: metadata.title || "Restaurante",
    description: metadata.description || "Facilita sua vida na cozinha",
  };
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const data = await getGlobalPageData();
  console.log(data.footer);

  return (
    <html lang="pt-br">
      <body className={inter.className}>
        <Header data={data.header} />
        {children}
        <Footer data={data.footer} />
      </body>
    </html>
  );
}
