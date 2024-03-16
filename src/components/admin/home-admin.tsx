import Image from "next/image";

export default function HomeAdmin() {
  return (
    <div className="flex flex-col items-center">
      <h1 className="text-center text-3xl my-4">
        Aumente as vendas do seu restaurante!
      </h1>

      <h4 className="text-gray-600 text-sm text-center max-w-md">
        Cardápio online, pedidos e entregas em um só lugar.
      </h4>

      <h3 className="text-2xl my-8">Beneficios da assinatura</h3>

      <div className="max-w-lg space-y-4 px-3 text-sm text-center">
        <p className="text-emerald-800">
          Libere-se da sobrecarga de gerenciar pedidos manualmente pelo
          WhatsApp. Com nosso sistema especializado para restaurantes,
          automatize suas respostas e direcione clientes diretamente para fazer
          pedidos online, aumentando sua eficiência e satisfazendo seus
          clientes.
        </p>
        <p className="text-2xl text-end">
          Experimente hoje mesmo e simplifique seu fluxo de trabalho enquanto
          impulsiona suas vendas!
        </p>
      </div>

      <div className="my-8 flex space-x-3 flex-col sm:flex-row">
        <div className="card w-96 bg-base-100 shadow-xl">
          <figure>
            <Image
              alt="Marmitex"
              src="/img/marmitex.jpg"
              width={400}
              height={100}
            />
          </figure>
          <div className="card-body">
            <h2 className="card-title">
              Experimentar!
              <div className="badge badge-secondary">Gratis</div>
            </h2>
            <p>Teste 40 dias sem compromisso!</p>
            <div className="card-actions justify-end">
              <button className="btn btn-primary">Assinar agora</button>
            </div>
          </div>
        </div>

        <div className="card w-96 bg-base-100 shadow-xl">
          <figure>
            <Image
              alt="Marmitex"
              src="/img/marmitex-2.webp"
              width={400}
              height={100}
            />
          </figure>
          <div className="card-body">
            <h2 className="card-title">
              Plano 1<div className="badge badge-secondary">R$ 237,00</div>
            </h2>
            <p>Começe agora a facilitar as vendas de marmitex</p>
            <div className="card-actions justify-end">
              <button className="btn btn-primary">Assinar agora</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
