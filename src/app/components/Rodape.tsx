export default function Rodape() {
  return (
    <footer className="text-center space-y-2 bg-gray-200 py-2">
      <div className="font-bold text-xl">Tempero & Amor</div>

      <div className="flex flex-col space-y-2 font-extralight text-sm">
        <span>
          2024 - {new Date().getFullYear()} | Desenvolvido por Leonardo Nascimento Cintra
        </span>
        <span className="text-xs text-purple-900">
          Todos os direitos reservados
        </span>
      </div>
      <div className="text-sm">
        Contato: leonardo.ncintra@outlook.com
      </div>
    </footer>
  );
}
