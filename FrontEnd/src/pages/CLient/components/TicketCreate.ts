import { api } from "../../../services/api"

import type { TicketDetails } from "../../../types/TicketDetails"

export type TicketCreateData = {
    title: string
    description: string
    serviceId: string
    technicianId: string
    scheduledDate: string
    scheduledHour: string
}

export async function TicketCreate(data: TicketCreateData) {
    const response = await api.post<TicketDetails>("/tickets", data)
    return response.data
}
