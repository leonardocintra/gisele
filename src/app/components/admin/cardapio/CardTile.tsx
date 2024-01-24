import Image from "next/image";

type CardTileProps = {
  image: string;
  descricao: string;
};

export default function CardTile(props: CardTileProps) {
  return (
    <div className="card w-96 bg-base-100 shadow-xl">
      <figure className="px-10 pt-10">
        <Image
          className="rounded-xl"
          src={props.image}
          alt={props.descricao}
          width={277}
          height={384}
        />
      </figure>
      <div className="card-body items-center text-center">
        <h2 className="card-title">{props.descricao}</h2>
        <div className="card-actions">
          <button className="btn btn-primary">Gerenciar</button>
        </div>
      </div>
    </div>
  );
}
