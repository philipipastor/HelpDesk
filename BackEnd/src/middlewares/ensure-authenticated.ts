import type { NextFunction, Request, Response } from "express"
import { verify } from "jsonwebtoken"
import { prisma } from "../prisma"
import { authConfig } from "../configs/auth"
import { AppError } from "../utils/AppError"
import type { Role } from "@prisma/client"

type JwtPayload = {
  sub: string
  role: Role
}

export async function ensureAuthenticated(request: Request, _response: Response, next: NextFunction) {
  const authorization = request.headers.authorization

  if (!authorization) {
    throw new AppError("Token não informado", 401)
  }

  const [type, token] = authorization.split(" ")
  if (type !== "Bearer" || !token) {
    throw new AppError("Token inválido", 401)
  }

  try {
    const payload = verify(token, authConfig.secret) as JwtPayload
    const user = await prisma.user.findUnique({ where: { id: payload.sub } })

    if (!user || user.role !== payload.role) {
      throw new AppError("Usuário do token não é válido", 401)
    }

    request.user = { id: user.id, role: user.role }
    return next()
  } catch (error) {
    if (error instanceof AppError) throw error
    throw new AppError("Token JWT inválido ou expirado", 401)
  }
}
