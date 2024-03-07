import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function MenuHeader() {
  return (
    <>
      <div className="flex p-2 flex-wrap gap-3 justify-center">
        <div>
          <Button>
            <Link href={"/admin"}>
              Inicio
            </Link>
          </Button>
        </div>
        <div>
          <Button>
            <Link href={"/admin/marmitex"}>
              Marmitex
            </Link>
          </Button>
        </div>

        <div>
          <Button>
            <Link href={"/admin/cardapio"}>
              Cardapio do dia
            </Link>
          </Button>
        </div>
        <div>
          <Button>
            <Link href={"/admin/item-consumivel"}            >
              Item Consumivel
            </Link>
          </Button>
        </div>

        <div>
          <Button>
            <Link href={"/"}>
              Pedidos
            </Link>
          </Button>
        </div>
      </div>
    </>
  );
}
