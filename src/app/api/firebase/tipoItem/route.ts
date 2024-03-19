import { TIPO_ITEM_DOC } from "@/constants/constants";
import { ITipoItemConsumivel } from "@/interfaces/ITipoItemConsumivel";
import firebaseData from "@/libs/firebaseConfig";
import { addDoc, collection } from "firebase/firestore";
import { NextRequest } from "next/server";

const db = firebaseData.db;

export async function POST(req: NextRequest) {
  const data: ITipoItemConsumivel = await req.json();
  const docRef = await addDoc(collection(db, TIPO_ITEM_DOC), data);

  return Response.json(docRef, { status: 201 });
}
