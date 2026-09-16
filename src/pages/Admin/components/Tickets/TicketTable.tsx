import { tickets } from "../../../../data/Tickets"
import { Table } from "../../../../components/Table"
import { TicketRow } from "./TicketRow"

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