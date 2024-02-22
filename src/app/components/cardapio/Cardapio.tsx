"use client"

import { CardapioDocument } from "@/model/Cardapio";

type CardapioProps = {
  cardapios: CardapioDocument[]
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
    <div className="border p-4 rounded-lg shadow-lg">
      {tiposOrdenados.map((tipo) => (
        <div key={tipo}>
          <h3 className="font-bold mt-4 text-2xl">{tipo}</h3>
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

