import type { Request, Response } from "express"
import { Role, TicketStatus } from "@prisma/client"
import { hash } from "bcryptjs"
import { prisma } from "../prisma"
import { AppError } from "../utils/AppError"
import { handleDatabaseError } from "../utils/handle-database-error"
import { presentUser, userSelect } from "../utils/presenters"
import { idParamsSchema } from "../schemas/users-schema"
import { createTechnicianSchema, slotsQuerySchema, updateTechnicianSchema } from "../schemas/technicians-schema"
import { isPastSlot, isWeekend, toDatabaseDate } from "../utils/schedule"

const notFound = "Técnico não encontrado"

export class TechniciansController {
  async create(request: Request, response: Response) {
    const data = createTechnicianSchema.parse(request.body)
    try {
      const technician = await prisma.user.create({
        data: { ...data, password: await hash(data.password, 10), role: Role.TECHNICIAN },
        select: userSelect,
      })
      return response.status(201).json(presentUser(technician))
    } catch (error) { handleDatabaseError(error, notFound) }
  }

  async index(_request: Request, response: Response) {
    const technicians = await prisma.user.findMany({
      where: { role: Role.TECHNICIAN }, select: userSelect, orderBy: { name: "asc" },
    })
    return response.json(technicians.map(presentUser))
  }

  async show(request: Request, response: Response) {
    const { id } = idParamsSchema.parse(request.params)
    const technician = await prisma.user.findFirst({ where: { id, role: Role.TECHNICIAN }, select: userSelect })
    if (!technician) throw new AppError(notFound, 404)
    return response.json(presentUser(technician))
  }

  async slots(request: Request, response: Response) {
    const { id } = idParamsSchema.parse(request.params)
    const { date } = slotsQuerySchema.parse(request.query)

    const technician = await prisma.user.findFirst({ where: { id, role: Role.TECHNICIAN }, select: { availability: true } })
    if (!technician) throw new AppError(notFound, 404)
    if (isWeekend(date)) return response.json([])

    const tickets = await prisma.ticket.findMany({
      where: { technicianId: id, scheduledDate: toDatabaseDate(date), status: { not: TicketStatus.ENCERRADO } },
      select: { scheduledHour: true },
    })
    const busyHours = new Set(tickets.map(ticket => ticket.scheduledHour))

    return response.json(technician.availability
      .filter(hour => !isPastSlot(date, hour))
      .map(hour => ({ hour, available: !busyHours.has(hour) })))
  }

  async update(request: Request, response: Response) {
    const { id } = idParamsSchema.parse(request.params)
    const data = updateTechnicianSchema.parse(request.body)
    try {
      const technician = await prisma.user.update({ where: { id, role: Role.TECHNICIAN }, data, select: userSelect })
      return response.json(presentUser(technician))
    } catch (error) { handleDatabaseError(error, notFound) }
  }
}
