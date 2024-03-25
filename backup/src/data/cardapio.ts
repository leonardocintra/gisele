import { CARDAPIO_DOC } from "@/constants/constants";
import { ICardapio } from "@/interfaces/ICardapio";
import firebaseData from "@/lib/firebaseConfig";
import { collection, getDocs } from "firebase/firestore";

const db = firebaseData.db;

export const getCardapioByOrganizationId = async (
  organizationId: string
): Promise<ICardapio[] | undefined> => {
  try {
    const querySnap = await getDocs(collection(db, CARDAPIO_DOC));

    const cardapios: ICardapio[] = [];

    querySnap.forEach((doc) => {
      cardapios.push({
        id: doc.id,
        data: doc.data().data,
        itens: doc.data().itens,
        organizacaoId: doc.data().organizacaoId,
      });
    });

    return cardapios.filter((c) => c.organizacaoId === organizationId);
  } catch (error) {
    console.error(error);
  }
};
