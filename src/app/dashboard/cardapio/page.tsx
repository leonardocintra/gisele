"use client";

import AlertaBusca from "@/app/components/admin/AltertaBusca";
import CardTile from "@/app/components/admin/cardapio/CardTile";
import { getDataFormatada } from "@/commons/date";
import { URL_API_TIPO_ITEM } from "@/constants/constants";
import { ITipoItemConsumivel } from "@/interfaces/ITipoItemConsumivel";
import { useState, useEffect } from "react";

export default function AdminCardapioPage() {
  const [tipoItems, setTipoItems] = useState<ITipoItemConsumivel[]>();
  const [statusTipoItems, setStatusTipoItems] = useState<number>(0);

  useEffect(() => {
    fetchTipoItems();
  }, []);

  function fetchTipoItems() {
    fetch(URL_API_TIPO_ITEM).then((res) => {
      if (res.status === 404) {
        setStatusTipoItems(404)
      } else if (res.status === 200) {
        res.json().then((items) => {
          setTipoItems(items);
        })
      } else {
        setStatusTipoItems(500);
      }
    });
  }

  return (
    <div>
      <div className="text-center">
        <h2 className="sm:text-4xl sm:my-3 text-gray-500">
          Configurar cardapio do dia
        </h2>
        <h3 className="sm:text-3xl sm:my-8 text-gray-600">{getDataFormatada()}</h3>
      </div>
      <div className="flex flex-wrap gap-2 justify-center">
        {tipoItems && tipoItems.length > 0 ? (
          tipoItems.map((item) => (
            <div key={item.id}>
              <CardTile
                image={item.imagem}
                descricao={item.descricao}
                id={item.id}
              />
            </div>
          ))
        ) : (
          <div>
            <AlertaBusca descricao="Tipo itens não encontrado" status={statusTipoItems} />
          </div>
        )}
      </div>
    </div>
  );
}
