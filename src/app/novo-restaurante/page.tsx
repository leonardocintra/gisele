"use client";

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useRouter, useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { logErrorOnEmail } from "@/lib/utils";
import { useState } from "react";

export default function NovoRestaurantePage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const user = searchParams.get("usuario");

  const [submitDisabled, setSubmitDisable] = useState<boolean>(false);

  const formSchema = z.object({
    descricao: z
      .string()
      .min(4, { message: "Nome restaurante deve ter no minimo 4 caracteres." })
      .max(50),
    userId: z.string(),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      descricao: "",
      userId: user || "usuario-kinde-nao-informado-no-request",
    },
  });

  const handleSubmit = async (values: z.infer<typeof formSchema>) => {
    let url = `/api/sandra/restaurante`;
    setSubmitDisable(true);

    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    });

    const response = await res.json();

    if (res.status === 201) {
      router.push(`/dashboard`);
    } else {
      console.log(`Ocorreu um erro ${res.status} - Analisar ${response}`);

      logErrorOnEmail(
        response.message || "erro-desconhecido",
        user || "usuario-undefined"
      );
      setSubmitDisable(false);
    }
  };

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
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(handleSubmit)}
              className="space-y-2"
            >
              <FormField
                control={form.control}
                name="descricao"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Descrição / Nome</FormLabel>
                    <FormControl>
                      <Input placeholder="Nome restaurante ..." {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button
                type="submit"
                className="w-full"
                disabled={submitDisabled}
              >
                Salvar
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
