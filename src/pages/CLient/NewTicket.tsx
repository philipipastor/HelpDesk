import { Button } from "../../components/Button"
import { Input } from "../../components/Input"
import { TicketCreate } from "./components/TicketCreate"

import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"

import { useForm } from "react-hook-form"
import { useNavigate } from "react-router"
import { useState } from "react"

import { Services } from "../../data/Services"
import { formatCurrency } from "../../utils/FormatCurrency"

const TicketSchema = z.object({
    title: z.string().trim().min(1, "Informe um título"),
    description: z.string().trim().min(1, "Informe uma descrição"),
    service: z.string().min(1, "Informe uma categoria de serviço"),
})

type TicketData = z.infer<typeof TicketSchema>

export function NewTicket() {
    const [error, setError] = useState("")

    const navigate = useNavigate()

    const { register, handleSubmit, watch, formState: { errors, isSubmitting } } = useForm<TicketData>({
        resolver: zodResolver(TicketSchema),
        defaultValues: {
            title: "", 
            description: "",
            service: ""
        }
    })
    const serviceId = watch("service")
    const selectedService = Services.find(service => service.id === serviceId)

    async function onSubmit(data: TicketData){
        const service = Services.find(item => item.id === data.service)
        
        if(!service){
            return
        }

        const ticket = {
            title: data.title,
            description: data.description,
            service: {
                title: service.title,
                amount: Number(service.amount)
            }
        }

        try {
            await TicketCreate(ticket)
            navigate("/")
        } catch (error) {
            console.log(error)
            setError("Não foi possível criar o chamado")
        }
    
    }

    return (
        <main className="w-full px-8 py-10">

            <div className="mx-auto w-full max-w-5xl">

                <h1 className="mb-6 text-2xl font-semibold text-blue-dark">
                    Novo chamado
                </h1>

                <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-[1fr_320px] overflow-hidden rounded-xl border border-gray-500 bg-gray-600">

                    <section className="border-r border-gray-500 p-8">

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

                            <Input
                                legenda="Descrição"
                                placeholder="Descreva o que está acontecendo"
                                {...register("description")}
                            />
                            {errors.description && <p id="description-error" role="alert" className="text-xs text-feedback-danger">{errors.description.message}</p>}

                            <div className="mt-10">
                                <label className="mb-2 block text-sm font-medium uppercase leading-1.75 text-gray-300">
                                    Categoria de serviço
                                </label>

                                <select
                                    value={serviceId}
                                    {...register("service")}
                                    className="w-full border-b border-gray-500 bg-transparent py-2 text-sm text-gray-100 outline-none focus:border-blue-base"
                                >
                                    <option value="" disabled>
                                        Selecione a categoria de atendimento
                                    </option>

                                     {Services.map(service => (
                                        <option key={service.id} value={service.id}>{service.title}</option>
                                     ))}   
                                </select>
                                {errors.service && <p id="name-error" role="alert" className="text-xs text-feedback-danger">{errors.service.message}</p>}
                            </div>

                        </div>

                    </section>

                    <aside className="p-8">

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

                        <p className="mt-8 text-sm leading-5 text-gray-300">
                            O chamado será automaticamente atribuído a um técnico disponível
                        </p>

                        <Button type="submit" disabled={isSubmitting}>
                            {isSubmitting ? "Criando o chamado..." : "Criar chamado"}
                        </Button>
                        
                        {error && <p id="name-error" role="alert" className="text-xs text-feedback-danger">{error}</p>}
                    </aside>

                </form>

            </div>

        </main>
    )
}
