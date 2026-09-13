import { Status } from "../../../components/Status"

import { TicketCard } from "./TicketCard"
import type { Ticket } from "../MyTickets"

import type { StatusType } from "../../../types/Status"

type TicketSectionProps = {
    status: StatusType
    tickets: Ticket[]
}

export function TicketSection({ status,tickets }: TicketSectionProps) {
    return (
        <div>
            <div className="mb-4">
                <Status status={status}/>
            </div>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
                {tickets.map((ticket) => (
                    <TicketCard
                        key={`${ticket.id}-${ticket.updatedAt}-${ticket.status}`}
                        ticket={ticket}
                    />
                ))}
            </div>
        </div>
    )
}