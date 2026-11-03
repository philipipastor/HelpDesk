import type { Request, Response } from "express"
import { Role } from "@prisma/client"
import { prisma } from "../prisma"
import { handleDatabaseError } from "../utils/handle-database-error"
import { presentUser, userSelect } from "../utils/presenters"
import { idParamsSchema, updateUserSchema } from "../schemas/users-schema"

const notFound = "Cliente não encontrado"

export class ClientsController {
  async index(_request: Request, response: Response) {
    const clients = await prisma.user.findMany({
      where: { role: Role.CLIENT }, select: userSelect, orderBy: { name: "asc" },
    })
    return response.json(clients.map(presentUser))
  }

  async update(request: Request, response: Response) {
    const { id } = idParamsSchema.parse(request.params)
    const data = updateUserSchema.parse(request.body)
    try {
      const client = await prisma.user.update({ where: { id, role: Role.CLIENT }, data, select: userSelect })
      return response.json(presentUser(client))
    } catch (error) { handleDatabaseError(error, notFound) }
  }

  // Os chamados do cliente são removidos em cascata pelo banco.
  async delete(request: Request, response: Response) {
    const { id } = idParamsSchema.parse(request.params)
    try {
      await prisma.user.delete({ where: { id, role: Role.CLIENT } })
      return response.status(204).send()
    } catch (error) { handleDatabaseError(error, notFound) }
  }
}
