import { TIPO_ITEM_DOC } from "@/constants/constants";
import { ITipoItemConsumivel } from "@/interfaces/ITipoItemConsumivel";
import firebaseData from "@/libs/firebaseConfig";
import { addDoc, collection, getDocs } from "firebase/firestore";

const db = firebaseData.db;

export const createTipoItem = async (
  data: ITipoItemConsumivel,
  organizationId: string
) => {
  const item: Partial<ITipoItemConsumivel> = {
    descricao: data.descricao,
    exibirPreco: data.exibirPreco,
    imagem: data.imagem,
    organizacaoId: organizationId,
  };

  try {
    await addDoc(collection(db, TIPO_ITEM_DOC), item);
  } catch (err) {
    console.error(err);
  }
};

export const getTiposItemByOrganizationId = async (organizationId: string) => {

  // TODO: fazer uma query com "where".
  const querySnapshotTipoItems = await getDocs(collection(db, TIPO_ITEM_DOC));

  const tipoItems: ITipoItemConsumivel[] = [];

  querySnapshotTipoItems.forEach((doc) => {
    tipoItems.push({
      id: doc.id,
      descricao: doc.data().descricao,
      exibirPreco: doc.data().exibirPreco,
      imagem: doc.data().imagem,
      organizacaoId: doc.data().organizacaoId,
    });
  });

  return tipoItems.filter(
    (tipoItem) => tipoItem.organizacaoId == organizationId
  );
};
