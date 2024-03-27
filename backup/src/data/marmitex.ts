import { TIPO_MARMITEX_DOC } from "@/constants/constants";
import { ITipoMarmitex } from "@/interfaces/ITipoMarmitex";
import firebaseData from "@/lib/firebaseConfig";
import { collection, getDocs } from "firebase/firestore";

const db = firebaseData.db;

export const getMarmitexByOrganizationId = async (
  organizationId: string
): Promise<ITipoMarmitex[] | undefined> => {
  try {
    const querySnap = await getDocs(collection(db, TIPO_MARMITEX_DOC));

    const tipoMarmitex: ITipoMarmitex[] = [];

    querySnap.forEach((doc) => {
      tipoMarmitex.push({
        id: doc.id,
        ativo: doc.data().ativo,
        configuracoes: doc.data().configuracoes,
        descricao: doc.data().descricao,
        preco: doc.data().preco,
        organizacaoId: doc.data().organizacaoId,
      });
    });

    return tipoMarmitex.filter((m) => m.organizacaoId === organizationId);
  } catch (error) {
    console.error(error);
  }
};
