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
import { Beef, Salad, Soup } from "lucide-react";
import { useEffect, useState } from "react";
import { IItem } from "restaurante";

export default function ListaCardapio() {
  const [itens, setItens] = useState<IItem[]>([]);
  const [cardapio, setCardapio] = useState<IItem[]>([]);

  useEffect(() => {
    // TODO: salvar no bd
    console.log(cardapio);
  }, [cardapio]);

  useEffect(() => {
    fetch("/api/sandra/item")
      .then((response) => response.json())
      .then((data) => setItens(data));

    fetch("/api/sandra/cardapio")
      .then((response) => response.json())
      .then((data) => setCardapio(data));
  }, []);

  if (itens && itens.length < 1) {
    return (
      <div className="flex justify-center">
        <Skeleton />
      </div>
    );
  }

  function itemJaSelecionado(tipo: string, item: string): boolean {
    return cardapio.some((c) => c.tipo === tipo && c.items.includes(item));
  }

  function incluirRemoverItemCardapio(tipo: string, item: string) {
    setCardapio((prevCardapio) =>
      prevCardapio.map((c) => {
        if (c.tipo === tipo) {
          const itemExists = c.items.includes(item);
          return {
            ...c,
            items: itemExists
              ? c.items.filter((i) => i !== item) // Remove o item se existir
              : [...c.items, item], // Adiciona o item se não existir
          };
        }
        return c;
      })
    );
  }

  return (
    <div className="max-w-md mx-auto my-8">
      <Tabs defaultValue="carnes">
        <TabsList className="flex">
          <TabsTrigger value="carnes">
            <Beef /> Carnes
          </TabsTrigger>
          <TabsTrigger value="guarnicao">
            <Soup />
            Guarnicao
          </TabsTrigger>
          <TabsTrigger value="salada">
            <Salad />
            Salada
          </TabsTrigger>
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
                        <TableCell>{renderToggle(item, "carne")}</TableCell>
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
                        <TableCell>{renderToggle(item, "guarnicao")}</TableCell>
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
                        <TableCell>{renderToggle(item, "salada")}</TableCell>
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

  function renderToggle(item: String, tipo: string) {
    return (
      <Switch
        checked={itemJaSelecionado(tipo, item.toString())}
        onCheckedChange={() =>
          incluirRemoverItemCardapio(tipo, item.toString())
        }
        id={item.trim().toLowerCase()}
      />
    );
  }
}
