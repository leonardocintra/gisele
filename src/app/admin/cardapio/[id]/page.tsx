"use client";

import { IItemCardapio } from "@/interfaces/IItemCardapio";
import { ItemConsumivelDocument } from "@/model/ItemConsumivel";
import { useParams } from "next/navigation";
import { useState, useEffect, useCallback } from "react";
import toast from "react-hot-toast";

export default function CardapioItemPage() {
  const { id } = useParams();
  const tipo = id;

  const [items, setItems] = useState<ItemConsumivelDocument[]>();
  const [itemsCardapio, setItemsCardapio] = useState<IItemCardapio[]>([]);

  const fetchItems = useCallback(() => {
    fetch(`/api/item/${tipo}`).then((res) =>
      res.json().then((items) => {
        setItems(items);
      })
    );
  }, [tipo]);

  useEffect(() => {
    fetchItems();
  }, [fetchItems]);

  function handleItemCardapio(itemId: string) {
    if (!items) {
      return;
    }

    const item = items.find((item) => item._id === itemId);

    if (!item) {
      toast.error(`Item ${itemId} not found`);
      console.error(`Item com ID ${itemId} não encontrado.`);
      return;
    }

    //TODO: continuar ...

    console.log(itemId);
  }

  return (
    <div className="flex space-x-3 px-10">
      {items ? (
        items.map((item) => (
          <div
            className="card w-96 bg-base-100 shadow-xl text-center"
            key={item._id}
          >
            <div className="card-body justify-center items-center">
              <h2 className="card-title">{item.descricao}</h2>
              <p>{item.tipo.descricao}</p>
              <div className="card-actions justify-center">
                <button
                  onClick={() => handleItemCardapio(item._id)}
                  className="btn btn-primary"
                >
                  Ativo hoje
                </button>
              </div>
            </div>
          </div>
        ))
      ) : (
        <div>
          <h2>Carregando ...</h2>
        </div>
      )}
    </div>
  );
}
