import { Technicians } from "../../../../data/Technician"
import type { Technician } from "../../../../types/technician"

export type TechnicianInput = Pick<Technician, "name" | "email" | "availability">

export function getTechnician(id: string) {
    return Technicians.find(technician => technician.id === id)
}

// Simulação em memória: substituir por POST /technicians na integração.
// A senha não é armazenada nos dados de exemplo.
export async function createTechnician(data: TechnicianInput & { password: string }) {
    const technician: Technician = {
        id: crypto.randomUUID(),
        name: data.name,
        email: data.email,
        availability: [...data.availability],
    }
    Technicians.push(technician)
    return technician
}

// Substituir por PUT /technicians/:id na integração.
export async function updateTechnician(id: string, data: TechnicianInput) {
    const index = Technicians.findIndex(technician => technician.id === id)
    if (index === -1) throw new Error("Técnico não encontrado")
    const technician: Technician = { id, ...data, availability: [...data.availability] }
    Technicians[index] = technician
    return technician
}
