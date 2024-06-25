export default function ItemPageId({ params }: { params: { id: number } }) {
  return (
    <div>
      <h2>item {params.id}</h2>
    </div>
  );
}
