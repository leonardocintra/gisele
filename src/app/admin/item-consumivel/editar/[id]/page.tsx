"use client";

import { SkeletonGisele } from "@/components/gisele/skeleton";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import { URL_PAGE_ADMIN_ITEM_CONSUMIVEL, URL_API_TIPO_ITEM, URL_API_ITEM } from "@/constants/constants";
import { IItemConsumivel } from "@/interfaces/IItemConsumivel";
import { ITipoItemConsumivel } from "@/interfaces/ITipoItemConsumivel";
import { redirect, useParams } from "next/navigation";
import { FormEvent, useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function EditarItemPage() {

  const { id } = useParams();

  const [descricao, setDescricao] = useState<string>("");
  const [preco, setPreco] = useState<number>(0);
  const [tipoItems, setTipoItems] = useState<ITipoItemConsumivel[]>();
  const [tipoItem, setTipoItem] = useState<ITipoItemConsumivel>();
  const [item, setItem] = useState<IItemConsumivel>();
  const [redirectPage, setRedirectPage] = useState<boolean>(false);

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

  function handleSelectTipoItem(tipoItemSelecionadoId: string) {
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

  if (item && tipoItems && tipoItems.length > 0) {
    return (
      <div className="max-w-96 mx-auto">

        <div className="text-center text-3xl font-extralight my-5 border rounded-full p-2">
          Editar
          <span className="italic"> {item?.descricao} </span>
        </div>
        <form className="space-y-2">

          <div>
            <Label htmlFor="descricao">Descrição:</Label>
            <Input
              id="descricao"
              type="text"
              onChange={(e) => setDescricao(e.target.value)}
              value={descricao}
              placeholder="Descrição ..."
            />
          </div>

          <div>
            <Label htmlFor="preco">Preço:</Label>
            <Input id="preco" type="number" min={0} onChange={(e) => setPreco(parseFloat(e.target.value))}
              value={preco}
              placeholder="Preço ..." />
          </div>

          <div className="pt-2">
            <Select value={tipoItem?.id} onValueChange={(tipoItemId) => handleSelectTipoItem(tipoItemId)}>
              <SelectTrigger>
                <SelectValue placeholder="Tipo de item" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Item</SelectLabel>
                  {tipoItems.map((tipo) => (
                    <SelectItem key={tipo.id} value={tipo.id}>{tipo.descricao}</SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

          <div className="flex justify-center mt-3">
            <Button size={"lg"} type="submit" onClick={(e) => salvar(e)}>
              Salvar
            </Button>
          </div>
        </form>
      </div>
    );
  } else {
    return (
      <div className="max-w-96 mx-auto">
        <SkeletonGisele />
      </div>
    )
  }
}
