"use client";

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { IItemTipo } from "@/interfaces/IItemTIpo";
import { BASE_URL } from "@/lib/utils";

type ItemTipoFormProps = {
  itemTipo?: IItemTipo;
};

export default function ItemTipoForm({ itemTipo }: ItemTipoFormProps) {
  const router = useRouter();
  const { toast } = useToast();

  const formSchema = z.object({
    descricao: z.string().max(60),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      descricao: "",
    },
  });

  const handleSubmit = async (values: z.infer<typeof formSchema>) => {
    let url = `${BASE_URL}/api/sandra/tipo-itens`;
    console.log(url);
    let method = "POST";

    const tipo: Partial<IItemTipo> = {
      descricao: values.descricao,
    };

    const res = await fetch(url, {
      method,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(tipo),
    });

    const data = await res.json();

    if (res.status === 201 && method === "POST") {
      toast({
        title: `Tipo ${tipo.descricao}`,
        variant: "default",
        description: `Cadastrado(a) com sucesso!`,
      });
      router.push(`/dashboard/`);
    } else {
      if (res.status === 400) {
        toast({
          title: `${tipo.descricao} não foi cadastrado!`,
          variant: "destructive",
          description: `Erro: ${data.message}`,
        });
      } else {
        toast({
          title: `${tipo.descricao} não foi cadastrado!`,
          variant: "destructive",
          description: `Erro: ${res.text}`,
        });
      }
    }
  };

  return (
    <div className="max-w-md mx-auto my-8">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleSubmit)}
          className="flex flex-col gap-2"
        >
          <FormField
            control={form.control}
            name="descricao"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Descrição</FormLabel>
                <FormControl>
                  <Input placeholder="Tipo de item ..." {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit">Salvar</Button>
        </form>
      </Form>
    </div>
  );
}
