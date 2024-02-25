"use client"

import { ICardapio } from "@/interfaces/ICardapio";
import { IItemConsumivel } from "@/interfaces/IItemConsumivel";
import { ITipoMarmitex } from "@/interfaces/ITipoMarmitex";

type CardapioProps = {
  cardapios: ICardapio[]
  tipoMarmitex: ITipoMarmitex
}

export default function Cardapio(props: CardapioProps) {
  const cardapio = props.cardapios[0];

  const items = cardapio.itens.filter(item => !item.tipo.exibirPreco);
  const itensPorTipo = items.reduce((acc: any, item: any) => {
    const tipoDescricao = item.tipo.descricao;

    if (!acc[tipoDescricao]) {
      acc[tipoDescricao] = [];
    }

    acc[tipoDescricao].push(item);

    return acc;
  }, {});

  // Mapear e renderizar cada tipo com suas descrições em ordem alfabética
  const tiposOrdenados = Object.keys(itensPorTipo).sort();

  return (
    <div className="">
      {tiposOrdenados.map((tipo) => (
        <div key={tipo} className="border rounded-2xl px-3 m-1 shadow-md">
          <div className="flex items-center space-x-1">
            <span className="mt-5">[3 / 0]</span>
            <h3 className="font-bold mt-5 text-2xl">{tipo}</h3>
          </div>

          {itensPorTipo[tipo]
            .sort((a: any, b: any) => a.descricao.localeCompare(b.descricao))
            .map((item: IItemConsumivel) => (
              <div key={item.id} className="form-control hover:bg-green-200 rounded-lg">
                <label className="cursor-pointer label">
                  <span className="label-text">{item.descricao}</span>
                  <input type="checkbox" className="checkbox checkbox-success" />
                </label>
              </div>
            ))}

        </div>
      ))}
    </div>
  );
}

