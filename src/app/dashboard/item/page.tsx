import ListaTipoItens from "@/components/custom/dashboard/itens/lista-tipo-itens";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function ItemPageDashboard() {
  return (
    <div>
      <div className="max-w-3xl mx-auto">
        <div className="mb-8 flex justify-end">
          <Button disabled className="bg-green-600">
            Novo tipo de item
          </Button>
        </div>
        <div className="my-8">
          <ListaTipoItens />
        </div>
      </div>
    </div>
  );
}
