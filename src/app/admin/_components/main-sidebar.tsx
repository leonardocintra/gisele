"use client";

import {
  DasboardSidebar,
  DasbhoardSidebarHeader,
  DasbhoardSidebarMain,
  DasbhoardSidebarNav,
  SidebarNavMain,
  DasbhoardSidebarNavLink,
  DasbhoardSidebarNavHeader,
  DasbhoardSidebarNavHeaderTitle,
  SidebarFooter,
} from "@/components/gisele/sidebar";
import {
  ArchiveIcon,
  CalendarIcon,
  HomeIcon,
  MixerVerticalIcon,
  TableIcon,
} from "@radix-ui/react-icons";
import { usePathname } from "next/navigation";
import { UserDropdown } from "./user-dropdown";
import { Session } from "next-auth";

type MainSidebarProps = {
  user: Session["user"];
};

export default function MainSidebar({ user }: MainSidebarProps) {
  const pathName = usePathname();

  const isActive = (path: string) => {
    return pathName === path;
  };

  return (
    <DasboardSidebar>
      <DasbhoardSidebarHeader>
        <h2>Dashboard</h2>
      </DasbhoardSidebarHeader>
      <DasbhoardSidebarMain className="flex flex-col flex-grow">
        <DasbhoardSidebarNav>
          <SidebarNavMain>
            <DasbhoardSidebarNavLink href="/" active={isActive("/")}>
              <HomeIcon /> Inicio
            </DasbhoardSidebarNavLink>
            <DasbhoardSidebarNavLink href="/admin" active={isActive("/admin")}>
              <MixerVerticalIcon /> Dashboard
            </DasbhoardSidebarNavLink>
            <DasbhoardSidebarNavLink
              href="/admin/cardapio"
              active={isActive("/admin/cardapio")}
            >
              <CalendarIcon /> Cardapio do dia
            </DasbhoardSidebarNavLink>
          </SidebarNavMain>
        </DasbhoardSidebarNav>

        <DasbhoardSidebarNav className="mt-5">
          <DasbhoardSidebarNavHeader>
            <DasbhoardSidebarNavHeaderTitle>
              Meus produtos
            </DasbhoardSidebarNavHeaderTitle>
          </DasbhoardSidebarNavHeader>
          <SidebarNavMain>
            <DasbhoardSidebarNavLink
              href="/admin/marmitex"
              active={isActive("/admin/marmitex")}
            >
              <ArchiveIcon /> Marmitex
            </DasbhoardSidebarNavLink>
            <DasbhoardSidebarNavLink
              href="/admin/item-consumivel"
              active={isActive("/admin/item-consumivel")}
            >
              <TableIcon />
              Items
            </DasbhoardSidebarNavLink>
          </SidebarNavMain>
        </DasbhoardSidebarNav>
      </DasbhoardSidebarMain>

      <SidebarFooter>
        <UserDropdown user={user} />
        <h2 className="text-sm text-slate-400 text-right">v0.3.0</h2>
      </SidebarFooter>
    </DasboardSidebar>
  );
}
