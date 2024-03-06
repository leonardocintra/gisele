/**
 * v0 by Vercel.
 * @see https://v0.dev/t/gc8GZQ29cro
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import Image from "next/image";
import Link from "next/link";

type CardTipoItemProps = {
  id: string;
  image: string;
  descricao: string;
};

export default function CardTipoItem(props: CardTipoItemProps) {
  return (
    // <Card className="border shadow-sm">
    //   <div className="aspect-w-16 aspect-h-9">
    //     <Image
    //       alt={props.descricao}
    //       className="object-cover"
    //       height="225"
    //       src={props.image}
    //       style={{
    //         aspectRatio: "400/225",
    //         objectFit: "cover",
    //       }}
    //       width="400"
    //     />
    //   </div>
    //   <div className="p-4">
    //     <Button>
    //       <Link
    //         href={`/admin/cardapio/tipo/${props.id}`}
    //         className="btn btn-primary"
    //       >
    //         Gerenciar
    //       </Link></Button>
    //   </div>
    // </Card>
    <div className="flex items-center justify-center w-full h-[400px] relative">
      <img
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
          <Link href={`/admin/cardapio/tipo/${props.id}`} >
            Gerenciar itens
          </Link>
        </Button>
      </div>
    </div>
  )
}

