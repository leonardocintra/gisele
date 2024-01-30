import { ICardapio } from "@/interfaces/ICardapio";
import mongoose, { Schema, Document } from "mongoose";

export interface CardapioDocument extends ICardapio, Document {}

const cardapioSchema = new Schema<CardapioDocument>(
  {
    data: { type: Date, required: true },
    itens: [
      {
        type: Schema.Types.ObjectId,
        ref: "ItemConsumivel",
      },
    ],
  },
  { timestamps: true }
);

export const Cardapio =
  mongoose.models.Cardapio ||
  mongoose.model<CardapioDocument>("Cardapio", cardapioSchema);
