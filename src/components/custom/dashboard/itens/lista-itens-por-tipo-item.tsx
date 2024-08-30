"use client";

import { ChefHatIcon, EditIcon } from "lucide-react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useEffect, useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import Link from "next/link";
import { IItem } from "restaurante";

type ListaItensPorTipoItemProps = {
  tipoItemId: number;
};

export default function ListaItensPorTipoItem({
  tipoItemId,
}: ListaItensPorTipoItemProps) {
  const [itens, setItens] = useState<IItem[]>([]);

  useEffect(() => {
    fetch(`/api/sandra/item/tipoItem/${tipoItemId}`)
      .then((res) => res.json())
      .then((data) => {
        setItens(data.data);
      })
      .catch((err) => {
        // TODO: add toast error
        console.error(err);
      });
  }, [tipoItemId]);

  if (!itens) {
    return (
      <div className="flex flex-col space-y-3 items-center justify-center my-8">
        <Skeleton className="h-[125px] w-[250px] rounded-xl" />
        <div className="space-y-2">
          <Skeleton className="h-4 w-[250px]" />
          <Skeleton className="h-4 w-[200px]" />
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto my-8">
      <Card>
        <CardHeader>
          <CardTitle>{itens[0]?.tipoItem.descricao}</CardTitle>
          <CardDescription>
            Administre {itens[0]?.tipoItem.descricao.toLowerCase()} do seu
            restaurante
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="hidden w-[100px] sm:table-cell">
                  <span className="sr-only">Image</span>
                </TableHead>
                <TableHead># id</TableHead>
                <TableHead>Descrição</TableHead>
                <TableHead>Modificar</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {itens.map((item) => (
                <TableRow key={item.id}>
                  <TableCell className="hidden sm:table-cell">
                    <ChefHatIcon />
                  </TableCell>
                  <TableCell className="font-medium text-slate-500">
                    #{item.id}
                  </TableCell>
                  <TableCell className="font-medium">
                    {item.descricao}
                  </TableCell>
                  <TableCell>
                    <Link href={`/dashboard/item/${item.id}`}>
                      <div className="flex gap-1 items-center hover:underline">
                        Editar
                        <EditIcon />
                      </div>
                    </Link>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
