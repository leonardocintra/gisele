"use client"

import { useEffect } from "react";
import Cardapio from "./components/cardapio/Cardapio";
import { URL_API_CARDAPIO, URL_API_ITEM, URL_API_TIPO_ITEM } from "@/constants/constants";
import toast from "react-hot-toast";

export default function Home() {

  useEffect(() => {

    const fetchData = async () => {
      try {
        await Promise.all([
          fetch(URL_API_TIPO_ITEM),
          fetch(URL_API_ITEM),
          fetch(URL_API_CARDAPIO),
        ]);
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

      <div>
        <Cardapio />
      </div>
    </div>
  );
}
