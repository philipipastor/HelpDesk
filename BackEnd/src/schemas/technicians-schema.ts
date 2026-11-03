import { z } from "zod"
import { emailField, nameField, passwordField } from "./users-schema"
import { businessHours, isValidDate } from "../utils/schedule"

export const defaultAvailability = ["08:00", "09:00", "10:00", "11:00", "14:00", "15:00", "16:00", "17:00"]

export const scheduledDateField = z.string({ required_error: "Selecione a data" })
  .regex(/^\d{4}-\d{2}-\d{2}$/, "Data inválida")
  .refine(isValidDate, "Data inválida")

const availabilityField =z.array(z.string().refine(hour => businessHours.includes(hour), "Horário fora do funcionamento"))
  .min(1, "Selecione pelo menos um horário")
  .transform(hours => [...new Set(hours)].sort())

export const slotsQuerySchema = z.object({ date: scheduledDateField })

export const createTechnicianSchema =z.object({
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
