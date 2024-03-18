import { ORGANIZACAO_DOC } from "@/constants/constants";
import { IOrganizacao } from "@/interfaces/IOrganizacao";
import firebaseData from "@/libs/firebaseConfig";
import { addDoc, collection, doc, getDoc } from "firebase/firestore";

const db = firebaseData.db;

export const getOrganizationBySlug = async (id: string) => {
  try {
    const snap = await getDoc(doc(db, ORGANIZACAO_DOC, id));

    if (snap.exists()) {
      const organizacao: IOrganizacao = {
        id: snap.id,
        descricao: snap.data().descricao,
        imagem: snap.data().imagem,
        slug: snap.data().slug as string,
      };
      return organizacao;
    } else {
      return null;
    }
  } catch (error) {
    console.error(error);
  }
};

export const createOrganization = async (data: IOrganizacao) => {
  const organization = await getOrganizationBySlug(data.id);

  if (organization) {
    return organization;
  } else {
    await addDoc(collection(db, ORGANIZACAO_DOC), data);
    return await getOrganizationBySlug(data.id);
  }
};
