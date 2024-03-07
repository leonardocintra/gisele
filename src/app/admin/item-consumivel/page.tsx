"use client";

import IdentificadorDaPagina from "@/app/components/admin/IdentificadorDaPagina";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { IItemConsumivel } from "@/interfaces/IItemConsumivel";
import Link from "next/link";
import { useEffect, useState } from "react";

const TMP_URL = "/api/firebase/item";

export default function AdminItemConsumivelPage() {
  const [items, setItems] = useState<IItemConsumivel[]>();
  const [statusItems, setStatusItems] = useState<number>(0);

  useEffect(() => {
    fetchItems();
  }, []);

  function fetchItems() {
    fetch(TMP_URL).then((res) => {
      if (res.status === 404) {
        setStatusItems(404)
      } else if (res.status === 200) {
        res.json().then((items) => {
          setItems(items);
        })
      } else {
        setStatusItems(500);
      }
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
      <div>
        <IdentificadorDaPagina descricao="Itens vendidos" />
        <div className="flex justify-center my-3 space-x-2">
          <Button>
            <Link href={"/admin/item-consumivel/novo-tipo-item"}            >
              Tipo de item
            </Link>
          </Button>
          <Button>
            <Link href={"/admin/item-consumivel/novo-item"}          >
              Item consumivel
            </Link>
          </Button>
        </div>
      </div>

      <div className="flex max-w-md mx-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Descrição</TableHead>
              <TableHead>Tipo</TableHead>
              <TableHead>Detalhes</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {items.sort((a, b) => a.descricao.localeCompare(b.descricao)).map((item) => (
              <TableRow key={item.id}>
                <TableCell>{item.descricao}</TableCell>
                <TableCell>{item.tipo.descricao}</TableCell>
                <TableCell>
                  <Button size={"sm"} variant={"destructive"}>
                    <Link href={`/admin/item-consumivel/editar/${item.id}`}>Editar</Link>
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
