"use client";

import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Switch } from "@/components/ui/switch";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useEffect, useState } from "react";
import { IItem } from "restaurante";

export default function ListaCardapio() {
  const [itens, setItens] = useState<IItem[]>([]);

  useEffect(() => {
    fetch("/api/sandra/item")
      .then((response) => response.json())
      .then((data) => setItens(data));
  }, []);

  if (itens && itens.length < 1) {
    return (
      <div className="flex justify-center">
        <Skeleton />
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto my-8">
      <Tabs defaultValue="carnes">
        <TabsList className="flex">
          <TabsTrigger value="carnes">Carnes</TabsTrigger>
          <TabsTrigger value="guarnicao">Guarnicao</TabsTrigger>
          <TabsTrigger value="salada">Salada</TabsTrigger>
        </TabsList>

        <TabsContent value="carnes">
          <Card>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Carne</TableHead>
                  <TableHead>Disponivel</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {itens
                  .filter((tipo) => tipo.tipo === "carne")
                  .flatMap((items) =>
                    items.items.map((item) => (
                      <TableRow key={item.trim().toLowerCase()}>
                        <TableCell>{item}</TableCell>
                        <TableCell>
                          <Switch id={item.trim().toLowerCase()} />
                        </TableCell>
                      </TableRow>
                    ))
                  )}
              </TableBody>
            </Table>
          </Card>
        </TabsContent>

        <TabsContent value="guarnicao">
          <Card>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Guarnição</TableHead>
                  <TableHead>Disponivel</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {itens
                  .filter((tipo) => tipo.tipo === "guarnicao")
                  .flatMap((items) =>
                    items.items.map((item) => (
                      <TableRow key={item.trim().toLowerCase()}>
                        <TableCell>{item}</TableCell>
                        <TableCell>
                          <Switch id={item.trim().toLowerCase()} />
                        </TableCell>
                      </TableRow>
                    ))
                  )}
              </TableBody>
            </Table>
          </Card>
        </TabsContent>

        <TabsContent value="salada">
          <Card>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Saladas</TableHead>
                  <TableHead>Disponivel</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {itens
                  .filter((tipo) => tipo.tipo === "salada")
                  .flatMap((items) =>
                    items.items.map((item) => (
                      <TableRow key={item.trim().toLowerCase()}>
                        <TableCell>{item}</TableCell>
                        <TableCell>
                          <Switch id={item.trim().toLowerCase()} />
                        </TableCell>
                      </TableRow>
                    ))
                  )}
              </TableBody>
            </Table>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
