import { UserButton } from "@clerk/nextjs";
import Link from "next/link";

export default function NavBar() {
  return (
    <div className="navbar bg-base-100">
      <div className="flex-1">
        <a className="btn btn-ghost text-xl">Restaurante [nome]</a>
      </div>
      <div className="flex-none">
        <ul className="menu menu-horizontal px-1">
          <li>
            <Link href={"/dashboard"}>Ir para minha área</Link>
          </li>
        </ul>
        <div className="dropdown dropdown-end">
          <UserButton showName={true} />
        </div>
      </div>
    </div>
  );
}
