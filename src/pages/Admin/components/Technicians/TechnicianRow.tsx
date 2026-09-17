import iconEdit from "../../../../assets/iconEdit.png"
import { useNavigate } from "react-router"

import { Button } from "../../../../components/Button"
import { Avatar } from "../../../../components/Avatar"

import type { Technician } from "../../../../types/technician"

type Props = {
    technician: Technician
}

export function TechnicianRow({ technician }: Props) {
    const navigate = useNavigate()
    return (
        <tr className="border-b border-gray-500 last:border-b-0">
            <td className="px-4 py-3">
                <div className="flex items-center gap-3">
                    <Avatar name={technician.name} />

                    <span className="text-sm font-medium text-gray-100">
                        {technician.name}
                    </span>
                </div>
            </td>

            <td className="px-4 py-3 text-sm text-gray-200">
                {technician.email}
            </td>

            <td className="px-4 py-3">
                <div className="flex items-center gap-2">
                    {technician.availability.map((time) => (
                        <span className="flex items-center h-7 rounded-full border border-gray-400 px-3 text-xs text-gray-400 font-semibold " key={time}>
                            {time}
                        </span>
                    ))}
                </div>
            </td>

            <td className="px-4 py-3 flex items-center justify-end gap-2">
                <Button variant="icon" onClick={() => navigate(`/tecnicos/${technician.id}/editar`)} aria-label={`Editar ${technician.name}`}>
                    <img src={iconEdit} alt="ícone de editar"/>
                </Button>
            </td>
        </tr>
    )
}
