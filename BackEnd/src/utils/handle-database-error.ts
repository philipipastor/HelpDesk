import { Prisma } from "@prisma/client"
import { AppError } from "./AppError"

export function handleDatabaseError(error: unknown, notFoundMessage: string): never {
  if (error instanceof Prisma.PrismaClientKnownRequestError) {
    if (error.code === "P2002") throw new AppError("E-mail já cadastrado", 409)
    if (error.code === "P2025") throw new AppError(notFoundMessage, 404)
    if (error.code === "P2003") throw new AppError("Registro possui chamados vinculados", 409)
  }
  throw error
}
