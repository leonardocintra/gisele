/**
 * v0 by Vercel.
 * @see https://v0.dev/t/34JOEwqjDts
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
import Link from "next/link";
import { JSX, SVGProps } from "react";

interface HeaderProps {
  data: {
    logoText: {
      texto: string;
      url: string;
    };
    accountButton: {
      texto: string;
      url: string;
    };
  };
}

export default function Header({ data }: HeaderProps) {
  const { logoText } = data;

  return (
    <header className="flex items-center h-16 px-4 w-full md:px-6">
      <div className="flex items-center">
        <Link
          className="flex items-center gap-2 text-lg font-semibold"
          href="/"
        >
          <PackageIcon className="w-5 h-5" />
          <span>{logoText.texto}</span>
        </Link>
      </div>
      <nav className="ml-auto flex items-center space-x-4">
        <Link
          className="font-medium rounded-md px-2 py-1.5 text-sm hover:bg-gray-100/50 hover:text-gray-900"
          href="#"
        >
          Minha conta
        </Link>
      </nav>
    </header>
  );
}

function PackageIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m7.5 4.27 9 5.15" />
      <path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z" />
      <path d="m3.3 7 8.7 5 8.7-5" />
      <path d="M12 22V12" />
    </svg>
  );
}
