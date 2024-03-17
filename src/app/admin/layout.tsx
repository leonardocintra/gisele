import { SignInButton, SignedIn, SignedOut } from "@clerk/nextjs";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <SignedOut>
        <SignInButton mode="modal" redirectUrl="/admin">
          Entrar
        </SignInButton>
      </SignedOut>
      <SignedIn>
        <main>{children}</main>
      </SignedIn>
    </div>
  );
}
