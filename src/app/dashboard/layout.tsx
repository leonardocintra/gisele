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

  if (!organization || organization.orgCode === null) {
    redirect("/novo-restaurante");
  }

  const user = await getUser();

  return (
    <div>
      <div className="text-center text-slate-400">
        <h2>
          {JSON.stringify(organization)} - User ID: {user.id}
        </h2>
      </div>
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
  );
}
