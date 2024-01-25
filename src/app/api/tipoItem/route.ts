import { ITipoItemConsumivel } from "@/interfaces/ITipoItemConsumivel";
import { TipoItemConsumivel } from "@/model/TipoItemConsumivel";
import mongoose from "mongoose";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  mongoose.connect(process.env.MONGODB_URI as string);

  return Response.json(await TipoItemConsumivel.find(), { status: 200 });
}

export async function POST(req: NextRequest) {
  mongoose.connect(process.env.MONGODB_URI as string);

  const data: ITipoItemConsumivel = await req.json();
  const doc = await TipoItemConsumivel.create({
    descricao: data.descricao,
    exibirPreco: data.exibirPreco,
    imagem: data.imagem,
  });

  return Response.json(doc, { status: 201 });
}

export async function DELETE(req: NextRequest) {
  mongoose.connect(process.env.MONGODB_URI as string);

  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");

  await TipoItemConsumivel.findByIdAndDelete({ _id: id });

  return Response.json(true);
}
