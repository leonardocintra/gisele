"use client";

import IdentificadorDaPagina from "@/app/components/admin/IdentificadorDaPagina";
import { CardapioDocument } from "@/model/Cardapio";
import { ItemConsumivelDocument } from "@/model/ItemConsumivel";
import { useParams } from "next/navigation";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";

export default function CardapioItemPage() {
  const { id } = useParams();
  const tipo = id;

  const [items, setItems] = useState<ItemConsumivelDocument[]>();
  const [cardapio, setCardapio] = useState<CardapioDocument>();
  const [itemsCardapio, setItemsCardapio] = useState<string[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [resCardapio, resItems] = await Promise.all([
          fetch("/api/cardapio"),
          fetch(`/api/item/${tipo}`),
        ]);

        const cardapioData = await resCardapio.json();
        const itemsData = await resItems.json();

        setCardapio(cardapioData);
        setItems(itemsData);
      } catch (error: any) {
        toast.error(error.message);
      }
    };

    fetchData();
  }, [tipo]);

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
        <IdentificadorDaPagina
          descricao={items ? items[0]?.tipo.descricao : "Carregando ..."}
        />
      </div>

      <div className="flex items-center justify-center my-3">
        <button type="button" className="btn px-10">
          Salvar
        </button>
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
                  <td className="font-semibold hover:underline">
                    {item.descricao}
                  </td>
                  <td>
                    {itemsCardapio.includes(item._id) ? "Desativar" : "Ativar"}
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
