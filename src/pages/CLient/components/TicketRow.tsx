import { formatCurrency } from "../../../utils/FormatCurrency"
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

            <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-200">
                {ticket.updatedAt}
            </td>

            <td className="px-4 py-3 text-xs font-medium text-gray-100">
                {ticket.id}
            </td>

            <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-100">
                {ticket.title}
            </td>

            <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-200">
                {ticket.service.title}
            </td>

            <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-200">
                {formatCurrency(Number(ticket.service.amount) + ticket.additionalServices.reduce((total, service) => total + service.amount, 0))}
            </td>

            <td className="px-4 py-3">
                <div className="flex items-center gap-2">
                    <Avatar
                        name={ticket.technician?.name || "N?o atribu?do"}
                        variant="secondary"
                    />

                    <span className="whitespace-nowrap text-sm text-gray-200">
                        {ticket.technician?.name || "N?o atribu?do"}
                    </span>
                </div>
            </td>

            <td className="px-4 py-3">
                <Status status={ticket.status} />
            </td>

            <td className="px-4 py-3 flex items-center justify-end gap-2">
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