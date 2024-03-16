import { ptBR } from "@clerk/localizations";
import {
  ClerkProvider,
  SignInButton,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/nextjs";

import Link from "next/link";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider localization={ptBR}>
      <header className="flex justify-between border p-3">
        <Link href={"/"}>Home</Link>
        <SignedOut>
          <SignInButton mode="modal" />
        </SignedOut>
        <SignedIn>
          <UserButton showName={true} />
        </SignedIn>
      </header>

      <SignedOut>
        <div>
          <h1>Quero usar no meu restaurante</h1>
        </div>
      </SignedOut>
      <SignedIn>
        <main className="my-3">{children}</main>
      </SignedIn>
    </ClerkProvider>
  );
}
