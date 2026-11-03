import { Router } from "express"
import { Role } from "@prisma/client"
import { AdminsController } from "../controllers/admins-controller"
import { ensureAuthenticated } from "../middlewares/ensure-authenticated"
import { authorize } from "../middlewares/authorize"

export const adminsRoutes = Router()
const controller = new AdminsController()

adminsRoutes.use(ensureAuthenticated, authorize(Role.ADMIN))
adminsRoutes.post("/", controller.create)
adminsRoutes.get("/", controller.index)
adminsRoutes.get("/:id", controller.show)
adminsRoutes.patch("/:id", controller.update)
adminsRoutes.delete("/:id", controller.delete)
