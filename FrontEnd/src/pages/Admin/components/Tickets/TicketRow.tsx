import { formatCurrency } from "../../../../utils/FormatCurrency"
import { formatDate } from "../../../../utils/FormatDate"
import type { TicketDetails } from "../../../../types/TicketDetails"

import { Status } from "../../../../components/Status"
import { Button } from "../../../../components/Button"
import { Avatar } from "../../../../components/Avatar"

import iconEdit from "../../../../assets/iconEdit.png"

import { useNavigate } from "react-router"

type Props = {
    ticket: TicketDetails
}

export function TicketRow({ ticket }: Props) {
    const navigate = useNavigate()

    return (
        <tr className="border-b border-gray-500 last:border-b-0">

            <td className="px-4 py-3 text-sm text-gray-200 max-lg:wrap-normal lg:whitespace-nowrap">
                {formatDate(ticket.updatedAt)}
            </td>

            <td className="hidden px-4 py-3 text-xs font-medium text-gray-100 lg:table-cell">
                {ticket.id}
            </td>

            <td className="px-4 py-3">
                <div className="flex min-w-0 flex-col">
                    <span className="text-sm font-semibold text-gray-100 max-lg:truncate max-lg:text-xs" title={ticket.title}>
                        {ticket.title}
                    </span>

                    <span className="text-xs text-gray-200 max-lg:truncate max-lg:text-[11px]" title={ticket.service.title}>
                        {ticket.service.title}
                    </span>
                </div>
            </td>

            <td className="hidden px-4 py-3 whitespace-nowrap text-sm text-gray-200 lg:table-cell">
                {formatCurrency(ticket.service.amount + ticket.additionalServices.reduce((total, service) => total + service.amount, 0))}
            </td>

            <td className="hidden px-4 py-3 lg:table-cell">
                <div className="flex items-center gap-2">
                    <Avatar
                        name={ticket.client.name}
                        variant="secondary"
                    />

                    <span className="whitespace-nowrap text-sm text-gray-200">
                        {ticket.client.name}
                    </span>
                </div>
            </td>

            <td className="hidden px-4 py-3 lg:table-cell">
                <div className="flex items-center gap-2">
                    <Avatar
                        name={ticket.technician?.name || "Não atribuído"}
                        variant="secondary"
                    />

                    <span className="whitespace-nowrap text-sm text-gray-200">
                        {ticket.technician?.name || "Não atribuído"}
                    </span>
                </div>
            </td>

            <td className="px-4 py-3 max-lg:[&>span]:size-7 max-lg:[&>span]:justify-center max-lg:[&>span]:p-0 max-lg:[&>span>span]:sr-only">
                <Status status={ticket.status} />
            </td>

            <td className="px-4 py-3 lg:flex lg:items-center lg:justify-end lg:gap-2">
                <Button variant="icon" onClick={() => navigate(`/ticket/${ticket.id}`)}>
                    <img
                        src={iconEdit}
                        alt="ícone de editar"
                    />
                </Button>
            </td>

        </tr>
    )
}
