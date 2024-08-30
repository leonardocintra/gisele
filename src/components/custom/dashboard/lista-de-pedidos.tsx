import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const invoices = [
  {
    invoice: "INV001",
    paymentStatus: "Pago",
    totalAmount: "R$ 25.00",
    paymentMethod: "Retirar no local",
  },
  {
    invoice: "INV002",
    paymentStatus: "Pendente",
    totalAmount: "R$ 15.00",
    paymentMethod: "Entregar",
  },
  {
    invoice: "INV003",
    paymentStatus: "Pendente",
    totalAmount: "R$ 35.00",
    paymentMethod: "Retirar no local",
  },
  {
    invoice: "INV004",
    paymentStatus: "Pago",
    totalAmount: "R$ 45.00",
    paymentMethod: "Retirar no local",
  },
  {
    invoice: "INV005",
    paymentStatus: "Pago",
    totalAmount: "R$ 55.00",
    paymentMethod: "Entregar",
  },
  {
    invoice: "INV006",
    paymentStatus: "Pendente",
    totalAmount: "R$ 20.00",
    paymentMethod: "Retirar no local",
  },
  {
    invoice: "INV007",
    paymentStatus: "Pendente",
    totalAmount: "R$ 30.00",
    paymentMethod: "Retirar no local",
  },
];

export function ListaDePedidos() {
  return (
    <div>
      <div className="max-w-2xl mx-auto">
        <Table>
          <TableCaption>Ultimos pedidos</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="">Pedido</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Modalidade</TableHead>
              <TableHead className="">Valor</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {invoices.map((invoice) => (
              <TableRow key={invoice.invoice}>
                <TableCell className="font-medium">{invoice.invoice}</TableCell>
                <TableCell>
                  <Badge>{invoice.paymentStatus}</Badge>
                </TableCell>
                <TableCell>{invoice.paymentMethod}</TableCell>
                <TableCell className="">{invoice.totalAmount}</TableCell>
              </TableRow>
            ))}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TableCell colSpan={3}>Total</TableCell>
              <TableCell className="">R$ 36,00</TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      </div>
    </div>
  );
}
