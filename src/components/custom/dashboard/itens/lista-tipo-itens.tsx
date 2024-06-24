"use client";

import { ChefHatIcon, MoreHorizontal } from "lucide-react";

import { Button } from "@/components/ui/button";
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

export default function ListaTipoItens() {
  const [itens, setItems] = useState<IItemTipo[]>([]);

  useEffect(() => {
    fetch("/api/sandra/tipo-itens")
      .then((res) => res.json())
      .then((data) => {
        setItems(data.data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  if (!itens || itens.length === 0) {
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
    <Card>
      <CardHeader>
        <CardTitle>Itens do restaurante</CardTitle>
        <CardDescription>
          Administre os itens do seu restaurante por tipo
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
              <TableHead className="hidden md:table-cell">Itens</TableHead>
              <TableHead>Modificar</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {itens.map((item) => (
              <TableRow key={item.id}>
                <TableCell className="hidden sm:table-cell">
                  <ChefHatIcon />
                </TableCell>
                <TableCell className="font-medium text-slate-500">#{item.id}</TableCell>
                <TableCell className="font-medium">{item.descricao}</TableCell>
                <TableCell className="hidden md:table-cell">
                  <Link href={`tipo-itens/${item.id}`}>
                    <Button variant={"link"} className="text-destructive">
                      Gerenciar
                    </Button>
                  </Link>
                </TableCell>
                <TableCell>Editar</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
