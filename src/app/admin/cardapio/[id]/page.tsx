"use client";

import IdentificadorDaPagina from "@/app/components/admin/IdentificadorDaPagina";
import { IItemConsumivel } from "@/interfaces/IItemConsumivel";
import { CardapioDocument } from "@/model/Cardapio";
import { ItemConsumivelDocument } from "@/model/ItemConsumivel";
import { redirect, useParams } from "next/navigation";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";

export default function CardapioItemPage() {
  const { id } = useParams();
  const tipo = id;

  const [itensDocument, setItensDocument] =
    useState<ItemConsumivelDocument[]>();
  const [cardapioDocument, setCardapioDocument] = useState<CardapioDocument>();
  const [itemsCardapio, setItemsCardapio] = useState<string[]>([]);
  const [redirectPage, setRedirectPage] = useState<boolean>(false);

  const URL_API_CARDAPIO = "/api/cardapio";
  const URL_API_ITEM = "/api/item";

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [resCardapio, resItems] = await Promise.all([
          fetch(URL_API_CARDAPIO),
          fetch(`${URL_API_ITEM}/${tipo}`),
        ]);

        const cardapioData = await resCardapio.json();
        const itemsData = await resItems.json();

        setCardapioDocument(cardapioData);
        setItensDocument(itemsData);

        if (cardapioData.length > 0) {
          const itensNoCardapio = cardapioData[0].itens;
          itensNoCardapio.forEach((element: any) => {
            incluirOuRemoverItemSelecionado(element._id);
          });
        }
      } catch (error: any) {
        toast.error(error.message);
      }
    };

    fetchData();
  }, [tipo]);

  if (redirectPage) {
    return redirect("/admin/item-consumivel/");
  }

  // Observacao: evitar estados derivados (Mais detalhes: https://youtu.be/kCpca2z2cls?t=611)
  const items = itensDocument ? itensDocument : [];

  function handleItemCardapio(itemId: string) {
    incluirOuRemoverItemSelecionado(itemId);
  }

  function incluirOuRemoverItemSelecionado(itemId: string) {
    setItemsCardapio((prevItems) => {
      const isItemInArray = prevItems.includes(itemId);

      if (isItemInArray) {
        // Se o item já estiver no array, remova-o
        console.log("incluido");
        return prevItems.filter((item) => item !== itemId);
      } else {
        // Se o item não estiver no array, adicione-o
        console.log("removido");
        return [...prevItems, itemId];
      }
    });
    console.log(itemsCardapio);
  }

  async function salvar() {
    if (items.length === 0) {
      toast.error("Nao foi possivel carregar os itens");
      return;
    }

    let method = "POST";
    if (
      cardapioDocument == null ||
      Object.keys(cardapioDocument).length === 0
    ) {
      method = "POST";
    } else {
      method = "PUT";
    }

    let itensSelecionados: IItemConsumivel[] = [];
    for (let i = 0; i < itemsCardapio.length; i++) {
      const item = items.find((item) => item._id === itemsCardapio[i]);

      if (!item) {
        toast.error("Erro: não encontrado o item id");
        return;
      }

      itensSelecionados.push({
        descricao: item.descricao,
        preco: item.preco,
        tipo: item.tipo,
      });
    }

    const creationPromise = new Promise<void>(async (resolve, reject) => {
      let data: Partial<CardapioDocument> = {
        data: new Date(),
        itens: itensSelecionados,
      };

      if (method === "PUT" && cardapioDocument !== undefined) {
        data = { _id: cardapioDocument._id };
      }

      const response = await fetch(URL_API_CARDAPIO, {
        method,
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
      <div className="my-4">
        <IdentificadorDaPagina
          descricao={
            itensDocument ? itensDocument[0]?.tipo.descricao : "Carregando ..."
          }
        />
      </div>

      <div className="flex items-center justify-center my-3">
        <button type="button" className="btn px-10" onClick={() => salvar()}>
          Salvar
        </button>
      </div>

      <div className="overflow-x-auto max-w-xl mx-auto">
        <table className="table">
          <thead>
            <tr>
              <th>Item</th>
              <th>Ativar/Desativar</th>
            </tr>
          </thead>
          <tbody>
            {itensDocument && itensDocument.length > 0 ? (
              itensDocument.map((item) => (
                <tr
                  key={item._id}
                  onClick={() => handleItemCardapio(item._id)}
                  className={` ${
                    itemsCardapio.includes(item._id)
                      ? "bg-accent"
                      : "hover:bg-green-200"
                  }`}
                >
                  <td className="font-semibold hover:underline">
                    {item.descricao}
                  </td>
                  <td>
                    {itemsCardapio.includes(item._id) ? "Desativar" : "Ativar"}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td>
                  <span className="loading loading-spinner loading-md"></span>
                </td>
                <td>
                  <span className="loading loading-spinner loading-md"></span>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
