import { ITEM_DOC } from "@/constants/constants";
import { IItemConsumivel } from "@/interfaces/IItemConsumivel";
import firebaseData from "@/libs/firebaseConfig";
import { collection, getDocs } from "firebase/firestore";

const db = firebaseData.db;

export const getItemsAll = async (): Promise<IItemConsumivel[] | undefined> => {
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

    return items;
  } catch (error) {
    console.error(error);
  }
};
