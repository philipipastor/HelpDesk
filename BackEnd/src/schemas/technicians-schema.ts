import { z } from "zod"
import { emailField, nameField, passwordField } from "./users-schema"

export const defaultAvailability = ["08:00", "09:00", "10:00", "11:00", "14:00", "15:00", "16:00", "17:00"]

const availabilityField = z.array(z.string().regex(/^([01]\d|2[0-3]):00$/, "Horário inválido"))
  .min(1, "Selecione pelo menos um horário")
  .transform(hours => [...new Set(hours)].sort())

export const createTechnicianSchema = z.object({
  name: nameField,
  email: emailField,
  password: passwordField,
  availability: availabilityField.default(defaultAvailability),
}).strict()

export const updateTechnicianSchema = z.object({
  name: nameField,
  email: emailField,
  availability: availabilityField,
}).partial().strict()
  .refine(value => Object.keys(value).length > 0, "Informe ao menos um campo")
