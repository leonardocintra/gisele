"use client";

import AlertaBusca from "@/app/components/admin/AltertaBusca";
import CardTile from "@/components/dashboard/cardapio/CardTile";
import { getDataFormatada } from "@/commons/date";
import { getTiposItemByOrganizationId } from "@/data/tipo-item";
import { ITipoItemConsumivel } from "@/interfaces/ITipoItemConsumivel";
import { useUser } from "@clerk/nextjs";
import { useState, useEffect } from "react";

export default function DashboardCardapioPage() {
  const { user } = useUser();
  const [tipoItems, setTipoItems] = useState<ITipoItemConsumivel[]>();

  const organization = user?.organizationMemberships[0].organization;

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (organization) {
          const itemsData = await getTiposItemByOrganizationId(
            organization?.id
          );
          setTipoItems(itemsData);
        } else {
          setTipoItems([]);
        }
      } catch (e) {
        console.log(e);
      }
    };

    fetchData();
  }, [user, organization]);

  return (
    <div>
      <div className="text-center">
        <h2 className="sm:text-4xl sm:my-3 text-gray-500">
          Configurar cardapio do dia
        </h2>
        <h3 className="sm:text-3xl sm:my-8 text-gray-600">
          {getDataFormatada()}
        </h3>
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
            <AlertaBusca descricao="Tipo itens não encontrado" status={500} />
          </div>
        )}
      </div>
    </div>
  );
}
