"use client";

import { ITipoMarmitex } from "@/interfaces/ITipoMarmitex";
import { useEffect, useState } from "react";

export default function TiposMarmitex() {
  const [tipos, setTipos] = useState<ITipoMarmitex[]>([]);

  useEffect(() => {
    fetch("/api/sandra/marmitex/tipo")
      .then((res) => res.json())
      .then((data) => {
        setTipos(data.data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  if (!tipos || tipos.length === 0) {
    return <div>Carregando...</div>;
  }

  return (
    <div className="max-w-lg mx-auto">
      <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">
        Tipos de marmitex
      </h2>
      <div className="flex gap-2 justify-center my-8">
        {tipos.map((tipo) => (
          <div key={tipo.id}>
            <h3 className="font-semibold">{tipo.descricao}</h3>
          </div>
        ))}
      </div>
    </div>
  );
}
