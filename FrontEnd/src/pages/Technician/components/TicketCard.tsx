import { formatCurrency } from "../../../utils/FormatCurrency"
import { formatDate } from "../../../utils/FormatDate"
import { Button } from "../../../components/Button"
import { Avatar } from "../../../components/Avatar"
import { Status } from "../../../components/Status"

import type { TicketDetails } from "../../../types/TicketDetails"

import { api } from "../../../services/api"
import { getErrorMessage } from "../../../utils/GetErrorMessage"

import { useState } from "react"
import { useNavigate } from "react-router"

import iconEdit from "../../../assets/iconEdit.png"
import iconStart from "../../../assets/circle-check-big-2.png"
import iconClose from "../../../assets/clock.png"

type TicketCardProps = {
    ticket: TicketDetails
    onChanged: () => void
}

export function TicketCard({ ticket, onChanged }: TicketCardProps) {
    const navigate = useNavigate()
    const [error, setError] = useState("")

    async function updateStatus(status: "in_progress" | "closed") {
        try {
            setError("")
            await api.patch(`/tickets/${ticket.id}/status`, { status })
            onChanged()
        } catch (error) {
            setError(getErrorMessage(error, "Não foi possível alterar o status"))
        }
    }

    return (
        <article className="w-full min-w-0 max-w-sm rounded-xl border border-gray-500 bg-gray-600 p-4 wrap-anywhere">

            <div className="flex flex-wrap items-start justify-between gap-3 sm:gap-4">

                <div className="min-w-0 flex-1 basis-28">
                    <span className="text-xs text-gray-400">
                        {ticket.code}
                    </span>

                    <h2 className="mt-1 text-sm font-semibold text-gray-200">
                        {ticket.title}
                    </h2>

                    <p className="text-xs text-gray-200">
                        {ticket.service.title}
                    </p>
                </div>

                <div className="flex shrink-0 flex-wrap items-center gap-2">
                    <Button className="w-7.5 h-7.5 bg-gray-500 hover:bg-gray-400 rounded-md flex items-center justify-center cursor-pointer"
                            onClick={() => navigate(`/ticket/${ticket.id}`)}>
                        <img
                            src={iconEdit}
                            alt="ícone de editar"
                        />
                    </Button>

                    {ticket.status === "open" && (
                        <Button onClick={() => updateStatus("in_progress")} className="flex h-8 w-auto items-center gap-1 rounded-md bg-gray-200 hover:bg-gray-100 px-2 text-xs text-gray-600 cursor-pointer">
                            <img
                                src={iconStart}
                                alt="ícone de iniciar"
                                className="h-3 w-3"
                            />

                            Iniciar
                        </Button>
                    )}

                    {ticket.status === "in_progress" && (
                        <Button onClick={() => updateStatus("closed")} className="flex h-8 w-auto items-center gap-1 rounded-md bg-gray-200 hover:bg-gray-100 px-2 text-xs text-gray-600 cursor-pointer">
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

            <div className="mt-5 flex flex-wrap items-center justify-between gap-2 border-b border-gray-500 pb-4">
                <span className="text-xs text-gray-200">
                    {formatDate(ticket.updatedAt)}
                </span>

                <span className="text-xs font-medium text-gray-200">
                    {formatCurrency(ticket.total)}
                </span>
            </div>

            <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
                <div className="flex min-w-0 flex-1 basis-24 items-center gap-2">
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

            {error &&
                <p role="alert" className="mt-3 text-xs text-feedback-danger">{error}</p>
            }

        </article>
    )
}
