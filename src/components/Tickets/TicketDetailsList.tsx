import { Link, useParams } from "react-router"
import { tickets } from "../../data/Tickets"
import { TicketDetailsCard } from "./TicketDetailsCard"

type Props = {
    role: "admin" | "client" | "technician"
}

export function TicketDetailsList({ role }: Props) {
    const { id } = useParams()

    // Separa o chamado que foi escolhido na listagem.
    const selectedTickets = tickets.filter(ticket => ticket.id === id)

    if (selectedTickets.length === 0) {
        return (
            <div className="px-8 py-10">
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
