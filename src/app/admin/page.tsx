"use client";

import { CreateOrganization, useUser } from "@clerk/nextjs";

export default function AdminPage() {
  const { user } = useUser();
  let organization;

  if (!user) {
    return (
      <div>
        <p>Loading...</p>
      </div>
    );
  }

  if (user.organizationMemberships.length > 0) {
    organization = user.organizationMemberships[0];
  }

  return (
    <div>
      <div className="mx-auto py-8 flex items-center flex-col">
        {organization ? (
          <div>
            <div className="mb-8">
              <div className="text-2xl">
                Restaurante: {organization.organization.name}
              </div>
              <div className="text-slate-400 text-xs pl-2">
                ID: {organization.id}
                <br />
                Data criação:{" "}
                {`${organization.createdAt.getDay()}/${organization.createdAt.getMonth()}/${organization.createdAt.getFullYear()}`}
              </div>
            </div>
          </div>
        ) : (
          <>
            <h1 className="text-center my-4 text-slate-600">
              Seja muito bem vindo{" "}
              <span className="underline font-bold">{user.fullName}</span> Nesse
              primeiro momento precisamos fazer os ajustes iniciais, bora lá ?
            </h1>
            <h2 className="text-center text-red-500 py-4 text-2xl font-bold">
              Defina o nome do seu restaurante
            </h2>
            <CreateOrganization afterCreateOrganizationUrl={"/admin"} />
          </>
        )}
      </div>
    </div>
  );
}
