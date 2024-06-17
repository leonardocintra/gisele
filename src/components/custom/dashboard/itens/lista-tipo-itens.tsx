import Image from "next/image";

import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { BananaIcon, BeefIcon, CupSodaIcon, SaladIcon } from "lucide-react";

export default function ListaTipoItens() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Tipo de itens vendidos</CardTitle>
        <CardDescription>
          Administre os itens categorizados abaixo
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="hidden w-[100px] sm:table-cell">
                <span className="sr-only">Image</span>
              </TableHead>
              <TableHead>Item</TableHead>
              <TableHead>
                <span className="sr-only">Ação</span>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell className="hidden sm:table-cell">
                <BeefIcon />
              </TableCell>
              <TableCell className="font-medium">Carnes</TableCell>
              <TableCell>Ação</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="hidden sm:table-cell">
                <BananaIcon />
              </TableCell>
              <TableCell className="font-medium">Guarnições</TableCell>
              <TableCell>Ação</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="hidden sm:table-cell">
                <SaladIcon />
              </TableCell>
              <TableCell className="font-medium">Saladas</TableCell>
              <TableCell>Ação</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="hidden sm:table-cell">
                <CupSodaIcon />
              </TableCell>
              <TableCell className="font-medium">Bebidas</TableCell>
              <TableCell>Ação</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </CardContent>
      <CardFooter>
        <div className="text-xs text-muted-foreground">
          Showing <strong>1-10</strong> of <strong>32</strong> products
        </div>
      </CardFooter>
    </Card>
  );
}
