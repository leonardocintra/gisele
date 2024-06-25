import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import Link from "next/link";

export default async function DashboardLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode;
}) {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!user) {
    return (
      <div className="flex items-center space-x-4">
        <Skeleton className="h-12 w-12 rounded-full" />
        <div className="space-y-2">
          <Skeleton className="h-4 w-[250px]" />
          <Skeleton className="h-4 w-[200px]" />
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-center my-8 gap-2">
        <Link href={"/dashboard"}>
          <Button>Pedidos</Button>
        </Link>
        <Link href={"/dashboard/cardapio"}>
          <Button>Cardapio do dia</Button>
        </Link>
        <Link href={"/dashboard/marmitex"}>
          <Button variant={"secondary"}>Marmitex</Button>
        </Link>
        <Link href={"/dashboard/tipo-itens"}>
          <Button
            className="hover:bg-primary hover:text-white"
            variant={"secondary"}
          >
            Itens
          </Button>
        </Link>
      </div>

      <div>{children}</div>
    </div>
  );
}
