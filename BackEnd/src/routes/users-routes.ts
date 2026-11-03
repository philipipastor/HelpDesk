import { Router } from "express"
import { Role } from "@prisma/client"
import { UsersController } from "../controllers/users-controller"
import { ensureAuthenticated } from "../middlewares/ensure-authenticated"
import { authorize } from "../middlewares/authorize"

export const usersRoutes = Router()
const controller = new UsersController()

usersRoutes.post("/", controller.create)
usersRoutes.get("/me", ensureAuthenticated, controller.show)
usersRoutes.patch("/me", ensureAuthenticated, controller.update)
usersRoutes.patch("/me/password", ensureAuthenticated, controller.updatePassword)
usersRoutes.delete("/me", ensureAuthenticated, authorize(Role.CLIENT), controller.delete)
