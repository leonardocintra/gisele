import { ITEM_DOC } from "@/constants/constants";
import { IItemConsumivel } from "@/interfaces/IItemConsumivel";
import firebaseData from "@/lib/firebaseConfig";
import { doc, getDoc } from "firebase/firestore";
import { NextRequest } from "next/server";

const db = firebaseData.db;

export async function GET(request: Request, { params }: { params: { id: string } }) {
  try {
    const snap = await getDoc(doc(db, ITEM_DOC, params.id));

    if (snap.exists()) {
      const item: IItemConsumivel = {
        id: snap.id,
        descricao: snap.data().descricao,
        preco: snap.data().preco,
        tipo: snap.data().tipo,
      }
      return Response.json(item, { status: 200 });
    } else {
      return Response.json({ message: 'Items não encontrado' }, { status: 404 });
    }
  } catch (error: any) {
    return Response.error();
  }
}

export async function DELETE(req: NextRequest) {
  // TODO: implementar
}
