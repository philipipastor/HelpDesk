import type { NextFunction, Request, Response } from "express"
import { verify } from "jsonwebtoken"
import type { Role } from "@prisma/client"
import { authConfig } from "../configs/auth"
import { prisma } from "../prisma"

type JwtPayload = { sub: string; role: Role }

export async function optionalAuth(request: Request, _response: Response, next: NextFunction) {
  const authorization = request.headers.authorization
  if (!authorization) return next()

  const [type, token] = authorization.split(" ")
  if (type !== "Bearer" || !token) return next()

  try {
    const payload = verify(token, authConfig.secret) as JwtPayload
    const user = await prisma.user.findUnique({ where: { id: payload.sub } })
    if (user && user.role === payload.role) {
      request.user = { id: user.id, role: user.role }
    }
  } catch {
    // Rota opcionalmente autenticada: token inválido é tratado como visitante público.
  }

  return next()
}
