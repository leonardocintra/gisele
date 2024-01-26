import { IItemConsumivel } from "@/interfaces/IItemConsumivel";
import mongoose, { Schema, Document } from "mongoose";

export interface ItemConsumivelDocument extends IItemConsumivel, Document {}

export const itemConsumivelSchema = new Schema<ItemConsumivelDocument>(
  {
    descricao: { type: String, required: true, unique: true },
    preco: { type: Number, required: true },
    tipo: {
      type: Schema.Types.ObjectId,
      ref: "TipoItemConsumivel",
      required: true,
    },
  },
  { timestamps: true }
);

export const ItemConsumivel =
  mongoose.models.ItemConsumivel ||
  mongoose.model<ItemConsumivelDocument>("ItemConsumivel", itemConsumivelSchema);
