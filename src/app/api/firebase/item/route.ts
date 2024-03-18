import { getItemsAll } from "@/data/item";
import { ITEM_DOC } from "@/constants/constants";
import { IItemConsumivel } from "@/interfaces/IItemConsumivel";
import firebaseData from "@/libs/firebaseConfig";
import { addDoc, collection, doc, updateDoc } from "firebase/firestore";
import { NextRequest } from "next/server";

const db = firebaseData.db;

export async function GET(req: NextRequest) {
  try {
    const items = await getItemsAll();

    // Retornar a resposta JSON com os itens populados
    if (items && items.length > 0) {
      return Response.json(items, { status: 200 });
    } else {
      return Response.json(items, { status: 404 });
    }
  } catch (error: any) {
    return Response.error();
  }
}

export async function PUT(req: NextRequest) {
  const data: IItemConsumivel = await req.json();

  await updateDoc(doc(db, ITEM_DOC, data.id), {
    descricao: data.descricao,
    preco: data.preco,
    tipo: data.tipo,
  });
  return Response.json(true, { status: 200 });
}

export async function POST(req: NextRequest) {
  const data: IItemConsumivel = await req.json();
  const docRef = await addDoc(collection(db, ITEM_DOC), data);

  return Response.json(docRef, { status: 201 });
}

export async function DELETE(req: NextRequest) {
  // TODO: implementar
}
