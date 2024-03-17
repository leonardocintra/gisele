"use client";

import NavBar from "@/components/home/nav-bar";
import { usePathname } from "next/navigation";

export default function HomePageRestaurante() {
  const pathname = usePathname();

  return (
    <div>
      <NavBar />
      <div className="max-w-lg mx-auto text-center py-10">
        <h2>Home page do restaurante {pathname.replace("/", "")} </h2>
        <h3>Aqui que vai mostrar o cardapio</h3>
      </div>
    </div>
  );
}
