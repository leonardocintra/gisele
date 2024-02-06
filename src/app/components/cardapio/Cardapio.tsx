"use client"

import { CardapioDocument } from "@/model/Cardapio";

type CardapioProps = {
  cardapios: CardapioDocument[]
}


export default function Cardapio(props: CardapioProps) {

  const cardapio = props.cardapios[0];

  const items = cardapio.itens.filter(item => !item.tipo.exibirPreco);
  console.log(cardapio)
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
    <div>
      {tiposOrdenados.map((tipo) => (
        <div key={tipo}>
          <h3 className="font-bold mt-4 text-2xl">{tipo}</h3>
          {itensPorTipo[tipo]
            .sort((a: any, b: any) => a.descricao.localeCompare(b.descricao))
            .map((item: any) => (
              <div className="my-1" key={item._id}>- {item.descricao}</div>
            ))}
        </div>
      ))}
    </div>
  );
}

