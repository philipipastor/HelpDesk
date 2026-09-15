import { Avatar } from "../../components/Avatar"
import { Button } from "../../components/Button"
import { Status } from "../../components/Status"

import { formatCurrency } from "../../utils/FormatCurrency"
import type { StatusType } from "../../types/Status"

import { useNavigate } from "react-router"

import iconProgress from "../../assets/clock-2.png"
import iconCheck from "../../assets/circle-check-big.png"
import iconBack from "../../assets/arrow-left.png"

type TicketDetails = {
    id: string
    title: string
    description: string
    status: StatusType

    service: {
        title: string
        baseAmount: number
    }

    client: {
        name: string
    }

    technician?: {
        name: string
        email: string
    }

    createdAt: string
    updatedAt: string

    additionalServices: {
        id: string
        title: string
        amount: number
    }[]
}

const ticket: TicketDetails = {
    id: "00004",
    title: "Backup não está funcionando",
    description:
        "O sistema de backup automático parou de funcionar. Última execução bem-sucedida foi há uma semana.",

    status: "open",

    service: {
        title: "Recuperação de Dados",
        baseAmount: 200,
    },

    client: {
        name: "André Costa",
    },

    technician: {
        name: "Carlos Silva",
        email: "carlos.silva@test.com",
    },

    createdAt: "12/04/25 09:12",
    updatedAt: "12/04/25 15:20",

    additionalServices: [
        {
            id: "1",
            title: "Assinatura de backup",
            amount: 120,
        },
        {
            id: "2",
            title: "Formatação do PC",
            amount: 75,
        },
    ],
}

export function TicketDetails() {
    const additionalTotal = ticket.additionalServices.reduce(
        (total, service) => total + service.amount,
        0
    )

    const total = ticket.service.baseAmount + additionalTotal

    const navigate = useNavigate()

    return (
        <main className="w-full px-8 py-10">
            <div className="mx-auto w-full max-w-5xl">

                <button
                    type="button"
                    className="mb-2 flex items-center gap-0.5 text-sm font-semibold text-gray-300 cursor-pointer hover:opacity-70 transition"
                    onClick={() => navigate(-1)}
                >
                    <img
                        src={iconBack}
                        alt="ícone de voltar"
                    />

                    Voltar
                </button>

                <div className="mb-6 flex items-center justify-between">
                    <h1 className="text-2xl font-semibold text-blue-dark">
                        Chamado detalhado
                    </h1>

                    <div className="flex items-center gap-2">
                        <Button className="flex w-auto h-10 items-center gap-2 px-4 rounded-md bg-gray-500 text-gray-100 cursor-pointer hover:bg-gray-400">
                            <img src={iconProgress} alt="" className="h-4 w-4"/>
                            Em atendimento
                        </Button>

                        <Button className="flex w-auto h-10 items-center gap-2 px-4 rounded-md bg-gray-500 text-gray-100 cursor-pointer hover:bg-gray-400">
                            <img src={iconCheck} alt="" className="h-4 w-4"/>
                            Encerrado
                        </Button>
                    </div>
                </div>

                <div className="grid grid-cols-[1fr_320px] gap-6">

                    <section className="rounded-xl border border-gray-500 p-7">

                        <div className="mb-6 flex items-start justify-between">
                            <div>
                                <span className="text-xs text-gray-200">
                                    {ticket.id}
                                </span>

                                <h2 className="mt-2 text-base font-semibold text-gray-200">
                                    {ticket.title}
                                </h2>
                            </div>

                            <Status status={ticket.status} />
                        </div>

                        <div>
                            <span className="text-xs text-gray-400">
                                Descrição
                            </span>

                            <p className="mt-1 text-sm leading-5 text-gray-200">
                                {ticket.description}
                            </p>
                        </div>

                        <div className="mt-6">
                            <span className="text-xs text-gray-400">
                                Categoria
                            </span>

                            <p className="mt-1 text-sm text-gray-200">
                                {ticket.service.title}
                            </p>
                        </div>

                        <div className="mt-7 grid grid-cols-2 gap-8">
                            <div>
                                <span className="text-xs text-gray-400">
                                    Criado em
                                </span>

                                <p className="mt-1 text-sm text-gray-200">
                                    {ticket.createdAt}
                                </p>
                            </div>

                            <div>
                                <span className="text-xs text-gray-400">
                                    Atualizado em
                                </span>

                                <p className="mt-1 text-sm text-gray-200">
                                    {ticket.updatedAt}
                                </p>
                            </div>
                        </div>

                        <div className="mt-7">
                            <span className="text-xs text-gray-400">
                                Cliente
                            </span>

                            <div className="mt-2 flex items-center gap-2">
                                <Avatar
                                    name={ticket.client.name}
                                    variant="secondary"
                                />

                                <span className="text-sm text-gray-200">
                                    {ticket.client.name}
                                </span>
                            </div>
                        </div>

                    </section>

                    <aside className="rounded-xl border border-gray-500 p-7">

                        <div>
                            <span className="text-xs text-gray-400">
                                Técnico responsável
                            </span>

                            {ticket.technician ? (
                                <div className="mt-3 flex items-center gap-3">
                                    <Avatar
                                        name={ticket.technician.name}
                                        variant="primary"
                                    />

                                    <div>
                                        <p className="text-sm font-medium text-gray-200">
                                            {ticket.technician.name}
                                        </p>

                                        <span className="text-xs text-gray-400">
                                            {ticket.technician.email}
                                        </span>
                                    </div>
                                </div>
                            ) : (
                                <p className="mt-2 text-sm text-gray-400">
                                    Nenhum técnico atribuído
                                </p>
                            )}
                        </div>

                        <div className="mt-8">
                            <span className="text-xs text-gray-400">
                                Valores
                            </span>

                            <div className="mt-3 flex items-center justify-between">
                                <span className="text-sm text-gray-200">
                                    Preço base
                                </span>

                                <span className="text-sm text-gray-200">
                                    {formatCurrency(ticket.service.baseAmount)}
                                </span>
                            </div>
                        </div>

                        <div className="mt-6">
                            <span className="text-xs text-gray-400">
                                Adicionais
                            </span>

                            <div className="mt-3 space-y-2">
                                {ticket.additionalServices.map((service) => (
                                    <div
                                        key={service.id}
                                        className="flex items-center justify-between"
                                    >
                                        <span className="text-sm text-gray-200">
                                            {service.title}
                                        </span>

                                        <span className="text-sm text-gray-200">
                                            {formatCurrency(service.amount)}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="mt-6 border-t border-gray-500 pt-5">
                            <div className="flex items-center justify-between">
                                <span className="text-sm font-semibold text-gray-200">
                                    Total
                                </span>

                                <strong className="text-base text-gray-200">
                                    {formatCurrency(total)}
                                </strong>
                            </div>
                        </div>

                    </aside>

                </div>
            </div>
        </main>
    )
}