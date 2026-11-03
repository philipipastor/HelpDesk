import type { Service } from "./Services"
import type { Technician } from "./technician"
import type { Client } from "./Client"
import type { StatusType } from "./Status"

export type Tickets = {
    createdAt?: string
    updatedAt: string
    id: string
    title: string
    service: Pick<Service, "title" | "amount">
    client: Pick<Client, "name">
    technician: (Pick<Technician, "name"> & Partial<Pick<Technician, "email">>) | null
    status: StatusType
}
