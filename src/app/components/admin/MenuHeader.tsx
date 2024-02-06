import Link from "next/link";

export default function MenuHeader() {
  return (
    <div className="flex p-2 flex-wrap gap-3 justify-center">
      <div>
        <Link href={"/admin/marmitex"} className="btn btn-sm btn-outline btn-warning">
          Marmitex
        </Link>
      </div>

      <div>
        <Link
          href={"/admin/cardapio"}
          className="btn btn-sm btn-outline btn-info"
        >
          Cardapio do dia
        </Link>
      </div>
      <div>
        <Link
          href={"/admin/item-consumivel"}
          className="btn btn-sm btn-outline btn-success"
        >
          Item Consumivel
        </Link>
      </div>

      <div>
        <Link href={"/"} className="btn btn-sm btn-outline btn-error">
          Pedidos
          <div className="badge badge-secondary">+12</div>
        </Link>
      </div>
    </div>
  );
}
