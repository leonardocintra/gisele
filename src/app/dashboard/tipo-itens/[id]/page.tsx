import ListaItensPorTipoItem from "@/components/custom/dashboard/itens/lista-itens-por-tipo-item";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function ItensPage({ params }: { params: { id: number } }) {
  // TODO: verificar se o id é do restaurente

  return (
    <div>
      <div className="max-w-3xl mx-auto">
        <div className="mb-8 flex justify-end">
          <Link href={"/dashboard/item/novo/"}>
            <Button className="bg-green-600">Novo item</Button>
          </Link>
        </div>
      </div>
      <ListaItensPorTipoItem tipoItemId={params.id} />
    </div>
  );
}
