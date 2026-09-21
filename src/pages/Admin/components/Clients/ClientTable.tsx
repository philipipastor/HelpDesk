import { Table } from "../../../../components/Table"

import { ClientRow } from "./ClientRow"

import type { Client } from "../../../../types/Client"

import { api } from "../../../../services/api"

import { useState, useEffect } from "react"
import { AxiosError } from "axios"

export function ClientTable() {

    const [clients, setClients] = useState<Client[]>([])
    const [error, setError] = useState("")

    async function fetchClients(){

        try {
            const response = await api.get<Client[]>("/clients")
            setClients(response.data)

        } catch (error) {
            console.log(error)

            if(error instanceof AxiosError){
                setError(error.response?.data.message)
                return
            }

            setError("Não possível exibir a lista de clientes")

        }
    }

    useEffect(() => {
        fetchClients()
    }, [])

    return (
        <>
            {error &&
                <p className="text-feedback-danger ml-2 text-sm flex items-center justify-center">
                    {error}
                </p>
            }
        <div className="relative w-full min-w-0 overflow-x-auto rounded-lg border border-gray-500">
            <Table className="w-full table-fixed border-collapse lg:min-w-[480px] lg:table-auto max-lg:[&_th]:truncate max-lg:[&_th]:px-2 max-lg:[&_th]:text-[11px] max-lg:[&_td]:px-2 max-lg:[&_td]:text-[11px] max-lg:[&_td_button]:mt-0">
                    <thead>
                        <tr className="border-b border-gray-500 text-left">
                            <th className="px-4 py-3 text-xs font-normal text-gray-400">
                                Nome
                            </th>

                            <th className="px-4 py-3 text-xs font-normal text-gray-400">
                                E-mail
                            </th>

                            <th className="w-20 lg:w-24"></th>
                        </tr>
                    </thead>

                    <tbody>
                        {clients.map((client) => (
                            <ClientRow
                                key={client.id}
                                client={client}
                            />
                        ))}
                    </tbody>
                </Table>
            </div>
        </>
    )
}
