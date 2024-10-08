import { LoginLink, LogoutLink } from "@kinde-oss/kinde-auth-nextjs/components";
import Link from "next/link";
import { JSX, SVGProps } from "react";
import { Button } from "../ui/button";
import { ChefHatIcon, LayoutDashboardIcon } from "lucide-react";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

type HeaderProps = {
  isAuthenticated: boolean;
};

export default async function Header({ isAuthenticated }: HeaderProps) {
  const { getOrganization } = getKindeServerSession();
  const organization = await getOrganization();

  return (
    <header className="flex items-center h-16 px-4 w-full md:px-6">
      <div className="flex items-center gap-2">
        <Link
          className="flex items-center gap-2 text-lg font-semibold"
          href="/"
        >
          <ChefHatIcon className="w-5 h-5" />

          <span>Meu restaurante {organization?.orgName}</span>
        </Link>

        {isAuthenticated && (
          <div className="flex items-center space-x-3">
            <Link
              className="flex items-center gap-2 text-lg font-semibold text-emerald-800 bg-slate-200 hover:bg-slate-300 py-2 px-4 rounded-md"
              href="/dashboard"
            >
              <LayoutDashboardIcon />
              <span>Minha área</span>
            </Link>
            <span className="text-xs text-slate-400 font-light">
              code: {organization?.orgCode}
            </span>
          </div>
        )}
      </div>
      <nav className="ml-auto flex items-center space-x-2">
        {isAuthenticated ? (
          <LogoutLink>
            <Button variant={"destructive"}>Sair</Button>
          </LogoutLink>
        ) : (
          <>
            <LoginLink>
              <Button>Entrar</Button>
            </LoginLink>

            <Link href={"/novo-restaurante"}>
              <Button variant={"ghost"}>Criar meu restaurante</Button>
            </Link>
          </>
        )}
      </nav>
    </header>
  );
}

function PackageIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m7.5 4.27 9 5.15" />
      <path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z" />
      <path d="m3.3 7 8.7 5 8.7-5" />
      <path d="M12 22V12" />
    </svg>
  );
}
