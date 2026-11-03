import { Table } from "../../../../components/Table"
import { TicketRow } from "./TicketRow"

import type { TicketDetails } from "../../../../types/TicketDetails"

import { api } from "../../../../services/api"
import { getErrorMessage } from "../../../../utils/GetErrorMessage"

import { useEffect, useState } from "react"

export function TicketTable() {
    const [tickets, setTickets] = useState<TicketDetails[]>([])
    const [error, setError] = useState("")

    useEffect(() => {
        async function fetchTickets() {
            try {
                const response = await api.get<TicketDetails[]>("/tickets")
                setTickets(response.data)
            } catch (error) {
                setError(getErrorMessage(error, "Não foi possível exibir os chamados"))
            }
        }

        fetchTickets()
    }, [])

    return (
        <>
            {error &&
                <p className="text-feedback-danger mb-2 text-sm flex items-center justify-center">
                    {error}
                </p>
            }
        <div className="relative w-full min-w-0 overflow-x-auto rounded-xl border border-gray-500">
            <Table className="w-full table-fixed border-collapse lg:min-w-240 lg:table-auto max-lg:[&_th]:truncate max-lg:[&_th]:px-2 max-lg:[&_th]:text-[11px] max-lg:[&_td]:px-2 max-lg:[&_td]:text-[11px] max-lg:[&_td_button]:mt-0">
                <thead>
                    <tr className="border-b border-gray-500 text-left">
                        <th className="w-19 px-3 py-4 text-xs font-normal text-gray-400 lg:w-auto">Atualizado em</th>
                        <th className="hidden px-3 py-4 text-xs font-normal text-gray-400 lg:table-cell">ID</th>
                        <th className="px-3 py-4 text-xs font-normal text-gray-400">Título e Serviço</th>
                        <th className="hidden px-3 py-4 text-xs font-normal text-gray-400 lg:table-cell">Valor Total</th>
                        <th className="hidden px-3 py-4 text-xs font-normal text-gray-400 lg:table-cell">Cliente</th>
                        <th className="hidden px-3 py-4 text-xs font-normal text-gray-400 lg:table-cell">Técnico</th>
                        <th className="w-12 px-3 py-4 text-xs font-normal text-gray-400 lg:w-auto">Status</th>
                        <th className="w-11 px-3 py-4 lg:w-auto"></th>
                    </tr>
                </thead>

                <tbody>
                    {tickets.map((ticket) => (
                        <TicketRow
                            key={ticket.id}
                            ticket={ticket}
                        />
                    ))}
                </tbody>
            </Table>
        </div>
        </>
    )
}
