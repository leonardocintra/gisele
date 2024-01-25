"use client";

import { ItemConsumivelDocument } from "@/model/ItemConsumivel";
import { TipoItemDocument } from "@/model/TipoItemConsumivel";
import { redirect } from "next/navigation";
import { ChangeEvent, useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function NovoItemPage() {
  const [descricao, setDescricao] = useState<string>("");
  const [preco, setPreco] = useState<number>(0);
  const [tipoItems, setTipoItems] = useState<TipoItemDocument[]>();
  const [tipoItem, setTipoItem] = useState<TipoItemDocument>();
  const [tipoItemSelectError, setTipoItemSelectError] = useState<string>("");
  const [redirectPage, setRedirectPage] = useState<boolean>(false);

  useEffect(() => {
    fetchTipoItems();
  }, []);

  if (redirectPage) {
    return redirect("/admin/item-consumivel/");
  }

  function fetchTipoItems() {
    fetch("/api/tipoItem").then((res) =>
      res.json().then((items) => {
        setTipoItems(items);
      })
    );
  }

  function handleSelectTipoItem(e: ChangeEvent<HTMLSelectElement>) {
    const tipoItemSelecionadoId = e.target.value;

    const tipoItemSelecionado = tipoItems?.find(
      (c) => c._id === tipoItemSelecionadoId
    );
    setTipoItem(tipoItemSelecionado);
  }

  async function handleTipoItem(event: any) {
    event.preventDefault();

    if (descricao === "") {
      toast.error("Descrição não pode ser vazia");
      return;
    }

    if (tipoItem === undefined || tipoItem._id === "0") {
      toast.error("Selecione o tipo ...");
      setTipoItemSelectError("select-error");
      return;
    }

    const creationPromise = new Promise<void>(async (resolve, reject) => {
      const data: Partial<ItemConsumivelDocument> = {
        descricao,
        preco,
        tipo: tipoItem,
      };

      const response = await fetch("/api/item/", {
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
      loading: "Salvando novo item...",
      success: "Novo item salvo com sucesso!",
      error: "Não foi possível criar/editar o item!",
    });
  }

  return (
    <div>
      <form className="max-w-96 mx-auto">
        <label className="form-control w-full">
          <div className="label">
            <span className="label-text">Descrição</span>
          </div>
          <input
            type="text"
            onChange={(e) => setDescricao(e.target.value)}
            value={descricao}
            placeholder="Descrição ..."
            className="input input-bordered w-full"
          />
        </label>

        <label className="form-control w-full">
          <div className="label">
            <span className="label-text">Preço</span>
          </div>
          <input
            type="number"
            min={0}
            onChange={(e) => setPreco(parseFloat(e.target.value))}
            value={preco}
            placeholder="Preço ..."
            className="input input-bordered w-full"
          />
        </label>

        <div className="label">
          <span className="label-text">Tipo de item</span>
        </div>

        {tipoItems && tipoItems.length > 0 && (
          <select
            className={`select select-bordered select-lg w-full ${tipoItemSelectError}`}
            name="tipoItem"
            id="tipoItem"
            value={tipoItem?._id}
            onChange={(e) => handleSelectTipoItem(e)}
          >
            <option value="0">Selecione</option>
            {tipoItems.map((tipo) => (
              <option key={tipo._id} value={tipo._id}>
                {tipo.descricao}
              </option>
            ))}
          </select>
        )}

        <div className="flex justify-center mt-3">
          <button
            type="submit"
            onClick={(e) => handleTipoItem(e)}
            className="btn btn-accent px-16 text-2xl"
          >
            Salvar
          </button>
        </div>
      </form>
    </div>
  );
}
