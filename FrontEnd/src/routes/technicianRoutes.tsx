import { Routes, Route } from "react-router"

import { AppLayout } from "../components/layout/AppLayout"

import { MyTickets } from "../pages/Technician/MyTickets"
import { TicketDetails } from "../pages/Technician/TicketDetails"
import { NotFound } from "../pages/NotFound"

export function TechnicianRoutes(){
    return (
    <Routes>
        <Route element={<AppLayout/>}>
            <Route path="/" element={<MyTickets/>}/>
            <Route path="/ticket/:id" element={<TicketDetails/>}/>
        </Route>

        <Route path="*" element={<NotFound/>}/>
    </Routes>
    )
} 