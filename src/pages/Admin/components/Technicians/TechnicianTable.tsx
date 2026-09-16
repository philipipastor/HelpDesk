import { Table } from "../../../../components/Table"
import { TechnicianRow } from "./TechnicianRow"
import { Technicians } from "../../../../data/Technician"

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
                    {Technicians.map((technician) => (
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
