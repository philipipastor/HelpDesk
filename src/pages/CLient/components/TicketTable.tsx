import { Table } from "../../../components/Table"

import type { StatusType } from "../../../types/Status"

import { TicketRow } from "./TicketRow"

export type Ticket = {
    id: string
    title: string
    service: {
        title: string
        amount: string
    }
    updatedAt: string
    status: StatusType
    technician: {
        name: string
    }
}

const tickets: Ticket[] = [
    {   
        id: "1",
        title: "Problema com o computador",
        service: {
            title: "Reparo de computador",
            amount: "100"
        },
        updatedAt: "2023-06-01",
        status: "open",
        technician: {
            name: "Jane Smith"
        }
    },
    {   
        updatedAt: "2023-06-01",
        id: "2",
        title: "Problema com o computador",
        service: {
            title: "Reparo de computador",
            amount: "100"
        },
        technician: {
            name: "Jane Smith"
        },
        status: "in_progress"
    },
    {   
        updatedAt: "2023-06-01",
        id: "3",
        title: "Problema com o computador",
        service: {
            title: "Reparo de computador",
            amount: "100"
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
                        <th className="px-3 py-4 text-xs font-normal text-gray-400">Título</th>
                        <th className="px-3 py-4 text-xs font-normal text-gray-400">Serviço</th>
                        <th className="px-3 py-4 text-xs font-normal text-gray-400">Valor total</th>
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