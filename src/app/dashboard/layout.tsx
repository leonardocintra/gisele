import { KindeRestauranteProvider } from "@/components/context/kinde-organization";
import { Button } from "@/components/ui/button";
import { SANDRA_BASE_URL } from "@/lib/utils";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { KindeOrganization } from "@kinde-oss/kinde-auth-nextjs/types";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { getOrganization, getUser } = getKindeServerSession();
  let organization: KindeOrganization | null = await getOrganization();
  const user = await getUser();

  if (!organization || organization.orgCode === null) {
    const url = `${SANDRA_BASE_URL}/organizations/user/${user.id}`;
    const response = await fetch(url);

    if (response.ok) {
      // TODO: cliente com mais de um restaurante precisa selecionar qual restaurante ele quer tratar
      const res = await response.json();
      organization = {
        orgCode: res[0].code,
        orgName: res[0].name,
      };
    } else {
      redirect(`/novo-restaurante?usuario=${user.id}`);
    }
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
