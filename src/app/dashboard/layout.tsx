"use client";

import MenuHeader from "@/components/dashboard/menu-header";
import { SignUp, useUser } from "@clerk/nextjs";
import Link from "next/link";
import NavBar from "@/components/home/nav-bar";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { user } = useUser();

  if (!user) {
    return (
      <div className="bg-gradient-to-tl from-white via-purple-600 to-sky-600 h-screen w-screen flex justify-center items-center">
        <div className="flex flex-col items-center space-y-3">
          <h2 className="text-center my-4 text-2xl font-semibold">
            Restaurante não encontrado ou você não tem permissão para acessar
            essa pagina.
          </h2>
          <div>
            <Link href={"/"} className="btn btn-secondary text-xl mb-3">
              Ir para pagina inicial
            </Link>
          </div>

          <div>
            <SignUp />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <NavBar />
      <MenuHeader />
      {children}
    </div>
  );
}
