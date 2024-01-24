import { ITipoItemConsumivel } from "@/interfaces/ITipoItemConsumivel";
import { TipoItem } from "@/model/TipoItemConsumivel";
import mongoose from "mongoose";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  mongoose.connect(process.env.MONGODB_URI as string);

  return Response.json(await TipoItem.find(), { status: 200 });
}

export async function POST(req: NextRequest) {
  mongoose.connect(process.env.MONGODB_URI as string);

  const data: ITipoItemConsumivel = await req.json();
  const doc = await TipoItem.create({
    descricao: data.descricao,
    exibirPreco: data.exibirPreco,
    imagem: data.imagem,
  });

  return Response.json(doc, { status: 201 });
}
