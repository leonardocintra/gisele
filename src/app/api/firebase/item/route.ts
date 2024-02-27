import { ITEM_DOC } from "@/constants/constants";
import { IItemConsumivel } from "@/interfaces/IItemConsumivel";
import firebaseData from "@/libs/firebaseConfig";
import { addDoc, collection, getDocs } from "firebase/firestore";
import { NextRequest } from "next/server";

const db = firebaseData.db;

export async function GET(req: NextRequest) {
  try {
    const querySnapshotItems = await getDocs(collection(db, ITEM_DOC));

    const items: IItemConsumivel[] = [];

    querySnapshotItems.forEach((doc) => {
      items.push({
        id: doc.id,
        descricao: doc.data().descricao,
        preco: doc.data().preco,
        tipo: doc.data().tipo,
      })
    });

    // Retornar a resposta JSON com os itens populados
    if (items.length > 0) {
      return Response.json(items, { status: 200 });
    } else {
      return Response.json(items, { status: 404 });
    }
  } catch (error: any) {
    return Response.error();
  }
}

export async function POST(req: NextRequest) {
  const data: IItemConsumivel = await req.json();
  const docRef = await addDoc(collection(db, ITEM_DOC), data);

  return Response.json(docRef, { status: 201 });
}

export async function DELETE(req: NextRequest) {
  // TODO: implementar
}
