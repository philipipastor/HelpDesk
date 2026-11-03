import { z } from "zod"

// Funcionamento das 08:00 às 20:00: o último atendimento de uma hora começa às 19:00.
export const availableHours = [
    "08:00", "09:00", "10:00", "11:00", "12:00", "13:00",
    "14:00", "15:00", "16:00", "17:00", "18:00", "19:00",
]

// Horário comercial: padrão de todo técnico novo.
export const defaultHours = ["08:00", "09:00", "10:00", "11:00", "14:00", "15:00", "16:00", "17:00"]

export const technicianFormSchema = z.object({
    name: z.string().trim().min(3, "O nome deve ter pelo menos 3 caracteres"),
    email: z.string().trim().email("Insira um e-mail válido"),
    password: z.string(),
    availability: z.array(z.string()).min(1, "Selecione pelo menos um horário"),
    isNew: z.boolean(),
}).refine(data => !data.isNew || data.password.length >= 6, {
    path: ["password"],
    message: "A senha deve ter pelo menos 6 caracteres",
})

export type TechnicianFormData = z.infer<typeof technicianFormSchema>
