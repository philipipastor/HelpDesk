import { TicketSection } from "./components/TicketSection"

import type { StatusType } from "../../types/Status"

export type Ticket = {
    id: string
    title: string
    service: {
        title: string
        amount: string
    }
    updatedAt: string
    status: StatusType
    client: {
        name: string
    }
}

const tickets: Ticket[] = [
    {
        id: "00003",
        title: "Rede lenta",
        service: {
            title: "Instalação de Rede",
            amount: "200,00",
        },
        updatedAt: "10/04/25 15:13",
        status: "in_progress",
        client: {
            name: "André Costa",
        },
    },
    {
        id: "00003",
        title: "Rede lenta",
        service: {
            title: "Instalação de Rede",
            amount: "200,00",
        },
        updatedAt: "10/04/25 15:13",
        status: "open",
        client: {
            name: "André Costa",
        },
    },
    {
        id: "00003",
        title: "Rede lenta",
        service: {
            title: "Instalação de Rede",
            amount: "200,00",
        },
        updatedAt: "10/04/25 15:13",
        status: "open",
        client: {
            name: "André Costa",
        },
    },
    {
        id: "00003",
        title: "Rede lenta",
        service: {
            title: "Instalação de Rede",
            amount: "200,00",
        },
        updatedAt: "10/04/25 15:13",
        status: "open",
        client: {
            name: "André Costa",
        },
    },
    {
        id: "00003",
        title: "Rede lenta",
        service: {
            title: "Instalação de Rede",
            amount: "200,00",
        },
        updatedAt: "10/04/25 15:13",
        status: "closed",
        client: {
            name: "Carlos Silva",
        },
    },
]

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
        <main className="w-full px-10 py-10">
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
        </main>
    )
}