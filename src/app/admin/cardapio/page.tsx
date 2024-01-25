"use client";

import CardTile from "@/app/components/admin/cardapio/CardTile";
import Cardapio from "@/app/components/cardapio/Cardapio";
import { getDataFormatada } from "@/commons/date";
import { TipoItemDocument } from "@/model/TipoItemConsumivel";
import { useState, useEffect } from "react";

export default function AdminCardapioPage() {
  const [tipoItems, setTipoItems] = useState<TipoItemDocument[]>();

  useEffect(() => {
    fetchTipoItems();
  }, []);

  function fetchTipoItems() {
    fetch("/api/tipoItem").then((res) =>
      res.json().then((items) => {
        setTipoItems(items);
      })
    );
  }

  return (
    <div>
      <div className="text-center">
        <h2 className="text-4xl my-3 text-gray-500">
          Configurar cardapio do dia
        </h2>
        <h3 className="text-3xl my-8 text-gray-600">{getDataFormatada()}</h3>
      </div>
      <div className="flex space-x-3 justify-center">
        {tipoItems ? (
          tipoItems.map((item) => (
            <div key={item._id}>
              <CardTile
                image={item.imagem}
                descricao={item.descricao}
                id={item._id}
              />
            </div>
          ))
        ) : (
          <div>
            <h2>sem items</h2>
          </div>
        )}
      </div>

      <div className="divider divider-secondary">Ultimo cardápio</div>

      <div className="max-w-md mx-auto mt-10">
        <Cardapio />
      </div>
    </div>
  );
}
