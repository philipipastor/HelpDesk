import { Router } from "express"
import { Role } from "@prisma/client"
import { ClientsController } from "../controllers/clients-controller"
import { ensureAuthenticated } from "../middlewares/ensure-authenticated"
import { authorize } from "../middlewares/authorize"

export const clientsRoutes = Router()
const controller = new ClientsController()

clientsRoutes.use(ensureAuthenticated, authorize(Role.ADMIN))
clientsRoutes.get("/", controller.index)
clientsRoutes.put("/:id", controller.update)
clientsRoutes.delete("/:id", controller.delete)
