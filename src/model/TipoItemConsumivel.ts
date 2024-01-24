import { ITipoItemConsumivel } from "@/interfaces/ITipoItemConsumivel";
import mongoose, { Schema, Document } from "mongoose";

export interface TipoItemDocument extends ITipoItemConsumivel, Document {}

const tipoItemSchema = new Schema<TipoItemDocument>(
  {
    descricao: { type: String, required: true },
    exibirPreco: { type: Boolean, required: true },
    imagem: { type: String, required: false },
  },
  { timestamps: true }
);

export const TipoItem =
  mongoose.models.TipoItem ||
  mongoose.model<TipoItemDocument>("TipoItem", tipoItemSchema);
