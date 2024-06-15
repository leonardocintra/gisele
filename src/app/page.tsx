import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export default async function Home() {
  return (
    <main className="px-14 py-6">
      <Card className="rounded-2xl bg-slate-950 shadow-2xl text-white text-center">
        <div className="mx-auto my-14">
          <h1 className="text-4xl leading-tight">
            Ferramenta para administrar seu restaurante
          </h1>
          <p className="text-xl mt-6 px-4 font-light font-mono">
            Crie sua conta agora por 60 dias gratis
          </p>
          <Button className="mt-12" size={"lg"} variant={"secondary"}>
            Criar minha conta
          </Button>
        </div>
      </Card>
    </main>
  );
}
