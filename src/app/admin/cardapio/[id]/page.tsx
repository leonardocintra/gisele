"use client";

import IdentificadorDaPagina from "@/app/components/admin/IdentificadorDaPagina";
import { IItemCardapio } from "@/interfaces/IItemCardapio";
import { ItemConsumivelDocument } from "@/model/ItemConsumivel";
import { useParams } from "next/navigation";
import { useState, useEffect, useCallback } from "react";
import toast from "react-hot-toast";

export default function CardapioItemPage() {
  const { id } = useParams();
  const tipo = id;

  const [items, setItems] = useState<ItemConsumivelDocument[]>();
  const [descricaoItem, setDescricaoItem] = useState<string>("");
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
    if (items && items.length > 0 && descricaoItem === "") {
      setDescricaoItem(items[0].tipo.descricao);
    }
  }, [descricaoItem, fetchItems, items]);

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

    itemsCardapio.forEach(element => {
      
    });

    console.log(itemId);
  }

  return (
    <div>
      <div className="my-4">
        <IdentificadorDaPagina descricao={descricaoItem} />
      </div>
      <div className="flex flex-wrap gap-3 justify-center">
        {items && items.length > 0 ? (
          items.map((item) => (
            <div
              className="card w-72 bg-base-100 shadow-xl text-center hover:bg-slate-100 hover:shadow-accent transition-colors"
              key={item._id}
            >
              <div className="card-body justify-center items-center">
                <h2 className="card-title">{item.descricao}</h2>
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
          <div className="text-center">
            <span className="loading loading-spinner loading-lg"></span>
            <h2 className="my-8">Atenção: Pode não ter nada cadastrado para esse tipo ...</h2>
          </div>
        )}
      </div>
    </div>
  );
}
