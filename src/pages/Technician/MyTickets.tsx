import { TicketSection } from "./components/TicketSection"
import { tickets } from "../../data/Tickets"

export function MyTickets() {
    const ticketsInProgress = tickets.filter(
        (ticket) => ticket.status === "in_progress"
    )

    const ticketsOpen = tickets.filter(
        (ticket) => ticket.status === "open"
    )

    const ticketsClosed = tickets.filter(
        (ticket) => ticket.status === "closed"
    )

    return (
        <div className="w-full px-10 py-10">
            <h1 className="mb-8 text-2xl font-semibold text-blue-dark">
                Meus chamados
            </h1>

            <section className="space-y-10">

                <TicketSection
                    status="in_progress"
                    tickets={ticketsInProgress}
                />

                <TicketSection
                    status="open"
                    tickets={ticketsOpen}
                />

                <TicketSection
                    status="closed"
                    tickets={ticketsClosed}
                />

            </section>
        </div>
    )
}
