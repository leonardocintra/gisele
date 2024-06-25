import ListaItensPorTipoItem from "@/components/custom/dashboard/itens/lista-itens-por-tipo-item";

export default function ItensPage({ params }: { params: { id: number } }) {
  // TODO: verificar se o id é do restaurente

  return (
    <div>
      <ListaItensPorTipoItem tipoItemId={params.id} />
    </div>
  );
}
