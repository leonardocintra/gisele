import Image from "next/image";
import Link from "next/link";

type CardTileProps = {
  id: string;
  image: string;
  descricao: string;
};

export default function CardTile(props: CardTileProps) {
  return (
    <div className="card w-64 sm:w-96 bg-base-100 shadow-xl">
      <figure className="px-10 pt-10 max-h-52">
        <Image
          className="rounded-full"
          src={props.image}
          alt={props.descricao}
          width={377}
          height={484}
        />
      </figure>
      <div className="card-body items-center text-center">
        <h2 className="card-title">{props.descricao}</h2>
        <div className="card-actions">
          <Link
            href={`/admin/cardapio/${props.id}`}
            className="btn btn-primary"
          >
            Gerenciar
          </Link>
        </div>
      </div>
    </div>
  );
}
