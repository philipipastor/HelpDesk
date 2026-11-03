import { Router } from "express"
import { adminsRoutes } from "./admins-routes"
import { clientsRoutes } from "./clients-routes"
import { servicesRoutes } from "./services-routes"
import { sessionsRoutes } from "./sessions-routes"
import { techniciansRoutes } from "./technicians-routes"
import { ticketsRoutes } from "./tickets-routes"
import { usersRoutes } from "./users-routes"

export const routes = Router()
routes.use("/sessions", sessionsRoutes)
routes.use("/users", usersRoutes)
routes.use("/admins", adminsRoutes)
routes.use("/technicians", techniciansRoutes)
routes.use("/clients", clientsRoutes)
routes.use("/services", servicesRoutes)
routes.use("/tickets", ticketsRoutes)
