import { ClerkLoaded, ClerkLoading, SignIn } from "@clerk/nextjs";

export default function Home() {
  return (
    <div
      className="hero min-h-screen"
      style={{
        backgroundImage: "url(/img/index.jpeg)",
      }}
    >
      <div className="hero-overlay bg-opacity-60"></div>
      <div className="hero-content text-center text-neutral-content">
        <div>
          <div className="max-w-lg">
            <div className="mb-5">
              <h1 className="text-5xl font-bold italic">Nourriture</h1>
              <h6 className="text-xs bg-blue-900 py-2 mt-1 italic rounded-full">
                Nourriture = Comida em Francês 🇫🇷
              </h6>
            </div>
            <p>
              Somos uma plataforma para ajudar restaurantes a organizar os
              pedidos dos clientes
            </p>
            <p className="my-5">
              Começe a gerenciar pedidos do seu restaurante. O cliente te chama
              no whastapp e automaticamente um link é enviado para ele fazer o
              pedido. Na plataforma voce precisa apenas gerenciar o cardapio do
              dia!
            </p>

            <p className="mb-5">
              Começe agora mesmo! 40 dias para testar. Caso precisar de mais
              tempo entre em contato conosco
            </p>

            <div className="flex justify-center p-10 rounded-md bg-neutral-100 bg-opacity-30 shadow-md">
              <ClerkLoading>
                <div>
                  <h2 className="text-xl">
                    Validando e carregando dados para login ...
                  </h2>
                </div>
              </ClerkLoading>
              <ClerkLoaded>
                <SignIn
                  afterSignOutUrl={"/"}
                  afterSignInUrl={"/admin"}
                />
              </ClerkLoaded>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
