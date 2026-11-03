import type { Tickets } from "./Tickets"
import type { Service } from "./Services"

export type TicketDetails = Tickets & {
    description?: string
    additionalServices: Pick<Service, "id" | "title" | "amount">[]
}
