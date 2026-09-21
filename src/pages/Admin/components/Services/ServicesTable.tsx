import { Table } from "../../../../components/Table"
import { ServicesRow } from "./ServicesRow"
import type { Service } from "../../../../types/Services"

import { api } from "../../../../services/api"

import { useEffect, useState } from "react"
import { AxiosError } from "axios"

type Props = {
    refreshCount: number
}

export function ServicesTable({ refreshCount }: Props) {

    const [service, setService] = useState<Service[]>([])
    const [error, setError] = useState("")

    async function fetchServices() {
        try {
            setError("")
            const response = await api.get<Service[]>("/services")
            setService(response.data)
        } catch (error) {
            console.log(error)

            if (error instanceof AxiosError) {
                setError(error.response?.data.message)
                return
            }

            setError("Não possível exibir a lista de clientes")
        }

    }

    useEffect(() => {
        fetchServices()
    }, [refreshCount])

    return (
        <div className="relative w-full min-w-0 overflow-x-auto rounded-lg border border-gray-500">
            {error &&
                <p className="text-feedback-danger ml-2 text-sm flex items-center justify-center">
                    {error}
                </p>
            }
            <Table className="w-full table-fixed border-collapse lg:min-w-[560px] lg:table-auto max-lg:[&_th]:truncate max-lg:[&_th]:px-2 max-lg:[&_th]:text-[11px] max-lg:[&_td]:px-2 max-lg:[&_td]:text-[11px] max-lg:[&_td_button]:mt-0">
                <thead>
                    <tr className="border-b border-gray-500 text-left">
                        <th className="px-4 py-3 text-xs font-normal text-gray-400">
                            Título
                        </th>

                        <th className="w-20 px-4 py-3 text-xs font-normal text-gray-400 lg:w-auto">
                            Valor
                        </th>

                        <th className="w-12 px-4 py-3 text-xs font-normal text-gray-400 lg:w-auto">
                            Status
                        </th>

                        <th scope="col" className="w-8 lg:w-auto"><span className="sr-only">Ativar ou desativar</span></th>
                        <th scope="col" className="w-11 lg:w-24"><span className="sr-only">Editar</span></th>
                    </tr>
                </thead>

                <tbody>
                    {service.map((service) => (
                        <ServicesRow
                            key={service.id}
                            service={service}
                        />
                    ))}
                </tbody>
            </Table>
        </div>

    )
}
