"use client";

import { createOrganization } from "@/data/organizacao";
import { IOrganizacao } from "@/interfaces/IOrganizacao";
import { useUser } from "@clerk/nextjs";
import { useState } from "react";

export default function Dashboard() {
  const { user } = useUser();
  const [validateOrganization, setValidateOrganization] =
    useState<boolean>(false);
  const organization = user?.organizationMemberships[0].organization;

  if (!organization) {
    return (
      <div>
        <h2>Ocorreu um erro ao buscar uma organização</h2>
      </div>
    );
  }

  const data: IOrganizacao = {
    id: organization.id,
    descricao: organization.name,
    slug: organization.slug as string,
    imagem: organization.imageUrl,
  };

  if (!validateOrganization) {
    // TODO: update organization caso o usuario trocar no clerk
    createOrganization(data);
    setValidateOrganization(true);
  }

  return (
    <div className="my-6">
      <div className="flex flex-col items-center">
        <h2>Dashboard - Restaurante {data.descricao}</h2>
        <div className="flex flex-col text-xs text-slate-500">
          <span>ID: {organization.id}</span>
        </div>
      </div>
    </div>
  );
}
