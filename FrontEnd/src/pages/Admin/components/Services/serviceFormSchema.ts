import { z } from "zod"

export const serviceSchema = z.object({
    title: z.string().trim().min(1, "Informe o nome do serviço"),
    amount: z.string().trim()
        .min(1, "Informe o valor do serviço")
        .regex(/^\d+([.,]\d{1,2})?$/, "Informe um valor válido com até 2 casas decimais")
        .refine(value => {
            const amount = Number(value.replace(",", "."))
            return Number.isFinite(amount) && amount > 0
        }, "O valor deve ser maior que zero")
})

export type ServiceFormData = z.infer<typeof serviceSchema>
