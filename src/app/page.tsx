import Cardapio from "./components/cardapio/Cardapio";

export default function Home() {
  return (
    <div className="max-w-xs mx-auto">
      <h2 className="text-center p-2 text-3xl font-mono text-cyan-700">
        Faça seu pedido
      </h2>

      <h3 className="text-center font-extralight text-2xl py-3">
        Cardapio de hoje
      </h3>

      <div>
        <Cardapio />
      </div>
    </div>
  );
}
