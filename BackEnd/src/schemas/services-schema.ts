import { z } from "zod"

export const titleField = z.string({ required_error: "Informe o título" }).trim().min(1, "Informe o título")
export const amountField = z.number({ required_error: "Informe o valor", invalid_type_error: "Valor inválido" })
  .positive("O valor deve ser maior que zero")
  .max(99999999.99, "Valor muito alto")
  .multipleOf(0.01, "O valor deve ter até 2 casas decimais")

export const createServiceSchema = z.object({
  title: titleField,
  amount: amountField,
  status: z.boolean().default(true),
}).strict()

export const updateServiceSchema = z.object({
  title: titleField,
  amount: amountField,
  status: z.boolean(),
}).partial().strict()
  .refine(value => Object.keys(value).length > 0, "Informe ao menos um campo")
