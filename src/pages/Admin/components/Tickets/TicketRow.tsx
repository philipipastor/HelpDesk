import type { Tickets } from "../../../../types/Tickets"

import { Status } from "../../../../components/Status"
import { Button } from "../../../../components/Button"
import { Avatar } from "../../../../components/Avatar"

import iconEdit from "../../../../assets/iconEdit.png"

type Props = {
    ticket: Tickets
}

export function TicketRow({ ticket }: Props) {
    return (
        <tr className="border-b text-gray-500 last:border-b-0">

            <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-200">
                {ticket.updatedAt}
            </td>

            <td className="px-4 py-3 text-xs font-medium text-gray-100">
                {ticket.id}
            </td>

            <td className="px-4 py-3">
                <div className="flex flex-col">
                    <span className="text-sm font-semibold text-gray-100">
                        {ticket.title}
                    </span>

                    <span className="text-xs text-gray-200">
                        {ticket.service.title}
                    </span>
                </div>
            </td>

            <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-200">
                R${ticket.service.amount}
            </td>

            <td className="px-4 py-3">
                <div className="flex items-center gap-2">
                    <Avatar
                        name={ticket.cliente.name}
                        variant="secondary"
                    />

                    <span className="whitespace-nowrap text-sm text-gray-200">
                        {ticket.cliente.name}
                    </span>
                </div>
            </td>

            <td className="px-4 py-3">
                <div className="flex items-center gap-2">
                    <Avatar
                        name={ticket.technician.name}
                        variant="secondary"
                    />

                    <span className="whitespace-nowrap text-sm text-gray-200">
                        {ticket.technician.name}
                    </span>
                </div>
            </td>

            <td className="px-4 py-3">
                <Status status={ticket.status} />
            </td>

            <td className="px-4 py-3 flex items-center justify-end gap-2">
                <Button variant="icon">
                    <img
                        src={iconEdit}
                        alt="ícone de editar"
                    />
                </Button>
            </td>

        </tr>
    )
}