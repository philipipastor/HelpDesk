import { formatCurrency } from "../../../utils/FormatCurrency"
import { formatDate } from "../../../utils/FormatDate"
import { useNavigate } from "react-router"
import type { TicketDetails } from "../../../types/TicketDetails"

import { Status } from "../../../components/Status"
import { Button } from "../../../components/Button"
import { Avatar } from "../../../components/Avatar"

import iconView from "../../../assets/eye.png"

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

            <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-100">
                <span className="block max-lg:truncate max-lg:text-xs max-lg:font-semibold" title={ticket.title}>{ticket.title}</span>
                <span className="block truncate text-[11px] text-gray-200 lg:hidden" title={ticket.service.title}>{ticket.service.title}</span>
            </td>

            <td className="hidden px-4 py-3 whitespace-nowrap text-sm text-gray-200 lg:table-cell">
                {ticket.service.title}
            </td>

            <td className="hidden px-4 py-3 whitespace-nowrap text-sm text-gray-200 lg:table-cell">
                {formatCurrency(ticket.service.amount + ticket.additionalServices.reduce((total, service) => total + service.amount, 0))}
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
                        src={iconView}
                        alt="ícone de visualização"
                    />
                </Button>
            </td>

        </tr>
    )
}
