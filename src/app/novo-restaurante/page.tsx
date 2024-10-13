"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { CreateOrgLink } from "@kinde-oss/kinde-auth-nextjs/components";
import { useState } from "react";

export default function NovoRestaurantePage() {
  const [restaurantName, setRestaurantName] = useState("");

  return (
    <div className="flex justify-center items-center my-8 bg-gray-50">
      <Card className="max-w-lg mx-auto">
        <CardHeader>
          <CardTitle className="text-center text-2xl font-bold text-gray-800">
            Bem-vindo ao Seu Restaurante!
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-center text-gray-600 mb-6">
            Estamos felizes em ter você por aqui! Vamos começar dando um nome
            especial para o seu restaurante.
          </p>
          <div className="space-y-4">
            <Input
              type="text"
              placeholder="Digite o nome do seu restaurante"
              value={restaurantName}
              onChange={(e) => setRestaurantName(e.target.value)}
              className="w-full"
              required
            />
            <Button
              type="submit"
              className="w-full"
              disabled={restaurantName.length > 4 ? false : true}
            >
              <CreateOrgLink orgName={restaurantName}>
                Salvar nome do restaurante
              </CreateOrgLink>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
