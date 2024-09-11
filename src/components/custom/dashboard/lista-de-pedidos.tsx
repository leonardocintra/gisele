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
    const timer = setTimeout(() => {
      setTemNovoPedido(false);
    }, 3000);

    // Limpa o timer quando o componente é desmontado
    return () => clearTimeout(timer);
  });

  useEffect(() => {
    // Inicializa a conexão com o socket
    const socket = io(process.env.NEXT_PUBLIC_ISADORA_SOCKET_URL as string);

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
    fetch("/api/sandra/pedido", { cache: "no-cache" })
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

  function renderItemsDialog(items: string[], nomeCliente: string) {
    return (
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="link">Verificar itens </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Cliente: {nomeCliente}</DialogTitle>
            <DialogDescription>
              Itens carne, guarnições e salada do pedido
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
            <Button variant={"destructive"} type="button">
              Cancelar pedido
            </Button>
            <Button type="button">Imprimir</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <div>
      <div className="max-w-3xl mx-auto">
        <div className="text-center my-2 italic text-slate-500">
          {temNovoPedido ? (
            <div className="text-green-700 font-bold">Novo pedidooo!!</div>
          ) : (
            <div>Aguardando novos pedidos ...</div>
          )}
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
                    <div>
                      {pedido.nome} {pedido.sobrenome}
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex space-x-2">
                    <PhoneIcon />
                    <div>{pedido.telefone}</div>
                  </div>
                </TableCell>
                <TableCell>
                  {renderItemsDialog(pedido.items, pedido.nome)}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
