/**
 * v0 by Vercel.
 * @see https://v0.dev/t/MqiJECj2GQP
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function HeroSection() {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center space-y-4 text-center">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
              The fastest way to ship your frontend
            </h1>
            <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
              The platform for frontend. Instantly build, deploy, and scale your
              sites.
            </p>
          </div>
          <div className="w-full max-w-sm space-y-2">
            <form className="grid grid-cols-2 gap-2">
              <Input placeholder="Name" type="text" />
              <Input placeholder="Email" type="email" />
              <Button type="submit">Entrar</Button>
              <Link
                className="flex items-center justify-center hover:bg-sky-300 hover:underline rounded-md"
                href={"/exemplo"}
              >
                Pagina de exemplo
              </Link>
            </form>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              Sign up to get notified when we launch.
              <Link className="underline underline-offset-2" href="#">
                Terms & Conditions
              </Link>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
