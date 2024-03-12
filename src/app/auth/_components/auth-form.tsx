"use client";

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { signIn } from "next-auth/react";
import toast from "react-hot-toast";

export default function AuthForm() {
  const form = useForm();

  const handleSubmit = form.handleSubmit(async (data) => {
    try {
      await signIn("email", { email: data.email, redirect: false });
      toast.success("Link magico enviado com sucesso!");
    } catch (error: any) {
      toast.error(error.message);
    }
  });

  return (
    <div className="flex flex-col items-center space-y-4">
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold">Login com link magico</h1>
        <p className="text-gray-500 dark:text-gray-400">
          Insira seu email para receber o link
        </p>
      </div>
      <form onSubmit={handleSubmit} className="w-full max-w-sm space-y-4">
        <div className="space-y-2">
          <Label htmlFor="email">E-mail</Label>
          <Input
            id="email"
            required
            placeholder="meu-email@email.com"
            type="email"
            {...form.register("email")}
          />
        </div>
        <Button type="submit" className="w-full">
          Envar link magico
        </Button>
      </form>
      <div className="flex gap-3">
        <Button type="button">Login com Google</Button>
        <Button type="button">Login com Facebook</Button>
      </div>
    </div>
  );
}
