import type { Technician } from "../../../../types/technician"

import { api } from "../../../../services/api"
import { getErrorMessage } from "../../../../utils/GetErrorMessage"

export type TechnicianInput = Pick<Technician, "name" | "email" | "availability">

export async function getTechnician(id: string) {
    const response = await api.get<Technician>(`/technicians/${id}`)
    return response.data
}

export async function createTechnician(data: TechnicianInput & { password: string }) {
    try {
        const response = await api.post<Technician>("/technicians", data)
        return response.data
    } catch (error) {
        throw new Error(getErrorMessage(error, "Não foi possível cadastrar o técnico"))
    }
}

export async function updateTechnician(id: string, data: TechnicianInput) {
    try {
        const response = await api.put<Technician>(`/technicians/${id}`, data)
        return response.data
    } catch (error) {
        throw new Error(getErrorMessage(error, "Não foi possível salvar o técnico"))
    }
}
