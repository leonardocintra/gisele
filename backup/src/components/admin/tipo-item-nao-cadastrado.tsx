import Link from "next/link";

export default function TipoItemNaoCadastrado() {
  return (
    <div className="max-w-lg mx-auto text-center my-8 text-red-400">
      <h2>
        Primeiro você precisa criar os tipos de items. Ex: carnes, guarnições,
        salada, etc ...
      </h2>
      <div className="my-8">
        <Link
          href={"/dashboard/item-consumivel/novo-tipo-item"}
          className="btn btn-primary"
        >
          Novo tipo de item
        </Link>
      </div>
    </div>
  );
}
