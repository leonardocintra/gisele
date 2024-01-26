"use client";

import IdentificadorDaPagina from "@/app/components/admin/IdentificadorDaPagina";
import { CardapioDocument } from "@/model/Cardapio";
import { ItemConsumivelDocument } from "@/model/ItemConsumivel";
import { useParams } from "next/navigation";
import { useState, useEffect, useCallback } from "react";
import toast from "react-hot-toast";

export default function CardapioItemPage() {
  const { id } = useParams();
  const tipo = id;

  const [items, setItems] = useState<ItemConsumivelDocument[]>();
  const [descricaoItem, setDescricaoItem] = useState<string>("");
  const [cardapio, setCardapio] = useState<CardapioDocument>();
  const [itemsCardapio, setItemsCardapio] = useState<string[]>([]);

  const fetchItems = useCallback(() => {
    fetch(`/api/item/${tipo}`).then((res) =>
      res.json().then((items) => {
        items.sort((a: any, b: any) => a.descricao.localeCompare(b.descricao));
        setItems(items);
      })
    );
  }, [tipo]);

  function fetchCardapio() {
    fetch("/api/cardapio").then((res) =>
      res.json().then((c) => {
        setCardapio(c);
      })
    );
  }

  useEffect(() => {
    fetchItems();
    fetchCardapio();
    if (items && items.length > 0 && descricaoItem === "") {
      setDescricaoItem(items[0].tipo.descricao);
    }
  }, [descricaoItem, fetchItems, items]);

  function handleItemCardapio(itemId: string, nomeItem: string) {
    setItemsCardapio((prevItems) => {
      const isItemInArray = prevItems.includes(itemId);

      if (isItemInArray) {
        // Se o item já estiver no array, remova-o
        return prevItems.filter((item) => item !== itemId);
      } else {
        // Se o item não estiver no array, adicione-o
        return [...prevItems, itemId];
      }
    });
  }

  return (
    <div>
      <div className="my-4">
        <IdentificadorDaPagina descricao={descricaoItem} />
      </div>

      <div className="overflow-x-auto max-w-xl mx-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th>Item</th>
              <th>Ativar/Desativar</th>
            </tr>
          </thead>
          <tbody>
            {items && items.length > 0 ? (
              items.map((item) => (
                <tr
                  key={item._id}
                  onClick={() => handleItemCardapio(item._id, item.descricao)}
                  className={` ${
                    itemsCardapio.includes(item._id)
                      ? "hover:bg-red-200 bg-accent"
                      : "hover:bg-green-200"
                  }`}
                >
                  <td>{item.descricao}</td>
                  <td>
                    <button type="button">
                      {itemsCardapio.includes(item._id)
                        ? "Desativar"
                        : "Ativar"}
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td>Carregando ...</td>
                <td>Carregando ...</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
