import { z } from "zod"

export const nameField = z.string({ required_error: "Informe o nome" }).trim().min(1, "Informe o nome")
export const emailField = z.string({ required_error: "Informe o e-mail" }).trim().email("E-mail inválido")
export const passwordField = z.string({ required_error: "Informe a senha" })
  .min(6, "A senha deve ter pelo menos 6 caracteres")
  .refine(value => Buffer.byteLength(value, "utf8") <= 72, "A senha deve ter no máximo 72 bytes")

export const idParamsSchema = z.object({ id: z.string().uuid("Identificador inválido") })

export const createUserSchema = z.object({
  name: nameField,
  email: emailField,
  password: passwordField,
}).strict()

export const updateUserSchema = z.object({ name: nameField, email: emailField }).partial().strict()
  .refine(value => Object.keys(value).length > 0, "Informe nome ou e-mail")

export const updatePasswordSchema = z.object({
  currentPassword: z.string({ required_error: "Informe a senha atual" }).min(1, "Informe a senha atual"),
  newPassword: passwordField,
}).strict()
