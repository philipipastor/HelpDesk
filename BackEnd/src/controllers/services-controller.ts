import type { Request, Response } from "express"
import { Role } from "@prisma/client"
import { prisma } from "../prisma"
import { handleDatabaseError } from "../utils/handle-database-error"
import { presentService } from "../utils/presenters"
import { idParamsSchema } from "../schemas/users-schema"
import { createServiceSchema, updateServiceSchema } from "../schemas/services-schema"

export class ServicesController {
  // Somente o admin vê os serviços desativados.
  async index(request: Request, response: Response) {
    const services = await prisma.service.findMany({
      where: request.user?.role === Role.ADMIN ? {} : { isActive: true },
      orderBy: { name: "asc" },
    })
    return response.json(services.map(presentService))
  }

  async create(request: Request, response: Response) {
    const { title, amount, status } = createServiceSchema.parse(request.body)
    const service = await prisma.service.create({ data: { name: title, price: amount, isActive: status } })
    return response.status(201).json(presentService(service))
  }

  // Desativar é o soft delete: o serviço continua nos chamados já criados.
  async update(request: Request, response: Response) {
    const { id } = idParamsSchema.parse(request.params)
    const { title, amount, status } = updateServiceSchema.parse(request.body)
    try {
      const service = await prisma.service.update({
        where: { id },
        data: { name: title, price: amount, isActive: status },
      })
      return response.json(presentService(service))
    } catch (error) { handleDatabaseError(error, "Serviço não encontrado") }
  }
}
