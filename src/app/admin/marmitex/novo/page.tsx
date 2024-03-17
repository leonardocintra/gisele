"use client";

import TipoItemNaoCadastrado from "@/components/admin/tipo-item-nao-cadastrado";
import {
  URL_API_TIPO_ITEM,
  URL_API_TIPO_MARMITEX,
} from "@/constants/constants";
import { ITipoItemConsumivel } from "@/interfaces/ITipoItemConsumivel";
import { ITipoMarmitex } from "@/interfaces/ITipoMarmitex";
import Link from "next/link";
import { redirect } from "next/navigation";
import { FormEvent, useEffect, useState } from "react";
import toast from "react-hot-toast";

type MarmitexItem = {
  tipo: ITipoItemConsumivel;
  quantidade: number;
};

export default function NovoMarmitexPage() {
  const [tipoItems, setTipoItems] = useState<ITipoItemConsumivel[]>();
  const [descricao, setDescricao] = useState<string>("");
  const [preco, setPreco] = useState<number>(0);
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
    fetch(URL_API_TIPO_ITEM).then((res) =>
      res.json().then((items: ITipoItemConsumivel[]) => {
        const data = items.filter((item) => item.exibirPreco === false);
        setTipoItems(data);
      })
    );
  }

  if (!tipoItems) {
    return (
      <div>
        <h2>Carregando ...</h2>
      </div>
    );
  }

  if (tipoItems.length === 0) {
    return <TipoItemNaoCadastrado />;
  }

  async function salvar(event: FormEvent) {
    event.preventDefault();

    const creationPromise = new Promise<void>(async (resolve, reject) => {
      let data: Partial<ITipoMarmitex> = {
        descricao,
        preco,
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

    const tipo = tipoItems.find((t) => t.id === tipoId);

    if (tipo === undefined) {
      toast.error("Ops ... item não encontrado");
      return;
    }

    const existingItemIndex = marmitex.findIndex(
      (item) => item.tipo.id === tipoId
    );

    if (existingItemIndex !== -1) {
      // Se o tipo já existe no array, atualize apenas a quantidade
      const updatedMarmitex = [...marmitex];
      updatedMarmitex[existingItemIndex].quantidade = quantidade;
      setMarmitex(updatedMarmitex);
    } else {
      // Caso contrário, adicione um novo item ao array
      const newItem: MarmitexItem = {
        quantidade: quantidade,
        tipo,
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
            <input
              type="text"
              value={descricao}
              onChange={(e) => setDescricao(e.target.value)}
              placeholder="Descricao ..."
              className="input input-bordered w-full max-w-xs"
            />
          </label>
        </div>

        <div className="">
          <label className="form-control w-full max-w-xs">
            <div className="label">
              <span className="label-text">Preço marmitex</span>
            </div>
            <input
              type="number"
              value={preco}
              onChange={(e) => setPreco(parseFloat(e.target.value))}
              placeholder="Preço ..."
              className="input input-bordered w-full max-w-xs"
            />
          </label>
        </div>

        {tipoItems.map((tipo) => (
          <div key={tipo.id}>
            <label className="form-control w-full max-w-xs">
              <div className="label">
                <span className="label-text">{tipo.descricao}</span>
              </div>
              <input
                type="number"
                max={9}
                onChange={(e) =>
                  handleMarmitex(parseInt(e.target.value), tipo.id)
                }
                placeholder={`Quantidade ${tipo.descricao}`}
                className="input input-bordered w-full max-w-xs"
              />
            </label>
          </div>
        ))}

        <div className="flex flex-col space-y-3">
          <button
            type="submit"
            onClick={(e) => salvar(e)}
            className="btn btn-secondary"
          >
            Salvar
          </button>
          <Link href={REDIRECT_URL} className="btn btn-link">
            Cancelar
          </Link>
        </div>
      </form>
    </div>
  );
}
