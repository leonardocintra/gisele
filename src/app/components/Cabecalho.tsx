import Link from "next/link";

export default function Cabecalho() {
  return (
    <div className="navbar bg-base-100">
      <div className="flex-1">
        <Link href={"/"} className="btn btn-ghost text-xl">
          Tempero & Amor
        </Link>
      </div>
      <div className="flex-none">
        <ul className="menu menu-horizontal px-1">
          <li>
            <Link href={"/admin"}>Login</Link>
          </li>
        </ul>
      </div>
    </div>
  );
}
