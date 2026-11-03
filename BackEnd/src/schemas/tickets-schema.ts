import { z } from "zod"
import { amountField, titleField } from "./services-schema"
import { scheduledDateField } from "./technicians-schema"

export const createTicketSchema = z.object({
  title: titleField,
  description: z.string({ required_error: "Informe a descrição" }).trim().min(1, "Informe a descrição"),
  serviceId: z.string({ required_error: "Selecione o serviço" }).uuid("Serviço inválido"),
  technicianId: z.string({ required_error: "Selecione o técnico" }).uuid("Técnico inválido"),
  scheduledDate: scheduledDateField,
  scheduledHour: z.string({ required_error: "Selecione o horário" }).regex(/^\d{2}:00$/, "Horário inválido"),
}).strict()

export const updateTicketStatusSchema = z.object({
  status: z.enum(["in_progress", "closed"], { message: "Status inválido" }),
}).strict()

export const additionalServiceSchema = z.object({
  title: titleField,
  amount: amountField,
}).strict()

export const additionalServiceParamsSchema = z.object({
  id: z.string().uuid("Identificador inválido"),
  serviceId: z.string().uuid("Identificador inválido"),
})
