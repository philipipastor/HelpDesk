import { Router } from "express"
import { SessionsController } from "../controllers/sessions-controller"

export const sessionsRoutes = Router()
const controller = new SessionsController()

sessionsRoutes.post("/", controller.create)
