import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { FlipWords } from "@/components/ui/flip-words";

export default async function Home() {
  const words = ["melhor", "mais rápido", "encantador", "moderno"];

  return (
    <main className="px-14 py-6">
      <div className="border rounded-xl h-[20rem] flex justify-center items-center px-4">
        <div className="text-7xl mx-auto font-normal text-neutral-600 dark:text-neutral-400">
          Faça um atendimento
          <FlipWords words={words} /> <br />
          com nosso aplicativo simples de pedidos
        </div>
      </div>
    </main>
  );
}
