import * as z from "zod";

export const LoginSchema = z.object({
  email: z.string().email({
    message: "Email é obrigatoório",
  }),
  password: z.string().min(5, {
    message: "A senha deve conter no mínimo 5 caracteres",
  }),
});
