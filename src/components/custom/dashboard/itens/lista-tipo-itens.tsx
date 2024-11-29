"use client";

import { Beef, ChefHatIcon, Salad, Soup } from "lucide-react";

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
import { IItem } from "restaurante";
import { useOrganizationKinde } from "@/components/context/kinde-organization";
import NoDataMessage from "../commons/no-data-message";

export default function ListaTipoItens() {
  const organization = useOrganizationKinde();
  const [itens, setItems] = useState<IItem[]>([]);

  useEffect(() => {
    fetch(`/api/sandra/item?restauranteId=${organization?.orgCode}`)
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
      })
      .then((data) => {
        setItems(data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  if (!itens) {
    return <NoDataMessage description="Você não possui itens cadastrados." />;
  }

  function getIcon(tipo: string) {
    switch (tipo) {
      case "carne":
        return <Beef />;
      case "guarnicao":
        return <Soup />;
      case "salada":
        return <Salad />;
      default:
        return <ChefHatIcon />;
    }
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
                  {getIcon(item.tipo)}
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
