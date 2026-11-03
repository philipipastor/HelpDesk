import { Router } from "express"
import { Role } from "@prisma/client"
import { TechniciansController } from "../controllers/technicians-controller"
import { ensureAuthenticated } from "../middlewares/ensure-authenticated"
import { authorize } from "../middlewares/authorize"

export const techniciansRoutes = Router()
const controller = new TechniciansController()

techniciansRoutes.use(ensureAuthenticated)
techniciansRoutes.get("/", authorize(Role.ADMIN, Role.CLIENT), controller.index)
techniciansRoutes.post("/", authorize(Role.ADMIN), controller.create)
techniciansRoutes.get("/:id", authorize(Role.ADMIN), controller.show)
techniciansRoutes.put("/:id", authorize(Role.ADMIN), controller.update)
