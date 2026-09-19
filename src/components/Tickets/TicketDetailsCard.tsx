import { AdditionalServiceModal } from "./AdditionalServiceModal"
import { Avatar } from "../Avatar"
import { Button } from "../Button"
import { Status } from "../Status"

import { formatCurrency } from "../../utils/FormatCurrency"
import { formatDate } from "../../utils/FormatDate"

import { useNavigate } from "react-router"
import { useState } from "react"

import iconProgress from "../../assets/clock-2.png"
import iconCheck from "../../assets/circle-check-big.png"
import iconBack from "../../assets/arrow-left.png"
import iconPlus from "../../assets/plus.png"
import iconRemove from "../../assets/iconRemove.png"

import type { TicketDetails } from "../../types/TicketDetails"
import type { UserRole } from "../../types/UserRole"

type Props = {
    ticket: TicketDetails
    role: UserRole
}

export function TicketDetailsCard({ ticket, role }: Props) {
    const [additionalServices, setAdditionalServices] = useState(ticket.additionalServices)
    const [description, setDescription] = useState("")
    const [amount, setAmount] = useState("")

    const additionalTotal = additionalServices.reduce(
        (total, service) => total + service.amount,
        0
    )

    const total = ticket.service.amount + additionalTotal

    const navigate = useNavigate()

    const [modal, setModal] = useState<boolean>(false)

    function saveAdditionalService(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault()
        setAdditionalServices([...additionalServices, {
            id: crypto.randomUUID(),
            title: description.trim(),
            amount: Number(amount),
        }])
        setDescription("")
        setAmount("")
        setModal(false)
    }

    return (
        <main className={role === "technician" ? "w-full px-6 py-7 md:px-12 md:py-13" : "w-full px-8 py-10"}>
            <div className={role === "technician" ? "mx-auto w-full max-w-200" : "mx-auto w-full max-w-5xl"}>

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

                <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
                    <h1 className="text-2xl font-semibold text-blue-dark">
                        Chamado detalhado
                    </h1>

                    {role === "admin" && (
                        <div className="flex items-center gap-2">
                            <Button className="flex w-auto h-10 items-center gap-2 px-4 rounded-md bg-gray-500 text-gray-100 cursor-pointer hover:bg-gray-400">
                                <img src={iconProgress} alt="" className="h-4 w-4" />
                                Em atendimento
                            </Button>

                            <Button className="flex w-auto h-10 items-center gap-2 px-4 rounded-md bg-gray-500 text-gray-100 cursor-pointer hover:bg-gray-400">
                                <img src={iconCheck} alt="" className="h-4 w-4" />
                                Encerrado
                            </Button>
                        </div>
                    )}
                    {role === "technician" && (
                        <div className="flex items-center gap-2">
                            <Button className="flex w-auto h-10 items-center gap-2 px-4 rounded-[5px] bg-gray-200 text-gray-600 cursor-pointer hover:bg-gray-100">
                                <img src={iconProgress} alt="" className="h-4 w-4 brightness-0 invert" />
                                Iniciar atendimento
                            </Button>

                            <Button className="flex w-auto h-10 items-center gap-2 px-4 rounded-[5px] bg-gray-500 text-gray-100 cursor-pointer hover:bg-gray-400">
                                <img src={iconCheck} alt="" className="h-4 w-4" />
                                Encerrar
                            </Button>
                        </div>
                    )}
                </div>

                <div className={role === "technician" ? "grid grid-cols-1 items-start gap-4 lg:grid-cols-[minmax(0,480px)_296px] lg:gap-x-6 lg:gap-y-3" : "grid grid-cols-[1fr_320px] gap-6"}>

                    <section className={role === "technician" ? "rounded-[10px] border border-gray-500 p-6 lg:col-start-1 lg:row-start-1" : "rounded-xl border border-gray-500 p-7"}>

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
                                {ticket.description || "Descrição não informada"}
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
                                    {formatDate(ticket.createdAt)}
                                </p>
                            </div>

                            <div>
                                <span className="text-xs text-gray-400">
                                    Atualizado em
                                </span>

                                <p className="mt-1 text-sm text-gray-200">
                                    {formatDate(ticket.updatedAt)}
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

                    <aside className={role === "technician" ? "rounded-[10px] border border-gray-500 p-6 lg:col-start-2 lg:row-start-1 lg:row-span-2" : "rounded-xl border border-gray-500 p-7"}>

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
                                            {ticket.technician.email || "E-mail não informado"}
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
                                    {formatCurrency(ticket.service.amount)}
                                </span>
                            </div>
                        </div>

                        {role === "technician" ? (
                            <div className="mt-3 flex items-center justify-between text-sm text-gray-200">
                                <span>Adicionais</span>
                                <span>{formatCurrency(additionalTotal)}</span>
                            </div>
                        ) : (
                        <div className="mt-6">
                            <span className="text-xs text-gray-400">
                                Adicionais
                            </span>

                            <div className="mt-3 space-y-2">
                                {additionalServices.map((service) => (
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

                        )}

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

                    {role === "technician" && (
                        <section className="rounded-[10px] border border-gray-500 p-6 lg:col-start-1 lg:row-start-2">
                            <div className="mb-4 flex items-center justify-between gap-4">
                                <h2 className="text-sm font-bold text-gray-200">Serviços adicionais</h2>
                                <Button
                                    onClick={() => setModal(true)}
                                    aria-label="Adicionar serviço"
                                    className="flex size-7 items-center justify-center rounded-[5px] bg-gray-200 hover:bg-gray-100 cursor-pointer"
                                >
                                    <img src={iconPlus} alt="" className="size-4 brightness-0 invert" />
                                </Button>
                            </div>
                            <div className="space-y-4">
                                {additionalServices.map(service => (
                                    <div key={service.id} className="flex items-center gap-3 text-xs text-gray-200">
                                        <span className="min-w-0 flex-1">{service.title}</span>
                                        <span className="shrink-0">{formatCurrency(service.amount)}</span>
                                        <Button
                                            aria-label={`Remover ${service.title}`}
                                            onClick={() => setAdditionalServices(additionalServices.filter(item => item.id !== service.id))}
                                            className="flex size-7 shrink-0 items-center justify-center rounded-[5px] bg-gray-500 hover:bg-gray-400 cursor-pointer"
                                        >
                                            <img src={iconRemove} alt="" className="size-3.5" />
                                        </Button>
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}

                    {role === "technician" && modal && (
                        <AdditionalServiceModal
                            modal={modal}
                            setModal={setModal}
                            description={description}
                            setDescription={setDescription}
                            amount={amount}
                            setAmount={setAmount}
                            saveAdditionalService={saveAdditionalService}
                        />
                    )}

                </div>
            </div>
        </main>
    )
}
