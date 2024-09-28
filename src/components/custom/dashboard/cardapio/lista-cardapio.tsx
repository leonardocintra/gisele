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
import { ICardapio, IItem } from "restaurante";

export default function ListaCardapio() {
  const MENSAGEM_SALVA = "Cardapio atualizado!";

  const [itens, setItens] = useState<IItem[]>([]);
  const [cardapio, setCardapio] = useState<ICardapio[]>([]);
  const [isInteracting, setIsInteracting] = useState(false);
  const [mensagemSalvamento, setMensagemSalvamento] = useState(MENSAGEM_SALVA);

  useEffect(() => {
    // Função que será chamada para salvar automaticamente após 3 segundos
    const salvarAutomaticamente = () => {
      cardapio.map((c) => {
        insertOrUpdateCardapio(c);
      });
      console.log("Cardapio atualizado!");
    };

    // Defina um temporizador de 3 segundos
    const timer = setTimeout(() => {
      if (isInteracting) {
        salvarAutomaticamente();
        setIsInteracting(false);
        setMensagemSalvamento(MENSAGEM_SALVA); // Reseta o estado de interação
      }
    }, 3000);

    // Limpa o temporizador se o usuário interagir antes de 2 segundos
    return () => clearTimeout(timer);
  }, [cardapio, isInteracting]);

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

  function insertOrUpdateCardapio(cardapio: ICardapio) {
    fetch("/api/sandra/cardapio", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(cardapio),
    });
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
    setIsInteracting(true);
    setMensagemSalvamento("Salvando ...");
  }

  return (
    <div className="max-w-md mx-auto my-8">
      <div className={`text-center my-3 italic text-slate-500`}>
        {mensagemSalvamento}
      </div>

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
                  <TableHead className="text-right">Disponivel</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {itens
                  .filter((tipo) => tipo.tipo === "carne")
                  .flatMap((items) =>
                    items.items.map((item) => (
                      <TableRow key={item.trim().toLowerCase()}>
                        <TableCell>{item}</TableCell>
                        <TableCell className="text-right">
                          {renderToggle(item, "carne")}
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
                  <TableHead className="text-right">Disponivel</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {itens
                  .filter((tipo) => tipo.tipo === "guarnicao")
                  .flatMap((items) =>
                    items.items.map((item) => (
                      <TableRow key={item.trim().toLowerCase()}>
                        <TableCell>{item}</TableCell>
                        <TableCell className="text-right">
                          {renderToggle(item, "guarnicao")}
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
                  <TableHead className="text-right">Disponivel</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {itens
                  .filter((tipo) => tipo.tipo === "salada")
                  .flatMap((items) =>
                    items.items.map((item) => (
                      <TableRow key={item.trim().toLowerCase()}>
                        <TableCell>{item}</TableCell>
                        <TableCell className="text-right">
                          {renderToggle(item, "salada")}
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
