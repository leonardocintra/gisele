import { TIPO_ITEM_DOC } from "@/constants/constants";
import { ITipoItemConsumivel } from "@/interfaces/ITipoItemConsumivel";
import firebaseData from "@/libs/firebaseConfig";
import { addDoc, collection, getDocs } from "firebase/firestore";
import { NextRequest } from "next/server";

const db = firebaseData.db;

export async function GET(req: NextRequest) {
  const querySnapshotTipoItems = await getDocs(
    collection(db, TIPO_ITEM_DOC)
  );

  const tipoItems: ITipoItemConsumivel[] = [];

  querySnapshotTipoItems.forEach((doc) => {
    tipoItems.push({
      id: doc.id,
      descricao: doc.data().descricao,
      exibirPreco: doc.data().exibirPreco,
      imagem: doc.data().imagem
    })
  });

  if (tipoItems.length > 0) {
    return Response.json(tipoItems, { status: 200 });
  } else {
    return Response.json(tipoItems, { status: 404 });
  }

}

export async function POST(req: NextRequest) {
  const data: ITipoItemConsumivel = await req.json();
  const docRef = await addDoc(collection(db, TIPO_ITEM_DOC), data);

  return Response.json(docRef, { status: 201 });
}