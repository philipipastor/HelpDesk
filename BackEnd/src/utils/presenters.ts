import { Prisma, TicketStatus } from "@prisma/client"
import type { Role, Service, User } from "@prisma/client"

// O banco usa os nomes internos; as respostas seguem o formato que o frontend espera.
const statusNames = {
  [TicketStatus.ABERTO]: "open",
  [TicketStatus.EM_ATENDIMENTO]: "in_progress",
  [TicketStatus.ENCERRADO]: "closed",
} as const

export const userSelect = {
  id: true, name: true, email: true, role: true, availability: true,
} satisfies Prisma.UserSelect

export const ticketInclude = {
  client: { select: { name: true } },
  technician: { select: { name: true, email: true } },
  service: { select: { name: true } },
  additionalServices: { orderBy: { createdAt: "asc" } },
} satisfies Prisma.TicketInclude

type PresentableUser = Pick<User, "id" | "name" | "email" | "availability"> & { role: Role }
type PresentableTicket = Prisma.TicketGetPayload<{ include: typeof ticketInclude }>

export function presentUser({ id, name, email, role, availability }: PresentableUser) {
  return { id, name, email, role: role.toLowerCase(), availability }
}

export function presentService({ id, name, price, isActive }: Service) {
  return { id, title: name, amount: price.toNumber(), status: isActive }
}

export function presentTicket(ticket: PresentableTicket) {
  const total = ticket.additionalServices.reduce(
    (sum, service) => sum.plus(service.amount),
    ticket.servicePrice,
  )

  return {
    id: ticket.id,
    code: String(ticket.number).padStart(5, "0"),
    title: ticket.title,
    description: ticket.description,
    status: statusNames[ticket.status],
    scheduledDate: ticket.scheduledDate?.toISOString().slice(0, 10) ?? null,
    scheduledHour: ticket.scheduledHour,
    createdAt: ticket.createdAt,
    updatedAt: ticket.updatedAt,
    service: { title: ticket.service.name, amount: ticket.servicePrice.toNumber() },
    client: ticket.client,
    technician: ticket.technician,
    additionalServices: ticket.additionalServices.map(({ id, title, amount }) => ({
      id, title, amount: amount.toNumber(),
    })),
    total: total.toNumber(),
  }
}
