import Link from "next/link";

export default function MenuHeader() {
  return (
    <div className="flex items-center justify-center space-x-3 mb-6">
      <Link href={"/admin"} className="btn btn-sm btn-outline btn-warning">
        Administrativo
      </Link>
      <Link
        href={"/admin/cardapio"}
        className="btn btn-sm btn-outline btn-info"
      >
        Cardapio do dia
      </Link>
      <Link
        href={"/admin/item-consumivel"}
        className="btn btn-sm btn-outline btn-success"
      >
        Item Consumivel
      </Link>

      <button className="btn btn-sm btn-outline btn-error">
        Pedidos
        <div className="badge badge-secondary">+12</div>
      </button>
    </div>
  );
}
