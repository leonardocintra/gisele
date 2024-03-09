"use client";

import {
  Sidebar,
  SidebarHeader,
  SidebarMain,
  SidebarNav,
  SidebarNavMain,
  SidebarNavLink,
  SidebarNavHeader,
  SidebarNavHeaderTitle,
  SidebarFooter,
} from "@/components/gisele/sidebar";
import {
  ArchiveIcon,
  CalendarIcon,
  HomeIcon,
  IdCardIcon,
  TableIcon,
} from "@radix-ui/react-icons";
import { usePathname } from "next/navigation";
import { UserDropdown } from "./user-dropdown";

export default function MainSidebar() {
  const pathName = usePathname();

  const isActive = (path: string) => {
    return pathName === path;
  };

  return (
    <Sidebar>
      <SidebarHeader>
        <h2>Dashboard</h2>
      </SidebarHeader>
      <SidebarMain className="flex flex-col flex-grow">
        <SidebarNav>
          <SidebarNavMain>
            <SidebarNavLink href="/admin" active={isActive("/admin")}>
              {" "}
              <HomeIcon /> Inicio
            </SidebarNavLink>
            <SidebarNavLink
              href="/admin/cardapio"
              active={isActive("/admin/cardapio")}
            >
              {" "}
              <CalendarIcon /> Cardapio do dia
            </SidebarNavLink>
          </SidebarNavMain>
        </SidebarNav>

        <SidebarNav className="mt-5">
          <SidebarNavHeader>
            <SidebarNavHeaderTitle>Meus produtos</SidebarNavHeaderTitle>
          </SidebarNavHeader>
          <SidebarNavMain>
            <SidebarNavLink
              href="/admin/marmitex"
              active={isActive("/admin/marmitex")}
            >
              {" "}
              <ArchiveIcon /> Marmitex
            </SidebarNavLink>
            <SidebarNavLink
              href="/admin/item-consumivel"
              active={isActive("/admin/item-consumivel")}
            >
              <TableIcon />
              Items
            </SidebarNavLink>
          </SidebarNavMain>
        </SidebarNav>
      </SidebarMain>

      <SidebarFooter>
        <UserDropdown />
        <h2>Versão 0.3.0</h2>
      </SidebarFooter>
    </Sidebar>
  );
}
