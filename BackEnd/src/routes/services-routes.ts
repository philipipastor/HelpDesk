import { Router } from "express"
import { Role } from "@prisma/client"
import { ServicesController } from "../controllers/services-controller"
import { ensureAuthenticated } from "../middlewares/ensure-authenticated"
import { optionalAuth } from "../middlewares/optional-auth"
import { authorize } from "../middlewares/authorize"

export const servicesRoutes = Router()
const controller = new ServicesController()

servicesRoutes.get("/", optionalAuth, controller.index)
servicesRoutes.post("/", ensureAuthenticated, authorize(Role.ADMIN), controller.create)
servicesRoutes.put("/:id", ensureAuthenticated, authorize(Role.ADMIN), controller.update)
