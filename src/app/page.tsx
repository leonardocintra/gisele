import { Button } from "@/components/ui/button";
import { SignedOut, SignInButton } from "@clerk/nextjs";

export default async function Home() {
  return (
    <div className="flex py-8 items-center justify-center">
      <SignedOut>
        <Button>
          <SignInButton forceRedirectUrl={"/dashboard"}>Login</SignInButton>
        </Button>
      </SignedOut>
    </div>
  );
}
