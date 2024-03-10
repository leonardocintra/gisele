/**
 * v0 by Vercel.
 * @see https://v0.dev/t/gc8GZQ29cro
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

type CardTipoItemProps = {
  id: string;
  image: string;
  descricao: string;
};

export default function CardTipoItem(props: CardTipoItemProps) {
  return (
    <div>
      <div className="flex items-center justify-center relative">
        <Image
          alt={props.descricao}
          className="rounded-lg object-cover"
          height={300}
          src={props.image}
          style={{
            aspectRatio: "300/200",
            objectFit: "cover",
          }}
          width={300}
        />
        <div className="absolute inset-0 flex flex-col items-center justify-center p-6 gap-2">
          <div className="text-4xl font-medium leading-none text-center bg-white py-2 px-4 rounded-lg">
            {props.descricao}
          </div>
          <Button size="lg">
            <Link href={`/admin/cardapio/tipo/${props.id}`}>
              Gerenciar itens
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
