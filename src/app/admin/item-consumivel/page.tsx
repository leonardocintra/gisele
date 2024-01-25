"use client";

import { ItemConsumivelDocument } from "@/model/ItemConsumivel";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function AdminItemConsumivelPage() {
  const [items, setItems] = useState<ItemConsumivelDocument[]>();

  useEffect(() => {
    fetchItems();
  }, []);

  function fetchItems() {
    fetch("/api/item").then((res) =>
      res.json().then((items) => {
        setItems(items);
      })
    );
  }

  return (
    <div>
      <div>
        <h1 className="text-2xl font-bold text-gray-700 text-center mt-8">
          Item consumível
        </h1>
        <div className="flex justify-center my-3 space-x-2">
          <Link
            href={"/admin/item-consumivel/novo-tipo-item"}
            className="btn btn-info"
          >
            Novo tipo de item
          </Link>
          <Link
            href={"/admin/item-consumivel/novo-item"}
            className="btn btn-success"
          >
            Novo item consumivel
          </Link>
        </div>
      </div>
      <div className="overflow-x-auto max-w-screen-md mx-auto">
        <table className="table">
          <thead>
            <tr>
              <th>Nome do item</th>
              <th>Tipo</th>
              <th>Preço</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {items ? (
              items.map((item) => (
                <tr key={item._id}>
                  <td>{item.descricao}</td>
                  <td>
                    <div className="flex items-center gap-3">
                      <div className="avatar">
                        <div className="mask mask-squircle w-12 h-12">
                          <Image
                            width={50}
                            height={50}
                            src={item.tipo.imagem}
                            alt={item.descricao}
                          />
                        </div>
                      </div>
                      <div>
                        <div className="font-bold">{item.tipo.descricao}</div>
                        <div className="text-sm opacity-50">
                          {item.tipo.exibirPreco
                            ? "Exibir preço"
                            : "Não exibir preço"}
                        </div>
                      </div>
                    </div>
                  </td>

                  <td>{item.preco}</td>
                  <th>
                    <button className="btn btn-ghost btn-xs">Gerenciar</button>
                  </th>
                </tr>
              ))
            ) : (
              <tr>
                <td>Sem items</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
