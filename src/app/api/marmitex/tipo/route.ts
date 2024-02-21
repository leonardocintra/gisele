import { ITipoMarmitex } from "@/interfaces/ITipoMarmitex";
import { TipoMarmitex } from "@/model/TipoMarmitex";
import mongoose from "mongoose";
import { NextRequest } from "next/server";
import path from "path";

export async function GET(req: NextRequest) {
  mongoose.connect(process.env.MONGODB_URI as string);

  const tipoMarmitex = await TipoMarmitex.find().populate({
    path: "configuracoes",
    populate: {
      path: "tipo",
      select: "descricao imagem"
    }
  });

  return Response.json(tipoMarmitex, { status: 200 });
}

export async function POST(req: NextRequest) {
  mongoose.connect(process.env.MONGODB_URI as string);

  const data: ITipoMarmitex = await req.json();
  console.log(data);

  const doc = await TipoMarmitex.create({
    descricao: data.descricao,
    ativo: data.ativo,
    configuracoes: data.configuracoes
  });

  return Response.json(doc, { status: 201 });
}

// export async function PUT(req: NextRequest) {
//   mongoose.connect(process.env.MONGODB_URI as string);

//   const { _id, ...data } = await req.json();

//   await Cardapio.findByIdAndUpdate(_id, data);

//   return Response.json(true);
// }
