import Link from "next/link";

export default function Cabecalho() {
  return (
    <div className="flex items-center justify-between h-14 px-4 border-b lg:px-6">
      <div className="flex items-center gap-2">
        <Link className="flex items-center gap-2 font-semibold" href="/">
          <span>Tempero & Amor</span>
        </Link>
      </div>
      <div className="flex items-center gap-4">
        <Link className="text-sm font-medium underline" href="/">
          Contato para vendas
        </Link>
        <Link
          className="inline-flex h-8 items-center justify-center rounded-md bg-gray-900 px-2 text-[12px] text-gray-50 hover:bg-gray-900/90 focus:outline-none focus:ring-1 focus:ring-gray-900 dark:bg-gray-50 dark:text-gray-900 dark:hover:bg-gray-50/90 dark:focus:ring-gray-300"
          href={"/auth"}
        >
          Login
        </Link>
      </div>
    </div>
  );
}
