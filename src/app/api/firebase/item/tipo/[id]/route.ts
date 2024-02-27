import { ITEM_DOC, TIPO_ITEM_DOC } from "@/constants/constants";
import { IItemConsumivel } from "@/interfaces/IItemConsumivel";
import firebaseData from "@/libs/firebaseConfig";
import { collection, getDocs, query, where } from "firebase/firestore";

const db = firebaseData.db;

export async function GET(request: Request, { params }: { params: { id: string } }) {
  try {
    const itemsRef = collection(db, ITEM_DOC);
    const q = query(itemsRef, where("tipo.id", "==", params.id));
    const querySnapshotItems = await getDocs(q);

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
    if (items.length === 0) {
      return Response.json(items, { status: 404 });
    }
    return Response.json(items, { status: 200 });

  } catch (error: any) {
    console.error("Erro ao buscar items:", error);
    // Retornar uma resposta de erro se ocorrer algum problema
    return Response.error();
  }
}
