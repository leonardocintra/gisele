import { IItemConsumivel } from "@/interfaces/IItemConsumivel";
import { ItemConsumivel, ItemConsumivelDocument } from "@/model/ItemConsumivel";
import mongoose from "mongoose";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  mongoose.connect(process.env.MONGODB_URI as string);

  try {
    // Buscar todos os itens populando o campo 'tipo'
    const items: ItemConsumivelDocument[] = await ItemConsumivel.find()
      .populate("tipo")
      .sort({ descricao: 1 })
      .lean(false);

    // Retornar a resposta JSON com os itens populados
    return Response.json(items, { status: 200 });
  } catch (error: any) {
    console.error("Erro ao buscar items:", error);
    // Retornar uma resposta de erro se ocorrer algum problema
    return Response.error();
  }
}

export async function POST(req: NextRequest) {
  mongoose.connect(process.env.MONGODB_URI as string);

  const data: IItemConsumivel = await req.json();
  const doc = await ItemConsumivel.create({
    descricao: data.descricao,
    preco: data.preco,
    tipo: data.tipo,
  });

  return Response.json(doc, { status: 201 });
}

export async function DELETE(req: NextRequest) {
  mongoose.connect(process.env.MONGODB_URI as string);

  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");

  await ItemConsumivel.findByIdAndDelete({ _id: id });

  return Response.json(true);
}
