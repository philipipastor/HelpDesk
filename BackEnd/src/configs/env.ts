import "dotenv/config"
import { z } from "zod"

const envSchema = z.object({
  PORT: z.coerce.number().default(3333),
  DATABASE_URL: z.string().min(1),
  JWT_SECRET: z.string().min(16),
  JWT_EXPIRES_IN: z.string().default("1d"),
  // Endereços do frontend separados por vírgula. Sem valor, qualquer origem é aceita, como no desenvolvimento.
  CORS_ORIGIN: z.string().optional()
    .transform(value => value?.split(",").map(origin => origin.trim()).filter(Boolean)),
})

export const env = envSchema.parse(process.env)
