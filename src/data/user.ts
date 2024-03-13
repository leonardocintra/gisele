import { USER_DOC } from "@/constants/constants";
import { IUser } from "@/interfaces/IUser";
import { db } from "@/lib/firebaseConfig";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  where,
} from "firebase/firestore";

export const getUserByEmail = async (email: string) => {
  try {
    const q = query(collection(db, USER_DOC), where("email", "==", email));
    const snap = await getDocs(q);

    if (snap.docs.length === 0) {
      return null;
    }

    if (snap.docs.length > 1) {
      console.log("Ops.. algo errado nao esta certo aqui!");
    }

    const users: IUser[] = [];

    snap.forEach((doc) => {
      users.push({
        id: doc.id,
        name: doc.data().name,
        email: doc.data().email,
        emailVerified: doc.data().emailVerified,
        password: doc.data().password,
        image: doc.data().image,
      });
    });

    return users[0];
  } catch (error) {
    return null;
  }
};

export const getUserById = async (id: string) => {
  try {
    const snap = await getDoc(doc(db, USER_DOC, id));

    if (!snap.exists()) {
      return null;
    }

    const user: IUser = {
      id: snap.id,
      name: snap.data().name,
      email: snap.data().email,
      emailVerified: snap.data().emailVerified,
      password: snap.data().password,
      image: snap.data().image,
    };

    return user;
  } catch (error) {
    return null;
  }
};
