import { Button } from "../../components/Button"
import { Input } from "../../components/Input"
import { DatePicker } from "../../components/DatePicker"
import { TicketCreate } from "./components/TicketCreate"

import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"

import { useForm } from "react-hook-form"
import { useNavigate } from "react-router"
import { useEffect, useState } from "react"

import { api } from "../../services/api"
import type { Service } from "../../types/Services"
import type { Technician } from "../../types/technician"
import { formatCurrency } from "../../utils/FormatCurrency"
import { formatSchedule } from "../../utils/FormatDate"
import { getErrorMessage } from "../../utils/GetErrorMessage"

const TicketSchema = z.object({
    title: z.string().trim().min(1, "Informe um título"),
    description: z.string().trim().min(1, "Informe uma descrição"),
    service: z.string().min(1, "Informe uma categoria de serviço"),
    technician: z.string().min(1, "Selecione o técnico responsável"),
    date: z.string().min(1, "Selecione a data"),
    hour: z.string().min(1, "Selecione o horário"),
})

type TicketData = z.infer<typeof TicketSchema>

type Slot = { hour: string, available: boolean }

const periods = [
    { title: "Manhã", start: "08:00", end: "11:00" },
    { title: "Tarde", start: "12:00", end: "17:00" },
    { title: "Noite", start: "18:00", end: "19:00" },
]

