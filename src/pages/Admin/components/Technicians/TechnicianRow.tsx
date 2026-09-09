import iconEdit from "../../../../assets/iconEdit.png"

import { Button } from "../../../../components/Button"
import { Avatar } from "../../../../components/Avatar"

import type { Technician } from "../../../../types/technician"

type Props = {
    technician: Technician
}

export function TechnicianRow({ technician }: Props) {
    return (
        <tr>
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
                        <span key={time}>
                            {time}
                        </span>
                    ))}
                </div>
            </td>

            <td className="px-4 py-3 flex items-center justify-end gap-2">
                <Button variant="icon">
                    <img src={iconEdit} alt="ícone de editar"/>
                </Button>
            </td>
        </tr>
    )
}