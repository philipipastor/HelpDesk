import { Router } from "express"
import { Role } from "@prisma/client"
import { TicketsController } from "../controllers/tickets-controller"
import { ensureAuthenticated } from "../middlewares/ensure-authenticated"
import { authorize } from "../middlewares/authorize"

export const ticketsRoutes = Router()
const controller = new TicketsController()

ticketsRoutes.use(ensureAuthenticated)
ticketsRoutes.post("/", authorize(Role.CLIENT), controller.create)
ticketsRoutes.get("/", controller.index)
ticketsRoutes.get("/:id", controller.show)
ticketsRoutes.patch("/:id/status", authorize(Role.ADMIN, Role.TECHNICIAN), controller.updateStatus)
ticketsRoutes.post("/:id/additional-services", authorize(Role.TECHNICIAN), controller.addService)
ticketsRoutes.delete("/:id/additional-services/:serviceId", authorize(Role.TECHNICIAN), controller.removeService)
