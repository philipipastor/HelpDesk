import type { Request, Response } from "express"
import { compare } from "bcryptjs"
import { sign } from "jsonwebtoken"
import { prisma } from "../prisma"
import { authConfig } from "../configs/auth"
import { AppError } from "../utils/AppError"
import { presentUser } from "../utils/presenters"
import { createSessionSchema } from "../schemas/sessions-schema"

export class SessionsController {
  async create(request: Request, response: Response) {
    const { email, password } = createSessionSchema.parse(request.body)
    const user = await prisma.user.findUnique({ where: { email } })

    if (!user || !await compare(password, user.password)) {
      throw new AppError("E-mail ou senha inválidos", 401)
    }

    const token = sign({ role: user.role }, authConfig.secret, {
      subject: user.id,
      expiresIn: authConfig.expiresIn,
    })

    return response.json({ token, user: presentUser(user) })
  }
}
