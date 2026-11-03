import { z } from "zod"

const fields = {
  name: z.string().trim().min(1),
  email: z.string().trim().email(),
}

export const createAdminSchema = z.object({
  ...fields,
  password: z.string().min(6).refine(value => Buffer.byteLength(value, "utf8") <= 72,
    "A senha deve ter no máximo 72 bytes"),
}).strict()

export const updateAdminSchema = z.object(fields).partial().strict()
  .refine(value => Object.keys(value).length > 0, "Informe nome ou e-mail")
  
export const adminParamsSchema = z.object({ id: z.string().uuid() })

export type CreateAdminInput = z.infer<typeof createAdminSchema>
export type UpdateAdminInput = z.infer<typeof updateAdminSchema>
