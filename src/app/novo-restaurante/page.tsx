"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CreateOrgLink } from "@kinde-oss/kinde-auth-nextjs/components";
import { useState } from "react";

export default function NovoRestaurantePage() {
  const [name, setName] = useState<string>("");

  return (
    <div className="flex flex-col justify-center gap-4 items-center my-8">
      <h2>Novo restaurante</h2>
      <div className="space-y-2 items-center">
        <h2>Restaurante: {name}</h2>

        <div>
          <Input
            placeholder="Informe o nome do restaurante"
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div className="flex justify-center mt-8">
          <Button disabled={name.length > 4 ? false : true}>
            <CreateOrgLink orgName={name}>Criar meu restaurante</CreateOrgLink>
          </Button>
        </div>
      </div>
    </div>
  );
}