export function NewTicket() {
    const [error, setError] = useState("")
    const [services, setServices] = useState<Service[]>([])
    const [technicians, setTechnicians] = useState<Technician[]>([])
    const [slots, setSlots] = useState<Slot[]>([])
    const [isLoadingSlots, setIsLoadingSlots] = useState(false)
    const [slotsVersion, setSlotsVersion] = useState(0)

    const navigate = useNavigate()

    useEffect(() => {
        async function fetchOptions() {
            try {
                const [servicesResponse, techniciansResponse] = await Promise.all([
                    api.get<Service[]>("/services"),
                    api.get<Technician[]>("/technicians"),
                ])
                setServices(servicesResponse.data)
                setTechnicians(techniciansResponse.data.filter(technician => technician.availability.length > 0))
            } catch (error) {
                setError(getErrorMessage(error, "Não foi possível carregar os serviços e técnicos"))
            }
        }

        fetchOptions()
    }, [])

    const { register, handleSubmit, watch, setValue, formState: { errors, isSubmitting } } = useForm<TicketData>({
        resolver: zodResolver(TicketSchema),
        defaultValues: {
            title: "",
            description: "",
            service: "",
            technician: "",
            date: "",
            hour: ""
        }
    })
    const serviceId = watch("service")
    const technicianId = watch("technician")
    const date = watch("date")
    const hour = watch("hour")
    const selectedService = services.find(service => service.id === serviceId)
    const selectedTechnician = technicians.find(technician => technician.id === technicianId)
    const hasFreeSlot = slots.some(slot => slot.available)

    useEffect(() => {
        setValue("hour", "")
        setSlots([])
        if (!technicianId || !date) return

        // Ignora a resposta antiga se o cliente trocar de técnico ou data antes de ela chegar.
        let isCurrent = true
        setIsLoadingSlots(true)

        api.get<Slot[]>(`/technicians/${technicianId}/slots`, { params: { date } })
            .then(response => {
                if (isCurrent) setSlots(response.data)
            })
            .catch(error => {
                if (isCurrent) setError(getErrorMessage(error, "Não foi possível carregar os horários"))
            })
            .finally(() => {
                if (isCurrent) setIsLoadingSlots(false)
            })

        return () => {
            isCurrent = false
        }
    }, [technicianId, date, slotsVersion, setValue])

    function hourPlaceholder() {
        if (!technicianId || !date) return "Selecione"
        if (isLoadingSlots) return "Carregando..."
        return hasFreeSlot ? "Selecione" : "Sem horários"
    }

    async function onSubmit(data: TicketData){
        try {
            setError("")
            await TicketCreate({
                title: data.title,
                description: data.description,
                serviceId: data.service,
                technicianId: data.technician,
                scheduledDate: data.date,
                scheduledHour: data.hour
            })
            navigate("/")
        } catch (error) {
            setError(getErrorMessage(error, "Não foi possível criar o chamado"))
            // Outro cliente pode ter ocupado o horário: atualiza a lista para ele aparecer como ocupado.
            setSlotsVersion(version => version + 1)
        }
    }

    return (
        <div className="w-full min-w-0 px-4 py-6 sm:px-6 lg:px-8 lg:py-10">

            <div className="mx-auto w-full max-w-5xl">

                <h1 className="mb-6 text-2xl font-semibold text-blue-dark">
                    Novo chamado
                </h1>

                <form onSubmit={handleSubmit(onSubmit)} className="grid min-w-0 grid-cols-1 gap-4 bg-gray-600 lg:grid-cols-[minmax(0,1fr)_320px] lg:gap-0 lg:overflow-hidden lg:rounded-xl lg:border lg:border-gray-500">

                    <section className="min-w-0 rounded-xl border border-gray-500 p-5 sm:p-8 lg:rounded-none lg:border-0 lg:border-r">

                        <h2 className="text-base font-semibold text-gray-200">
                            Informações
                        </h2>

                        <p className="mt-1 max-w-sm text-sm text-gray-400">
                            Configure os dias e horários em que você está disponível para atender chamados
                        </p>

                        <div className="mt-8 flex flex-col gap-6">

                            <Input
                                legenda="Título"
                                placeholder="Digite um título para o chamado"
                                {...register("title")}
                            />
                            {errors.title && <p id="title-error" role="alert" className="text-xs text-feedback-danger">{errors.title.message}</p>}

                            <div className="group">
                                <label htmlFor="ticket-description" className="block text-sm font-medium uppercase text-gray-300 group-focus-within:text-blue-base">
                                    Descrição
                                </label>
                                <textarea
                                    id="ticket-description"
                                    rows={4}
                                    placeholder="Descreva o que está acontecendo"
                                    className="mt-2 block w-full resize-y rounded-md border border-gray-500 bg-transparent p-3 text-sm text-gray-100 outline-none placeholder:text-gray-400 focus:border-blue-base"
                                    {...register("description")}
                                />
                            </div>
                            {errors.description && <p id="description-error" role="alert" className="text-xs text-feedback-danger">{errors.description.message}</p>}

                            <div className="mt-10">
                                <label className="mb-2 block text-sm font-medium uppercase leading-1.75 text-gray-300">
                                    Categoria de serviço
                                </label>

                                <select
                                    value={serviceId}
                                    {...register("service")}
                                    className="w-full min-w-0 max-w-full border-b border-gray-500 bg-transparent py-2 text-sm text-gray-100 outline-none focus:border-blue-base"
                                >
                                    <option value="" disabled>
                                        Selecione a categoria de atendimento
                                    </option>

                                     {services.map(service => (
                                        <option key={service.id} value={service.id}>{service.title}</option>
                                     ))}   
                                </select>
                                {errors.service && <p id="name-error" role="alert" className="text-xs text-feedback-danger">{errors.service.message}</p>}
                            </div>

                            <div>
                                <label className="mb-2 block text-sm font-medium uppercase leading-1.75 text-gray-300">
                                    Técnico responsável
                                </label>

                                <select
                                    value={technicianId}
                                    {...register("technician")}
                                    className="w-full min-w-0 max-w-full border-b border-gray-500 bg-transparent py-2 text-sm text-gray-100 outline-none focus:border-blue-base"
                                >
                                    <option value="" disabled>
                                        Selecione o técnico
                                    </option>

                                    {technicians.map(technician => (
                                        <option key={technician.id} value={technician.id}>{technician.name}</option>
                                    ))}
                                </select>
                                {errors.technician && <p id="technician-error" role="alert" className="text-xs text-feedback-danger">{errors.technician.message}</p>}
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="min-w-0">
                                    <label htmlFor="ticket-date" className="mb-2 block text-sm font-medium uppercase leading-1.75 text-gray-300">
                                        Data
                                    </label>

                                    <DatePicker
                                        id="ticket-date"
                                        value={date}
                                        onChange={value => setValue("date", value, { shouldValidate: true })}
                                    />
                                    {errors.date && <p id="date-error" role="alert" className="mt-1 text-xs text-feedback-danger">{errors.date.message}</p>}
                                </div>

                                <div className="min-w-0">
                                    <label htmlFor="ticket-hour" className="mb-2 block text-sm font-medium uppercase leading-1.75 text-gray-300">
                                        Horário
                                    </label>

                                    <select
                                        id="ticket-hour"
                                        value={hour}
                                        disabled={!hasFreeSlot}
                                        {...register("hour")}
                                        className="w-full min-w-0 max-w-full border-b border-gray-500 bg-transparent py-2 text-sm text-gray-100 outline-none focus:border-blue-base disabled:cursor-not-allowed disabled:text-gray-400"
                                    >
                                        <option value="" disabled>
                                            {hourPlaceholder()}
                                        </option>

                                        {periods.map(period => {
                                            const periodSlots = slots.filter(slot => slot.hour >= period.start && slot.hour <= period.end)
                                            if (periodSlots.length === 0) return null

                                            return (
                                                <optgroup key={period.title} label={period.title}>
                                                    {periodSlots.map(slot => (
                                                        <option key={slot.hour} value={slot.hour} disabled={!slot.available}>
                                                            {slot.available ? slot.hour : `${slot.hour} (ocupado)`}
                                                        </option>
                                                    ))}
                                                </optgroup>
                                            )
                                        })}
                                    </select>
                                    {errors.hour && <p id="hour-error" role="alert" className="mt-1 text-xs text-feedback-danger">{errors.hour.message}</p>}
                                </div>
                            </div>

                        </div>

                    </section>

                    <aside className="min-w-0 rounded-xl border border-gray-500 p-5 sm:p-8 lg:rounded-none lg:border-0">

                        <h2 className="text-base font-semibold text-gray-200">
                            Resumo
                        </h2>

                        <p className="mt-1 text-sm text-gray-300">
                            Valores e detalhes
                        </p>

                        <div className="mt-8">

                            <span className="text-xs text-gray-400">
                                Categoria de serviço
                            </span>

                            <p className="mt-1 text-sm font-medium text-gray-200">
                                {selectedService ? selectedService.title : "Selecione um serviço"}
                            </p>

                        </div>

                        <div className="mt-6">

                            <span className="text-xs text-gray-400">
                                Custo inicial
                            </span>

                            <p className="mt-1 text-xl font-semibold text-gray-200">
                                {selectedService ? formatCurrency(selectedService.amount) : "—"}
                            </p>

                        </div>

                        <div className="mt-6">

                            <span className="text-xs text-gray-400">
                                Técnico responsável
                            </span>

                            <p className="mt-1 text-sm font-medium text-gray-200">
                                {selectedTechnician ? selectedTechnician.name : "Selecione um técnico"}
                            </p>

                        </div>

                        <div className="mt-6">

                            <span className="text-xs text-gray-400">
                                Atendimento agendado
                            </span>

                            <p className="mt-1 text-sm font-medium text-gray-200">
                                {date && hour ? formatSchedule(date, hour) : "Selecione a data e o horário"}
                            </p>

                        </div>

                        <p className="mt-8 text-sm leading-5 text-gray-300">
                            O chamado será atribuído ao técnico selecionado
                        </p>

                        <Button type="submit" disabled={isSubmitting}>
                            {isSubmitting ? "Criando o chamado..." : "Criar chamado"}
                        </Button>
                        
                        {error && <p id="name-error" role="alert" className="text-xs text-feedback-danger">{error}</p>}
                    </aside>

                </form>

            </div>

        </div>
    )
}
