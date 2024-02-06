"use client"

import { useEffect, useState } from "react";
import Cardapio from "./components/cardapio/Cardapio";
import { URL_API_CARDAPIO, URL_API_ITEM, URL_API_TIPO_ITEM } from "@/constants/constants";
import toast from "react-hot-toast";
import { CardapioDocument } from "@/model/Cardapio";

export default function Home() {

  const [carregado, setCarregado] = useState<boolean>(false);
  const [cardapioDocument, setCardapioDocument] = useState<CardapioDocument[]>();

  useEffect(() => {

    const fetchData = async () => {
      try {
        const response = await Promise.all([
          fetch(URL_API_TIPO_ITEM),
          fetch(URL_API_ITEM),
          fetch(URL_API_CARDAPIO).then((res) =>
            res.json().then((cardapios) => {
              setCardapioDocument(cardapios);
            })
          ),
        ]);

        if (response) {
          setCarregado(true);
        }

      } catch (error: any) {
        toast.error(error.message);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="max-w-xs mx-auto">
      <h2 className="text-center p-2 text-3xl font-mono text-cyan-700">
        Faça seu pedido
      </h2>

      <h3 className="text-center font-extralight text-2xl py-3">
        Cardapio de hoje
      </h3>

      <div className="flex justify-center">
        {carregado && cardapioDocument !== undefined ? (
          <div>
            <Cardapio cardapios={cardapioDocument} />
          </div>
        ) : (
          <div className="mt-8 flex flex-col justify-center items-center space-y-5">
            <div>
              <span className="loading loading-spinner loading-lg text-success"></span>
            </div>

            <div className="flex flex-col gap-4 w-52">
              <div className="skeleton h-32 w-full"></div>
              <div className="skeleton h-4 w-28"></div>
              <div className="skeleton h-4 w-full"></div>
              <div className="skeleton h-4 w-full"></div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
