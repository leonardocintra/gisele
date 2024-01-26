import { ICardapio } from "@/interfaces/ICardapio";
import mongoose, { Schema, Document } from "mongoose";
import { itemConsumivelSchema } from "./ItemConsumivel";

export interface CardapioDocument extends ICardapio, Document {}

const cardapioSchema = new Schema<CardapioDocument>(
  {
    data: { type: Date, required: true },
    itens: [itemConsumivelSchema],
  },
  { timestamps: true }
);

export const Cardapio =
  mongoose.models.Cardapio ||
  mongoose.model<CardapioDocument>("Cardapio", cardapioSchema);
