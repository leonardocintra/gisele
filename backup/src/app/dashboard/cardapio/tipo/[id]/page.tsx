"use client";

import IdentificadorDaPagina from "@/app/components/admin/IdentificadorDaPagina";
import { IItemConsumivel } from "@/interfaces/IItemConsumivel";
import { ICardapio } from "@/interfaces/ICardapio";
import { redirect, useParams } from "next/navigation";
import { useState, useEffect } from "react";
import {
  URL_API_CARDAPIO,
  URL_API_ITEM,
  URL_PAGE_DASHBOARD_ITEM_CONSUMIVEL,
} from "@/constants/constants";
import toast from "react-hot-toast";
import AlertaBusca from "@/app/components/admin/AltertaBusca";
import { useUser } from "@clerk/nextjs";
import { getCardapioByOrganizationId } from "@/data/cardapio";

export default function CardapioItemPage() {
  const { user } = useUser();
  const { id } = useParams();

  const [items, setItems] = useState<IItemConsumivel[]>();
  const [cardapios, setCardapios] = useState<ICardapio[]>();
  const [itensSelecionados, setItensSelecionado] = useState<string[]>([]);
  const [redirectPage, setRedirectPage] = useState<boolean>(false);
  const [statusItem, setStatusItem] = useState<number>(0);

  const organiation = user?.organizationMemberships[0].organization;

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (organiation) {
          const cardapioData = await getCardapioByOrganizationId(
            organiation.id
          );
          setCardapios(cardapioData);

          if (cardapioData && cardapioData.length > 0) {
            const itensNoCardapio = cardapioData[0].itens;
            itensNoCardapio.forEach((itemConsumivel: IItemConsumivel) => {
              incluirOuRemoverItemSelecionado(itemConsumivel, true);
            });
          }
        } else {
          setCardapios([]);
        }

        const [resItems] = await Promise.all([
          fetch(`${URL_API_ITEM}/tipo/${id}`),
        ]);

        if (resItems.status === 404) {
          setStatusItem(404);
        }

        const itemsData = await resItems.json();

        setItems(itemsData);
      } catch (error: any) {
        toast.error(error.message);
      }
    };

    fetchData();
  }, [id]);

  if (redirectPage) {
    return redirect(URL_PAGE_DASHBOARD_ITEM_CONSUMIVEL);
  }

  // Observacao: evitar estados derivados (Mais detalhes: https://youtu.be/kCpca2z2cls?t=611)
  const itemsData = items ? items : [];

  function incluirOuRemoverItemSelecionado(
    itemConsumivel: IItemConsumivel,
    carregamentoInicial: boolean = false
  ) {
    const itemId = itemConsumivel.id;

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
    if (itemsData.length === 0 || !organiation) {
      toast.error(
        "Nao foi possivel carregar os itens ou dados do restaurante."
      );
      return;
    }

    const creationPromise = new Promise<void>(async (resolve, reject) => {
      const itensIdSelecionados = tratamentoDeItensSelecionados();

      if (itensIdSelecionados === undefined) {
        reject();
        return;
      }

      let data: Partial<ICardapio> = {
        organizacaoId: organiation.id,
        data: new Date(),
        itens: itensIdSelecionados,
      };

      const method = defineCriarOuAtualizarCardapio();
      if (method === "PUT" && cardapios !== undefined) {
        data = { id: cardapios[0].id, ...data };
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
          descricao={items ? items[0]?.tipo.descricao : "Carregando ..."}
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
            {items && items.length > 0 ? (
              items.map((item, index) => (
                <tr
                  key={item.id}
                  onClick={() => incluirOuRemoverItemSelecionado(item)}
                  className={` ${
                    itensSelecionados.includes(item.id)
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
                    {itensSelecionados.includes(item.id)
                      ? "Desativar"
                      : "Ativar"}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td>
                  <AlertaBusca status={statusItem} descricao="Item" />
                </td>
                <td>
                  <AlertaBusca
                    status={statusItem}
                    descricao="Ativar / Desativar"
                  />
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
    if (cardapios == null || Object.keys(cardapios).length === 0) {
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

    if (cardapios !== undefined && cardapios.length > 0) {
      itensDeOutroTipo = cardapios[0].itens.filter((item) => {
        return item.tipo.id !== id;
      });
    }

    if (itensDeOutroTipo.length > 0) {
      itensDeOutroTipo.forEach((element) => {
        idsOutroItem.push(element.id);
      });
    }

    for (let i = 0; i < itensSelecionados.length; i++) {
      // Verificar se o item está em 'items'
      let item = itemsData.find((item) => item.id === itensSelecionados[i]);

      // Se não encontrado em 'items', verificar em 'itensDeOutroTipo'
      if (item === undefined || !item) {
        item = itensDeOutroTipo.find(
          (item) => item.id === itensSelecionados[i]
        );
      }

      // Se ainda não encontrado, exibir um erro e interromper o loop
      if (item === undefined || !item) {
        toast.error(
          "Não foi encontrado o item ID \n Favor, entrar em contato com leonardo.ncintra@outlook.com"
        );
        return;
      }

      // O que precisa mesmo aqui é somente o id. Mas a inteface obriga a passar o restante dos dados
      itensIdSelecionados.push({
        id: item.id,
        descricao: item.descricao,
        preco: item.preco,
        tipo: item.tipo,
      });
    }

    return itensIdSelecionados;
  }
}
