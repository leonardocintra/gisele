"use client"

import { CardapioDocument } from "@/model/Cardapio";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";


export default function Cardapio() {

  const URL_API_CARDAPIO = "/api/cardapio";

  const [cardapioDocument, setCardapioDocument] =
    useState<CardapioDocument[]>();

  useEffect(() => {

    const fetchData = async () => {
      try {
        const [resCardapio] = await Promise.all([
          fetch(URL_API_CARDAPIO)
        ]);

        const cardapioData = await resCardapio.json();

        setCardapioDocument(cardapioData);


      } catch (error: any) {
        toast.error(error.message);
      }
    };

    fetchData();
  }, []);

  if (!cardapioDocument || cardapioDocument === undefined) {
    return (
      <div>
        <h2>Carregando ...</h2>
      </div>
    )
  }

  return (
    <div>

      {cardapioDocument.map((cardapio) => (
        <div key={cardapio._id}>
          {cardapio.itens.map((item) => (
            <div key={item._id}>
              {item.tipo.descricao} | {item.descricao}
            </div>
          ))}
        </div>
      ))}

      <br />
    </div>
  );
}

