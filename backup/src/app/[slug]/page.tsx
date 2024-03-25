"use client";

import HomePage from "@/components/home/home-page";
import NavBar from "@/components/home/nav-bar";
import { usePathname } from "next/navigation";

export default function HomePageRestaurante() {
  const pathname = usePathname();

  return (
    <div>
      <NavBar slug={pathname} />
      
      <div>
        <HomePage />
      </div>
    </div>
  );
}
