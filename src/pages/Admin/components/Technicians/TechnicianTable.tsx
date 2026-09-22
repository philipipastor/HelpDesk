import { Table } from "../../../../components/Table"
import { TechnicianRow } from "./TechnicianRow"

import { useEffect, useState } from "react"
import type { Technician } from "../../../../types/technician"

import { api } from "../../../../services/api"

export function TechnicianTable() {

    const [technician, setTechnician] = useState<Technician[]>([])

    async function fetchTechnicians() {
        try {
            const response = await api.get<Technician[]>("/technicians")
            setTechnician(response.data)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        fetchTechnicians()
    },[])

    return (
        <div className="relative w-full min-w-0 overflow-x-auto rounded-lg border border-gray-500">
            <Table className="w-full table-fixed border-collapse lg:min-w-160 lg:table-auto max-lg:[&_th]:truncate max-lg:[&_th]:px-2 max-lg:[&_th]:text-[11px] max-lg:[&_td]:px-2 max-lg:[&_td]:text-[11px] max-lg:[&_td_button]:mt-0">
                <thead>
                    <tr className="border-b border-gray-500 text-left">
                        <th className="px-4 py-3 text-xs font-normal text-gray-400">Nome</th>
                        <th className="hidden px-4 py-3 text-xs font-normal text-gray-400 lg:table-cell">E-mail</th>
                        <th className="w-28 px-4 py-3 text-xs font-normal text-gray-400 lg:w-auto">Disponibilidade</th>
                        <th className="w-11 px-4 py-3 text-xs font-normal text-gray-400 lg:w-auto"></th>
                    </tr>
                </thead>

                <tbody>
                    {technician.map((technician) => (
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
