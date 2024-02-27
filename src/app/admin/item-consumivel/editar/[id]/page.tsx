"use client";

import { URL_PAGE_ADMIN_ITEM_CONSUMIVEL, URL_API_TIPO_ITEM, URL_API_ITEM } from "@/constants/constants";
import { IItemConsumivel } from "@/interfaces/IItemConsumivel";
import { ITipoItemConsumivel } from "@/interfaces/ITipoItemConsumivel";
import { redirect, useParams } from "next/navigation";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function EditarItemPage() {

  const { id } = useParams();

  const [descricao, setDescricao] = useState<string>("");
  const [preco, setPreco] = useState<number>(0);
  const [tipoItems, setTipoItems] = useState<ITipoItemConsumivel[]>();
  const [tipoItem, setTipoItem] = useState<ITipoItemConsumivel>();
  const [item, setItem] = useState<IItemConsumivel>();
  const [tipoItemSelectError, setTipoItemSelectError] = useState<string>("");
  const [redirectPage, setRedirectPage] = useState<boolean>(false);
  const [statusItem, setStatusItem] = useState<number>(0);

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (item) {
      setDescricao(item.descricao);
      setPreco(item.preco);
      setTipoItem(item.tipo);
    }
  }, [item])

  const fetchData = async () => {
    try {
      const [resTipoItem, resItem] = await Promise.all([
        fetch(URL_API_TIPO_ITEM),
        fetch(`${URL_API_ITEM}/${id}`),
      ]);

      if (resItem.status === 404) {
        setStatusItem(404);
      }

      const tiposData: ITipoItemConsumivel[] = await resTipoItem.json();
      const itemData: IItemConsumivel = await resItem.json();

      setTipoItems(tiposData);
      setItem(itemData);
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  if (redirectPage) {
    return redirect(URL_PAGE_ADMIN_ITEM_CONSUMIVEL);
  }

  function handleSelectTipoItem(e: ChangeEvent<HTMLSelectElement>) {
    const tipoItemSelecionadoId = e.target.value;

    const tipoItemSelecionado = tipoItems?.find(
      (c) => c.id === tipoItemSelecionadoId
    );
    setTipoItem(tipoItemSelecionado);
  }

  async function salvar(event: FormEvent) {
    event.preventDefault();

    if (descricao === "") {
      toast.error("Descrição não pode ser vazia");
      return;
    }

    if (tipoItem === undefined || tipoItem.id === "0") {
      toast.error("Selecione o tipo ...");
      setTipoItemSelectError("select-error");
      return;
    }

    if (item === undefined) {
      toast.error("Ocorreu um erro ao buscar dados do item ...");
      return;
    }

    const creationPromise = new Promise<void>(async (resolve, reject) => {
      const data: IItemConsumivel = {
        id: item.id,
        descricao,
        preco,
        tipo: tipoItem,
      };

      const response = await fetch(URL_API_ITEM, {
        method: "PUT",
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
      loading: "Atualizando o item...",
      success: "Novo item atualizado com sucesso!",
      error: "Não foi possível atualizar o item!",
    });
  }

  return (
    <div>
      <div className="text-center text-3xl font-extralight my-5">
        Atualizar o item {item?.descricao}
      </div>
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
            value={tipoItem?.id}
            onChange={(e) => handleSelectTipoItem(e)}
          >
            <option value="0">Selecione</option>
            {tipoItems.map((tipo) => (
              <option key={tipo.id} value={tipo.id}>
                {tipo.descricao}
              </option>
            ))}
          </select>
        )}

        <div className="flex justify-center mt-3">
          <button
            type="submit"
            onClick={(e) => salvar(e)}
            className="btn btn-accent px-16 text-2xl"
          >
            Salvar
          </button>
        </div>
      </form>
    </div>
  );
}
