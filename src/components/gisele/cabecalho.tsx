import Link from "next/link";
import LoginButton from "../auth/login-button";
import { Button } from "../ui/button";

export default function Cabecalho() {
  return (
    <div className="flex items-center justify-between h-14 px-4 border-b lg:px-6">
      <div className="flex items-center gap-2">
        <Link className="flex items-center gap-2 font-semibold" href="/">
          <span>Tempero & Amor</span>
        </Link>
      </div>
      <div className="flex items-center gap-4">
        <Link className="text-sm font-medium underline" href="/contato">
         Quero usar esse sistema
        </Link>
        
        <LoginButton>
          <Button>Login / Entrar</Button>
        </LoginButton>
      </div>
    </div>
  );
}
