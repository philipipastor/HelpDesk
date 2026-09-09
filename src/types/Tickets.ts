import type { Service } from "./Services"
import type { Technician } from "./technician"
import type { Client } from "./Client"

export type Tickets = {
    createdAt?: string
    updatedAt: string
    id: string
    title: string
    service: Pick<Service, "title" | "amount">
    cliente: Pick<Client, "name">
    technician: Pick<Technician, "name">
    status: "open" | "in_progress" | "closed"
}