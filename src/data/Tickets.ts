import type { TicketDetails } from "../types/TicketDetails"

// Dados de exemplo compartilhados pela listagem e pelo detalhamento.
export const tickets: TicketDetails[] = [
    {
        updatedAt: "2023-06-01",
        id: "1",
        title: "Problema com o computador",
        service: {
            title: "Reparo de computador",
            amount: "100"
        },
        client: {
            name: "John Doe"
        },
        technician: {
            name: "Jane Smith"
        },
        additionalServices: [],
        status: "open"
    },
    {
        updatedAt: "2023-06-01",
        id: "2",
        title: "Problema com o computador",
        service: {
            title: "Reparo de computador",
            amount: "100"
        },
        client: {
            name: "John Doe"
        },
        technician: {
            name: "Jane Smith"
        },
        additionalServices: [],
        status: "in_progress"
    },
    {
        updatedAt: "2023-06-01",
        id: "3",
        title: "Problema com o computador",
        service: {
            title: "Reparo de computador",
            amount: "100"
        },
        client: {
            name: "John Doe"
        },
        technician: {
            name: "Jane Smith"
        },
        additionalServices: [],
        status: "closed"
    },
{
    id: "00004",
    title: "Backup não está funcionando",
    description:
        "O sistema de backup automático parou de funcionar. Última execução bem-sucedida foi há uma semana.",

    status: "open",

    service: {
        title: "Recuperação de Dados",
        amount: "200",
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
]
