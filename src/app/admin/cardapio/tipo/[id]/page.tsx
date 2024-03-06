"use client";

import IdentificadorDaPagina from "@/app/components/admin/IdentificadorDaPagina";
import { IItemConsumivel } from "@/interfaces/IItemConsumivel";
import { ICardapio } from "@/interfaces/ICardapio";
import { redirect, useParams } from "next/navigation";
import { useState, useEffect } from "react";
import { URL_API_CARDAPIO, URL_API_ITEM, URL_PAGE_ADMIN_ITEM_CONSUMIVEL } from '@/constants/constants'
import toast from "react-hot-toast";
import AlertaBusca from "@/app/components/admin/AltertaBusca";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";

export default function CardapioItemPage() {
  const { id } = useParams();

  const [items, setItems] = useState<IItemConsumivel[]>();
  const [cardapioDocument, setCardapioDocument] = useState<ICardapio[]>();
  const [itensSelecionados, setItensSelecionado] = useState<string[]>([]);
  const [redirectPage, setRedirectPage] = useState<boolean>(false);
  const [statusItem, setStatusItem] = useState<number>(0);


  useEffect(() => {

    const fetchData = async () => {
      try {
        const [resCardapio, resItems] = await Promise.all([
          fetch(URL_API_CARDAPIO),
          fetch(`${URL_API_ITEM}/tipo/${id}`),
        ]);

        if (resItems.status === 404) {
          setStatusItem(404);
        }

        const cardapioData = await resCardapio.json();
        const itemsData = await resItems.json();

        setCardapioDocument(cardapioData);
        setItems(itemsData);

        if (cardapioData.length > 0) {
          const itensNoCardapio = cardapioData[0].itens;
          itensNoCardapio.forEach((itemConsumivel: IItemConsumivel) => {
            incluirOuRemoverItemSelecionado(itemConsumivel, true);
          });
        }
      } catch (error: any) {
        toast.error(error.message);
      }
    };

    fetchData();
  }, []);


  if (redirectPage) {
    return redirect(URL_PAGE_ADMIN_ITEM_CONSUMIVEL);
  }

  // Observacao: evitar estados derivados (Mais detalhes: https://youtu.be/kCpca2z2cls?t=611)
  const itemsData = items ? items : [];

  function incluirOuRemoverItemSelecionado(
    itemConsumivel: IItemConsumivel,
    carregamentoInicial: boolean = false
  ) {
    const itemId = itemConsumivel.id

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
    if (itemsData.length === 0) {
      toast.error("Nao foi possivel carregar os itens");
      return;
    }


    const creationPromise = new Promise<void>(async (resolve, reject) => {

      const itensIdSelecionados = tratamentoDeItensSelecionados();

      if (itensIdSelecionados === undefined) {
        reject();
        return;
      }

      let data: Partial<ICardapio> = {
        data: new Date(),
        itens: itensIdSelecionados,
      };

      const method = defineCriarOuAtualizarCardapio();
      if (method === "PUT" && cardapioDocument !== undefined) {
        data = { id: cardapioDocument[0].id, ...data };
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

  if (!items) {
    return (
      <div>
        <h2>Carregando ...</h2>
      </div>
    )
  }

  return (
    <div>
      <div className="my-4">
        <IdentificadorDaPagina
          descricao={
            items ? items[0]?.tipo.descricao : "Carregando ..."
          }
        />
      </div>

      <div className="flex items-center justify-center my-3">
        <Button onClick={() => salvar()}>
          Salvar
        </Button>
      </div>

      <div className="flex max-w-md mx-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Item</TableHead>
              <TableHead>Ativar / Desativar</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {items.map((item, index) => (
              <TableRow key={item.id}
                className={`${itensSelecionados.includes(item.id) ? "bg-green-400" : "hover:bg-green-100"}`}
                onClick={() => incluirOuRemoverItemSelecionado(item)}>
                <TableCell>
                  {item.descricao}</TableCell>
                <TableCell>
                  {itensSelecionados.includes(item.id)
                    ? "Desativar"
                    : "Ativar"}
                </TableCell>
              </TableRow>

            ))}
          </TableBody>
        </Table>
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
        return item.tipo.id !== id;
      });
    }

    if (itensDeOutroTipo.length > 0) {
      itensDeOutroTipo.forEach(element => {
        idsOutroItem.push(element.id)
      });
    }

    for (let i = 0; i < itensSelecionados.length; i++) {
      // Verificar se o item está em 'items'
      let item = itemsData.find((item) => item.id === itensSelecionados[i]);

      // Se não encontrado em 'items', verificar em 'itensDeOutroTipo'
      if (item === undefined || !item) {
        item = itensDeOutroTipo.find((item) => item.id === itensSelecionados[i]);
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
