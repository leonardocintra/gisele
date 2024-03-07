"use client";

import { SkeletonGisele } from "@/components/gisele/skeleton";
import { Button } from "@/components/ui/button";
import { URL_API_TIPO_MARMITEX } from "@/constants/constants";
import { ITipoMarmitex } from "@/interfaces/ITipoMarmitex";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function MarmitexPage() {

  const [tipoMarmitex, setTipoMarmitex] = useState<ITipoMarmitex[]>();

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
          <Button>
            <Link href={"/admin/marmitex/novo"}>Novo marmitex</Link>
          </Button>
        </div>

        <div className="p-4 rounded-md border-2 border-blue-400">
          {tipoMarmitex.map((tipo) => (
            <div key={tipo.id}>
              <h2 className="mb-1 text-3xl text-center">{tipo.descricao}</h2>
              <div className="flex space-x-2 justify-center">
                <h2 className="text-sm text-center font-semibold">{tipo.ativo ? "Ativo" : "NÃO"}</h2>
                <h2 className="text-sm text-center font-semibold">R$ {tipo.preco}</h2>
              </div>
              <div className="mb-4">
                {tipo.configuracoes.map((config, index) => (
                  <div key={`config-${index}`}>
                    <ul>
                      <li className="space-x-3">
                        <span className="">
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
      <div className="max-w-md mx-auto mt-5">
        <SkeletonGisele />
      </div>
    )
  }
}
