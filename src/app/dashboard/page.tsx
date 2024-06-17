import { Skeleton } from "@/components/ui/skeleton";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { ListaDePedidos } from "@/components/custom/dashboard/lista-de-pedidos";
import { Button } from "@/components/ui/button";

export default async function DashboardPage() {
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
    <div className="">
      <div className="flex justify-center my-8 gap-2">
        <Button>Cardapio do dia</Button>
        <Button variant={"secondary"} >Marmitex</Button>
        <Button variant={"secondary"}>Tipo de item</Button>
        <Button variant={"secondary"}>Itens</Button>
      </div>

      <ListaDePedidos />
    </div>
  );
}
