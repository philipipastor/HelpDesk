import type { Request, Response } from "express"
import { Prisma, Role } from "@prisma/client"
import { hash } from "bcryptjs"
import { prisma } from "../prisma"
import { AppError } from "../utils/AppError"
import { adminParamsSchema, createAdminSchema, updateAdminSchema } from "../schemas/admins-schema"

const adminSelect = {
  id: true, name: true, email: true, role: true,
  availability: true, createdAt: true, updatedAt: true,
} satisfies Prisma.UserSelect

function handleDatabaseError(error: unknown): never {
  if (error instanceof Prisma.PrismaClientKnownRequestError) {
    if (error.code === "P2002") throw new AppError("E-mail já cadastrado", 409)
    if (error.code === "P2025") throw new AppError("Administrador não encontrado", 404)
    if (error.code === "P2003") throw new AppError("Administrador possui registros vinculados", 409)
    if (error.code === "P2034") throw new AppError("Conflito de atualização. Tente novamente", 409)
  }
  throw error
}

export class AdminsController {
  async create(request: Request, response: Response) {
    const data = createAdminSchema.parse(request.body)
    if (await prisma.user.findUnique({ where: { email: data.email }, select: { id: true } })) {
      throw new AppError("E-mail já cadastrado", 409)
    }
    try {
      const admin = await prisma.user.create({
        data: { ...data, password: await hash(data.password, 10), role: Role.ADMIN },
        select: adminSelect,
      })
      return response.status(201).json(admin)
    } catch (error) { handleDatabaseError(error) }
  }

  async index(_request: Request, response: Response) {
    const admins = await prisma.user.findMany({ where: { role: Role.ADMIN }, select: adminSelect })
    return response.json(admins)
  }

  async show(request: Request, response: Response) {
    const { id } = adminParamsSchema.parse(request.params)
    const admin = await prisma.user.findFirst({ where: { id, role: Role.ADMIN }, select: adminSelect })
    if (!admin) throw new AppError("Administrador não encontrado", 404)
    return response.json(admin)
  }

  async update(request: Request, response: Response) {
    const { id } = adminParamsSchema.parse(request.params)
    const data = updateAdminSchema.parse(request.body)
    const admin = await prisma.user.findFirst({ where: { id, role: Role.ADMIN }, select: { id: true } })
    if (!admin) throw new AppError("Administrador não encontrado", 404)
    if (data.email && await prisma.user.findFirst({
      where: { email: data.email, NOT: { id } }, select: { id: true },
    })) throw new AppError("E-mail já cadastrado", 409)
    try {
      const updated = await prisma.user.update({ where: { id, role: Role.ADMIN }, data, select: adminSelect })
      return response.json(updated)
    } catch (error) { handleDatabaseError(error) }
  }

  async delete(request: Request, response: Response) {
    const { id } = adminParamsSchema.parse(request.params)
    try {
      await prisma.$transaction(async transaction => {
        const admin = await transaction.user.findFirst({ where: { id, role: Role.ADMIN }, select: { id: true } })
        if (!admin) throw new AppError("Administrador não encontrado", 404)
        if (id === request.user!.id) throw new AppError("Não é permitido excluir a própria conta", 403)
        if (await transaction.user.count({ where: { role: Role.ADMIN } }) <= 1) {
          throw new AppError("Não é permitido excluir o último administrador", 409)
        }
        // Evita tanto a restrição do técnico quanto a exclusão em cascata dos chamados do cliente.
        if (await transaction.ticket.count({ where: { OR: [{ clientId: id }, { technicianId: id }] } })) {
          throw new AppError("Administrador possui chamados vinculados", 409)
        }
        await transaction.user.delete({ where: { id, role: Role.ADMIN } })
      }, { isolationLevel: Prisma.TransactionIsolationLevel.Serializable })
      return response.status(204).send()
    } catch (error) { handleDatabaseError(error) }
  }
}
