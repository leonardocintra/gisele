"use server";

import { RegisterSchema } from "@/schemas";
import * as z from "zod";
import bcrypt from "bcryptjs";
import { db } from "@/lib/firebaseConfig";
import { USER_DOC } from "@/constants/constants";
import { addDoc, collection } from "firebase/firestore";
import { getUserByEmail } from "@/data/user";

export const register = async (values: z.infer<typeof RegisterSchema>) => {
  const validateFields = RegisterSchema.safeParse(values);

  if (!validateFields.success) {
    return { error: "Dados informados inválidos!" };
  }

  const { email, password, name } = validateFields.data;

  const existingUser = await getUserByEmail(email);

  if (existingUser) {
    return { error: "Já existe uma conta com esse email!" };
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  await addDoc(collection(db, USER_DOC), {
    email,
    password: hashedPassword,
    name,
  });

  // TODO: send verification email

  return { success: "Cadastro feito com sucesso!" };
};
