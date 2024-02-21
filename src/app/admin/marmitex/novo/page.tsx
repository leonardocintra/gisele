"use client"

import { URL_API_TIPO_MARMITEX } from "@/constants/constants";
import { ITipoItemConsumivel } from "@/interfaces/ITipoItemConsumivel";
import { TipoItemDocument } from "@/model/TipoItemConsumivel";
import { TipoMarmitexDocument } from "@/model/TipoMarmitex";
import Link from "next/link";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

type MarmitexItem = {
  tipo: TipoItemDocument,
  quantidade: number,
}

export default function NovoMarmitexPage() {

  const [tipoItems, setTipoItems] = useState<TipoItemDocument[]>();
  const [descricao, setDescricao] = useState<string>("");
  const [marmitex, setMarmitex] = useState<MarmitexItem[]>([]);
  const [redirectPage, setRedirectPage] = useState<boolean>(false);
  const REDIRECT_URL = "/admin/marmitex";

  useEffect(() => {
    fetchTipoItems();
  }, []);

  if (redirectPage) {
    return redirect(REDIRECT_URL);
  }

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

  async function salvar(event: any) {
    event.preventDefault();

    const creationPromise = new Promise<void>(async (resolve, reject) => {

      let data: Partial<TipoMarmitexDocument> = {
        descricao,
        ativo: true,
        configuracoes: marmitex,
      };

      const response = await fetch(URL_API_TIPO_MARMITEX, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        resolve();
        setRedirectPage(true);
      } else {
        reject();
      }
    });

    await toast.promise(creationPromise, {
      loading: "Salvando novo marmitex...",
      success: "Novo marmitex salvo com sucesso!",
      error: "Não foi possível criar/editar o marmitex!",
    });

    setRedirectPage(true);
  }

  function handleMarmitex(quantidade: number, tipoId: string) {
    if (tipoItems === undefined || Number.isNaN(quantidade)) {
      return;
    }

    const tipo = tipoItems.find((t) => t._id === tipoId);

    if (tipo === undefined) {
      toast.error('Ops ... item não encontrado');
      return;
    }

    const existingItemIndex = marmitex.findIndex((item) => item.tipo._id === tipoId);

    if (existingItemIndex !== -1) {
      // Se o tipo já existe no array, atualize apenas a quantidade
      const updatedMarmitex = [...marmitex];
      updatedMarmitex[existingItemIndex].quantidade = quantidade;
      setMarmitex(updatedMarmitex);
    } else {
      // Caso contrário, adicione um novo item ao array
      const newItem: MarmitexItem = {
        quantidade: quantidade,
        tipo
      };
      setMarmitex([...marmitex, newItem]);
    }
  }

  return (
    <div className="flex flex-col justify-center p-3">

      <div className="flex justify-center mb-4">
        <button className="btn btn-primary">Novo marmitex</button>
      </div>


      <form className="flex flex-col items-center mt-4 space-y-4">
        <div className="">
          <label className="form-control w-full max-w-xs">
            <div className="label">
              <span className="label-text">Descrição marmitex</span>
            </div>
            <input type="text" value={descricao} onChange={(e) => setDescricao(e.target.value)}
              placeholder="Descricao ..." className="input input-bordered w-full max-w-xs" />
          </label>
        </div>

        {tipoItems.map((tipo) => (
          <div key={tipo._id}>
            <label className="form-control w-full max-w-xs">
              <div className="label">
                <span className="label-text">{tipo.descricao}</span>
              </div>
              <input type="number" max={9} onChange={(e) => handleMarmitex(parseInt(e.target.value), tipo._id)}
                placeholder={`Quantidade ${tipo.descricao}`} className="input input-bordered w-full max-w-xs" />
            </label>
          </div>
        ))}

        <div className="flex flex-col space-y-3">
          <button type="submit" onClick={(e) => salvar(e)} className="btn btn-secondary">Salvar</button>
          <Link href={REDIRECT_URL} className="btn btn-link">Cancelar</Link>
        </div>
      </form>
    </div>
  );
}
