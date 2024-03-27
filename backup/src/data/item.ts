import { ITEM_DOC } from "@/constants/constants";
import { IItemConsumivel } from "@/interfaces/IItemConsumivel";
import firebaseData from "@/lib/firebaseConfig";
import { collection, getDocs } from "firebase/firestore";

const db = firebaseData.db;

export const getItemByOrganizationId = async (
  organizationId: string
): Promise<IItemConsumivel[] | undefined> => {
  try {
    const querySnapshotItems = await getDocs(collection(db, ITEM_DOC));

    const items: IItemConsumivel[] = [];

    querySnapshotItems.forEach((doc) => {
      items.push({
        id: doc.id,
        descricao: doc.data().descricao,
        preco: doc.data().preco,
        tipo: doc.data().tipo,
      });
    });

    return items.filter((item) => item.tipo.organizacaoId === organizationId);
  } catch (error) {
    console.error(error);
  }
};

export const getItemById = async (
  itemId: string
): Promise<IItemConsumivel | undefined> => {
  try {
    const querySnapshotItems = await getDocs(collection(db, ITEM_DOC));

    const items: IItemConsumivel[] = [];

    querySnapshotItems.forEach((doc) => {
      items.push({
        id: doc.id,
        descricao: doc.data().descricao,
        preco: doc.data().preco,
        tipo: doc.data().tipo,
      });
    });

    return items.find((item) => item.id === itemId);
  } catch (error) {
    console.error(error);
  }
};
