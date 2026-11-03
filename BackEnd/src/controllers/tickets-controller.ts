import type { Request, Response } from "express"
import { Prisma, Role, TicketStatus } from "@prisma/client"
import { prisma } from "../prisma"
import { AppError } from "../utils/AppError"
import { presentTicket, ticketInclude } from "../utils/presenters"
import { isPastSlot, isWeekend, toDatabaseDate } from "../utils/schedule"
import { idParamsSchema } from "../schemas/users-schema"
import {
  additionalServiceParamsSchema, additionalServiceSchema, createTicketSchema, updateTicketStatusSchema,
} from "../schemas/tickets-schema"

const statusFromRequest = {
  in_progress: TicketStatus.EM_ATENDIMENTO,
  closed: TicketStatus.ENCERRADO,
}

const statusOrder = [TicketStatus.ABERTO, TicketStatus.EM_ATENDIMENTO, TicketStatus.ENCERRADO]

function ticketsVisibleTo(user: NonNullable<Request["user"]>): Prisma.TicketWhereInput {
  if (user.role === Role.CLIENT) return { clientId: user.id }
  if (user.role === Role.TECHNICIAN) return { technicianId: user.id }
  return {}
}

async function findManagedTicket(id: string, user: NonNullable<Request["user"]>) {
  const ticket = await prisma.ticket.findUnique({ where: { id }, include: ticketInclude })
  if (!ticket) throw new AppError("Chamado não encontrado", 404)
  if (user.role === Role.TECHNICIAN && ticket.technicianId !== user.id) {
    throw new AppError("Você não é o técnico responsável por este chamado", 403)
  }
  return ticket
}

export class TicketsController {
  async create(request: Request, response: Response) {
    const { title, description, serviceId, technicianId, scheduledDate, scheduledHour } = createTicketSchema.parse(request.body)

    const service = await prisma.service.findFirst({ where: { id: serviceId, isActive: true } })
    if (!service) throw new AppError("Serviço indisponível", 400)

    const technician = await prisma.user.findFirst({
      where: { id: technicianId, role: Role.TECHNICIAN, availability: { has: scheduledHour } },
      select: { id: true },
    })
    if (!technician) throw new AppError("Técnico indisponível neste horário", 400)
    if (isWeekend(scheduledDate)) throw new AppError("Não há atendimento aos fins de semana", 400)
    if (isPastSlot(scheduledDate, scheduledHour)) throw new AppError("Escolha um horário futuro", 400)

    try {
      const ticket = await prisma.ticket.create({
        data: {
          title, description, serviceId, technicianId, scheduledHour,
          scheduledDate: toDatabaseDate(scheduledDate),
          clientId: request.user!.id,
          // Guarda o preço de agora: mudar o catálogo depois não altera este chamado.
          servicePrice: service.price,
        },
        include: ticketInclude,
      })
      return response.status(201).json(presentTicket(ticket))
    } catch (error) {
      // O índice único decide quando dois clientes pedem o mesmo horário ao mesmo tempo.
      if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === "P2002") {
        throw new AppError("Este horário acabou de ser ocupado. Escolha outro.", 409)
      }
      throw error
    }
  }

  async index(request: Request, response: Response) {
    const tickets = await prisma.ticket.findMany({
      where: ticketsVisibleTo(request.user!),
      include: ticketInclude,
      orderBy: { createdAt: "desc" },
    })
    return response.json(tickets.map(presentTicket))
  }

  async show(request: Request, response: Response) {
    const { id } = idParamsSchema.parse(request.params)
    const ticket = await prisma.ticket.findFirst({
      where: { id, ...ticketsVisibleTo(request.user!) },
      include: ticketInclude,
    })
    if (!ticket) throw new AppError("Chamado não encontrado", 404)
    return response.json(presentTicket(ticket))
  }

  async updateStatus(request: Request, response: Response) {
    const { id } = idParamsSchema.parse(request.params)
    const { status } = updateTicketStatusSchema.parse(request.body)
    const ticket = await findManagedTicket(id, request.user!)

    const nextStatus = statusFromRequest[status]
    if (statusOrder.indexOf(nextStatus) <= statusOrder.indexOf(ticket.status)) {
      throw new AppError("O status do chamado só pode avançar", 409)
    }

    const updated = await prisma.ticket.update({ where: { id }, data: { status: nextStatus }, include: ticketInclude })
    return response.json(presentTicket(updated))
  }

  async addService(request: Request, response: Response) {
    const { id } = idParamsSchema.parse(request.params)
    const data = additionalServiceSchema.parse(request.body)
    const ticket = await findManagedTicket(id, request.user!)
    if (ticket.status === TicketStatus.ENCERRADO) {
      throw new AppError("Chamado encerrado não pode ser alterado", 409)
    }

    const updated = await prisma.ticket.update({
      where: { id },
      data: { additionalServices: { create: data } },
      include: ticketInclude,
    })
    return response.status(201).json(presentTicket(updated))
  }

  async removeService(request: Request, response: Response) {
    const { id, serviceId } = additionalServiceParamsSchema.parse(request.params)
    const ticket = await findManagedTicket(id, request.user!)
    if (ticket.status === TicketStatus.ENCERRADO) {
      throw new AppError("Chamado encerrado não pode ser alterado", 409)
    }
    if (!ticket.additionalServices.some(service => service.id === serviceId)) {
      throw new AppError("Serviço adicional não encontrado", 404)
    }

    const updated = await prisma.ticket.update({
      where: { id },
      data: { additionalServices: { delete: { id: serviceId } } },
      include: ticketInclude,
    })
    return response.json(presentTicket(updated))
  }
}
