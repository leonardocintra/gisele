import Cabecalho from "../components/Cabecalho";

/**
 * v0 by Vercel.
 * @see https://v0.dev/t/auy4OToBbWb
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
export default function ContatoPage() {
  return (
    <div>
      <Cabecalho />
      <div className="container grid max-w-2xl px-4 gap-8 py-12 md:py-24">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold">Contato desenvolvedor</h1>
          <p className="text-gray-500 dark:text-gray-400">
            Gostaria de um sistema para seu restaurante ?
          </p>
        </div>
        <div className="space-y-4">
          <div className="space-y-1">
            <h3 className="text-lg font-semibold">Vendas</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Entre em contato por nosso whatsapp! Voce pode fazer teste
              gratuito (30 dias ou mais dependendo do caso) antes de fazer uma
              assinatura mensal de R$ 237,90
            </p>
          </div>
          <div className="space-y-1">
            <h3 className="text-lg font-semibold">Suporte</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Sera um prazer te ajudar em qualquer duvida ou problema com o
              sistema
            </p>
          </div>
        </div>
        <div className="space-y-4">
          <div className="space-y-4">
            <div className="space-y-1">
              <h4 className="text-base font-medium">Informações Gerais</h4>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Contacte-nos para questões gerais ou informações sobre a nossa
                iniciativa.
              </p>
            </div>
            <div className="grid grid-cols-2 items-start gap-4">
              <div className="space-y-1">
                <h5 className="text-sm font-medium">Email</h5>
                <p>leonardo.ncintra@outlook.com</p>
              </div>
              <div className="space-y-1">
                <h5 className="text-sm font-medium">Whatsapp</h5>
                <p>+55 (16) 99973-5008</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
