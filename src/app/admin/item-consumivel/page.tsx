"use client";

import AlertaBusca from "@/app/components/admin/AltertaBusca";
import IdentificadorDaPagina from "@/app/components/admin/IdentificadorDaPagina";
import { IItemConsumivel } from "@/interfaces/IItemConsumivel";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

const TMP_URL = "/api/firebase/item";

export default function AdminItemConsumivelPage() {
  const [items, setItems] = useState<IItemConsumivel[]>();
  const [statusItems, setStatusItems] = useState<number>(0);

  useEffect(() => {
    fetchItems();
  }, []);

  function fetchItems() {
    fetch(TMP_URL).then((res) => {
      if (res.status === 404) {
        setStatusItems(404)
      } else if (res.status === 200) {
        res.json().then((items) => {
          setItems(items);
        })
      } else {
        setStatusItems(500);
      }
    });
  }

  return (
    <div>
      <div>
        <IdentificadorDaPagina descricao="Itens vendidos" />
        <div className="flex justify-center my-3 space-x-2">
          <Link
            href={"/admin/item-consumivel/novo-tipo-item"}
            className="btn btn-info"
          >
            Tipo de item
          </Link>
          <Link
            href={"/admin/item-consumivel/novo-item"}
            className="btn btn-success"
          >
            Item consumivel
          </Link>
        </div>
      </div>
      <div className="overflow-x-auto max-w-screen-md mx-auto">
        <table className="table table-xs">
          <thead>
            <tr>
              <th>Nome do item</th>
              <th>Tipo</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {items && items.length > 0 ? (
              items.sort((a, b) => a.descricao.localeCompare(b.descricao)).map((item) => (
                <tr key={item.id} className="hover:bg-gray-200">
                  <td>
                    <span className="font-semibold text-gray-600 text-base">{item.descricao}</span>
                  </td>
                  <td>
                    <div className="flex items-center gap-3">
                      <div className="avatar">
                        <div className="mask mask-squircle h-9">
                          <Image
                            width={60}
                            height={60}
                            src={item.tipo.imagem}
                            alt={item.descricao}
                          />
                        </div>
                      </div>
                      <div>
                        <div className="font-bold">{item.tipo.descricao}</div>
                      </div>
                    </div>
                  </td>
                  <td>
                    <Link href={`/admin/item-consumivel/editar/${item.id}`} className="btn btn-secondary btn-xs">Editar</Link>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td>
                  <AlertaBusca descricao="Nenhum item encontrado" status={statusItems} />
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
