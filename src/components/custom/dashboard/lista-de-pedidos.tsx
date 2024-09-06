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

  function renderItemsDialog() {
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
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Name
              </Label>
              <Input
                id="name"
                defaultValue="Pedro Duarte"
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="username" className="text-right">
                Username
              </Label>
              <Input
                id="username"
                defaultValue="@peduarte"
                className="col-span-3"
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit">Save changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <div>
      <div className="max-w-3xl mx-auto">
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
                <TableCell>{renderItemsDialog()}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
