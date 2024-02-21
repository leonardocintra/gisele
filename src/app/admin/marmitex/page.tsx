"use client";

import { URL_API_TIPO_MARMITEX } from "@/constants/constants";
import { TipoMarmitexDocument } from "@/model/TipoMarmitex";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function MarmitexPage() {

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

  if (tipoMarmitex) {
    return (
      <div className="flex flex-col justify-center p-3 items-center">

        <div className="flex justify-center mb-4">

          <Link href={"/admin/marmitex/novo"} className="btn btn-primary">Novo marmitex</Link>
        </div>

        <div className="p-4 rounded-md border-2 border-blue-400">
          {tipoMarmitex.map((tipo) => (
            <div key={tipo._id}>
              <h2 className="mb-1 text-3xl text-center">{tipo.descricao}</h2>
              <div className="flex space-x-2 justify-center">
                <h2 className="text-sm text-center font-semibold text-secondary">{tipo.ativo ? "Ativo" : "NÃO"}</h2>
                <h2 className="text-sm text-center font-semibold text-primary">R$ {tipo.preco}</h2>
              </div>
              <div className="mb-4">
                {tipo.configuracoes.map((config, index) => (
                  <div key={`config-${index}`}>
                    <ul>
                      <li className="space-x-3">
                        <span className="my-1 badge badge-lg badge-neutral">
                          {config.quantidade}
                        </span>

                        <span className="font-light">
                          {config.tipo.descricao}
                        </span>

                      </li>
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  } else {
    return (
      <div>
        <h2> Carregando ...</h2>
      </div>
    )
  }
}
