import bcrypt from "bcryptjs";
import type { NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";

import { getUserByEmail } from "@/data/user";
import { LoginSchema } from "@/schemas";


export default {
  providers: [
    Credentials({
      async authorize(credentials) {
        const validatedFields = LoginSchema.safeParse(credentials);

        if (validatedFields.success) {
          const { email, password } = validatedFields.data;

          const user = await getUserByEmail(email);

          if (!user) {
            console.log("Leonardo: User not found");
            return null;
          }

          if (!user.password) {
            console.log("Leonardo: Password not found");
            return null;
          }

          const passwordMatch = await bcrypt.compare(password, user.password);

          if (passwordMatch) {
            return user;
          } else {
            console.log("Leonardo: Password não deu match!");
          }
        }
        return null;
      },
    }),
  ],
} satisfies NextAuthConfig;
