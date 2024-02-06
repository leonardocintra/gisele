"use client"

import { TipoItemDocument } from "@/model/TipoItemConsumivel";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function NovoMarmitexPage() {

  const [tipoItems, setTipoItems] = useState<TipoItemDocument[]>();
  const [descricao, setDescricao] = useState<string>("");
  const [descricaoBotao, setDescricaoBotao] = useState<string>("Proximo");

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

  function step() {
    setDescricaoBotao("Ola proximo")
  }

  return (
    <div className="flex flex-col justify-center p-3">

      <div className="flex justify-center mb-4">

        <button className="btn btn-primary">Novo marmitex</button>
      </div>



      <div className="flex justify-center">

        <ul className="steps steps-vertical text-xs sm:text-xl sm:steps-horizontal">
          <li className="step step-primary">Descrição</li>
          {tipoItems.map((tipo) => (
            <li key={tipo._id} className="step">{tipo.descricao.split(" ")[0]}</li>
          ))}
          <li className="step">Salvar</li>
        </ul>
      </div>


      <div className="flex flex-col items-center mt-4 space-y-4">
        <div>

          <label className="form-control w-full max-w-xs">
            <div className="label">
              <span className="label-text">Descrição</span>
            </div>
            <input type="text" value={descricao} onChange={(e) => setDescricao(e.target.value)} placeholder="Nome marmitex ..." className="input input-bordered w-full max-w-xs" />

          </label>
        </div>
        <div className="flex flex-col space-y-3">
          <button onClick={step} className="btn btn-secondary">{descricaoBotao}</button>
          <Link href={"/admin/marmitex"} className="btn btn-link">Cancelar</Link>
        </div>
      </div>
    </div>
  );
}
