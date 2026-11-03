import { TicketSection } from "./components/TicketSection"

import type { TicketDetails } from "../../types/TicketDetails"

import { api } from "../../services/api"
import { getErrorMessage } from "../../utils/GetErrorMessage"

import { useEffect, useState } from "react"

export function MyTickets() {
    const [tickets, setTickets] = useState<TicketDetails[]>([])
    const [error, setError] = useState("")

    async function fetchTickets() {
        try {
            setError("")
            const response = await api.get<TicketDetails[]>("/tickets")
            setTickets(response.data)
        } catch (error) {
            setError(getErrorMessage(error, "Não foi possível exibir os chamados"))
        }
    }

    useEffect(() => {
        fetchTickets()
    }, [])

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
        <div className="w-full min-w-0 px-4 py-6 sm:px-6 lg:px-10 lg:py-10">
            <h1 className="mb-8 text-2xl font-semibold text-blue-dark">
                Meus chamados
            </h1>

            {error &&
                <p role="alert" className="mb-4 text-sm text-feedback-danger">
                    {error}
                </p>
            }

            <section className="space-y-10">

                <TicketSection
                    status="in_progress"
                    tickets={ticketsInProgress}
                    onChanged={fetchTickets}
                />

                <TicketSection
                    status="open"
                    tickets={ticketsOpen}
                    onChanged={fetchTickets}
                />

                <TicketSection
                    status="closed"
                    tickets={ticketsClosed}
                    onChanged={fetchTickets}
                />

            </section>
        </div>
    )
}
