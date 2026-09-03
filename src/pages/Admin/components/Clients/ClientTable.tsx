import { Table } from "../../../../components/Table"
import { ClientRow } from "./ClientRow"

const clients = [
    {
        id: "1",
        name: "Carlos Silva",
        email: "carlos.silva@example.com"
    },
    {
        id:"2",
        name: "Philipi pastor",
        email: "philipipastor@email.com"
    },
    {
        id: "3",
        name: "Thaina rodrigues",
        email: "thaina@email.com"
    }
]

export function ClientTable() {
    return(
        <Table>
            <thead>
                <tr>
                    <th>Nome</th>
                    <th>E-mail</th>
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
    )
}