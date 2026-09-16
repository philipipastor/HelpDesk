import type { Tickets } from "./Tickets"

export type TicketDetails = Omit<Tickets, "technician"> & {
    description?: string
    technician?: {
        name: string
        email?: string
    }
    additionalServices: {
        id: string
        title: string
        amount: number
    }[]
}
