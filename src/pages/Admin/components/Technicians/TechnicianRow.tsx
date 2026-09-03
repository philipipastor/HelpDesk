import { Avatar } from "../../../../components/Avatar"

import type { Technician } from "../../../../types/technician"

type Props = {
    technician: Technician
}

export function TechnicianRow({ technician }: Props) {
    return (
        <tr>
            <td>
                <div className="flex items-center gap-2">
                    <Avatar name={technician.name} />

                    <span>
                        {technician.name}
                    </span>
                </div>
            </td>

            <td>
                {technician.email}
            </td>

            <td>
                <div className="flex items-center gap-2">
                    {technician.availability.map((time) => (
                        <span key={time}>
                            {time}
                        </span>
                    ))}
                </div>
            </td>

            <td>
                <button type="button">
                    ✎
                </button>
            </td>
        </tr>
    )
}