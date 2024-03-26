/**
 * v0 by Vercel.
 * @see https://v0.dev/t/viSa5eLDrpB
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { JSX, SVGProps } from "react";
import { getStrapiURL } from "@/lib/utils";

interface FooterProps {
  data: {
    texto: string;
    socialButtons: [
      {
        texto: string;
        url: string;
      }
    ];
    logoText: string;
    icon: {
      url: string;
    };
  };
}

export default function Footer({ data }: FooterProps) {
  const { texto, icon, socialButtons } = data;
  const imageUrlBase = getStrapiURL();

  return (
    <footer className="grid items-center gap-2 py-4 sm:gap-4 md:gap-2 md:py-6 border-t border-gray-200 bg-gray-50 dark:bg-gray-950">
      <div className="mx-auto max-w-2xl flex flex-col items-center gap-2">
        <nav className="flex items-center gap-4 shrink-0">
          <Link
            className="flex items-center gap-2 text-sm font-medium hover:underline underline-offset-4"
            href="#"
          >
            <TargetIcon className="h-6 w-6" />
            Home
          </Link>
          <Link
            className="text-sm font-medium hover:underline underline-offset-4"
            href="#"
          >
            Features
          </Link>
          <Link
            className="text-sm font-medium hover:underline underline-offset-4"
            href="#"
          >
            Pricing
          </Link>
          <Link
            className="text-sm font-medium hover:underline underline-offset-4"
            href="#"
          >
            About
          </Link>
          <Link
            className="text-sm font-medium hover:underline underline-offset-4"
            href="#"
          >
            Contact
          </Link>
        </nav>
        <div className="flex items-center gap-4 text-xs">
          <p className="text-gray-500 dark:text-gray-400">
            © {new Date().getFullYear()} {texto}. All rights reserved.
          </p>
          <div className="flex items-center gap-2 ml-auto">
            <Link
              className="rounded-full border border-gray-200  hover:border-gray-800 hover:shadow-sm w-8 h-8 overflow-hidden"
              href="#"
            >
              <img
                alt="User"
                className="object-cover w-full h-full"
                height="32"
                src={`${imageUrlBase}${icon.url}`}
                style={{
                  aspectRatio: "32/32",
                  objectFit: "cover",
                }}
                width="32"
              />
              <span className="sr-only">View Profile</span>
            </Link>

            {socialButtons.map((socialButton) =>
              selectSocialIcon(socialButton.url)
            )}
          </div>
        </div>
      </div>
    </footer>
  );
}

function FacebookIcon(
  props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>
) {
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
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  );
}

function InstagramIcon(
  props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>
) {
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
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}

function TargetIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
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
      <circle cx="12" cy="12" r="10" />
      <circle cx="12" cy="12" r="6" />
      <circle cx="12" cy="12" r="2" />
    </svg>
  );
}

function TwitterIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
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
      <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
    </svg>
  );
}

function selectSocialIcon(url: string) {
  console.log(url);
  if (url.includes("twitter"))
    return (
      <Button key={url} className="w-8 h-8" size="icon" variant="ghost">
        <TwitterIcon className="w-4 h-4" />
        <span className="sr-only">Twitter</span>
      </Button>
    );

  if (url.includes("instagram"))
    return (
      <Button key={url} className="w-8 h-8" size="icon" variant="ghost">
        <InstagramIcon className="w-4 h-4" />
        <span className="sr-only">Instagram</span>
      </Button>
    );

  if (url.includes("facebook"))
    return (
      <Button key={url} className="w-8 h-8" size="icon" variant="ghost">
        <FacebookIcon className="w-4 h-4" />
        <span className="sr-only">Facebook</span>
      </Button>
    );
}
