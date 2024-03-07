"use client";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { URL_API_TIPO_ITEM } from "@/constants/constants";
import { ITipoItemConsumivel } from "@/interfaces/ITipoItemConsumivel";
import Image from "next/image";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function NovoTipoItemPage() {
  const [exibirPreco, setExibirPreco] = useState<boolean>(false);
  const [descricao, setDescricao] = useState<string>("");
  const [statusTipoItems, setStatusTipoItems] = useState<number>(0);
  const [imagem, setImagem] = useState<string>("sem-imagem.webp");
  const [tipoItems, setTipoItems] = useState<ITipoItemConsumivel[]>();

  useEffect(() => {
    fetchTipoItems();
  }, []);

  function fetchTipoItems() {
    fetch(URL_API_TIPO_ITEM).then((res) => {
      if (res.status === 404) {
        setStatusTipoItems(404)
      } else if (res.status === 200) {
        res.json().then((items) => {
          setTipoItems(items);
        })
      } else {
        setStatusTipoItems(500);
      }
    }
    );
  }

  async function handleTipoItem(event: any) {
    event.preventDefault();

    if (descricao === "") {
      toast.error("Descrição não pode ser vazia");
      return;
    }

    const creationPromise = new Promise<void>(async (resolve, reject) => {
      const data: Partial<ITipoItemConsumivel> = {
        descricao,
        exibirPreco,
        imagem: `/img/${imagem}`,
      };

      const response = await fetch(URL_API_TIPO_ITEM, {
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

  if (!tipoItems) {
    return (
      <div>
        <h2>Carregando...</h2>
      </div>
    )
  }

  return (
    <div>
      <form className="max-w-96 mx-auto space-y-2">
        <div>
          <Label>Descrição</Label>
          <Input type="text"
            onChange={(e) => setDescricao(e.target.value)}
            value={descricao}
            placeholder="Descrição ..." />
        </div>

        <div>
          <Label>Imagem</Label>
          <Input type="text"
            onChange={(e) => setImagem(e.target.value)}
            value={imagem}
            placeholder="Imagem ..." />
        </div>

        <div className="flex items-center space-x-2 py-4 pl-1">
          <Checkbox id="exibirPreco" checked={exibirPreco} onClick={() => setExibirPreco(!exibirPreco)} />
          <label
            htmlFor="exibirPreco"
            className="font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            Exibir o preço do item: {exibirPreco ? "SIM" : "NÃO"}
          </label>
        </div>

        <div className="flex justify-center my-3">
          <Button type="submit" onClick={(e) => handleTipoItem(e)}>
            Salvar
          </Button>
        </div>
      </form>

      <div className="flex max-w-md mx-auto mt-4">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Descrição</TableHead>
              <TableHead>Preço</TableHead>
              <TableHead>Imagem</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {tipoItems.map((item, index) => (
              <TableRow key={item.id}>
                <TableCell>{item.descricao}</TableCell>
                <TableCell>{item.exibirPreco ? "SIM" : "NÃO"}</TableCell>
                <TableCell>
                  <Image
                    width={50}
                    height={50}
                    src={item.imagem || "/img/carnes.jpg"}
                    alt={item.descricao}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
