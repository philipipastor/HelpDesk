import "express-async-errors"
import express from "express"
import cors from "cors"
import { routes } from "./routes"
import { errorHandler } from "./middlewares/error-handler"
import { env } from "./configs/env"

export const app = express()

app.use(cors(env.CORS_ORIGIN?.length ? { origin: env.CORS_ORIGIN } : undefined))
app.use(express.json())
app.get("/health", (_request, response) => response.json({ status: "ok" }))
app.use(routes)
app.use(errorHandler)
