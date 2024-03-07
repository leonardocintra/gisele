"use client";

import { SkeletonGisele } from "@/components/gisele/skeleton";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import { URL_API_ITEM, URL_API_TIPO_ITEM, URL_PAGE_ADMIN_ITEM_CONSUMIVEL } from "@/constants/constants";
import { IItemConsumivel } from "@/interfaces/IItemConsumivel";
import { ITipoItemConsumivel } from "@/interfaces/ITipoItemConsumivel";
import { redirect } from "next/navigation";
import { FormEvent, useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function NovoItemPage() {
  const [descricao, setDescricao] = useState<string>("");
  const [preco, setPreco] = useState<number>(0);
  const [tipoItems, setTipoItems] = useState<ITipoItemConsumivel[]>();
  const [tipoItem, setTipoItem] = useState<ITipoItemConsumivel>();
  const [redirectPage, setRedirectPage] = useState<boolean>(false);

  useEffect(() => {
    fetchTipoItems();
  }, []);

  if (redirectPage) {
    return redirect(URL_PAGE_ADMIN_ITEM_CONSUMIVEL);
  }

  function fetchTipoItems() {
    fetch(URL_API_TIPO_ITEM).then((res) =>
      res.json().then((items) => {
        setTipoItems(items);
      })
    );
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

    const creationPromise = new Promise<void>(async (resolve, reject) => {
      const data: Partial<IItemConsumivel> = {
        descricao,
        preco,
        tipo: tipoItem,
      };

      const response = await fetch(URL_API_ITEM, {
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

  if (!tipoItems) {
    return (
      <div className="max-w-96 mx-auto mt-5">
        <SkeletonGisele />
      </div>
    )
  }

  return (
    <div>
      <form className="max-w-96 mx-auto">
        <Label htmlFor="descricao">Descrição:</Label>
        <Input
          id="descricao"
          type="text"
          onChange={(e) => setDescricao(e.target.value)}
          value={descricao}
          placeholder="Descrição ..."
        />

        <Label htmlFor="preco">Preço:</Label>
        <Input
          id="preco"
          type="number"
          min={0}
          onChange={(e) => setPreco(parseFloat(e.target.value))}
          value={preco}
          placeholder="Preço ..."
        />

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
          <Button type="submit" onClick={(e) => salvar(e)}>
            Salvar
          </Button>
        </div>
      </form>
    </div>
  );
}
