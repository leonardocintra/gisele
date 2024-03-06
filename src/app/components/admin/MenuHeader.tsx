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
            <Link href={"/admin/cardapio"} className="btn btn-sm btn-outline btn-info" >
              Cardapio do dia
            </Link>
          </Button>
        </div>
        <div>
          <Button>

            <Link
              href={"/admin/item-consumivel"}
              className="btn btn-sm btn-outline btn-success"
            >
              Item Consumivel
            </Link>
          </Button>
        </div>

        <div>
          <Button>
            <Link href={"/"} className="btn btn-sm btn-outline btn-error">
              Pedidos
            </Link>
          </Button>
        </div>
      </div>
    </>
  );
}
