"use client"

import { SkeletonGisele } from "@/components/gisele/skeleton";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { URL_API_TIPO_ITEM, URL_API_TIPO_MARMITEX } from "@/constants/constants";
import { ITipoItemConsumivel } from "@/interfaces/ITipoItemConsumivel";
import { ITipoMarmitex } from "@/interfaces/ITipoMarmitex";
import Link from "next/link";
import { redirect } from "next/navigation";
import { FormEvent, useEffect, useState } from "react";
import toast from "react-hot-toast";

type MarmitexItem = {
  tipo: ITipoItemConsumivel,
  quantidade: number,
}

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

  if (!tipoItems || tipoItems.length === 0) {
    return (
      <div>
        <SkeletonGisele />
      </div>
    )
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
      toast.error('Ops ... item não encontrado');
      return;
    }

    const existingItemIndex = marmitex.findIndex((item) => item.tipo.id === tipoId);

    if (existingItemIndex !== -1) {
      // Se o tipo já existe no array, atualize apenas a quantidade
      const updatedMarmitex = [...marmitex];
      updatedMarmitex[existingItemIndex].quantidade = quantidade;
      setMarmitex(updatedMarmitex);
    } else {
      // Caso contrário, adicione um novo item ao array
      const newItem: MarmitexItem = {
        quantidade: quantidade,
        tipo
      };
      setMarmitex([...marmitex, newItem]);
    }
  }

  return (
    <div className="flex flex-col justify-center p-3">
      <form className="flex flex-col items-center mt-4 space-y-4">
        <div className="">
          <Label>Descrição Marmitex</Label>
          <Input type="text" value={descricao} onChange={(e) => setDescricao(e.target.value)}
            placeholder="Descricao ..." />
        </div>

        <div className="">
          <Label>Preço do marmitex</Label>
          <Input type="number" value={preco} onChange={(e) => setPreco(parseFloat(e.target.value))}
            placeholder="Preço ..." />
        </div>

        {tipoItems.map((tipo) => (
          <div key={tipo.id}>
            <Label>{tipo.descricao}</Label>
            <Input type="number" max={9} onChange={(e) => handleMarmitex(parseInt(e.target.value), tipo.id)}
              placeholder={`Quantidade ${tipo.descricao} ...`} />
          </div>
        ))}

        <div className="flex flex-col space-y-3">
          <Button type="submit" onClick={(e) => salvar(e)}>
            Salvar
          </Button>
          
          <Button variant={"link"}>
            <Link href={REDIRECT_URL}>Cancelar</Link>
          </Button>
        </div>
      </form>
    </div>
  );
}
