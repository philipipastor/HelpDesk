import { Technicians } from "../../../../data/Technician"
import type { Technician } from "../../../../types/technician"

import { api } from "../../../../services/api"
import { AxiosError } from "axios"

export type TechnicianInput = Pick<Technician, "name" | "email" | "availability">

export function getTechnician(id: string) {
    return Technicians.find(technician => technician.id === id)
}

export async function createTechnician(data: TechnicianInput & { password: string }) {
    try {
        const response = await api.post<Technician>("/technicians", data)
        return response.data
    } catch (error) {
        const message = error instanceof AxiosError
            ? error.response?.data?.message || "Não foi possível cadastrar o técnico"
            : "Ocorreu um erro inesperado"

        throw new Error(message)
    }
}

// Substituir por PUT /technicians/:id na integração.
export async function updateTechnician(id: string, data: TechnicianInput) {
    const index = Technicians.findIndex(technician => technician.id === id)
    if (index === -1) throw new Error("Técnico não encontrado")
    const technician: Technician = { id, ...data, availability: [...data.availability] }
    Technicians[index] = technician
    return technician
}
