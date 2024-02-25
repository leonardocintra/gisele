"use client"

import { useEffect, useState } from "react";
import { URL_API_CARDAPIO, URL_API_TIPO_MARMITEX } from "@/constants/constants";
import toast from "react-hot-toast";
import { ITipoMarmitex } from "@/interfaces/ITipoMarmitex";
import { ICardapio } from "@/interfaces/ICardapio";
import Cardapio from "./components/cardapio/Cardapio";

export default function Home() {

  const [tipoMarmitex, setTipoMarmitex] = useState<ITipoMarmitex[]>();
  const [marmitex, setMarmitex] = useState<ITipoMarmitex>();
  const [cardapio, setCardapio] = useState<ICardapio[]>();
  const [descricaoMarmitexSelecionado, setDescricaoMarmitexSelecionado] = useState<string>("Selecione o tamanho")
  const [marmitexSelecionadoId, setMarmitexSelecionadoId] = useState<string>("");
  const [itensSelecionados, setItensSelecionado] = useState<string[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [resCardapio, resMarmitex] = await Promise.all([
          fetch(URL_API_CARDAPIO),
          fetch(URL_API_TIPO_MARMITEX),
        ]);

        const cardapioData = await resCardapio.json();
        const marmitextData = await resMarmitex.json();

        setCardapio(cardapioData);
        setTipoMarmitex(marmitextData);

      } catch (error: any) {
        toast.error(error.message);
      }
    };

    fetchData();
  }, []);

  if (!tipoMarmitex || !cardapio) {
    return (
      <div>
        <h2>Carregando ...</h2>
      </div>
    )
  }

  function selecionarMarmitex(objMarmitex: ITipoMarmitex) {
    setDescricaoMarmitexSelecionado(`Marmitex ${objMarmitex.descricao} - R$ ${objMarmitex.preco}`)
    setMarmitexSelecionadoId(objMarmitex.id);
    setMarmitex(objMarmitex);
  }

  return (
    <div>
      <div className="flex flex-col justify-center items-center">
        {handleMarmitex(tipoMarmitex)}

        <div className="my-3 text-gray-700 font-serif text-xl">
          {descricaoMarmitexSelecionado}
        </div>

        {marmitex ? (
          <Cardapio cardapios={cardapio} tipoMarmitex={marmitex} />
        ) : (
          <div>
            <h2>Selecione um marmitex</h2>
          </div>
        )}


        <div className="my-4">
          <button type="button" className="btn btn-secondary">Concluir pedido</button>
        </div>
      </div>
    </div>
  )

  function handleMarmitex(data: ITipoMarmitex[]) {
    return (
      <>
        <h1 className="text-2xl mt-2">Selecione o marmitex:</h1>

        <div className="flex text-sm sm:text-base cursor-pointer">
          {data.map((m) => (
            <div id={m.id} key={m.id} onClick={() => selecionarMarmitex(m)}
              className={`${marmitexSelecionadoId === m.id ? "bg-green-600" : ""}  border m-1 rounded-md p-2 hover:bg-amber-300 transition-colors`}>
              <div className="flex flex-col items-center">
                <h2 className="font-mono text-secondary">{m.descricao}</h2>
                <h3 className="text-xs sm:text-base font-semibold text-primary">R$ {m.preco}</h3>
              </div>

              <div className="mt-2">
                {m.configuracoes.map((c, index) => (
                  <div key={index}>
                    <div className="font-light space-x-2">
                      <span className="font-bold">
                        {c.quantidade}
                      </span>
                      <span>
                        {c.tipo.descricao.split(" ")[0]}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </>
    )
  }
}
