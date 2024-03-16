import { ICardapio } from "@/interfaces/ICardapio";
import { CARDAPIO_DOC } from "@/constants/constants";
import firebaseData from "@/libs/firebaseConfig";
import {
  addDoc,
  collection,
  doc,
  getDocs,
  updateDoc,
} from "firebase/firestore";
import { NextRequest } from "next/server";

const db = firebaseData.db;

export async function GET(req: NextRequest) {
  try {
    const querySnapshotCardapio = await getDocs(collection(db, CARDAPIO_DOC));
    const cardapios: ICardapio[] = [];

    querySnapshotCardapio.forEach((doc) => {
      cardapios.push({
        id: doc.id,
        data: doc.data().data,
        itens: doc.data().itens,
        restauranteId: doc.data().restauranteId,
      });
    });

    // Retornar a resposta JSON com os itens populados
    if (cardapios.length === 0) {
      return Response.json(cardapios, { status: 404 });
    }
    return Response.json(cardapios, { status: 200 });
  } catch (error: any) {
    console.error("Erro ao buscar cardapios:", error);
    // Retornar uma resposta de erro se ocorrer algum problema
    return Response.error();
  }
}

export async function POST(req: NextRequest) {
  const data: ICardapio = await req.json();
  const docRef = await addDoc(collection(db, CARDAPIO_DOC), data);

  return Response.json(docRef, { status: 201 });
}

export async function PUT(req: NextRequest) {
  const { id, ...data } = await req.json();

  const cardapioRef = doc(db, CARDAPIO_DOC, id);
  await updateDoc(cardapioRef, data);

  return Response.json(true);
}
