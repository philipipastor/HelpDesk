import { TicketDetails } from "../pages/CLient/TicketDetails"
import { Routes, Route } from "react-router"

import { AppLayout } from "../components/layout/AppLayout"

import { Tickets } from "../pages/CLient/ClientTicket"
import { NewTicket } from "../pages/CLient/NewTicket"
import { NotFound } from "../pages/NotFound"

export function ClientRoutes(){
    return (
    <Routes>
        <Route element={<AppLayout/>}>
            <Route path="/" element={<Tickets/>}/>
            <Route path="/ticket/:id" element={<TicketDetails/>}/>
            <Route path="/tickets/new" element={<NewTicket/>}/>
        </Route>

        <Route path="*" element={<NotFound/>}/>
    </Routes>
    )
} 