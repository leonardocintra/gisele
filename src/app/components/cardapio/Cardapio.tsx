"use client"

import { CardapioDocument } from "@/model/Cardapio";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";


export default function Cardapio() {

  const URL_API_CARDAPIO = "/api/cardapio";

  const [cardapioDocument, setCardapioDocument] =
    useState<CardapioDocument[]>();

  useEffect(() => {
    try {
      fetch(URL_API_CARDAPIO).then((res) =>
        res.json().then((cardapios) => {
          setCardapioDocument(cardapios);
        })
      );
    } catch (err: any) {
      toast.error(err.message)
    }
  }, []);

  if (!cardapioDocument || cardapioDocument === undefined) {
    return (
      <div>
        <h2>Carregando ...</h2>
      </div>
    )
  }

  const itensPorTipo = cardapioDocument[0].itens.reduce((acc: any, item: any) => {
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

