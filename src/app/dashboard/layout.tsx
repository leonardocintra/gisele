import { KindeRestauranteProvider } from "@/components/context/kinde-organization";
import { Button } from "@/components/ui/button";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { getOrganization, getUser } = getKindeServerSession();
  const organization = await getOrganization();
  const user = await getUser();

  if (!organization || organization.orgCode === null) {
    redirect(`/novo-restaurante?usuario=${user.id}`);
  }

  return (
    <KindeRestauranteProvider kindeOrganization={organization}>
      <div>
        <div className="flex justify-center my-8 gap-2">
          <Link href={"/dashboard"}>
            <Button>Pedidos</Button>
          </Link>
          <Link href={"/dashboard/cardapio"}>
            <Button variant={"secondary"}>Cardapio do dia</Button>
          </Link>
          <Link href={"/dashboard/item"}>
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
    </KindeRestauranteProvider>
  );
}
