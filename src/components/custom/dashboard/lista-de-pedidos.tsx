"use client";

import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { PersonStanding, PhoneIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { IPedido } from "restaurante";

export function ListaDePedidos() {
  const [pedidos, setPedidos] = useState<IPedido[]>([]);

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

  return (
    <div>
      <div className="max-w-2xl mx-auto">
        <Table>
          <TableCaption>Ultimos pedidos</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Pedido</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Cliente</TableHead>
              <TableHead>Whatsapp</TableHead>
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
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
