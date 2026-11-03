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
                <div className="flex min-w-0 items-center gap-2 lg:gap-3 max-lg:[&>div]:size-7 max-lg:[&>div]:text-[10px]">
                    <Avatar name={technician.name} />

                    <span className="text-sm font-medium text-gray-100 max-lg:truncate max-lg:text-xs" title={technician.name}>
                        {technician.name}
                    </span>
                </div>
            </td>

            <td className="hidden px-4 py-3 text-sm text-gray-200 lg:table-cell">
                {technician.email}
            </td>

            <td className="px-4 py-3">
                <div className="flex min-w-0 max-w-80 items-center gap-1 lg:min-w-40 lg:flex-wrap lg:gap-2" title={technician.availability.join(", ")}>
                    {technician.availability.map((time) => (
                        <span className="hidden h-7 shrink-0 items-center rounded-full border border-gray-400 px-2 text-[10px] text-gray-400 font-semibold first:flex lg:flex lg:px-3 lg:text-xs" key={time}>
                            {time}
                        </span>
                    ))}
                    {technician.availability.length > 1 && (
                        <span className="inline-flex h-7 shrink-0 items-center rounded-full border border-gray-500 px-2 text-[10px] text-gray-400 lg:hidden">
                            +{technician.availability.length - 1}
                        </span>
                    )}
                </div>
            </td>

            <td className="px-4 py-3 lg:flex lg:items-center lg:justify-end lg:gap-2">
                <Button variant="icon" onClick={() => navigate(`/tecnicos/${technician.id}/editar`)} aria-label={`Editar ${technician.name}`}>
                    <img src={iconEdit} alt="ícone de editar"/>
                </Button>
            </td>
        </tr>
    )
}
