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
import { IItem } from "@/interfaces/IItem";
import { useEffect, useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type ItemFormProps = {
  itemId?: number;
};

export default function ItemForm({ itemId }: ItemFormProps) {
  const router = useRouter();
  const { toast } = useToast();

  const [tipoItens, setTipoItens] = useState<IItemTipo[]>([]);
  const [item, setItem] = useState<IItem>();

  useEffect(() => {
    if (itemId && itemId > 0) {
      fetch(`/api/sandra/item/${itemId}`)
        .then((res) => res.json())
        .then((data) => {
          setItem(data.data);
        })
        .catch((err) => {
          toast({
            title: `Não conseguimos buscar o item no sistema.`,
            variant: "destructive",
            description: `Erro: ${err.message}`,
          });
        });
    }

    fetch("/api/sandra/tipo-itens")
      .then((res) => res.json())
      .then((data) => {
        setTipoItens(data.data);
      })
      .catch((err) => {
        toast({
          title: `Não conseguimos buscar os tipo de itens no sistema.`,
          variant: "destructive",
          description: `Erro: ${err.message}`,
        });
      });
  }, [itemId]);

  const formSchema = z.object({
    descricao: z.string().max(60).min(2),
    tipoItemId: z.string({ message: "Campo obrigatório" }).min(1),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      descricao: item?.descricao || "",
      tipoItemId: "",
    },
  });

  if (!tipoItens) {
    return (
      <div>
        <h2>Carregando ...</h2>
      </div>
    );
  }

  const handleSubmit = async (values: z.infer<typeof formSchema>) => {
    let url = `${BASE_URL}/api/sandra/item/tipoItem`;
    let method = "POST";

    const res = await fetch(url, {
      method,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    });

    const data = await res.json();

    if (res.status === 201) {
      toast({
        title: `Item ${values.descricao}`,
        variant: "default",
        description: `Cadastrado(a) com sucesso!`,
      });
      router.push(`/dashboard/tipo-itens/${values.tipoItemId}`);
    } else {
      if (res.status === 400) {
        toast({
          title: `${values.descricao} não foi cadastrado!`,
          variant: "destructive",
          description: `Erro: ${data.message}`,
        });
      } else {
        toast({
          title: `${values.descricao} não foi cadastrado!`,
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
            name="tipoItemId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Tipo</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  // defaultValue={item?.tipoItem.id.toString()}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {tipoItens.map((tipoItem) => (
                      <SelectItem
                        key={tipoItem.id}
                        value={tipoItem.id.toString()}
                      >
                        {tipoItem.descricao}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="descricao"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Descrição</FormLabel>
                <FormControl>
                  <Input placeholder="Nome do item ..." {...field} />
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
