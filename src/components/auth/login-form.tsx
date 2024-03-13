"use client";

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import CardWrapper from "@/components/auth/login-cardwrapper";
import { useForm } from "react-hook-form";
import { LoginSchema } from "@/schemas";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function LoginForm() {
  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  function handleSubmitForm(values: z.infer<typeof LoginSchema>) {
    console.log(values);
  }

  return (
    <CardWrapper
      headerLabel="Bem vindo de volta!"
      backButtonLabel="Não tem uma conta ?"
      showSocial
      backButtonHref="/auth/register"
    >
      <Form {...form}>
        <form
          className="space-y-6"
          onSubmit={form.handleSubmit(handleSubmitForm)}
        >
          <div className="space-y-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="meuemail@email.com.br" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Senha</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="senha ..." type="password" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <Button type="submit" className="w-full">
            Entrar
          </Button>
        </form>
      </Form>
    </CardWrapper>
  );
}

// parei https://youtu.be/1MTyCvS05V4?t=4689