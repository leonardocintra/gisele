import { TIPO_MARMITEX_DOC } from "@/constants/constants";
import { ITipoMarmitex } from "@/interfaces/ITipoMarmitex";
import firebaseData from "@/lib/firebaseConfig";
import { addDoc, collection, getDocs } from "firebase/firestore";
import { NextRequest } from "next/server";

const db = firebaseData.db;

export async function GET(req: NextRequest) {
  const querySnapshotMarmitext = await getDocs(collection(db, TIPO_MARMITEX_DOC))

  const tipoMarmitex: ITipoMarmitex[] = [];

  querySnapshotMarmitext.forEach((doc) => {
    tipoMarmitex.push({
      id: doc.id,
      ativo: doc.data().ativo,
      configuracoes: doc.data().configuracoes,
      descricao: doc.data().descricao,
      preco: doc.data().preco,
    })
  })

  return Response.json(tipoMarmitex, { status: 200 });
}

export async function POST(req: NextRequest) {
  const data: ITipoMarmitex = await req.json();
  const docRef = await addDoc(collection(db, TIPO_MARMITEX_DOC), data);

  return Response.json(docRef, { status: 201 });
}