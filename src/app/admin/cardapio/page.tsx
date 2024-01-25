"use client";

import CardTile from "@/app/components/admin/cardapio/CardTile";
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
      <div className="flex space-x-3 justify-center">
        {tipoItems ? (
          tipoItems.map((item) => (
            <CardTile
              image={item.imagem}
              descricao={item.descricao}
              key={item._id}
            />
          ))
        ) : (
          <div>
            <h2>sem items</h2>
          </div>
        )}
      </div>
    </div>
  );
}
