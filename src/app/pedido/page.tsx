"use client";

import { URL_API_TIPO_MARMITEX } from "@/constants/constants";
import { TipoMarmitexDocument } from "@/model/TipoMarmitex";
import { useState, useEffect } from "react";

export default function PedidoPage() {

  const [tipoMarmitex, setTipoMarmitex] = useState<TipoMarmitexDocument[]>();

  useEffect(() => {
    fetchMarmitex();
  }, []);

  function fetchMarmitex() {
    fetch(URL_API_TIPO_MARMITEX).then((res) =>
      res.json().then((mamitex) => {
        setTipoMarmitex(mamitex);
      })
    );
  }

  if (!tipoMarmitex) {
    return (
      <div>
        <h2>Carregando ...</h2>
      </div>
    )
  }

  return (
    <div>
      <div className="flex flex-col justify-center items-center">
        <h1 className="text-2xl mt-2">Selecione o marmitex:</h1>

        <div className="flex text-sm">
          {tipoMarmitex.map((m) => (
            <div key={m._id} className="border m-1 rounded-md p-1 hover:bg-amber-300 transition-colors">
              <div className="flex flex-col items-center">
                <h2 className="">{m.descricao}</h2>
                <h3 className="text-xs font-semibold text-primary">R$ {m.preco}</h3>
              </div>

              <div className="mt-2">
                {m.configuracoes.map((c, index) => (
                  <div key={index}>
                    <div className="font-light">
                      {c.quantidade} {c.tipo.descricao.split(" ")[0]}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}