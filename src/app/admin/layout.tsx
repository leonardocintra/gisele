import HomeAdmin from "@/components/admin/home-admin";
import { ptBR } from "@clerk/localizations";
import {
  ClerkProvider,
  SignInButton,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/nextjs";

import Link from "next/link";
import MenuHeader from "@/components/admin/menu-header";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider localization={ptBR}>
      <header className="flex justify-between border p-3">
        <Link href={"/"}>Pagina inicial</Link>
        <SignedOut>
          <SignInButton mode="modal" redirectUrl="/admin">
            Entrar
          </SignInButton>
        </SignedOut>
        <SignedIn>
          <UserButton showName={true} />
        </SignedIn>
      </header>

      <SignedOut>
        <HomeAdmin />
      </SignedOut>
      <SignedIn>
        <main className="my-3">
          <MenuHeader />
          {children}
        </main>
      </SignedIn>
    </ClerkProvider>
  );
}
