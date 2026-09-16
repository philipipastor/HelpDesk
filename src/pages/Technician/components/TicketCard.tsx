import { formatCurrency } from "../../../utils/FormatCurrency"
import { formatDate } from "../../../utils/FormatDate"
import { Button } from "../../../components/Button"
import { Avatar } from "../../../components/Avatar"
import { Status } from "../../../components/Status"

import type { TicketDetails } from "../../../types/TicketDetails"

import { useNavigate } from "react-router"

import iconEdit from "../../../assets/iconEdit.png"
import iconStart from "../../../assets/circle-check-big-2.png"
import iconClose from "../../../assets/clock.png"

type TicketCardProps = {
    ticket: TicketDetails
}

export function TicketCard({ ticket }: TicketCardProps) {
    const navigate = useNavigate()

    return (
        <article className="w-full max-w-sm rounded-xl border border-gray-500 bg-gray-600 p-4">

            <div className="flex items-start justify-between gap-4">

                <div>
                    <span className="text-xs text-gray-400">
                        {ticket.id}
                    </span>

                    <h2 className="mt-1 text-sm font-semibold text-gray-200">
                        {ticket.title}
                    </h2>

                    <p className="text-xs text-gray-200">
                        {ticket.service.title}
                    </p>
                </div>

                <div className="flex items-center gap-2">
                    <Button className="w-7.5 h-7.5 bg-gray-500 hover:bg-gray-400 rounded-md flex items-center justify-center cursor-pointer"
                            onClick={() => navigate(`/ticket/${ticket.id}`)}>
                        <img
                            src={iconEdit}
                            alt="ícone de editar"
                        />
                    </Button>

                    {ticket.status === "open" && (
                        <Button className="flex h-8 w-auto items-center gap-1 rounded-md bg-gray-200 hover:bg-gray-100 px-2 text-xs text-gray-600 cursor-pointer">
                            <img
                                src={iconStart}
                                alt="ícone de iniciar"
                                className="h-3 w-3"
                            />

                            Iniciar
                        </Button>
                    )}

                    {ticket.status === "in_progress" && (
                        <Button className="flex h-8 w-auto items-center gap-1 rounded-md bg-gray-200 hover:bg-gray-100 px-2 text-xs text-gray-600 cursor-pointer">
                            <img
                                src={iconClose}
                                alt="ícone de fechar"
                                className="h-3 w-3"
                            />

                            Encerrar
                        </Button>
                    )}
                </div>

            </div>

            <div className="mt-5 flex items-center justify-between border-b border-gray-500 pb-4">
                <span className="text-xs text-gray-200">
                    {formatDate(ticket.updatedAt)}
                </span>

                <span className="text-xs font-medium text-gray-200">
                    {formatCurrency(ticket.service.amount + ticket.additionalServices.reduce((total, service) => total + service.amount, 0))}
                </span>
            </div>

            <div className="mt-4 flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <Avatar
                        name={ticket.client.name}
                        variant="secondary"
                    />

                    <span className="text-xs font-medium text-gray-200">
                        {ticket.client.name}
                    </span>
                </div>

                <Status status={ticket.status} />
            </div>

        </article>
    )
}
