import { Card } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function CardapioPage() {
  return (
    <div className="max-w-md mx-auto my-8">
      <Tabs defaultValue="carnes">
        <TabsList>
          <TabsTrigger value="carnes">Carnes</TabsTrigger>
          <TabsTrigger value="guarnicao">Guarnicao</TabsTrigger>
          <TabsTrigger value="salada">Salada</TabsTrigger>
        </TabsList>

        <TabsContent value="carnes">
          <Card>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Carne</TableHead>
                  <TableHead>Disponivel</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell>File de frango</TableCell>
                  <TableCell>Sim</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>File de frango</TableCell>
                  <TableCell>Sim</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>File de frango</TableCell>
                  <TableCell>Sim</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </Card>
        </TabsContent>

        <TabsContent value="guarnicao">
          <Card>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Guarnição</TableHead>
                  <TableHead>Disponivel</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell>File de frango</TableCell>
                  <TableCell>Sim</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>File de frango</TableCell>
                  <TableCell>Sim</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>File de frango</TableCell>
                  <TableCell>Sim</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </Card>
        </TabsContent>

        <TabsContent value="salada">
          <Card>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Saladas</TableHead>
                  <TableHead>Disponivel</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell>Beterraba</TableCell>
                  <TableCell>Sim</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>File de frango</TableCell>
                  <TableCell>Sim</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>File de frango</TableCell>
                  <TableCell>Sim</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
