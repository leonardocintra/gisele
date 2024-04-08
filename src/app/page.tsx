import { Card, CardContent } from "@/components/ui/card";
import { getCardapios } from "@/data/strapi/entities/cardapio";
import { getMarmitex } from "@/data/strapi/entities/marmitex";
import { ICardapio } from "@/interfaces/ICardapio";
import { IMarmitex } from "@/interfaces/IMarmitex";

export default async function Home() {
  const [cardapiosRes, marmitexRes] = await Promise.all([
    getCardapios(),
    getMarmitex(),
  ]);

  const cardapio: ICardapio = cardapiosRes.data[0];
  const marmitex: IMarmitex[] = marmitexRes.data;

  return (
    <main>
      <div className="flex max-w-md mx-auto flex-col my-8">
        <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0 text-center">
          Selecione seu marmitex
        </h2>

        <div className="flex space-x-1 justify-between px-3 mb-8">
          {marmitex.map((m) => (
            <Card key={m.id} className="hover:bg-slate-200 my-1">
              <CardContent className="p-3">
                <div className="">
                  <div className="text-center">
                    <h2 className="font-semibold text-sm">{m.descricao}</h2>
                    <h3 className="text-green-700 text-xs font-semibold font-mono">
                      R$ {m.preco}.00
                    </h3>
                  </div>

                  {m.configuracoes.data.map((item) => (
                    <div key={item.id}>
                      <span className=" text-gray-600 text-xs">
                        {item.quantidade} {item.item_tipo.descricao}
                      </span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0 text-center">
          Selecione os items
        </h2>
        <div className="px-2">
          {cardapio.items.data.map((item) => (
            <Card key={item.id} className="hover:bg-slate-200 my-1">
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <div className="grid gap-1.5">
                    <h2 className="font-semibold text-sm">{item.descricao}</h2>
                    <p className="text-sm text-muted-foreground">
                      {item.item_tipo.descricao}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </main>
  );
}
