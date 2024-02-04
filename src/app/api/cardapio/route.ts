import { ICardapio } from "@/interfaces/ICardapio";
import { Cardapio } from "@/model/Cardapio";
import mongoose from "mongoose";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  mongoose.connect(process.env.MONGODB_URI as string);

  const cardapio = await Cardapio.find().populate("itens");

  return Response.json(cardapio, { status: 200 });
}

export async function POST(req: NextRequest) {
  mongoose.connect(process.env.MONGODB_URI as string);

  const data: ICardapio = await req.json();
  const doc = await Cardapio.create({
    data: data.data,
    itens: data.itens,
  });

  return Response.json(doc, { status: 201 });
}

export async function PUT(req: NextRequest) {
  mongoose.connect(process.env.MONGODB_URI as string);

  const { _id, ...data } = await req.json();

  await Cardapio.findByIdAndUpdate(_id, data);

  return Response.json(true);
}
