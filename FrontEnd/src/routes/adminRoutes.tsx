import { Routes, Route } from "react-router"

import { AppLayout } from "../components/layout/AppLayout"

import { Technicians } from "../pages/Admin/Technicians"
import { TechnicianProfile } from "../pages/Admin/TechnicianProfile"
import { Client } from "../pages/Admin/Client"
import { Services } from "../pages/Admin/Services"
import { Tickets } from "../pages/Admin/Tickets"
import { TicketDetails } from "../pages/Admin/TicketDetails"
import { NotFound } from "../pages/NotFound"

export function AdminRoutes(){
    return (
    <Routes>
        <Route element={<AppLayout/>}>
            <Route path="/tecnicos" element={<Technicians/>} />
            <Route path="/tecnicos/novo" element={<TechnicianProfile/>} />
            <Route path="/tecnicos/:id/editar" element={<TechnicianProfile/>} />
            <Route path="/clientes" element={<Client/>} />
            <Route path="/serviços" element={<Services/>} />
            <Route path="/" element={<Tickets/>} />
            <Route path="/ticket/:id" element={<TicketDetails/>} />
            </Route>
        <Route path="*" element={<NotFound/>}/>
    </Routes>
    )
}
