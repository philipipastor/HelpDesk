import { tickets } from "../../../data/Tickets" 

import type { TicketDetails } from "../../../types/TicketDetails"

export type TicketCreateData = Pick<TicketDetails, "title" | "description" | "service">

export async function TicketCreate(data: TicketCreateData): Promise<TicketDetails> {
    const now = new Date().toISOString()

    const ticket: TicketDetails = {
        id: crypto.randomUUID(),
        title: data.title,
        description: data.description,
        status: "open",
        service: {
            title: data.service.title,
            amount: data.service.amount,
        },
        client: {
            name: "Carlos Oliveira",
        },
        technician: null,
        additionalServices: [],
        createdAt: now,
        updatedAt: now,
    }

    // Salva apenas em memória até a integração com a API.
    tickets.push(ticket)
    return ticket
}
