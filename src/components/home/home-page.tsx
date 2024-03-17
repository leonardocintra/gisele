"use client";

import { URL_API_CARDAPIO, URL_API_TIPO_MARMITEX } from "@/constants/constants";
import { ICardapio } from "@/interfaces/ICardapio";
import { IItemConsumivel } from "@/interfaces/IItemConsumivel";
import { ITipoMarmitex } from "@/interfaces/ITipoMarmitex";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";

export default function HomePage() {
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
      <div className="flex flex-col justify-center items-center space-y-4">
        <h3>Carregando nosso marmitex</h3>

        <div className="flex space-x-2">
          <div className="skeleton w-32 h-32"></div>
          <div className="skeleton w-32 h-32"></div>
          <div className="skeleton w-32 h-32"></div>
        </div>
      </div>
    );
  }

  if (cardapio.length === 0) {
    return (
      <div className="flex flex-col justify-center items-center space-y-4">
        <h3>Poxa! Ainda não temos o cardapio para hoje!</h3>
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

  function salvar(itemId: string) {
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

  function selecionarMarmitex(objMarmitex: ITipoMarmitex) {
    setDescricaoMarmitexSelecionado(
      `Marmitex ${objMarmitex.descricao} - R$ ${objMarmitex.preco}`
    );
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
          <div className="">
            <progress
              className="progress progress-success w-56"
              value="55"
              max="100"
            ></progress>

            {tiposOrdenados.map((tipo) => (
              <div
                key={tipo}
                className="border rounded-2xl px-3 m-1 shadow-md pb-2 transition-colors"
              >
                <div className="flex items-center space-x-1">
                  <span className="mt-5">[3 / 0]</span>
                  <h3 className="font-bold mt-5 text-2xl">{tipo}</h3>
                </div>

                {itensPorTipo[tipo]
                  .sort((a: any, b: any) =>
                    a.descricao.localeCompare(b.descricao)
                  )
                  .map((item: IItemConsumivel) => (
                    <div
                      key={item.id}
                      className="form-control hover:bg-green-200 rounded-lg"
                    >
                      <label className="cursor-pointer label">
                        <span className="label-text">{item.descricao}</span>
                        <input
                          type="checkbox"
                          className="checkbox checkbox-success"
                          onClick={() => salvar(item.id)}
                        />
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
          <button type="button" className="btn btn-secondary">
            Concluir pedido
          </button>
        </div>
      </div>
    </div>
  );

  function handleMarmitex(tipoMarmitex: ITipoMarmitex[]) {
    return (
      <>
        <h1 className="text-2xl mt-2">Selecione o marmitex:</h1>

        <div className="flex text-sm sm:text-base cursor-pointer">
          {tipoMarmitex.map((m) => (
            <div
              id={m.id}
              key={m.id}
              onClick={() => selecionarMarmitex(m)}
              className={`${
                marmitexSelecionadoId === m.id ? "bg-green-600" : ""
              }  border m-1 rounded-md p-2 hover:bg-amber-300 transition-colors`}
            >
              <div className="flex flex-col items-center">
                <h2 className="font-mono text-secondary">{m.descricao}</h2>
                <h3 className="text-xs sm:text-base font-semibold text-primary">
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
