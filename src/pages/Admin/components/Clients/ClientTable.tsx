import { Table } from "../../../../components/Table"

import { ClientRow } from "./ClientRow"

const clients = [
    {
        id: "1",
        name: "Carlos Silva",
        email: "carlos.silva@example.com"
    },
    {
        id: "2",
        name: "Philipi Pastor",
        email: "philipipastor@email.com"
    },
    {
        id: "3",
        name: "Thaina Rodrigues",
        email: "thaina@email.com"
    }
]

export function ClientTable() {
    return (
        <div className="overflow-hidden rounded-lg border border-gray-500">
            <Table className="w-full border-collapse">
                <thead>
                    <tr className="border-b border-gray-500 text-left">
                        <th className="px-4 py-3 text-xs font-normal text-gray-400">
                            Nome
                        </th>

                        <th className="px-4 py-3 text-xs font-normal text-gray-400">
                            E-mail
                        </th>

                        <th className="w-24"></th>
                    </tr>
                </thead>

                <tbody>
                    {clients.map((client) => (
                        <ClientRow
                            key={client.id}
                            client={client}
                        />
                    ))}
                </tbody>
            </Table>
        </div>
    )
}