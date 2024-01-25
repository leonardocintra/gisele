"use client";

import { TipoItemDocument } from "@/model/TipoItemConsumivel";
import Image from "next/image";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function NovoTipoItemPage() {
  const [exibirPreco, setExibirPreco] = useState<boolean>(false);
  const [descricao, setDescricao] = useState<string>("");
  const [imagem, setImagem] = useState<string>("sem-imagem.webp");
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

  async function handleTipoItem(event: any) {
    event.preventDefault();

    if (descricao === "") {
      toast.error("Descrição não pode ser vazia");
      return;
    }

    const creationPromise = new Promise<void>(async (resolve, reject) => {
      const data: Partial<TipoItemDocument> = {
        descricao,
        exibirPreco,
        imagem: `/img/${imagem}`,
      };

      const response = await fetch("/api/tipoItem/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        resolve();
        fetchTipoItems();
        setDescricao("");
        setExibirPreco(false);
        setImagem("sem-imagem.webp");
      } else {
        reject();
      }
    });

    await toast.promise(creationPromise, {
      loading: "Salvando novo tipo de item...",
      success: "Novo tipo de item salvo com sucesso!",
      error: "Não foi possível criar/editar tipo de item!",
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
            <span className="label-text">Imagem</span>
          </div>
          <input
            type="text"
            onChange={(e) => setImagem(e.target.value)}
            value={imagem}
            placeholder="Imagem ..."
            className="input input-bordered w-full"
          />
        </label>

        <div className="flex justify-center space-x-4 my-7">
          <div className="form-control">
            <label className="cursor-pointer label space-x-3">
              <span className="label-text">Exibir o preço ?</span>
              <input
                type="checkbox"
                checked={exibirPreco}
                className="toggle toggle-primary toggle-lg"
                onChange={() => setExibirPreco(!exibirPreco)}
              />
            </label>
          </div>
          <div>
            <span className="font-bold">{exibirPreco ? "Sim" : "Não"}</span>
          </div>
        </div>

        <div className="flex justify-center my-3">
          <button
            type="submit"
            onClick={(e) => handleTipoItem(e)}
            className="btn btn-accent px-16"
          >
            Salvar
          </button>
        </div>
      </form>

      {tipoItems ? (
        <div className="overflow-x-auto max-w-2xl mx-auto mt-8">
          <table className="table table-xs sm:table-md">
            {/* head */}
            <thead>
              <tr>
                <th>Descrição</th>
                <th>Exibi o preço</th>
                <th>Imagem</th>
              </tr>
            </thead>
            <tbody>
              {tipoItems.map((item) => (
                <tr key={item._id}>
                  <td>
                    <div className="flex items-center gap-3">
                      <div className="avatar">
                        <div className="mask mask-squircle w-12 h-12">
                          <Image
                            width={50}
                            height={50}
                            src={item.imagem || "/img/carnes.jpg"}
                            alt={item.descricao}
                          />
                        </div>
                      </div>
                      <div>
                        <div className="font-bold">{item.descricao}</div>
                      </div>
                    </div>
                  </td>
                  <td>{item.exibirPreco ? "SIM" : "NÃO"}</td>
                  <td>{item.imagem || "não informado"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="flex items-center justify-center my-9 p-2">
          <span className="loading loading-spinner loading-lg"></span>
        </div>
      )}
    </div>
  );
}
