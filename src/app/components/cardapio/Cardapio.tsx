"use client"

import { CardapioDocument } from "@/model/Cardapio";
import { TipoMarmitexDocument } from "@/model/TipoMarmitex";

type CardapioProps = {
  cardapios: CardapioDocument[]
  tipoMarmitex: TipoMarmitexDocument
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
            .map((item: any) => (
              <div key={item._id} className="form-control hover:bg-green-200 rounded-lg">
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

