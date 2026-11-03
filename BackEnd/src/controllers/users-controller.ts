import type { Request, Response } from "express"
import { Role } from "@prisma/client"
import { compare, hash } from "bcryptjs"
import { prisma } from "../prisma"
import { AppError } from "../utils/AppError"
import { handleDatabaseError } from "../utils/handle-database-error"
import { presentUser, userSelect } from "../utils/presenters"
import { createUserSchema, updatePasswordSchema, updateUserSchema } from "../schemas/users-schema"

const notFound = "Usuário não encontrado"

export class UsersController {
  // Cadastro público: a role é sempre CLIENT, técnicos e admins são criados por um admin.
  async create(request: Request, response: Response) {
    const data = createUserSchema.parse(request.body)
    try {
      const user = await prisma.user.create({
        data: { ...data, password: await hash(data.password, 10), role: Role.CLIENT },
        select: userSelect,
      })
      return response.status(201).json(presentUser(user))
    } catch (error) { handleDatabaseError(error, notFound) }
  }

  async show(request: Request, response: Response) {
    const user = await prisma.user.findUnique({ where: { id: request.user!.id }, select: userSelect })
    if (!user) throw new AppError(notFound, 404)
    return response.json(presentUser(user))
  }

  async update(request: Request, response: Response) {
    const data = updateUserSchema.parse(request.body)
    try {
      const user = await prisma.user.update({ where: { id: request.user!.id }, data, select: userSelect })
      return response.json(presentUser(user))
    } catch (error) { handleDatabaseError(error, notFound) }
  }

  async updatePassword(request: Request, response: Response) {
    const { currentPassword, newPassword } = updatePasswordSchema.parse(request.body)
    const user = await prisma.user.findUnique({ where: { id: request.user!.id } })
    if (!user) throw new AppError(notFound, 404)
    if (!await compare(currentPassword, user.password)) {
      throw new AppError("Senha atual incorreta", 400)
    }
    await prisma.user.update({ where: { id: user.id }, data: { password: await hash(newPassword, 10) } })
    return response.status(204).send()
  }

  async delete(request: Request, response: Response) {
    try {
      await prisma.user.delete({ where: { id: request.user!.id, role: Role.CLIENT } })
      return response.status(204).send()
    } catch (error) { handleDatabaseError(error, notFound) }
  }
}
