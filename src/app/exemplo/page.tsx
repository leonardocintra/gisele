/**
 * v0 by Vercel.
 * @see https://v0.dev/t/d3D4ribe9c5
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
import {
  CardTitle,
  CardDescription,
  CardHeader,
  CardContent,
  Card,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";

export default function ExemploPage() {
  return (
    <div className="grid gap-6 lg:grid-cols-2 xl:grid-cols-3">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Carnes</CardTitle>
          <CardDescription>Escolha até 2</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          <div className="flex items-center gap-4">
            <Checkbox id="cupim" />
            <label className="text-lg font-medium" htmlFor="cupim">
              Cupim assado
            </label>
          </div>
          <div className="flex items-center gap-4">
            <Checkbox id="linguica" />
            <label className="text-lg font-medium" htmlFor="linguica">
              Linguiça
            </label>
          </div>
          <div className="flex items-center gap-4">
            <Checkbox id="lombo" />
            <label className="text-lg font-medium" htmlFor="lombo">
              Lombo
            </label>
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Guarnições</CardTitle>
          <CardDescription>Escolha até 2</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          <div className="flex items-center gap-4">
            <Checkbox id="batata" />
            <label className="text-lg font-medium" htmlFor="batata">
              Batata Frita
            </label>
          </div>
          <div className="flex items-center gap-4">
            <Checkbox id="macarrao" />
            <label className="text-lg font-medium" htmlFor="macarrao">
              Macarrão
            </label>
          </div>
          <div className="flex items-center gap-4">
            <Checkbox id="mandioca" />
            <label className="text-lg font-medium" htmlFor="mandioca">
              Mandioca
            </label>
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Saladas</CardTitle>
          <CardDescription>Escolha até 2</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          <div className="flex items-center gap-4">
            <Checkbox id="alface" />
            <label className="text-lg font-medium" htmlFor="alface">
              Alface
            </label>
          </div>
          <div className="flex items-center gap-4">
            <Checkbox id="tomate" />
            <label className="text-lg font-medium" htmlFor="tomate">
              Tomate
            </label>
          </div>
          <div className="flex items-center gap-4">
            <Checkbox id="beterraba" />
            <label className="text-lg font-medium" htmlFor="beterraba">
              Beterraba
            </label>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
