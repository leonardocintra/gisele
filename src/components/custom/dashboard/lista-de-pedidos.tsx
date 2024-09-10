"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { PersonStanding, PhoneIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { IPedido } from "restaurante";
import io from "socket.io-client";

export function ListaDePedidos() {
  const [pedidos, setPedidos] = useState<IPedido[]>([]);
  const [temNovoPedido, setTemNovoPedido] = useState(false);

  useEffect(() => {
    // Inicializa a conexão com o socket
    // TODO: alterar para .env
    const socket = io("https://socket-isadora.ypg4r9.easypanel.host");
    //const socket = io("http://localhost:3006");

    // Escuta por novos pedidos
    socket.on("novo-pedido-gerado", (order: IPedido) => {
      setPedidos((prevPedidos) => [...prevPedidos, order]);
      setTemNovoPedido(true);
    });

    // Cleanup na desmontagem do componente
    return () => {
      socket.disconnect();
    };
  }, []);

  useEffect(() => {
    fetch("/api/sandra/pedido")
      .then((res) => res.json())
      .then((data) => {
        setPedidos(data);
      });
  }, []);

  if (!pedidos || pedidos.length === 0) {
    return (
      <div className="text-4xl text-center my-12 text-slate-700">
        <p>Por enquanto não tem nenhum pedido hoje :( </p>
      </div>
    );
  }

  function renderItemsDialog(items: string[]) {
    return (
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="link">Verificar itens</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Passei pra muié montar</DialogTitle>
            <DialogDescription>
              Aqui irá aparecer os itens que o caboclo pediu
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            {items.map((item, index) => (
              <div key={index}>
                <p> - {item}</p>
              </div>
            ))}
          </div>
          <DialogFooter>
            <Button variant={"destructive"} type="button">Cancelar pedido</Button>
            <Button type="button">Imprimir</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <div>
      <div className="max-w-3xl mx-auto">
        <div className="text-center my-2">
          <h2>
            {temNovoPedido
              ? "Opa tem novo pedido"
              : "Não tem novo pedido manin"}
          </h2>
        </div>
        <Table>
          <TableCaption>Ultimos pedidos</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Pedido</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Cliente</TableHead>
              <TableHead>Whatsapp</TableHead>
              <TableHead>Items pedidos</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {pedidos.map((pedido) => (
              <TableRow key={pedido.pedidoId}>
                <TableCell className="font-medium">{pedido.pedidoId}</TableCell>
                <TableCell>
                  <Badge>Pronto</Badge>
                </TableCell>
                <TableCell>
                  <div className="flex space-x-2">
                    <PersonStanding />
                    <div>{pedido.nome}</div>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex space-x-2">
                    <PhoneIcon />
                    <div>{pedido.telefone}</div>
                  </div>
                </TableCell>
                <TableCell>{renderItemsDialog(pedido.items)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
