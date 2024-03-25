import { ORGANIZACAO_DOC } from "@/constants/constants";
import { IOrganizacao } from "@/interfaces/IOrganizacao";
import firebaseData from "@/lib/firebaseConfig";
import { addDoc, collection, doc, getDoc } from "firebase/firestore";

const db = firebaseData.db;

export const getOrganizationBySlug = async (slug: string) => {

  console.log(slug)

  try {
    const snap = await getDoc(doc(db, ORGANIZACAO_DOC, slug));

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

export const getOrganizationById = async (id: string) => {
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
  const organization = await getOrganizationById(data.id);

  if (organization) {
    return organization;
  } else {
    await addDoc(collection(db, ORGANIZACAO_DOC), data);
    return await getOrganizationById(data.id);
  }
};
