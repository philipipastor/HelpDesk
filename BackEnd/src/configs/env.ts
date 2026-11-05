import "dotenv/config"
import { z } from "zod"

const envSchema = z.object({
  NODE_ENV: z.string().default("development"),
  PORT: z.coerce.number().default(3333),
  DATABASE_URL: z.string().min(1),
  JWT_SECRET: z.string().min(16),
  JWT_EXPIRES_IN: z.string().default("1d"),
  // Endereços do frontend separados por vírgula. Sem valor, qualquer origem é aceita, mas só fora de produção.
  CORS_ORIGIN: z.string().optional()
    .transform(value => value?.split(",").map(origin => origin.trim()).filter(Boolean)),
}).refine(env => env.NODE_ENV !== "production" || env.CORS_ORIGIN?.length, {
  path: ["CORS_ORIGIN"],
  message: "Defina CORS_ORIGIN em produção com o endereço do frontend",
})

export const env = envSchema.parse(process.env)
