import { Routes, Route } from "react-router"

import { AppLayout } from "../components/layout/AppLayout"

import { MyTickets } from "../pages/Technician/MyTickets"
import { NotFound } from "../pages/NotFound"

export function TechnicianRoutes(){
    return (
    <Routes>
        <Route element={<AppLayout/>}>
            <Route path="/" element={<MyTickets/>}/>
        </Route>

        <Route path="*" element={<NotFound/>}/>
    </Routes>
    )
} 