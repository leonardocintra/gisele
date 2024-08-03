"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useEffect, useState } from "react";
import { IMarmitex } from "restaurante";

export default function TiposMarmitex() {
  const [marmitex, setMarmitex] = useState<IMarmitex[]>([]);

  useEffect(() => {
    fetch("/api/sandra/marmitex/configuracao")
      .then((res) => res.json())
      .then((data) => {
        setMarmitex(data.data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  if (!marmitex || marmitex.length === 0) {
    return <div>Carregando...</div>;
  }

  return (
    <div className="max-w-xl mx-auto my-8">
      <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0 text-center">
        Meus marmitex
      </h2>
      <div className="flex gap-2 justify-center my-8">
        {marmitex.map((m) => (
          <div key={m.tipoMarmitex} className="">
            <div className="text-center my-3 font-semibold text-2xl">
              <h2>{m.descricao}</h2>
            </div>
            <div className="border border-emerald-400 rounded-md">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Qtd.</TableHead>
                    <TableHead>Descrição</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {m.configuracao.map((config) => (
                    <TableRow key={config.tipoItem.id}>
                      <TableCell className="text-right font-bold">{config.quantidade}</TableCell>
                      <TableCell>{config.tipoItem.descricao} </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
