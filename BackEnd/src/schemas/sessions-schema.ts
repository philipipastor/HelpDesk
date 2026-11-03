import { z } from "zod"

export const createSessionSchema = z.object({
  email: z.string().trim().email(),
  password: z.string().min(1),
}).strict()

export type CreateSessionInput = z.infer<typeof createSessionSchema>
