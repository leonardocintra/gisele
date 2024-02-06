"use client";

import IdentificadorDaPagina from "@/app/components/admin/IdentificadorDaPagina";
import { IItemConsumivel } from "@/interfaces/IItemConsumivel";
import { CardapioDocument } from "@/model/Cardapio";
import { ItemConsumivelDocument } from "@/model/ItemConsumivel";
import { redirect, useParams } from "next/navigation";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { URL_API_CARDAPIO, URL_API_ITEM } from '@/constants/constants'

export default function CardapioItemPage() {
  const { id } = useParams();
  const tipo = id;

  const [itensDocument, setItensDocument] =
    useState<ItemConsumivelDocument[]>();
  const [cardapioDocument, setCardapioDocument] =
    useState<CardapioDocument[]>();
  const [itensSelecionados, setItensSelecionado] = useState<string[]>([]);
  const [redirectPage, setRedirectPage] = useState<boolean>(false);



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
          itensNoCardapio.forEach((itemConsumivel: ItemConsumivelDocument) => {
            incluirOuRemoverItemSelecionado(itemConsumivel, true);
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

  function incluirOuRemoverItemSelecionado(
    itemConsumivel: ItemConsumivelDocument,
    carregamentoInicial: boolean = false
  ) {
    const itemId = itemConsumivel._id

    setItensSelecionado((prevItems) => {
      const isItemInArray = prevItems.includes(itemId);


      if (carregamentoInicial) {
        if (isItemInArray) {
          return prevItems;
        } else {
          return [...prevItems, itemId];
        }
      } else {
        if (isItemInArray) {
          // Se o item já estiver no array, remova-o
          return prevItems.filter((item) => item !== itemId);
        } else {
          // Se o item não estiver no array, adicione-o
          return [...prevItems, itemId];
        }
      }
    });
  }

  async function salvar() {
    if (items.length === 0) {
      toast.error("Nao foi possivel carregar os itens");
      return;
    }


    const creationPromise = new Promise<void>(async (resolve, reject) => {

      const itensIdSelecionados = tratamentoDeItensSelecionados();

      if (itensIdSelecionados === undefined) {
        reject();
        return;
      }

      let data: Partial<CardapioDocument> = {
        data: new Date(),
        itens: itensIdSelecionados,
      };

      const method = defineCriarOuAtualizarCardapio();
      if (method === "PUT" && cardapioDocument !== undefined) {
        data = { _id: cardapioDocument[0]._id, ...data };
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
              itensDocument.map((item, index) => (
                <tr
                  key={item._id}
                  onClick={() =>
                    incluirOuRemoverItemSelecionado(item)
                  }
                  className={` ${itensSelecionados.includes(item._id)
                    ? "bg-accent"
                    : "hover:bg-green-200"
                    }`}
                >
                  <td className="font-semibold hover:underline">
                    <div className="">
                      <span>
                        [{index + 1}] {item.descricao}
                      </span>
                    </div>
                  </td>
                  <td>
                    {itensSelecionados.includes(item._id)
                      ? "Desativar"
                      : "Ativar"}
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

  // FUNCOES PRIVADAS

  function defineCriarOuAtualizarCardapio(): string {
    let method = "POST";
    if (cardapioDocument == null ||
      Object.keys(cardapioDocument).length === 0) {
      method = "POST";
    } else {
      method = "PUT";
    }
    return method;
  }

  function tratamentoDeItensSelecionados(): IItemConsumivel[] | undefined {
    let itensIdSelecionados: IItemConsumivel[] = [];
    let itensDeOutroTipo: IItemConsumivel[] = [];
    let idsOutroItem: string[] = [];

    if (cardapioDocument !== undefined && cardapioDocument.length > 0) {
      itensDeOutroTipo = cardapioDocument[0].itens.filter((item) => {
        return item.tipo._id !== tipo;
      });
    }

    if (itensDeOutroTipo.length > 0) {
      itensDeOutroTipo.forEach(element => {
        idsOutroItem.push(element._id)
      });
    }

    for (let i = 0; i < itensSelecionados.length; i++) {
      // Verificar se o item está em 'items'
      let item = items.find((item) => item._id === itensSelecionados[i]);

      // Se não encontrado em 'items', verificar em 'itensDeOutroTipo'
      if (item === undefined || !item) {
        item = itensDeOutroTipo.find((item) => item._id === itensSelecionados[i]);
      }

      // Se ainda não encontrado, exibir um erro e interromper o loop
      if (item === undefined || !item) {
        toast.error(
          "Não foi encontrado o item ID \n Favor, entrar em contato com leonardo.ncintra@outlook.com"
        );
        return;
      }

      // O que precisa mesmo aqui é somente o _id. Mas a inteface obriga a passar o restante dos dados
      itensIdSelecionados.push({
        _id: item._id,
        descricao: item.descricao,
        preco: item.preco,
        tipo: item.tipo,
      });
    }

    return itensIdSelecionados;
  }
}
