import { Routes, Route } from "react-router"

import { AppLayout } from "../components/layout/AppLayout"
import { Tickets } from "../pages/CLient/ClientTicket"
import { NotFound } from "../pages/NotFound"

export function ClientRoutes(){
    return (
    <Routes>
        <Route element={<AppLayout/>}>
            <Route path="/" element={<Tickets/>}/>
        </Route>

        <Route path="*" element={<NotFound/>}/>
    </Routes>
    )
} 