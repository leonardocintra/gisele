"use client";

import { ChefHatIcon } from "lucide-react";

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
import { IItem } from "restaurante";

export default function ListaTipoItens() {
  const [itens, setItems] = useState<IItem[]>([]);

  useEffect(() => {
    fetch("/api/sandra/item")
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
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

              <TableHead>Tipo</TableHead>
              <TableHead className="hidden md:table-cell">Itens</TableHead>
              <TableHead>Modificar</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {itens.map((item) => (
              <TableRow key={item.tipo}>
                <TableCell className="hidden sm:table-cell">
                  <ChefHatIcon />
                </TableCell>
                <TableCell className="font-medium text-slate-500">
                  {item.tipo}
                </TableCell>
                <TableCell className="hidden md:table-cell">
                  {item.items.map((item, index) => (
                    <div key={index}>
                      <span>{item}</span>
                      <br />
                      <br />
                    </div>
                  ))}
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
