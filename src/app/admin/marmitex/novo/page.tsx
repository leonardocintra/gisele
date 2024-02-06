"use client"

import { TipoItemDocument } from "@/model/TipoItemConsumivel";
import { useEffect, useState } from "react";

export default function NovoMarmitexPage() {

  const [tipoItems, setTipoItems] = useState<TipoItemDocument[]>();

  useEffect(() => {
    fetchTipoItems();
  }, []);

  function fetchTipoItems() {
    fetch("/api/tipoItem").then((res) =>
      res.json().then((items) => {
        setTipoItems(items);
      })
    );
  }

  if (!tipoItems || tipoItems.length === 0) {
    return (
      <div>
        <h2>Carregando ...</h2>
      </div>
    )
  }

  return (
    <div className="flex flex-col justify-center p-3">

      <div className="flex justify-center mb-4">

        <button className="btn btn-primary">Novo marmitex</button>
      </div>

      <ul className="steps">
        <li className="step step-primary">Descrição</li>
        {tipoItems.map((tipo) => (
          <li key={tipo._id} className="step">{tipo.descricao}</li>
        ))}
        <li className="step">Salvar</li>
      </ul>

      <div className="flex flex-col items-center mt-4 space-y-4">
        <div>

          <label className="form-control w-full max-w-xs">
            <div className="label">
              <span className="label-text">Descrição</span>
            </div>
            <input type="text" placeholder="Nome marmitex ..." className="input input-bordered w-full max-w-xs" />

          </label>
        </div>
        <div>

          <button className="btn btn-secondary">Proximo</button>
        </div>
      </div>
    </div>
  );
}
