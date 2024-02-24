import { ItemConsumivel, ItemConsumivelDocument } from "@/model/ItemConsumivel";
import mongoose from "mongoose";

export async function GET(
  request: Request,
  { params }: { params: { tipo: string } }
) {
  mongoose.connect(process.env.MONGODB_URI as string);

  try {
    // Buscar todos os itens populando o campo 'tipo'
    const items: ItemConsumivelDocument[] = await ItemConsumivel.find({
      tipo: params.tipo,
    }).populate("tipo");

    // Retornar a resposta JSON com os itens populados
    return Response.json(items, { status: 200 });
  } catch (error: any) {
    console.error("Erro ao buscar items:", error);
    // Retornar uma resposta de erro se ocorrer algum problema
    return Response.error();
  }
}
