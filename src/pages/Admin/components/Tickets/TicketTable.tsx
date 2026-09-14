import { Table } from "../../../../components/Table"
import type { Tickets } from "../../../../types/Tickets"
import { TicketRow } from "./TicketRow"

const tickets: Tickets[] = [
    {   
        updatedAt: "2023-06-01",
        id: "1",
        title: "Problema com o computador",
        service: {
            title: "Reparo de computador",
            amount: "100"
        },
        client: {
            name: "John Doe"
        },
        technician: {
            name: "Jane Smith"
        },
        status: "open"
    },
    {   
        updatedAt: "2023-06-01",
        id: "1",
        title: "Problema com o computador",
        service: {
            title: "Reparo de computador",
            amount: "100"
        },
        client: {
            name: "John Doe"
        },
        technician: {
            name: "Jane Smith"
        },
        status: "in_progress"
    },
    {   
        updatedAt: "2023-06-01",
        id: "1",
        title: "Problema com o computador",
        service: {
            title: "Reparo de computador",
            amount: "100"
        },
        client: {
            name: "John Doe"
        },
        technician: {
            name: "Jane Smith"
        },
        status: "closed"
    }
]

export function TicketTable() {
    return (
        <div className="overflow-hidden rounded-xl border border-gray-500">
            <Table className="w-full border-collapse">
                <thead>
                    <tr className="border-b border-gray-500 text-left">
                        <th className="px-3 py-4 text-xs font-normal text-gray-400">Atualizado em</th>
                        <th className="px-3 py-4 text-xs font-normal text-gray-400">ID</th>
                        <th className="px-3 py-4 text-xs font-normal text-gray-400">Título e Serviço</th>
                        <th className="px-3 py-4 text-xs font-normal text-gray-400">Valor Total</th>
                        <th className="px-3 py-4 text-xs font-normal text-gray-400">Cliente</th>
                        <th className="px-3 py-4 text-xs font-normal text-gray-400">Técnico</th>
                        <th className="px-3 py-4 text-xs font-normal text-gray-400">Status</th>
                        <th className="px-3 py-4"></th>
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
    )
}