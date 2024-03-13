import * as z from "zod";

export const LoginSchema = z.object({
  email: z.string().email({
    message: "Email é obrigatoório",
  }),
  password: z.string().min(5, {
    message: "A senha deve conter no mínimo 5 caracteres",
  }),
});

export const RegisterSchema = z.object({
  email: z.string().email({
    message: "Email é obrigatoório",
  }),
  password: z.string().min(5, {
    message: "A senha deve conter no mínimo 5 caracteres",
  }),
  name: z.string().min(2, {
    message: "O nome é obrigatorio",
  }),
});
