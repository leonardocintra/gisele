"use client";

import { CreateOrganization, useUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";

export default function AdminPage() {
  const { user } = useUser();

  if (!user) {
    return (
      <div>
        <p>Carregando ...</p>
      </div>
    );
  }

  if (user.organizationMemberships.length > 0) {
    const organization = user.organizationMemberships[0];
    redirect(`${organization.organization.slug}`);
  } else {
    return (
      <div className="flex flex-col items-center">
        <h1 className="text-center my-4 text-slate-600 pt-10">
          Seja muito bem vindo{" "}
          <span className="underline font-bold">{user.fullName}!</span>
          <br />
          Nesse primeiro momento precisamos fazer os ajustes iniciais, bora lá ?
        </h1>
        <h2 className="text-center text-red-500 py-4 text-2xl font-bold">
          Defina o nome do seu restaurante
        </h2>
        <CreateOrganization
          skipInvitationScreen={true}
          afterCreateOrganizationUrl={"/admin"}
        />
      </div>
    );
  }
}
