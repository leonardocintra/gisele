import ItemForm from "@/components/custom/dashboard/itens/form-item";

export default function ItemPageId({ params }: { params: { id: number } }) {
  return (
    <div>
      <ItemForm itemId={params.id} />
    </div>
  );
}
