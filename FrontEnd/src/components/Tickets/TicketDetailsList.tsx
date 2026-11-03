import { Link, useParams } from "react-router"
import { tickets } from "../../data/Tickets"
import { TicketDetailsCard } from "./TicketDetailsCard"
import type { UserRole } from "../../types/UserRole"

type Props = {
    role: UserRole
}

export function TicketDetailsList({ role }: Props) {
    const { id } = useParams()

    // Separa o chamado que foi escolhido na listagem.
    const selectedTickets = tickets.filter(ticket => ticket.id === id)

    if (selectedTickets.length === 0) {
        return (
            <div className="px-4 py-6 sm:px-6 lg:px-8 lg:py-10">
                <h1 className="text-xl font-semibold text-blue-dark">Chamado não encontrado</h1>
                <Link to="/" className="mt-4 inline-block text-sm text-gray-300">Voltar para chamados</Link>
            </div>
        )
    }

    return (
        <>
            {selectedTickets.map(ticket => (
                <TicketDetailsCard key={ticket.id} ticket={ticket} role={role} />
            ))}
        </>
    )
}
