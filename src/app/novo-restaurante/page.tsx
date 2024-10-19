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

export default function NovoRestaurantePage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const user = searchParams.get("usuario");

  const formSchema = z.object({
    descricao: z
      .string()
      .min(4, { message: "Nome restaurante deve ter no minimo 4 caracteres." })
      .max(50),
    userId: z
      .string()
      .default(user || "usuario-kinde-nao-informado-no-request"),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  const handleSubmit = async (values: z.infer<typeof formSchema>) => {
    let url = `/api/sandra/restaurante`;

    console.log(values);

    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    });

    if (res.status === 201) {
      router.push(`/dashboard`);
    } else {
      if (res.status === 400) {
        console.log("Ocorreu um erro 400 - Analisar");
      } else {
        console.log("Ocorreu um erro 500 - Analisar");
      }
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
              <Button type="submit" className="w-full">
                Salvar
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
