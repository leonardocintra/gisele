import { FlipWords } from "@/components/ui/flip-words";
import { SparklesCore } from "@/components/ui/sparkles";

export default async function Home() {
  const words = ["melhor", "mais rápido", "encantador", "simples"];

  return (
    <main>
      <div className="h-[40rem] relative w-full bg-black flex flex-col items-center justify-center overflow-hidden rounded-md">
        <div className="w-full absolute inset-0 h-screen">
          <SparklesCore
            id="tsparticlesfullpage"
            background="transparent"
            minSize={0.6}
            maxSize={1.4}
            particleDensity={100}
            className="w-full h-full"
            particleColor="#FFFFFF"
          />
        </div>
        <h1 className="md:text-7xl text-3xl lg:text-6xl font-bold text-center text-white relative z-20">
          Faça um atendimento
          <FlipWords className="text-red-700 font-bold" words={words} /> <br />
          com nosso aplicativo
        </h1>
      </div>
    </main>
  );
}
