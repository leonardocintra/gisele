"use client";

import { useEffect, useState } from "react";
import { URL_API_CARDAPIO, URL_API_TIPO_MARMITEX } from "@/constants/constants";
import toast from "react-hot-toast";
import { ITipoMarmitex } from "@/interfaces/ITipoMarmitex";
import { ICardapio } from "@/interfaces/ICardapio";
import { IItemConsumivel } from "@/interfaces/IItemConsumivel";
import { Skeleton } from "@/components/ui/skeleton";
import { Checkbox } from "@/components/ui/checkbox";
import Cabecalho from "./components/Cabecalho";
import Rodape from "./components/Rodape";

export default function Home() {
  const [tipoMarmitex, setTipoMarmitex] = useState<ITipoMarmitex[]>();
  const [marmitex, setMarmitex] = useState<ITipoMarmitex>();
  const [cardapio, setCardapio] = useState<ICardapio[]>();
  const [descricaoMarmitexSelecionado, setDescricaoMarmitexSelecionado] =
    useState<string>("Selecione o tamanho");
  const [marmitexSelecionadoId, setMarmitexSelecionadoId] =
    useState<string>("");
  const [itensSelecionados, setItensSelecionados] = useState<string[]>([]);

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
      <div className="flex flex-col space-y-3 max-w-md mx-auto p-10 justify-center items-center">
        <Skeleton className="h-[125px] w-[250px] rounded-xl" />
        <div className="space-y-2">
          <Skeleton className="h-4 w-[250px]" />
        </div>
        <Skeleton className="h-[125px] w-[250px] rounded-xl" />
        <div className="space-y-2">
          <Skeleton className="h-4 w-[250px]" />
        </div>
        <Skeleton className="h-[125px] w-[250px] rounded-xl" />
        <div className="space-y-2">
          <Skeleton className="h-4 w-[250px]" />
        </div>
      </div>
    );
  }

  const items = cardapio[0].itens.filter((item) => !item.tipo.exibirPreco);
  const itensPorTipo = items.reduce((acc: any, item: any) => {
    const tipoDescricao = item.tipo.descricao;

    if (!acc[tipoDescricao]) {
      acc[tipoDescricao] = [];
    }

    acc[tipoDescricao].push(item);

    return acc;
  }, {});

  function selecionarItem(itemId: string) {
    // Verifica se o item já está selecionado
    const itemIndex = itensSelecionados.indexOf(itemId);
    if (itemIndex !== -1) {
      // Se estiver selecionado, remove-o do array
      const updatedItensSelecionados = [...itensSelecionados];
      updatedItensSelecionados.splice(itemIndex, 1);
      setItensSelecionados(updatedItensSelecionados);
    } else {
      // Se não estiver selecionado, adiciona-o ao array
      setItensSelecionados([...itensSelecionados, itemId]);
    }
  }

  // Mapear e renderizar cada tipo com suas descrições em ordem alfabética
  const tiposOrdenados = Object.keys(itensPorTipo).sort();
  const marmitexFullData = tipoMarmitex.find(
    (tipoTipo) => tipoTipo.id === marmitexSelecionadoId,
  );

  function selecionarMarmitex(objMarmitex: ITipoMarmitex) {
    setDescricaoMarmitexSelecionado(
      `Marmitex ${objMarmitex.descricao} - R$ ${objMarmitex.preco}`,
    );
    setMarmitexSelecionadoId(objMarmitex.id);
    setMarmitex(objMarmitex);
  }

  function exibirQuantidadeAutorizada(
    marmitexSelecionado: ITipoMarmitex | undefined,
    descricaoTipo: string,
  ) {
    const quantidade = marmitexSelecionado?.configuracoes.find(
      (x) => x.tipo.descricao === descricaoTipo,
    )?.quantidade;

    return <span className="mt-5">[{quantidade} / 0]</span>;
  }

  return (
    <div className="">
      <Cabecalho />

      <div className="mt-8">
        <div className="flex flex-col justify-center items-center">
          {handleMarmitex(tipoMarmitex)}

          <div className="my-3 text-gray-700 font-serif text-xl">
            {descricaoMarmitexSelecionado}
          </div>

          {marmitex ? (
            <div className="">
              {tiposOrdenados.map((tipo) => (
                <div
                  key={tipo}
                  className="border rounded-2xl px-3 m-1 shadow-md pb-2 transition-colors"
                >
                  <div className="flex items-center space-x-1">
                    {exibirQuantidadeAutorizada(marmitexFullData, tipo)}
                    <h3 className="font-bold mt-5 text-2xl">{tipo}</h3>
                  </div>

                  {itensPorTipo[tipo]
                    .sort((a: any, b: any) =>
                      a.descricao.localeCompare(b.descricao),
                    )
                    .map((item: IItemConsumivel) => (
                      <div
                        key={item.id}
                        className="hover:bg-green-200 rounded-lg px-2 py-2"
                      >
                        <label className="cursor-pointer label space-x-2 text-2xl">
                          <Checkbox onClick={() => selecionarItem(item.id)} />
                          <span className="font-light">{item.descricao}</span>
                        </label>
                      </div>
                    ))}
                </div>
              ))}
            </div>
          ) : (
            <div>
              <h2>Selecione um marmitex</h2>
            </div>
          )}

          <div className="my-4">
            <button
              className="bg-green-700 text-slate-200 p-4 rounded-xl text-2xl font-semibold hover:bg-green-500"
              type="button"
            >
              Concluir pedido
            </button>
          </div>
        </div>
      </div>

      <Rodape />
    </div>
  );

  function handleMarmitex(data: ITipoMarmitex[]) {
    return (
      <>
        <h1 className="text-2xl mt-2">Selecione o marmitex:</h1>

        <div className="flex text-sm sm:text-base cursor-pointer">
          {data.map((m) => (
            <div
              id={m.id}
              key={m.id}
              onClick={() => selecionarMarmitex(m)}
              className={`${marmitexSelecionadoId === m.id ? "bg-green-600" : ""}  border m-1 rounded-md p-2 hover:bg-amber-300 transition-colors`}
            >
              <div className="flex flex-col items-center">
                <h2 className="font-mono">{m.descricao}</h2>
                <h3 className="text-xs sm:text-base font-semibold">
                  R$ {m.preco}
                </h3>
              </div>

              <div className="mt-2">
                {m.configuracoes.map((c, index) => (
                  <div key={index}>
                    <div className="font-light space-x-2">
                      <span className="font-bold">{c.quantidade}</span>
                      <span>{c.tipo.descricao.split(" ")[0]}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </>
    );
  }
}
