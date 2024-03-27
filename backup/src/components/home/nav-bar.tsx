import { UserButton } from "@clerk/nextjs";
import Link from "next/link";

type NavBarProps = {
  organization?: string;
  slug?: string;
};

export default function NavBar({ organization, slug }: NavBarProps) {
  return (
    <div className="navbar bg-base-100">
      <div className="flex-1">
        <Link
          href={`${slug === undefined ? "/" : slug}`}
          className="btn btn-ghost text-xl"
        >
          Restaurante {organization}
        </Link>
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
