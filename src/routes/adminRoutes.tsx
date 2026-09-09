import { Routes, Route } from "react-router"

import { AppLayout } from "../components/layout/AppLayout"

import { Technicians } from "../pages/Admin/Technicians"
import { Client } from "../pages/Admin/Client"
import { Services } from "../pages/Admin/Services"
import { Tickets } from "../pages/Admin/Tickets"
import { NotFound } from "../pages/NotFound"

export function AdminRoutes(){
    return (
    <Routes>
        <Route element={<AppLayout/>}>
            <Route path="/tecnicos" element={<Technicians/>} />
            <Route path="/clientes" element={<Client/>} />
            <Route path="/serviços" element={<Services/>} />
            <Route path="/chamados" element={<Tickets/>} />
            </Route>
        <Route path="*" element={<NotFound/>}/>
    </Routes>
    )
}