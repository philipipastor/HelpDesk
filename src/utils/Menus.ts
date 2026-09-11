import listTickets from "../assets/clipboard-list.png"
import users from "../assets/users.png"
import business from "../assets/business.png"
import wrench from "../assets/wrench.png"
import plus from "../assets/plus.png"

export const Menus = {
    admin: [
        { label: "Chamados", path: "/", icon: listTickets },
        { label: "Técnicos", path: "/tecnicos", icon: users },
        { label: "Clientes", path: "/clientes", icon: business },
        { label: "Serviços", path: "/serviços", icon: wrench },
    ],

    technician: [
        { label: "Meus chamados", path: "/", icon: listTickets }
    ],

    client: [
        { label: "Meus chamados", path: "/", icon: listTickets },
        { label: "Criar chamado", path: "/tickets/new", icon: plus }
    ]
}