import CardTile from "@/app/components/admin/cardapio/CardTile";

export default function AdminCardapioPage() {
  return (
    <div>
      <div className="flex space-x-3 justify-center">
        <CardTile image="/img/carnes.jpg" descricao="Carnes" />
        <CardTile image="/img/guarnicao.webp" descricao="Guarnições" />
        <CardTile image="/img/salada.jpeg" descricao="Saladas" />
        <CardTile image="/img/bebidas.jpg" descricao="Bebidas" />
      </div>
    </div>
  );
}
