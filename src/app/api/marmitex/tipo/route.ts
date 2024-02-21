import { ITipoMarmitex } from "@/interfaces/ITipoMarmitex";
import { TipoMarmitex } from "@/model/TipoMarmitex";
import mongoose from "mongoose";
import { NextRequest } from "next/server";

// export async function GET(req: NextRequest) {
//   mongoose.connect(process.env.MONGODB_URI as string);

//   const cardapio = await Cardapio.find().populate({
//     path: "itens",
//     populate: { path: "tipo", select: '_id descricao exibirPreco' }
//   });

//   return Response.json(cardapio, { status: 200 });
// }

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
