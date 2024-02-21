import { ITipoMarmitex } from "@/interfaces/ITipoMarmitex";
import mongoose, { Schema, Document } from "mongoose";

export interface TipoMarmitexDocument extends ITipoMarmitex, Document { }

const marmitexSchema = new Schema<TipoMarmitexDocument>(
  {
    descricao: { type: String, required: true },
    ativo: { type: Boolean, default: true },
    preco: { type: Number, required: true },
    configuracoes: [{
      quantidade: { type: Number, required: true },
      tipo: {
        type: Schema.Types.ObjectId,
        ref: "TipoItemConsumivel",
      },
    }]
  },
  { timestamps: true }
);

export const TipoMarmitex =
  mongoose.models.TipoMarmitex ||
  mongoose.model<TipoMarmitexDocument>("TipoMarmitex", marmitexSchema);
