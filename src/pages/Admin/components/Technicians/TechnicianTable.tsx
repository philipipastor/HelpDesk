import { Table } from "../../../../components/Table"
import { TechnicianRow } from "./TechnicianRow"

const technicians = [
    {
        id: "1",
        name: "Carlos Silva",
        email: "carlos.silva@test.com",
        availability: ["08:00", "09:00", "10:00", "11:00"]
    },
    {
        id: "2",
        name: "Ana Oliveira",
        email: "ana.oliveira@test.com",
        availability: ["13:00", "14:00", "15:00", "16:00"]
    },
    {
        id: "3",
        name: "Cíntia Lúcia",
        email: "cintia.lucia@test.com",
        availability: ["08:00", "09:00", "14:00", "15:00", "18:00"]
    }
]

export function TechnicianTable() {
    return (
        <div className="overflow-hidden rounded-lg border border-gray-500">
            <Table className="w-full border-collapse">
                <thead>
                    <tr className="border-b border-gray-500 text-left">
                        <th className="px-4 py-3 text-xs font-normal text-gray-400">Nome</th>
                        <th className="px-4 py-3 text-xs font-normal text-gray-400">E-mail</th>
                        <th className="px-4 py-3 text-xs font-normal text-gray-400">Disponibilidade</th>
                        <th className="px-4 py-3 text-xs font-normal text-gray-400"></th>
                    </tr>
                </thead>

                <tbody>
                    {technicians.map((technician) => (
                        <TechnicianRow
                            key={technician.id}
                            technician={technician}
                        />
                    ))}
                </tbody>
            </Table>
        </div>
    )
}