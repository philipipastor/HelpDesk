import { Link, useParams } from "react-router"
import { useEffect, useState } from "react"
import { TicketDetailsCard } from "./TicketDetailsCard"
import { api } from "../../services/api"
import type { TicketDetails } from "../../types/TicketDetails"
import type { UserRole } from "../../types/UserRole"

type Props = {
    role: UserRole
}

export function TicketDetailsList({ role }: Props) {
    const { id } = useParams()
    const [ticket, setTicket] = useState<TicketDetails>()
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        async function fetchTicket() {
            try {
                const response = await api.get<TicketDetails>(`/tickets/${id}`)
                setTicket(response.data)
            } catch (error) {
                console.log(error)
            } finally {
                setIsLoading(false)
            }
        }

        fetchTicket()
    }, [id])

    if (isLoading) {
        return <p className="px-4 py-6 text-sm text-gray-300 sm:px-6 lg:px-8 lg:py-10">Carregando...</p>
    }

    if (!ticket) {
        return (
            <div className="px-4 py-6 sm:px-6 lg:px-8 lg:py-10">
                <h1 className="text-xl font-semibold text-blue-dark">Chamado não encontrado</h1>
                <Link to="/" className="mt-4 inline-block text-sm text-gray-300">Voltar para chamados</Link>
            </div>
        )
    }

    return <TicketDetailsCard ticket={ticket} role={role} onChanged={setTicket} />
}
