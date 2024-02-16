"use client"

import { ITipoItemConsumivel } from "@/interfaces/ITipoItemConsumivel";
import { TipoItemDocument } from "@/model/TipoItemConsumivel";
import Link from "next/link";
import { useEffect, useState } from "react";

type MarmitexItem = {
  descricao: string,
  quantidade: number,
}

export default function NovoMarmitexPage() {

  const [tipoItems, setTipoItems] = useState<TipoItemDocument[]>();
  const [inputText, setInputText] = useState<string>("");
  const [descricaoBotao, setDescricaoBotao] = useState<string>("Proximo");
  const [step, setStep] = useState<number>(-1);
  const [stepsOk, setStepsOk] = useState<number[]>([])
  const [descricao, setDescricao] = useState<string>("");
  const [marmitexItems, setMarmitexItems] = useState<MarmitexItem[]>([])

  useEffect(() => {
    fetchTipoItems();
  }, []);

  function fetchTipoItems() {
    fetch("/api/tipoItem").then((res) =>
      res.json().then((items: ITipoItemConsumivel[]) => {
        const data = items.filter((item) => item.exibirPreco === false);
        setTipoItems(data);
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

  function handleStep() {
    if (tipoItems === undefined) {
      return;
    }

    if (step > tipoItems.length) {
      setDescricaoBotao("Salvar")
      return;
    }

    setStep(prevStep => {
      const novoStep = prevStep + 1;
      setStepsOk(prevStepsOk => [...prevStepsOk, novoStep]);
      return novoStep;
    });

    if (step === -1) {
      setDescricao(inputText)
    }

    setInputText("");
    setDescricaoBotao("Ola proximo")
  }

  function handleLabelInputStep(tipo: TipoItemDocument) {
    let descricao = "";

    if (tipoItems == undefined || step === tipoItems.length) {
      return descricao;
    } else if (step === -1) {
      descricao = "Descrição"
    } else if (step === tipoItems.length) {
      descricao = "Salvar"
    } else {
      descricao = tipo.descricao
    }

    return descricao;
  }

  return (
    <div className="flex flex-col justify-center p-3">

      <div className="flex justify-center mb-4">
        <button className="btn btn-primary">Novo marmitex</button>
      </div>

      <div className="flex justify-center">
        <ul className="steps steps-vertical text-xs sm:text-xl sm:steps-horizontal">
          <li className={`step step-secondary`}>Descrição</li>
          {tipoItems.map((tipo, index) => (
            <li key={tipo._id} className={`step ${stepsOk.includes(index) ? "step-secondary" : ""}`}>{tipo.descricao.split(" ")[0]}</li>
          ))}
          <li className={`step ${step === tipoItems.length ? "step-secondary" : ""}`}>Salvar</li>
        </ul>
      </div>

      <div className="flex flex-col items-center mt-4 space-y-4">
        {stepsOk.length === 0 && (
          <div className="">
            <label className="form-control w-full max-w-xs">
              <div className="label">
                <span className="label-text">{handleLabelInputStep({
                  _id: "1",
                  descricao: "Descrição",
                  exibirPreco: false,
                  imagem: "sem imagem"
                })}</span>
              </div>
              <input type="text" value={inputText} onChange={(e) => setInputText(e.target.value)}
                placeholder="Descricao" className="input input-bordered w-full max-w-xs" />
            </label>
          </div>
        )}

        {tipoItems.map((tipo, index) => (
          <div key={tipo._id} className={step === index ? "" : `hidden`}>
            <label className="form-control w-full max-w-xs">
              <div className="label">
                <span className="label-text">{handleLabelInputStep(tipo)}</span>
              </div>
              <input type="text" value={inputText} onChange={(e) => setInputText(e.target.value)}
                placeholder={`Quantidade ${tipo.descricao}`} className="input input-bordered w-full max-w-xs" />
            </label>
          </div>
        ))}

        {step === tipoItems.length && (
          <div className="max-w-lg mx-auto">
            <h2 className="font-bold text-2xl">Resumo</h2>
            <div>
              <h2>Descrição: {descricao}</h2>
            </div>
          </div>
        )}
        <div>

          <h2>Step: {step}</h2>
        </div>

        <div className="flex flex-col space-y-3">
          <button onClick={handleStep} className="btn btn-secondary">{descricaoBotao}</button>
          <Link href={"/admin/marmitex"} className="btn btn-link">Cancelar</Link>
        </div>
      </div>
    </div>
  );
}
