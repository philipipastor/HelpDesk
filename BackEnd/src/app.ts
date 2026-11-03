import "express-async-errors"
import express from "express"
import cors from "cors"
import { routes } from "./routes"
import { errorHandler } from "./middlewares/error-handler"

export const app = express()

app.use(cors())
app.use(express.json())
app.get("/health", (_request, response) => response.json({ status: "ok" }))
app.use(routes)
app.use(errorHandler)
