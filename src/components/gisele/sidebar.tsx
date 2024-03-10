import { cn } from "@/lib/utils";
import Link from "next/link";

export type DashboardSidebarGenericProps<T = any> = {
  children: React.ReactNode;
  className?: string;
} & T;

export function DasboardSidebar({
  className,
  children,
}: DashboardSidebarGenericProps) {
  return (
    <aside
      className={cn(
        "flex flex-col border-r border-border space-y-6",
        className,
      )}
    >
      {children}
    </aside>
  );
}

export function DasbhoardSidebarMain({
  className,
  children,
}: DashboardSidebarGenericProps) {
  return <main className={cn("pt-3 px-3", className)}>{children}</main>;
}

export function DasbhoardSidebarHeader({
  className,
  children,
}: DashboardSidebarGenericProps) {
  return (
    <header
      className={cn("px-6 mt-3 text-3xl text-gray-700 font-thin", className)}
    >
      {children}
    </header>
  );
}

export function DasbhoardSidebarHeaderTitle({
  className,
  children,
}: DashboardSidebarGenericProps) {
  return <h2 className={cn("", className)}>{children}</h2>;
}

export function DasbhoardSidebarNav({
  className,
  children,
}: DashboardSidebarGenericProps) {
  return <nav className={cn("", className)}>{children}</nav>;
}
export function SidebarNavMain({
  className,
  children,
}: DashboardSidebarGenericProps) {
  return <main className={cn("flex flex-col", className)}>{children}</main>;
}

type DasbhoardSidebarNavLinkProps = {
  href: string;
  active?: boolean;
};

export function DasbhoardSidebarNavLink({
  className,
  children,
  href,
  active,
}: DashboardSidebarGenericProps<DasbhoardSidebarNavLinkProps>) {
  return (
    <Link
      href={href}
      className={cn(
        "flex items-center text-sm px-3 py-2 rounded-md gap-3",
        active && "bg-secondary",
        className,
      )}
    >
      {children}
    </Link>
  );
}

export function DasbhoardSidebarNavHeaderTitle({
  className,
  children,
}: DashboardSidebarGenericProps) {
  return (
    <div
      className={cn("text-md uppercase text-muted-foreground ml-2", className)}
    >
      {children}
    </div>
  );
}

export function DasbhoardSidebarNavHeader({
  className,
  children,
}: DashboardSidebarGenericProps) {
  return <header className={cn("", className)}>{children}</header>;
}

export function SidebarFooter({
  className,
  children,
}: DashboardSidebarGenericProps) {
  return (
    <footer className={cn("p-6 border-t border-border", className)}>
      {children}
    </footer>
  );
}
